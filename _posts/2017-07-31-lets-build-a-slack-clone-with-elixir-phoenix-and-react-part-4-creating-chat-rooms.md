---
layout:     post
title:      "[译文]Let’s Build |> 使用Elixir，Phoenix和React打造克隆版的Slack"
subtitle:   "part 4 — Creating Chat Rooms"
date:       2017-07-31
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
    - Phoenix
    - React
    - 译文
---

> [Live Demo](http://sling-chat.s3-website-us-west-2.amazonaws.com/)---[GitHub Repo](https://github.com/bnhansn/sling)

目前为止。我们已经完成简单的app,用户可以登录后访问首页。接下来我们将在首页添加表单，这样用户就可以创建聊天室或者加入到一个聊天室中。然后我们再仿照Slack制作UI,侧边栏显示当前加入聊天室的用户,以及聊天室的UI。

我们创建Room model,每个room都包含 name 和 topic 字段。

```bash
mix phoenix.gen.json Room rooms name:string topic:string
```

对migration文件做简要修改，

```elixir
#sling/api/priv/repo/migrations/timestamp_create_room.exs

defmodule Sling.Repo.Migrations.CreateRoom do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :name, :string, null: false
      add :topic, :string, default: ""

      timestamps()
    end

    create unique_index(:rooms, [:name])
  end
end
```

像Slack一样，用户能够查看之前加入过的room列表，故，我们需要创建一个连接表用于保存user和room的关系，叫user_rooms

```bash
mix phoenix.gen.model UserRoom user_rooms user_id:references:users room_id:references:rooms
```

```elixir
#sling/api/priv/repo/migrations/timestamp_create_user_room.exs

defmodule Sling.Repo.Migrations.CreateUserRoom do
  use Ecto.Migration

  def change do
    create table(:user_rooms) do
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :room_id, references(:rooms, on_delete: :nothing), null: false

      timestamps()
    end
    create index(:user_rooms, [:user_id])
    create index(:user_rooms, [:room_id])
    create index(:user_rooms, [:user_id, :room_id], unique: true)
  end
end
```

索引 `create index(:user_rooms, [:user_id, :room_id], unique: true)`的唯一性约束保证用户和room之间一一对应，也就是说，用户不会两次加入同一个room中。下面是UserRoom的具体实现。

```elixir
#sling/api/web/models/user_room.ex

defmodule Sling.UserRoom do
  use Sling.Web, :model

  schema "user_rooms" do
    belongs_to :user, Sling.User
    belongs_to :room, Sling.Room

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :room_id])
    |> validate_required([:user_id, :room_id])
    |> unique_constraint(:user_id_room_id)
  end
end
```

Room model

```elixir
#sling/api/web/models/room.ex

defmodule Sling.Room do
  use Sling.Web, :model

  schema "rooms" do
    field :name, :string
    field :topic, :string
    many_to_many :users, Sling.User, join_through: "user_rooms"

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :topic])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
```

注意看，在Room model中，我们和user建立了many_to_many关系，当然是通过 连接表user_room实现的。我们也要在User model中添加 `many_to_many :rooms, Sling.Room, join_through: "user_rooms"`

运行migration，（如果报错，暂时注释掉room_controller）

```bash
mix ecto.migrate
```

现在开始实现controller, 首先修改`router.ex`,在`/api`下添加

```elixir
#sling/api/web/router.ex

get "/users/:id/rooms", UserController, :rooms
resources "/rooms", RoomController, only: [:index, :create]
post "/rooms/:id/join", RoomController, :join
```

将文件room_controller.ex 移入 /api目录下

```elixir
# sling/api/web/controllers/api/room_controller.ex

defmodule Sling.RoomController do
  use Sling.Web, :controller

  alias Sling.Room

  plug Guardian.Plug.EnsureAuthenticated, handler: Sling.SessionController

  def index(conn, _params) do
    rooms = Repo.all(Room)
    render(conn, "index.json", rooms: rooms)
  end

  def create(conn, params) do
    current_user = Guardian.Plug.current_resource(conn)
    changeset = Room.changeset(%Room{}, params)

    case Repo.insert(changeset) do
      {:ok, room} ->
        assoc_changeset = Sling.UserRoom.changeset(
          %Sling.UserRoom{},
          %{user_id: current_user.id, room_id: room.id}
        )
        Repo.insert(assoc_changeset)

        conn
        |> put_status(:created)
        |> render("show.json", room: room)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Sling.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def join(conn, %{"id" => room_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    room = Repo.get(Room, room_id)

    changeset = Sling.UserRoom.changeset(
      %Sling.UserRoom{},
      %{room_id: room.id, user_id: current_user.id}
    )

    case Repo.insert(changeset) do
      {:ok, _user_room} ->
        conn
        |> put_status(:created)
        |> render("show.json", %{room: room})
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Sling.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
```

这是我们第一次在controller中使用 Guardian Plug。EnsureAuthenticated确保user是有效的，这个我们已经在router中使用VerifyHeader实现。如果失败，将会由SessionController 的unauthenticated函数处理。

在create action中，我们通过Guardian访问current_user。当room创建时，当前用户也即加入刚才创建的room。这一过程我们通过assoc_changeset处理。看起来有点乱，Rails中会使用`ActiveRecord::Base.transaction`实现。但是当前能正常运行，剩下的有待后续重构。

join action 通过参数 current_user.id 和 room_id保存用户和room关系。 将来会放到 UserRoom controller中处理join/leave room。目前工作正常暂不重构。

在User Controller 中添加action 实现读取room列表，并加入鉴权代码（只有rooms action需要鉴权）

```elixir
#sling/api/web/controllers/api/user_controller.ex

# top of file...

plug Guardian.Plug.EnsureAuthenticated, [handler: Sling.SessionController] when action in [:rooms]

# bottom of file...

def rooms(conn, _params) do
  current_user = Guardian.Plug.current_resource(conn)
  rooms = Repo.all(assoc(current_user, :rooms))
  render(conn, Sling.RoomView, "index.json", %{rooms: rooms})
end

# ...
view raw
```

> [提交](https://github.com/bnhansn/sling/commit/2fef1fd7d8710b12389226a30d53c4d42097d5ae)

随着后端更新，理论上我们能够从前端创建聊天室。实现聊天室表单之前，我们先实现登录后显示当前聊天室里的用户, UI 依然仿照slack。

用户登录后显示用户加入过的聊天室。

```javascript
//sling/web/src/actions/session.js

import { fetchUserRooms } from './rooms';

// ...

function setCurrentUser(dispatch, response) {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch({ type: 'AUTHENTICATION_SUCCESS', response });
  dispatch(fetchUserRooms(response.data.id)); // new line
}

// ...
```

新建rooms.js文件

```javascript
//sling/web/src/actions/rooms.js

import api from '../api';

export function fetchRooms() {
  return dispatch => api.fetch('/rooms')
    .then((response) => {
      dispatch({ type: 'FETCH_ROOMS_SUCCESS', response });
    });
}

export function fetchUserRooms(userId) {
  return dispatch => api.fetch(`/users/${userId}/rooms`)
    .then((response) => {
      dispatch({ type: 'FETCH_USER_ROOMS_SUCCESS', response });
    });
}

export function createRoom(data, router) {
  return dispatch => api.post('/rooms', data)
    .then((response) => {
      dispatch({ type: 'CREATE_ROOM_SUCCESS', response });
      router.transitionTo(`/r/${response.data.id}`);
    });
}

export function joinRoom(roomId, router) {
  return dispatch => api.post(`/rooms/${roomId}/join`)
    .then((response) => {
      dispatch({ type: 'ROOM_JOINED', response });
      router.transitionTo(`/r/${response.data.id}`);
    });
}
```

上述文件包含 room相关的全部action (加载全部rooms，加载当前用户的rooms, 创建room,加入room)。接下来我们创建reducer 用于更新redux store

```javascript
//sling/web/src/reducers/rooms.js

const initialState = {
  all: [],
  currentUserRooms: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ROOMS_SUCCESS':
      return {
        ...state,
        all: action.response.data,
      };
    case 'FETCH_USER_ROOMS_SUCCESS':
      return {
        ...state,
        currentUserRooms: action.response.data,
      };
    case 'CREATE_ROOM_SUCCESS':
      return {
        ...state,
        all: [
          action.response.data,
          ...state.all,
        ],
        currentUserRooms: [
          ...state.currentUserRooms,
          action.response.data,
        ],
      };
    case 'ROOM_JOINED':
      return {
        ...state,
        currentUserRooms: [
          ...state.currentUserRooms,
          action.response.data,
        ],
      };
    default:
      return state;
  }
}
```

在root reducer 中添加刚创建的rooms reducer

```javascript
//sling/web/src/reducers/index.js

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';
import rooms from './rooms'; // new line

const appReducer = combineReducers({
  form,
  session,
  rooms, // new line
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
```

我们打算在主页和Room 页面显示侧边栏，首先更新App Container。把logout按钮移入侧边栏。添加handleLogout 函数，基于当前的路由设置需要传入router参数以便实现页面跳转。

```javascript
// @flow
import React, { Component } from 'react';
import { BrowserRouter, Miss } from 'react-router';
import { connect } from 'react-redux';
import { authenticate, unauthenticate, logout } from '../../actions/session';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Login from '../Login';
import Signup from '../Signup';
import MatchAuthenticated from '../../components/MatchAuthenticated';
import RedirectAuthenticated from '../../components/RedirectAuthenticated';
import Sidebar from '../../components/Sidebar';
import Room from '../Room';

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
  logout: () => void,
  currentUserRooms: Array,
}

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  props: Props

  handleLogout = router => this.props.logout(router);

  render() {
    const { isAuthenticated, willAuthenticate, currentUserRooms } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <BrowserRouter>
        {({ router }) => (
          <div style={{ display: 'flex', flex: '1' }}>
            {isAuthenticated &&
              <Sidebar
                router={router}
                rooms={currentUserRooms}
                onLogoutClick={this.handleLogout}
              />
            }
            <MatchAuthenticated exactly pattern="/" component={Home} {...authProps} />
            <RedirectAuthenticated pattern="/login" component={Login} {...authProps} />
            <RedirectAuthenticated pattern="/signup" component={Signup} {...authProps} />
            <MatchAuthenticated pattern="/r/:id" component={Room} {...authProps} />
            <Miss component={NotFound} />
          </div>
        )}
      </BrowserRouter>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
    currentUserRooms: state.rooms.currentUserRooms,
  }),
  { authenticate, unauthenticate, logout }
)(App);
```

添加Room Container作为聊天室的UI,  当前简单显示room id

```javascript
// @flow
import React from 'react';

const Room = props =>
  <div>Room {props.params.id}</div>;

export default Room;
```

接下来是Sidebar 组件

```javascript
//sling/web/src/components/Sidebar/index.js

// @flow
import React from 'react';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgb(38,28,37)',
  },

  link: {
    position: 'relative',
    display: 'flex',
    width: '65px',
    color: 'rgba(255,255,255,.6)',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },

  activeLink: {
    color: '#fff',
    ':after': {
      position: 'absolute',
      top: '12px',
      bottom: '12px',
      left: '0',
      width: '3px',
      background: 'rgba(255,255,255,.2)',
      borderTopRightRadius: '3px',
      borderBottomRightRadius: '3px',
      content: '""',
    },
  },

  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    margin: '12px auto',
    fontSize: '20px',
    background: 'rgba(255,255,255,.2)',
    borderRadius: '5px',
  },

  logoutButton: {
    padding: '0',
    background: 'transparent',
    border: '0',
    cursor: 'pointer',
  },
});

type Room = {
  id: number,
  name: string,
}

type RoomLinkProps = {
  room: Room
}

const RoomLink = ({ room }: RoomLinkProps) =>
  <Link to={`/r/${room.id}`} className={css(styles.link)} activeClassName={css(styles.activeLink)}>
    <div className={css(styles.badge)}>
      <span>{room.name.charAt(0)}</span>
    </div>
  </Link>;

type Props = {
  rooms: Array<Room>,
  router: Object,
  onLogoutClick: () => void,
}

const Sidebar = ({ rooms, router, onLogoutClick }: Props) =>
  <div className={css(styles.sidebar)}>
    {rooms.map(room => <RoomLink key={room.id} room={room} />)}
    <Link
      to="/"
      activeOnlyWhenExact
      className={css(styles.link)}
      activeClassName={css(styles.activeLink)}
    >
      <div className={css(styles.badge)}>
        <span className="fa fa-plus" />
      </div>
    </Link>
    <div style={{ flex: '1' }} />
    <button
      onClick={() => onLogoutClick(router)}
      className={css(styles.link, styles.logoutButton)}
    >
      <div className={css(styles.badge)}>
        <span className="fa fa-sign-out" />
      </div>
    </button>
  </div>;

export default Sidebar;
```

现在用户登录后就可以看到sidebar, 点击退出按钮实现logout. 目前room 列表还是空的，我们来添加表单创建room,并且在主页显示全部room.

> [提交 ](https://github.com/bnhansn/sling/commit/79c41abe665e45b2c7d6ab744e8a514d884f0241)

下面是我们的Home Page

```javascript
//sling/web/src/containers/Home/index.js

// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { fetchRooms, createRoom, joinRoom } from '../../actions/rooms';
import NewRoomForm from '../../components/NewRoomForm';
import Navbar from '../../components/Navbar';
import RoomListItem from '../../components/RoomListItem';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

type Room = {
  id: number,
  name: string,
}

type Props = {
  rooms: Array<Room>,
  currentUserRooms: Array<Room>,
  fetchRooms: () => void,
  createRoom: () => void,
  joinRoom: () => void,
}

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.props.fetchRooms();
  }

  props: Props

  handleNewRoomSubmit = data => this.props.createRoom(data, this.context.router);

  handleRoomJoin = roomId => this.props.joinRoom(roomId, this.context.router);

  renderRooms() {
    const currentUserRoomIds = [];
    this.props.currentUserRooms.map(room => currentUserRoomIds.push(room.id));

    return this.props.rooms.map(room =>
      <RoomListItem
        key={room.id}
        room={room}
        onRoomJoin={this.handleRoomJoin}
        currentUserRoomIds={currentUserRoomIds}
      />
    );
  }

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create a new room</h3>
          <NewRoomForm onSubmit={this.handleNewRoomSubmit} />
        </div>
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Join a room</h3>
          {this.renderRooms()}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    rooms: state.rooms.all,
    currentUserRooms: state.rooms.currentUserRooms,
  }),
  { fetchRooms, createRoom, joinRoom }
)(Home);
```

实现RoomListItem组件

```javascript
import React from 'react';

type Props = {
  room: {
    id: number,
    name: string,
  },
  currentUserRoomIds: Array,
  onRoomJoin: () => void,
}

const RoomListItem = ({ room, currentUserRoomIds, onRoomJoin }: Props) => {
  const isJoined = currentUserRoomIds.includes(room.id);

  return (
    <div key={room.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <span style={{ marginRight: '8px' }}>{room.name}</span>
      <button
        onClick={() => onRoomJoin(room.id)}
        className="btn btn-sm"
        disabled={isJoined}
      >
        {isJoined ? 'Joined' : 'Join'}
      </button>
    </div>
  );
};

export default RoomListItem;
```

当用户已加入某个room 在主页room条目上显示的join按钮将是不可用的

下来实现 NewRoomForm 组件

```javascript
// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

type Props = {
  handleSubmit: () => void,
  onSubmit: () => void,
  submitting: boolean,
}

class NewRoomForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="input-group">
          <Field
            name="name"
            type="text"
            placeholder="Name"
            component="input"
            className="form-control"
          />
          <div className="input-group-btn">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'newRoom',
  validate,
})(NewRoomForm);
```

这个表单和我们之前的表单很相似只是多了个submit.


> [这部分的最后一个Commit](https://github.com/bnhansn/sling/commit/b209f7656899eaf8f735d7f2fb0b28849bed72a3)

现在我们能够新建聊天室，在侧边栏显示已加入的聊天室。但是我们还不能聊天。接下来我们将使用Phoenix Channel 实现实时聊天。

原文地址：[https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-4-creating-chat-rooms-80dc74f4f704](https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-4-creating-chat-rooms-80dc74f4f704)