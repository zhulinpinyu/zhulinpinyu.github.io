---
layout:     post
title:      "[译文]Let’s Build |> 使用Elixir，Phoenix和React打造克隆版的Slack"
subtitle:   "part 5 — Phoenix Sockets and Channels"
date:       2017-08-01
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
    - Phoenix
    - React
    - 译文
---

> [Live Demo](http://sling-chat.s3-website-us-west-2.amazonaws.com/)---[GitHub Repo](https://github.com/bnhansn/sling)

上篇我们已经完成聊天室的创建, 已经有了一个不错的Web App。下面我们将使用Phoenix Channel 实现实时聊天。

首先创建Message Model

```bash
mix phoenix.gen.model Message messages room_id:references:rooms user_id:references:users text:string
```

```elixir
#sling/api/priv/repo/migrations/timestamp_create_message.exs

defmodule Sling.Repo.Migrations.CreateMessage do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :text, :string, null: false
      add :room_id, references(:rooms, on_delete: :nothing), null: false
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end
    create index(:messages, [:room_id])
    create index(:messages, [:user_id])

  end
end
```

 运行Migration

```bash
mix ecto.migrate
```

更新model

```elixir
#sling/api/web/models/message.ex

defmodule Sling.Message do
  use Sling.Web, :model

  schema "messages" do
    field :text, :string
    belongs_to :room, Sling.Room
    belongs_to :user, Sling.User

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:text, :user_id, :room_id])
    |> validate_required([:text, :user_id, :room_id])
  end
end
```

在 user.ex 和room.ex中添加 `has_many :messages, Sling.Message`以便建立关系。

### 创建Sockets

 实现消息多用户广播需要使用channel, 要想连接到channel 用户首先要连接到socket。修正Phoenix生成的user_socket.ex文件。

```elixir
#sling/api/web/channels/user_socket.ex

defmodule Sling.UserSocket do
  use Phoenix.Socket

  channel "rooms:*", Sling.RoomChannel

  transport :websocket, Phoenix.Transports.WebSocket

  def connect(%{"token" => token}, socket) do
    case Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        case Sling.GuardianSerializer.from_token(claims["sub"]) do
          {:ok, user} ->
            {:ok, assign(socket, :current_user, user)}
          {:error, _reason} ->
            :error
        end
      {:error, _reason} ->
        :error
    end
  end

  def connect(_params, _socket), do: :error

  def id(socket), do: "users_socket:#{socket.assigns.current_user.id}"
end
```

channel 请求标识为 `rooms:*` 相应的由RoomChannel处理

`connect/1`需要传入参数`token`,以便连接到channel, 当然这个token是我从前端发送过来的jwt token. 我们还需要使用Guardian校验token,只有登录的用户才能连接到channel。

GuardianSerializer 可以从token中读取current_user,然后将current_user 赋予socket。这样我们就可以通过`socket.assigns.current_user`读取当前用户的信息。

### 创建channel

简单实现 RoomChannel

```elixir
defmodule Sling.RoomChannel do
  use Sling.Web, :channel

  def join("rooms:" <> room_id, _params, socket) do
    room = Repo.get!(Sling.Room, room_id)

    response = %{
      room: Phoenix.View.render_one(room, Sling.RoomView, "room.json"),
    }

    {:ok, response, assign(socket, :room, room)}
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end
end
```

join 方法需要room_id 参数，以便区分不同的channel 处理不同的chat room。从数据库加载Room信息。使用已有的RoomView渲染数据。

最后一步`{:ok, response, assign(socket, :room, room)}`返回相应数据到前端。当我们创建新消息时，我们将使用 `socket.assigns.room`访问room信息。

### 前端Socket 连接

创建消息之前，首先要从前端连接channel。连接channel之前首先要连接socket,只需lwt token即可。这样才能保证用户登录后能正确连接。连接后将socket 保存到redux store中，这样就可以实现前端跨组件访问。

```javascript
//sling/web/src/actions/session.js

import { reset } from 'redux-form';
import { Socket } from 'phoenix'; // new line
import api from '../api';
import { fetchUserRooms } from './rooms';

const API_URL = process.env.REACT_APP_API_URL; // new line
const WEBSOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api', ''); // new line

// new function
function connectToSocket(dispatch) {
  const token = JSON.parse(localStorage.getItem('token'));
  const socket = new Socket(`${WEBSOCKET_URL}/socket`, {
    params: { token },
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); }
  });
  socket.connect();
  dispatch({ type: 'SOCKET_CONNECTED', socket });
}

function setCurrentUser(dispatch, response) {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch({ type: 'AUTHENTICATION_SUCCESS', response });
  dispatch(fetchUserRooms(response.data.id));
  connectToSocket(dispatch); // new line
}

// ...rest of file
```

在文件 `/sling/api/lib/sling/endpoint.ex`中，Phoenix已经定义socket url `socket "/socket", Sling.UserSocket`。http请求这么构造http://... ，websocket 连接这么构造ws://...,  我们定义WEBSOCKET_URL通过改造 API_URL 实现。我们的最终目的是 向 /socket 发送请求。

connectToSocket函数从localStorage中读取jwt token, 使用Phoenix Socket JavaScript库向user_socket.ex connect/1函数发起请求，最终发出SOCKET_CONNECTED, 下面我们在session reducer 中处理这个 action type.

```javascript
//sling/web/src/reducers/session.js

const initialState = {
  willAuthenticate: true,
  isAuthenticated: false,
  currentUser: {},
  socket: null, // new line
};

// ...

    case 'LOGOUT':
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: false,
        currentUser: {},
        socket: null, // new line
      };
    case 'SOCKET_CONNECTED': // new case
      return {
        ...state,
        socket: action.socket,
      };
    default:
      return state;
  }
}
```

### 前端Channel连接

现在我们能从Room container中访问socket ,并与RoomChannel通信。创建room.js action file。实现相应action 函数。

```javascript
//sling/web/src/action/room.js

export function connectToChannel(socket, roomId) {
  return (dispatch) => {
    if (!socket) { return false; }
    const channel = socket.channel(`rooms:${roomId}`);

    channel.join().receive('ok', (response) => {
      dispatch({ type: 'ROOM_CONNECTED_TO_CHANNEL', response, channel });
    });

    return false;
  };
}

export function leaveChannel(channel) {
  return (dispatch) => {
    if (channel) {
      channel.leave();
    }
    dispatch({ type: 'USER_LEFT_ROOM' });
  };
}
```

在新的reducer中保存当前room的状态, room.js

```javascript
//sling/web/src/reducers/room.js

const initialState = {
  channel: null,
  currentRoom: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ROOM_CONNECTED_TO_CHANNEL':
      return {
        ...state,
        channel: action.channel,
        currentRoom: action.response.room,
      };
    case 'USER_LEFT_ROOM':
      return initialState;
    default:
      return state;
  }
}
```

在root reducer中添加 room reducer

```javascript
//sling/web/src/reducers/index.js

// ...
import room from './room'; // new line

const appReducer = combineReducers({
  form,
  session,
  rooms,
  room, // new line
});

// ...
```

在Room container 中，我们在componentDidMount 函数中实现connect to channel。当参数切换时或者组件卸载时，执行leave channel 相关函数。

```javascript
// sling/web/src/containers/Room/index.js

// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToChannel, leaveChannel } from '../../actions/room';

type RoomType = {
  id: number,
  name: string,
}

type Props = {
  socket: any,
  channel: any,
  room: RoomType,
  params: {
    id: number,
  },
  connectToChannel: () => void,
  leaveChannel: () => void,
}

class Room extends Component {
  componentDidMount() {
    this.props.connectToChannel(this.props.socket, this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.leaveChannel(this.props.channel);
      this.props.connectToChannel(nextProps.socket, nextProps.params.id);
    }
    if (!this.props.socket && nextProps.socket) {
      this.props.connectToChannel(nextProps.socket, nextProps.params.id);
    }
  }

  componentWillUnmount() {
    this.props.leaveChannel(this.props.channel);
  }

  props: Props

  render() {
    return (
      <div>{this.props.room.name}</div>
    );
  }
}

export default connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
  }),
  { connectToChannel, leaveChannel }
)(Room);
```

现在我们已经成功实现连接socket 进而打开room channel。登入登出，进入或退出room.并能通过控制台查看API 响应信息。

> [提交 对比代码改动](https://github.com/bnhansn/sling/commit/1c1a39434f3ccc81fbc6d7d42f83b7cfcaae9856)

### 在channel 中创建message

首先实现后端，在RoomChannel中实现接收和创建消息,并打算实现消息分页。[scrivener_ecto](https://github.com/drewolson/scrivener_ecto)是一个用于分页的库。在mix.exs中添加`{:scrivener_ecto, "~> 1.0"}`, 在application列表中添加 `:scrivener_ecto`最后就是配置repo.ex

```elixir
# sling/api/lib/sling/repo.ex

defmodule Sling.Repo do
  use Ecto.Repo, otp_app: :sling
  use Scrivener, page_size: 25
end
```

运行 `mix deps.get`安装依赖库，然后重启Phoenix Server

在Ecto query中使用Scrivener加载messages, 在response中也包含分页信息。

```elixir
# sling/api/web/channels/room_channel.ex

defmodule Sling.RoomChannel do
  use Sling.Web, :channel

  def join("rooms:" <> room_id, _params, socket) do
    room = Repo.get!(Sling.Room, room_id)

    page =
      Sling.Message
      |> where([m], m.room_id == ^room.id)
      |> order_by([desc: :inserted_at, desc: :id])
      |> preload(:user)
      |> Sling.Repo.paginate()

    response = %{
      room: Phoenix.View.render_one(room, Sling.RoomView, "room.json"),
      messages: Phoenix.View.render_many(page.entries, Sling.MessageView, "message.json"),
      pagination: Sling.PaginationHelpers.pagination(page)
    }

    {:ok, response, assign(socket, :room, room)}
  end

  def handle_in("new_message", params, socket) do
    changeset =
      socket.assigns.room
      |> build_assoc(:messages, user_id: socket.assigns.current_user.id)
      |> Sling.Message.changeset(params)

    case Repo.insert(changeset) do
      {:ok, message} ->
        broadcast_message(socket, message)
        {:reply, :ok, socket}
      {:error, changeset} ->
        {:reply, {:error, Phoenix.View.render(Sling.ChangesetView, "error.json", changeset: changeset)}, socket}
    end
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end

  defp broadcast_message(socket, message) do
    message = Repo.preload(message, :user)
    rendered_message = Phoenix.View.render_one(message, Sling.MessageView, "message.json")
    broadcast!(socket, "message_created", rendered_message)
  end
end
```

Sling.Repo.paginate() 是一个源自于Scrivener的函数，实际执行的是查询。并带有两个参数一个是page 另一个是page_size。关于page_size 我们已有默认配置为25。我们不使用page,而是直接读取比当前message id 早的message。解释有些苍白直接读代码。

创建MessageView 渲染响应的json数据,另，必须执行 `preload(:user)`使得message中包含用户信息。

```elixir
# sling/api/web/views/message_view.ex

defmodule Sling.MessageView do
  use Sling.Web, :view

  def render("message.json", %{message: message}) do
    %{
      id: message.id,
      inserted_at: message.inserted_at,
      text: message.text,
      user: %{
        email: message.user.email,
        username: message.user.username
      }
    }
  end
end
```

下面创建`PaginationHelpers`用于RoomChannel

```elixir
# sling/api/web/views/pagination_helpers.ex

defmodule Sling.PaginationHelpers do
  def pagination(page) do
    %{
      page_number: page.page_number,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_entries: page.total_entries
    }
  end
end
```

RoomChannel 中handle_in/1函数处理新创建的message，然后广播这些新创建的消息给当前channel的其他用户。所以只要在前端监听到`message_created`就可以更新redux中的message list。

### 前端Channel Actions

回到react, 实现相应的action

```javascript
//sling/web/src/actions/room.js

import { reset } from 'redux-form';

export function connectToChannel(socket, roomId) {
  return (dispatch) => {
    if (!socket) { return false; }
    const channel = socket.channel(`rooms:${roomId}`);

    // new function
    channel.on('message_created', (message) => {
      dispatch({ type: 'MESSAGE_CREATED', message });
    });

    channel.join().receive('ok', (response) => {
      dispatch({ type: 'ROOM_CONNECTED_TO_CHANNEL', response, channel });
    });

    return false;
  };
}

export function leaveChannel(channel) {
  return (dispatch) => {
    if (channel) {
      channel.leave();
    }
    dispatch({ type: 'USER_LEFT_ROOM' });
  };
}

// new function
export function createMessage(channel, data) {
  return dispatch => new Promise((resolve, reject) => {
    channel.push('new_message', data)
      .receive('ok', () => resolve(
        dispatch(reset('newMessage'))
      ))
      .receive('error', () => reject());
  });
}
```

`channel.on('message_created', ...)`监听当前channel全部新建消息，并随后更新到redux store

`channel.push('new_message', data)`与后端Channel API 通信 创建消息。

更新room reducer, 监测MESSAGE_CREATED

```javascript
//sling/web/src/reducers/room.js

const initialState = {
  channel: null,
  currentRoom: {},
  messages: [], // new line
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ROOM_CONNECTED_TO_CHANNEL':
      return {
        ...state,
        channel: action.channel,
        currentRoom: action.response.room,
        messages: action.response.messages.reverse(), // new line
      };
    case 'USER_LEFT_ROOM':
      return initialState;
    case 'MESSAGE_CREATED': // new case
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message,
        ],
      };
    default:
      return state;
  }
}
```

新的message创建后，会被追加到当前message 列表的末尾。

我们查询返回最新的25条message，第一条是最新创建的。在我们设计的聊天室中（其实和slack一样）最新的消息显示在最下方。因此我们调用`reverse()`函数将消息列表顺序翻转。

下面我们来实现显示消息列表的UI以及新建message的表单。首先我们更新Room Container

```javascript
// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToChannel, leaveChannel, createMessage } from '../../actions/room';
import MessageList from '../../components/MessageList';
import MessageForm from '../../components/MessageForm';
import RoomNavbar from '../../components/RoomNavbar';

type MessageType = {
  id: number,
}

type Props = {
  socket: any,
  channel: any,
  room: Object,
  params: {
    id: number,
  },
  connectToChannel: () => void,
  leaveChannel: () => void,
  createMessage: () => void,
  messages: Array<MessageType>,
}

class Room extends Component {
  componentDidMount() {
    this.props.connectToChannel(this.props.socket, this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.leaveChannel(this.props.channel);
      this.props.connectToChannel(nextProps.socket, nextProps.params.id);
    }
    if (!this.props.socket && nextProps.socket) {
      this.props.connectToChannel(nextProps.socket, nextProps.params.id);
    }
  }

  componentWillUnmount() {
    this.props.leaveChannel(this.props.channel);
  }

  props: Props

  handleMessageCreate = (data) => {
    this.props.createMessage(this.props.channel, data);
  }

  render() {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RoomNavbar room={this.props.room} />
          <MessageList messages={this.props.messages} />
          <MessageForm onSubmit={this.handleMessageCreate} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
    messages: state.room.messages,
  }),
  { connectToChannel, leaveChannel, createMessage }
)(Room);
```
 
新的组件 RoomNavBar

```javascript
//sling/web/src/components/RoomNavbar/index.js

// @flow
import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  navbar: {
    padding: '15px',
    background: '#fff',
    borderBottom: '1px solid rgb(240,240,240)',
  },
});

type Props = {
  room: {
    name: string,
  },
}

const RoomNavbar = ({ room }: Props) =>
  <nav className={css(styles.navbar)}>
    <div>#{room.name}</div>
  </nav>;

export default RoomNavbar;
```

MessageList 组件,  基本的显示逻辑是将message按天分组。

```javascript
//sling/web/src/components/MessageList/index.js

// @flow
import React, { Component } from 'react';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import mapKeys from 'lodash/mapKeys';
import { css, StyleSheet } from 'aphrodite';
import Message from '../Message';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    padding: '10px 10px 0 10px',
    background: '#fff',
    overflowY: 'auto',
  },

  dayDivider: {
    position: 'relative',
    margin: '1rem 0',
    textAlign: 'center',
    '::after': {
      position: 'absolute',
      top: '50%',
      right: '0',
      left: '0',
      height: '1px',
      background: 'rgb(240,240,240)',
      content: '""',
    },
  },

  dayText: {
    zIndex: '1',
    position: 'relative',
    background: '#fff',
    padding: '0 12px',
  },
});

type MessageType = {
  id: number,
  inserted_at: string,
}

type Props = {
  messages: Array<MessageType>,
}

class MessageList extends Component {
  props: Props

  renderMessages = messages =>
    messages.map(message => <Message key={message.id} message={message} />);

  renderDays() {
    const { messages } = this.props;
    messages.map(message => message.day = moment(message.inserted_at).format('MMMM Do')); // eslint-disable-line
    const dayGroups = groupBy(messages, 'day');
    const days = [];
    mapKeys(dayGroups, (value, key) => {
      days.push({ date: key, messages: value });
    });
    const today = moment().format('MMMM Do');
    const yesterday = moment().subtract(1, 'days').format('MMMM Do');
    return days.map(day =>
      <div key={day.date}>
        <div className={css(styles.dayDivider)}>
          <span className={css(styles.dayText)}>
            {day.date === today && 'Today'}
            {day.date === yesterday && 'Yesterday'}
            {![today, yesterday].includes(day.date) && day.date}
          </span>
        </div>
        {this.renderMessages(day.messages)}
      </div>
    );
  }

  render() {
    return (
      <div className={css(styles.container)}>
        {this.renderDays()}
      </div>
    );
  }
}

export default MessageList;
```

Message 组件

```javascript
// sling/web/src/components/Message/index.js

// @flow
import React from 'react';
import moment from 'moment';
import Avatar from '../Avatar';

type Props = {
  message: {
    text: string,
    inserted_at: string,
    user: {
      email: string,
      username: string,
    },
  }
}

const Message = ({ message: { text, inserted_at, user } }: Props) =>
  <div style={{ display: 'flex', marginBottom: '10px' }}>
    <Avatar email={user.email} style={{ marginRight: '10px' }} />
    <div>
      <div style={{ lineHeight: '1.2' }}>
        <b style={{ marginRight: '8px', fontSize: '14px' }}>{user.username}</b>
        <time style={{ fontSize: '12px', color: 'rgb(192,192,192)' }}>{moment(inserted_at).format('h:mm A')}</time>
      </div>
      <div>{text}</div>
    </div>
  </div>;

export default Message;
```

显示用户头像的组件

```javascript
//sling/web/src/components/Avatar/index.js

// @flow
import React from 'react';
import md5 from 'md5';

type Props = {
  email: string,
  size?: number,
  style?: Object,
}

const Avatar = ({ email, size = 40, style }: Props) => {
  const hash = md5(email);
  const uri = `https://secure.gravatar.com/avatar/${hash}`;
  style = { width: `${size}px`, height: `${size}px`, borderRadius: '4px', ...style }

  return (
    <img
      src={uri}
      alt={email}
      style={style}
    />
  );
};

export default Avatar;
```

消息框 MessageForm 组件，用于输入发送message

```javascript
//sling/web/src/components/MessageForm/index.js

// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  form: {
    padding: '0px 10px 10px 10px',
    background: '#fff',
  },

  input: {
    borderWidth: '2px',
    borderColor: 'rgb(214,214,214)',
  },

  button: {
    color: 'rgb(80,80,80)',
    background: 'rgb(214,214,214)',
    borderWidth: '2px',
    borderColor: 'rgb(214,214,214)',
  },
});

type Props = {
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
}

class MessageForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className={css(styles.form)}>
        <div className="input-group">
          <Field
            name="text"
            type="text"
            component="input"
            className={`form-control ${css(styles.input)}`}
          />
          <div className="input-group-btn">
            <button
              disabled={submitting}
              className={`btn ${css(styles.button)}`}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.text) {
    errors.text = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'newMessage',
  validate,
})(MessageForm);
```

现在我们已经实现登录用户聊天功能。

> [提交代码 看看我们当前的改动](https://github.com/bnhansn/sling/commit/9b698795c0c91f244a80cb7315230cda66a44de6)

下一篇我们实现显示在线用户


原文地址：[https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-5-phoenix-sockets-and-channels-897fec025683](https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-5-phoenix-sockets-and-channels-897fec025683)