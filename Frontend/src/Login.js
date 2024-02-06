import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import './login.css';
import TwitterLogin from "react-twitter-login";
import { createAuthContext } from './Context/authContext';
import { GoogleLogin } from '@react-oauth/google';


const Login = () => {
  const { allowAccess } = useContext(createAuthContext)


  const responseSuccess = (res) => {
    if (res) {
      allowAccess(res, res.profileObj, null);
    } else {
      toast.error('User Not Found!');
    }
  };
  const responseError = () => {
    toast.error('Login Failed, Try Again!');
  }



  const authHandler = (err, t_data) => {
    console.log(t_data);
    console.log("eRR :", err);
    if (err) return toast.error('Login Failed, Try Again!');
    // allowAccess(null, null, t_data);
  };



  return <section className="login--section">
    <div className="login--container">
      <div className="login--card card shadow">
        <div>
          <article style={{ textAlign: 'center', margin: '40px 0px' }}>
            <p className="login--text">Please login with any of Social Account.</p>
            <button className="text-center btn login--btn">
              <GoogleLogin
                onSuccess={responseSuccess}
                onError={responseError}
                size="large"
                width={100}
                auto_select={false}
                useOneTap={false}
                theme="filled_blue"
              />
            </button>
            <br />
            <TwitterLogin
              className="mt-4"
              authCallback={authHandler}
              consumerKey="YY1YoijCpZDkMWGf4zaU0gONf"
              consumerSecret="zG1KolpdnCXi3z99hqzXwnqZkNTcJTvsJ9RR28KesXlXBPpKm1"
            />
          </article>
        </div>
      </div>
    </div>
  </section>
}

export default Login;
