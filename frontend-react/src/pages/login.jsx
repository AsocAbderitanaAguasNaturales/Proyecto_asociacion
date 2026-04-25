import "../styles/login2.css"

function Login() {
    return (
      <>
       <h1>Login</h1>
        <main id="contenedor-login">
          <div id="card-login">

          
        <form action="" method="post" id="login">
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" placeholder="Username"/>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" placeholder="Password" />
            <div className="botones">
              <input type="submit" value="Log In" />
              <input type="reset" value="Borrar" />
            </div>
        </form>
        <a href="./registro">Registrate</a>
        </div>
        </main>
      </>
    )
  }
  
  export default Login