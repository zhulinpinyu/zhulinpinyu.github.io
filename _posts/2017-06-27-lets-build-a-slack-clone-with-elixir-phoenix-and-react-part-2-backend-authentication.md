---
layout:     post
title:      "[译文]Let’s Build |> 使用Elixir，Phoenix和React打造克隆版的Slack"
subtitle:   "Part 2 — Backend Authentication"
date:       2017-06-27
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
    - Phoenix
    - React
    - 译文
---

> [Live Demo](http://sling-chat.s3-website-us-west-2.amazonaws.com/)---[GitHub Repo](https://github.com/bnhansn/sling)

上一篇博文中，我们已经搭建好了Phoenix和React项目。这篇博文我们将添加User模型并且实现用户身份认证的API

我们来创建user数据表。使用Phoenix内置的generator。

```bash
mix phoenix.gen.json User users username:string email:string password_hash:string
```

这个命令生成一堆模板文件，比如 model 、controller 等。第一个参数是module名称 `User`,第二个参数是model的名称 `users`,还是复数（和rails很像吧）。接着后面是数据库表的字段名和数据类型。

打开自动生成的migration文件，并做一些修改。

```elixir
defmodule Sling.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string, null: false
      add :email, :string, null: false
      add :password_hash, :string, null: false

      timestamps()
    end

    create unique_index(:users, [:username])
    create unique_index(:users, [:email])
  end
end
```

<center>sling/api/priv/repo/migrations/timestamp_create_user.exs</center>

为保证每个字段都必须有值，我们添加非空约束`null: false`。然后我们为字段`username`, `emial` 创建唯一性索引，以确保其字段值不会重复。我们也会在model级别添加字段（`username`, `emial`）值唯一性校验，在数据级别添加也是为了保证数据库的完整性。

使用mix运行mirgation，创建users table

```bash
mix ecto.migrate
```

运行migration时你可能会遇到这个错误

```bash
== Compilation error on file web/controllers/user_controller.ex ==
** (CompileError) web/controllers/user_controller.ex:18: undefined function user_path/3
    (stdlib) lists.erl:1338: :lists.foreach/2
    (stdlib) erl_eval.erl:670: :erl_eval.do_apply/6
    (elixir) lib/kernel/parallel_compiler.ex:117: anonymous fn/4 in Kernel.ParallelCompiler.spawn_compilers/1
```

这是由于运行 `mix phoenix.gen.json`自动创建`user_controller.ex`,而我们没有为该controller在router.ex中配置路由`user_path`因此报错。

由于我们暂时用不到`user_controller.ex`,所以直接全部注释掉其内容。再次运行`mix ecto.migrate`,即可成功创建users table。

我们来看看`users.exs`文件

```elixir
defmodule Sling.User do
  use Sling.Web, :model

  schema "users" do
    field :username, :string
    field :email, :string
    field :password_hash, :string

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :email, :password_hash])
    |> validate_required([:username, :email, :password_hash])
    |> unique_constraint(:username)
    |> unique_constraint(:email)
  end
end
```

<center>sling/api/web/models/user.ex</center>

User Model使用函数`unique_constraint`为字段`username`和`email`添加唯一性校验。

在Ecto（访问数据库的lib, 概念有点类似于Rails的ORM ActiveRecord）中每次对数据库的insert和update都必须通过执行`changeset`函数来实现。那么我们就可以定义多种类型的changeset, 并能灵活的设置校验。

现在我们来简单的看看，到目前为止我们都干了些啥：打开`iex`然后创建user (这一步就类似于`rails console`)

```bash
iex -S mix
```

然后在`iex`里

```elixir
changeset = Sling.User.changeset(%Sling.User{}, %{email: "first@user.com", username: "first_user", password_hash: "password"})
Sling.Repo.insert(changeset)
```

User  Model的changeset函数有两个参数，第一个是struct(一种数据结构，当前为空的`%Sling.User{}`)，第二个是map。（第二个参数会根据changeset函数中得条件，将值映射到第一个参数）具体如下：

运行成功会返回 `:ok`元组，表示创建成功。

```elixir
{:ok,
 %Sling.User{__meta__: #Ecto.Schema.Metadata<:loaded, "users">,
  email: "first@user.com", id: 1,
  inserted_at: #Ecto.DateTime<2016-10-20 20:04:07>, password_hash: "password",
  updated_at: #Ecto.DateTime<2016-10-20 20:04:07>, username: "first_user"}}
```

 你应该注意到，我们上面例子中密码是以明码的形式存储于数据库中的，这显然是极其危险的做法。我们来使用第三方库[Comeonin](https://hex.pm/packages/comeonin)来解决这个问题。修改`mix.exs`添加依赖（首先在依赖列表中添加，然后在application列表中添加）

```elixir
# content above

def application do
  [mod: {Sling, []},
   applications: [:phoenix, :phoenix_pubsub, :phoenix_html, :cowboy, :logger, :gettext,
                  :phoenix_ecto, :postgrex, :comeonin]] # :comeonin added here
end

# ...

defp deps do
  [{:phoenix, "~> 1.2.1"},
   {:phoenix_pubsub, "~> 1.0"},
   {:phoenix_ecto, "~> 3.0"},
   {:postgrex, ">= 0.0.0"},
   {:phoenix_html, "~> 2.6"},
   {:phoenix_live_reload, "~> 1.0", only: :dev},
   {:gettext, "~> 0.11"},
   {:cowboy, "~> 1.0"},
   {:comeonin, "~> 2.5"}] # :comeonin added here
end

# content below
```

<center>sling/api/mix.exs</center>

安装依赖运行：

```bash
mix deps.get
```

安装好Comeonin以后，我们就可以使用hash算法处理密码。现在更新`user.exs`

```elixir
defmodule Sling.User do
  use Sling.Web, :model

  schema "users" do
    field :username, :string
    field :email, :string
    field :password_hash, :string
    field :password, :string, virtual: true

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :email])
    |> validate_required([:username, :email])
    |> unique_constraint(:username)
    |> unique_constraint(:email)
  end

  def registration_changeset(struct, params) do
    struct
    |> changeset(params)
    |> cast(params, [:password])
    |> validate_length(:password, min: 6, max: 100)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        changeset
    end
  end
end
```

<center>sling/api/web/models/user.ex</center>

上面的修改中我们添加虚拟字段password，目的是在数据model中使用它，但并不需要其存储于数据库中。在changeset函数中移除`password_hash`,我们将不允许changeset函数直接操作该字段。另外新建`registration_changeset`用于更新用户的密码。`put_password_hash`函数将password值hash运算以后存入password_hash并insert在数据库中。

我们在`iex -S mix`中试试新的`registration_changeset`函数

```
changeset = Sling.User.registration_changeset(%Sling.User{}, %{email: "second@user.com", username: "second_user", password: "password"})
Sling.Repo.insert(changeset)
...
{:ok,
 %Sling.User{__meta__: #Ecto.Schema.Metadata<:loaded, "users">,
  email: "second@user.com", id: 3,
  inserted_at: #Ecto.DateTime<2016-10-20 20:29:12>, password: "password",
  password_hash: "$2b$12$7mJCI9CGy4I3mf1wek/tA.OZQryn31YImjVDcV/ovU5Xrm4xEn4Mq",
  updated_at: #Ecto.DateTime<2016-10-20 20:29:12>, username: "second_user"}}
```

看到了吧，密码已经妥妥的完成哈希化

>  查看代码变化 [Commit](https://github.com/bnhansn/sling/commit/e10ca5f8d2ecca7c72f166cc83fe4eb96d653e22)

目前为止我们已经能够创建用户，但是要从前端通过API实现用户认证，我们还需要实现一些token策略。我打算使用Json Web Token 库 [Guardian](https://github.com/ueberauth/guardian)来实现我们的想法，这个库有很多用户认证相关的功能特性。

在 `mix.exs`依赖列表末尾添加 `{:guardian, "~> 0.13.0"} `，运行`mix deps.get`安装依赖。

在config.exs中配置Guardian

```elixir
# content above

config :guardian, Guardian,
  issuer: "Sling",
  ttl: {30, :days},
  verify_issuer: true,
  serializer: Sling.GuardianSerializer

import_config "#{Mix.env}.exs"
```

<center>sling/api/config/config.exs</center>

Guardian也需要配置secret_key，通过运行`mix phoenix.gen.secret`生成。我们为development和production环境分别设置不同的secret_key。在production环境中我们把secret_key保存在环境变量中。

```elixir
config :guardian, Guardian,
  secret_key: "LG17BzmhBeq81Yyyn6vH7GVdrCkQpLktol2vdXlBzkRRHpYsZwluKMG9r6fnu90m"
```

<center>sling/api/config/dev.exs</center>

```elixir
config :guardian, Guardian,
  secret_key: System.get_env("GUARDIAN_SECRET_KEY")
```

<center>sling/api/config/prod.exs</center>

Guardian还需要配置serializer(详见[Guardian readme](https://github.com/ueberauth/guardian#serializer))

```elixir
defmodule Sling.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias Sling.Repo
  alias Sling.User

  def for_token(user = %User{}), do: {:ok, "User:#{user.id}"}
  def for_token(_), do: {:error, "Unknown resource type"}

  def from_token("User:" <> id), do: {:ok, Repo.get(User, String.to_integer(id))}
  def from_token(_), do: {:error, "Unknown resource type"}
end
```

<center>sling/api/lib/sling/guardian_serializer.ex</center>

> 查看代码变化 [Commit](https://github.com/bnhansn/sling/commit/03d82110d29d506313c610481474f324edf7b55d)

结合Guardian配置，接下来实现controller中相应的接口。我们需要实现四个接口，分别用作注册，登录，登出以及当用户在前端刷新页面时自动再次刷新/认证。首先在router.ex中配置路由。

```elixir
defmodule Sling.Router do
  use Sling.Web, :router

  # pipeline :browser do
  #   plug :accepts, ["html"]
  #   plug :fetch_session
  #   plug :fetch_flash
  #   plug :protect_from_forgery
  #   plug :put_secure_browser_headers
  # end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  # scope "/", Sling do
  #   pipe_through :browser

  #   get "/", PageController, :index
  # end

  scope "/api", Sling do
    pipe_through :api

    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
    resources "/users", UserController, only: [:create]
  end
end
```

<center>sling/api/web/router.ex</center>

**注：**上述router配置中，browser相关的路由是无效的，故已经注释掉。

- SessionController的create action处理Login发出的POST请求；
- SessionController的delete action处理Logout发出的Delete请求；
- SessionController的refresh action处理refresh/authenticate发出的POST请求；
- UserController的create action处理signup发出的POST请求；

在pipeline api中添加两个Plug。(Plug就像函数，不过它在每次请求时都会执行，类似于rails的 before_action，也可称之为拦截器)。

- **VerifyHeader Plug**的作用是在请求头的Authorization: Bearer header中查找并校验jwt。
- **LoadResource Plug**的作用是当请求头的jwt校验通过后加载当前用户（current user）。

为使这两个Plug正确工作，我们还需在controller中配置其他Guardian方法以便实现对current user 的访问或者相关权限的检查。

在router.ex中，我们添加的路由均放置在 `/api`下面，为了方便代码文件查找我们重新配置目录结构将 `user_controller`放置在 `sling/api/web/controllers/api/user_controller.ex`路径下。然后清理掉user_controller中的其他内容，只实现create action。如下所述，

```elixir
defmodule Sling.UserController do
  use Sling.Web, :controller

  alias Sling.User

  def create(conn, params) do
    changeset = User.registration_changeset(%User{}, params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user, :access)
        jwt = Guardian.Plug.current_token(new_conn)

        new_conn
        |> put_status(:created)
        |> render(Sling.SessionView, "show.json", user: user, jwt: jwt)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Sling.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
```

<center>sling/api/web/controllers/api/user_controller.ex</center>

create action首先使用User的registration_changset函数构建changeset,这样我们的密码就会被哈希化。这一步和我们在iex中创建User的过程比较相似。

接下来case语句Repo.insert(changeset)要么返回结果是user成功创建，要么创建失败报错。Phoenix使用ChangesetView去处理上述创建失败的结果（包括changeset数据和错误信息）

若user创建成功，我们使用Guardian.api_sign_in函数分配这个新用户到当前的connection中。然后我们使用已经分配user的connection创建Json Web Token。

Rails中，创建json response需要借助第三方库来实现。Phoenix默认提供json response的实现方式。前面运行 `mix phoenix.gen.json`时已经默认生成 user_view.ex文件，现在我们来修改它以满足需要。

```elixir
defmodule Sling.UserView do
  use Sling.Web, :view

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email,
    }
  end
end
```

<center>sling/api/web/views/user_view.ex</center>

如你所见，我们没有在controller中实现index和show action,所以我们也相应的删去view中的render函数。我们只实现user.json的render函数，并且不必向前端返回password_hash数据。

你可能已经注意到前面的UserController中，我们没有用到UserView,相反使用的是`render(Sling.SessionView, "show.json", user: user, jwt: jwt)`。这么做是因为当用户注册或者登录完成以后，我们打算将jwt和用户数据一起返回，为了便于理解我新建SessionView。

```elixir
defmodule Sling.SessionView do
  use Sling.Web, :view

  def render("show.json", %{user: user, jwt: jwt}) do
    %{
      data: render_one(user, Sling.UserView, "user.json"),
      meta: %{token: jwt}
    }
  end

  def render("error.json", _) do
    %{error: "Invalid email or password"}
  end

  def render("delete.json", _) do
    %{ok: true}
  end

  def render("forbidden.json", %{error: error}) do
    %{error: error}
  end
end
```

<center>sling/api/web/views/session_view.ex</center>

SessionView 的show.json 模板，使用UserView的user.json模板，并且把jwt作为token值存入meta字段中。在SessionController中，还需要构建json response用于响应无效信息登录，登出，用户认证失败。这些响应将使用 `error.json` `delete.json`和 `forbidden.json`模板渲染构建。

我们来实现`SessionController`

```elixir
defmodule Sling.SessionController do
  use Sling.Web, :controller

  def create(conn, params) do
    case authenticate(params) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user, :access)
        jwt = Guardian.Plug.current_token(new_conn)

        new_conn
        |> put_status(:created)
        |> render("show.json", user: user, jwt: jwt)
      :error ->
        conn
        |> put_status(:unauthorized)
        |> render("error.json")
    end
  end

  def delete(conn, _) do
    jwt = Guardian.Plug.current_token(conn)
    Guardian.revoke!(jwt)

    conn
    |> put_status(:ok)
    |> render("delete.json")
  end

  def refresh(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    jwt = Guardian.Plug.current_token(conn)
    {:ok, claims} = Guardian.Plug.claims(conn)

    case Guardian.refresh!(jwt, claims, %{ttl: {30, :days}}) do
      {:ok, new_jwt, _new_claims} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user, jwt: new_jwt)
      {:error, _reason} ->
        conn
        |> put_status(:unauthorized)
        |> render("forbidden.json", error: "Not authenticated")
    end
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> render(Sling.SessionView, "forbidden.json", error: "Not Authenticated")
  end

  defp authenticate(%{"email" => email, "password" => password}) do
    user = Repo.get_by(Sling.User, email: String.downcase(email))

    case check_password(user, password) do
      true -> {:ok, user}
      _ -> :error
    end
  end

  defp check_password(user, password) do
    case user do
      nil -> Comeonin.Bcrypt.dummy_checkpw()
      _ -> Comeonin.Bcrypt.checkpw(password, user.password_hash)
    end
  end
end
```

<center>sling/api/web/controllers/api/session_controller.ex</center>

create action 也就是login 调用私有函数authenticate（返回用户信息或者错误），这和signup action非常像。用户登录并生成token,最后使用SessionView show.json模板构建响应数据。

refresh 看起来也似曾相识，只是不需要创建connection和用户登录。我们调用Guardian的refresh函数，传入当前的jwt和claims,  返回一个新的有效期为30天的jwt。

用户登出只需要简单的调用 `Guardian.revoke!(jwt)`即可，其目的就是使当前用户的token失效，确保不能再次使用。

我们写了一大堆代码，但都是后端用户认证所必要的。

> 提交代码，以供对比[commit](https://github.com/bnhansn/sling/commit/b94d2443057ce1e28cac1b4b02e750ac390cb78c)

好了，这段就到此结束，接下来我们在前端使用JavaScript代码实现用户注册。

原文链接：[https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-2-backend-authentication-d0a40b474899](https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-2-backend-authentication-d0a40b474899)
