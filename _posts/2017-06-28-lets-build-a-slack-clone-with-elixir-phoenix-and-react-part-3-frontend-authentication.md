---
layout:     post
title:      "[译文]Let’s Build |> 使用Elixir，Phoenix和React打造克隆版的Slack"
subtitle:   "Part 3 — Frontend Authentication"
date:       2017-06-28
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
    - Phoenix
    - React
    - 译文
---


> [Live Demo](http://sling-chat.s3-website-us-west-2.amazonaws.com/)---[GitHub Repo](https://github.com/bnhansn/sling)

上一篇博文中我们已经实现用户认证相关的API接口，接下来我们添加前端的登录注册界面并实现用户认证。

关于样式用法的备注：在React项目中，我喜欢作用域在组件内的样式，也就是将CSS定义在组件所属的js文件中，并使用行内样式。我将全局CSS（比如Twitter Bootstrap）只用作基本的页面元素样式。

在JS文件中有许多使用CSS的方法，比如 [CSS Modules](https://github.com/css-modules/css-modules), [Radium](https://github.com/FormidableLabs/radium), [Styled-Components](https://github.com/styled-components/styled-components)或者直接使用JavaScript对象。在这个项目中我们采用[Aphrodite](https://github.com/Khan/aphrodite)

> [这次提交](https://github.com/bnhansn/sling/commit/c69cfaf528efb63c3279bd5c0317d10554dd5a94)，可以看到我们是怎么为项目配置全局样式的。下载最新版的[bootstrap](https://github.com/twbs/bootstrap)和[font-awesome](http://fontawesome.io/)，创建index.css文件写入一些基本样式。并将其全部import到我们项目的入口文件中。

我们需要在App组件中添加两个新的路由，一个是登录`/login`,另一个是注册`/signup`

sling/web/src/containers/App/index.js

```javascript
// @flow
import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Login from '../Login';
import Signup from '../Signup';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ display: 'flex', flex: '1' }}>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/login" component={Login} />
          <Match pattern="/signup" component={Signup} />
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
```

Login和Signup组件比较相似，都包含一些基本的布局，并且都是从子表单中传递数据到组件的action中提交。

sling/web/src/containers/Signup/index.js

```javascript
// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session';
import SignupForm from '../../components/SignupForm';
import Navbar from '../../components/Navbar';

type Props = {
  signup: () => void,
}

class Signup extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleSignup = data => this.props.signup(data, this.context.router);

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <SignupForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

export default connect(null, { signup })(Signup);
```

sling/web/src/containers/Login/index.js

```javascript
// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session';
import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/Navbar';

type Props = {
  login: () => void,
}

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogin = data => this.props.login(data, this.context.router);

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

export default connect(null, { login })(Login);
```

如你所见，我们引入NavBar组件，目的是让我们的页面更好看一些。

sling/web/src/components/Navbar/index.js

```javascript
// @flow
import React from 'react';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    height: '70px',
    background: '#fff',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
  },

  link: {
    color: '#555459',
    fontSize: '22px',
    fontWeight: 'bold',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },
});

const Navbar = () =>
  <nav className={css(styles.navbar)}>
    <Link to="/" className={css(styles.link)}>Sling</Link>
  </nav>;

export default Navbar;
```

**react-router使用说明**：react项目中，以前我们使用[react-router-redux](https://github.com/reactjs/react-router-redux), 它在action中采用`dispatch(push(/login))`方式实现路由跳转。但是在v4版本的react-router中已经没有这个功能，为了实现上述跳转功能我们必须传递参数`this.context.router`到action中实现跳转。

Signup组件与Login组件非常相近，SignupForm和LoginForm也非常相似。

sling/web/src/components/SignupForm/index.js

```javascript
// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
}

class SignupForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        className={`card ${css(styles.card)}`}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create an account</h3>
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="Username"
          className="form-control"
        />
        <Field
          name="email"
          type="email"
          component={Input}
          placeholder="Email"
          className="form-control"
        />
        <Field
          name="password"
          type="password"
          component={Input}
          placeholder="Password"
          className="form-control"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-block btn-primary"
        >
          {submitting ? 'Submitting...' : 'Sign up'}
        </button>
        <hr style={{ margin: '2rem 0' }} />
        <Link to="/login" className="btn btn-block btn-secondary">
          Login to your account
        </Link>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({
  form: 'signup',
  validate,
})(SignupForm);
```

sling/web/src/components/LoginForm/index.js

```javascript
// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

type Props = {
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
}

class LoginForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        className={`card ${css(styles.card)}`}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Login to Sling</h3>
        <Field name="email" type="text" component={Input} placeholder="Email" />
        <Field name="password" type="password" component={Input} placeholder="Password" />
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-block btn-primary"
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>
        <hr style={{ margin: '2rem 0' }} />
        <Link to="/signup" className="btn btn-block btn-secondary">
          Create a new account
        </Link>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
```

上述表单组件均采用[redux-form](https://github.com/erikras/redux-form), 这也是我们能够获取输入数据的原因。`this.props.handleSubmit`是redux-form提供的特定属性, 使我们能够基于name从Field组件中获取输入的数据。`submitting`prop也是redux-form提供的特定prop，其值为布尔型，`onSubmit`被触发时`submitting`会被设为true。

自定义Field 组件，包含input以及显示error功能。

sling/web/src/components/Input/index.js

```javascript
// @flow
import React from 'react';

type Props = {
  input: Object,
  label?: string,
  type?: string,
  placeholder?: string,
  style?: Object,
  meta: Object,
}

const Input = ({ input, label, type, placeholder, style, meta }: Props) =>
  <div style={{ marginBottom: '1rem' }}>
    {label && <label htmlFor={input.name}>{label}</label>}
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form-control"
      style={style && style}
    />
    {meta.touched && meta.error &&
      <div style={{ fontSize: '85%', color: 'rgb(255,59,48)' }}>{meta.error}</div>
    }
  </div>;

export default Input;
```

Signup组件和Login组件需要从`session.js`中import action

sling/web/src/actions/session.js

```javascript
import { reset } from 'redux-form';
import api from '../api';

function setCurrentUser(dispatch, response) {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch({ type: 'AUTHENTICATION_SUCCESS', response });
}

export function login(data, router) {
  return dispatch => api.post('/sessions', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('login'));
      router.transitionTo('/');
    });
}

export function signup(data, router) {
  return dispatch => api.post('/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('signup'));
      router.transitionTo('/');
    });
}

export function logout(router) {
  return dispatch => api.delete('/sessions')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
      router.transitionTo('/login');
    });
}
```

为使redux action方便发送http请求，通常将其封装在API工具文件中,我们也遵照规范实现。

sling/web/src/api/index.js

```javascript
const API = process.env.REACT_APP_API_URL;

function headers() {
  const token = JSON.parse(localStorage.getItem('token'));

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${token}`,
  };
}

function parseResponse(response) {
  return response.json().then((json) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  });
}

function queryString(params) {
  const query = Object.keys(params)
                      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                      .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, params = {}) {
    return fetch(`${API}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(),
    })
    .then(parseResponse);
  },

  post(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(),
      body,
    })
    .then(parseResponse);
  },

  patch(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'PATCH',
      headers: headers(),
      body,
    })
    .then(parseResponse);
  },

  delete(url) {
    return fetch(`${API}${url}`, {
      method: 'DELETE',
      headers: headers(),
    })
    .then(parseResponse);
  },
};
```

使用这些helper函数，在redux action中只需调用`api.post(/url, data)`然后处理返回结果即可。另，每次请求header中均已包含来自localStorage的jwt token。

create-react-app 支持`.env`环境变量。我们在根路径下创建.env文件, 存入REACT_APP_*=xxx,运行时即可通过`process.env.REACT_APP_*`读取值，看下我们的实现。

```javascript
REACT_APP_API_URL=http://localhost:4000/api
```

当用户注册或登录成功，action会发起`AUTHENTICATION_SUCCESS`。我们需要创建reducer来监听action分发出的数据并将其存储到redux state中。

sling/web/src/reducers/session.js

```javascript
const initialState = {
  isAuthenticated: false,
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.response.data,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
      };
    default:
      return state;
  }
}
```

然后把session reducer放入总的reducer中，

sling/web/src/reducers/index.js

```javascript
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';

const appReducer = combineReducers({
  form,
  session,
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
```

目前session reducer 处理`AUTHENTICATION_SUCCESS` 和`LOGOUT`两种action,并改变了isAuthenticated和currentUser的值。接下来我们将redux state connect到Home组件中，当用户登录时就可以看到当前用户。

sling/web/src/containers/Home/index.js

```javascript
// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../../actions/session';
import Navbar from '../../components/Navbar';

type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
        {isAuthenticated &&
          <div>
            <span>{currentUser.username}</span>
            <button type="button" onClick={this.handleLogout}>Logout</button>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { logout }
)(Home);
```

到目前为止，当用户登录后，我会显示当前用户的username。并且添加link,可直接路由到注册和登录页面。以上只是理论实现，当你尝试注册时你会发现报错`No ‘Access-Control-Allow-Origin’ header is present on the requested resource.`这是一个http 请求跨域的错误，我们需要在server端处理它。

为处理这个跨域错误，我们需要安装第三方库 `{:cors_plug, "~> 1.1"}`,然后在`sling/api/sling/endpoint.ex`中添加配置。

```elixir
#above content
 
  plug CORSPlug

  plug Sling.Router
 end
```

最后重启Phoenix Server即可，这样就解决了跨域问题。

目前，用户可以登录成功，但是当刷新页面时就会被剔出。接下来我们就解决这个问题。

> [Commit](https://github.com/bnhansn/sling/commit/50463f9a1cebed27e8e46f4726c756a73267dee8) 看看目前我们已经实现的代码

### 保存用户会话（Persisting User Sessions）

我们在Server端已经实现`/sessions/refresh`接口。新建一个`authenticate`action当用户刷新页面时调用。显然这个调用需要放在App组件中，因为它是我们的根组件，也就是页面刷新会首先加载这个组件。

sling/web/src/containers/App/index.js

```javascript
// @flow
import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Login from '../Login';
import Signup from '../Signup';

type Props = {
  authenticate: () => void,
}

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    }
  }

  props: Props

  render() {
    return (
      <BrowserRouter>
        <div style={{ display: 'flex', flex: '1' }}>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/login" component={Login} />
          <Match pattern="/signup" component={Signup} />
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { authenticate }
)(App);
```

组件的钩子函数`componentDidMount`会首先检查localStorage中的token。若token存在就会调用`authenticate`函数请server端认证用户。

sling/web/src/actions/session.js

```javascript
export function authenticate() {
  return dispatch => api.post('/sessions/refresh')
    .then((response) => {
      setCurrentUser(dispatch, response);
    })
    .catch(() => {
      localStorage.removeItem('token');
      window.location = '/login';
    });
}
```

`api.post(‘/sessions/refresh’)`没有发送任何数据，其实默认在header中包含token数据。所以Guardian才会找到token并实现用户认证。若认证失败就会从localStorage移除token,并跳转到登录页面。

现在你试试，登录以后刷新页面已经不会被剔出。

> [对比一下代码变化Commit](https://github.com/bnhansn/sling/commit/bb46dd4d7f8da43e6b40a5c357398d23c9faa732)

### 路由保护（Protecting Routes）

在我们的APP中有这样的要求，登录用户才能看到home页面。未登录的用户只能看到注册和登录页面，

前面我们已经实现了基本的路由跳转。但是React-router v4还提供了一些新的功能。比如可以直接渲染`<Redirect/>` 组件。我们可以向无状态组件中传入参数然后决定是渲染`<Match />`组件还是渲染`<Redirect />`组件。[官方文档](https://react-router.now.sh/auth-workflow)

下面我们实现`<MatchAuthenticated />` 和 `<RedirectAuthenticated />`两个stateless 组件

sling/web/src/components/MatchAuthenticated/index.js

```javascript
// @flow
import React from 'react';
import { Match, Redirect } from 'react-router';

type Props = {
  component: any,
  pattern: string,
  exactly?: boolean,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
}

const MatchAuthenticated = ({
  pattern,
  exactly,
  isAuthenticated,
  willAuthenticate,
  component: Component,
}: Props) =>
  <Match
    exactly={exactly}
    pattern={pattern}
    render={(props) => {
      if (isAuthenticated) { return <Component {...props} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Redirect to={{ pathname: '/login' }} />; }
      return null;
    }}
  />;

export default MatchAuthenticated;
```

sling/web/src/components/RedirectAuthenticated/index.js

```javascript
// @flow
import React from 'react';
import { Match, Redirect } from 'react-router';

type Props = {
  component: any,
  pattern: string,
  exactly?: boolean,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
}

const RedirectAuthenticated = ({
  pattern,
  exactly,
  isAuthenticated,
  willAuthenticate,
  component: Component,
}: Props) =>
  <Match
    exactly={exactly}
    pattern={pattern}
    render={(props) => {
      if (isAuthenticated) { return <Redirect to={{ pathname: '/' }} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Component {...props} />; }
      return null;
    }}
  />;

export default RedirectAuthenticated;
```

在构建以上组件的过程中，我们发现需要传递一些像willAuthenticate这样的参数以保证路径跳转正常运行。以willAuthenticate为例，当认证请求已经发起，但是认证是否成功还未知，这种中间状态就需要`willAuthenticate=true`来处理，以保证不会出现错误的页面跳转。

现在我们来修改App组件，使用自定义组件替换React-router的<Match />。

sling/web/src/containers/App/index.js

```javascript
// @flow
import React, { Component } from 'react';
import { BrowserRouter, Miss } from 'react-router';
import { connect } from 'react-redux';
import { authenticate, unauthenticate } from '../../actions/session';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Login from '../Login';
import Signup from '../Signup';
import MatchAuthenticated from '../../components/MatchAuthenticated';
import RedirectAuthenticated from '../../components/RedirectAuthenticated';

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
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

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <BrowserRouter>
        <div style={{ display: 'flex', flex: '1' }}>
          <MatchAuthenticated exactly pattern="/" component={Home} {...authProps} />
          <RedirectAuthenticated pattern="/login" component={Login} {...authProps} />
          <RedirectAuthenticated pattern="/signup" component={Signup} {...authProps} />
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
  }),
  { authenticate, unauthenticate }
)(App);
```

我们已经替换掉Match组件，并传递必要的认证参数。最后还需要添加一个unauthenticate action，当认证失败时用于改变willAuthenticate的值。

sling/web/src/actions/session.js

```javascript
export function authenticate() {
  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATION_REQUEST' });
    return api.post('/sessions/refresh')
      .then((response) => {
        setCurrentUser(dispatch, response);
      })
      .catch(() => {
        localStorage.removeItem('token');
        window.location = '/login';
      });
  };
}

export const unauthenticate = () => ({ type: 'AUTHENTICATION_FAILURE' });
```

在认证的流程中，首先发起 `AUTHENTICATION_REQUEST` 开始认证，执行完setCurrentUser函数发起`AUTHENTICATION_SUCCESS`说明认证成功，认证失败则会发起`AUTHENTICATION_FAILURE`。根据这个流程我们相应的修正 session reducer。

sling/web/src/reducers/session.js

```javascript
const initialState = {
  isAuthenticated: false,
  willAuthenticate: true,
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION_REQUEST':
      return {
        ...state,
        willAuthenticate: true,
      };
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: true,
        currentUser: action.response.data,
      };
    case 'AUTHENTICATION_FAILURE':
      return {
        ...state,
        willAuthenticate: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: false,
        currentUser: {},
      };
    default:
      return state;
  }
}
```

 ok，现在我们已经实现用户登录登出以及首页的访问。
> [Commit 来对比下代码变化](https://github.com/bnhansn/sling/commit/10ee0720954da9312bb49d09b5d83edffcacd833)

这部分就此结束，下一篇将会进入到我们应用的核心：允许用户建立聊天室。

原文地址：[https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-3-frontend-authentication-373e0a713e9e](https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-3-frontend-authentication-373e0a713e9e)