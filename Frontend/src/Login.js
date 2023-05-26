import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';
import './login.css';
import TwitterLogin from "react-twitter-login";
import { createAuthContext } from './Context/authContext';



const Login = () => {
  const { allowAccess } = useContext(createAuthContext)


  const responseSuccess = (res) => {
    if (res) {
      allowAccess(res, res.profileObj, null);
    } else {
      toast.error('User Not Found!');
    }
  };
  const responseError = (err) => {
    console.log(err);
    toast.error('Login Failed, Try Again!');
  }



  const authHandler = (err, t_data) => {
    console.log(err);
    if (err) return toast.error('Login Failed, Try Again!');
    allowAccess(null, null, t_data);
  };



  return <section className="login--section">
    <div className="login--container">
      <div className="login--card card shadow">
        <article style={{ textAlign: 'center', margin: '40px 0px' }}>
          <p className="login--text">Please login with any of Social Account.</p>
          <GoogleLogin
            clientId="444537954773-ukvvsi8ih2a42jrak9sgieebtkce8k17.apps.googleusercontent.com"  //replace with your client id
            render={renderProps => (
              <button onClick={renderProps.onClick} className="btn btn-info login--btn">Login With Google</button>
            )}
            onSuccess={responseSuccess}
            onFailure={responseError}
          />
          <br />
          <TwitterLogin
            className="mt-4"
            authCallback={authHandler}
            consumerKey="TYDTWf03VAq1zkjsXC9uDd6Lv"
            consumerSecret="jorzEt1mkgxVSCKA4VQOE7NHXwyVfyHpOxjUR6q0CcZ4N2yirK"
          />
        </article>
      </div>
    </div>
  </section>
}

export default Login;
