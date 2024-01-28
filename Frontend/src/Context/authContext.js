import React, { createContext, useState } from 'react';
import AWS from 'aws-sdk';
import { toast } from 'react-toastify';
const createAuthContext = createContext();
AWS.config.region = 'ap-south-1';



const Context = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [likes, setLikes] = useState(0);


  const credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-south-1:d976d87b-9d88-4168-9bb2-3637cb88095c'  //replace with your Identity Pool ID
  })
  const DynamoDB = new AWS.DynamoDB.DocumentClient({
    credentials,
  });

  
  const fetch_one = async (id) => {
    DynamoDB.get({
      TableName: "Book_Table",
      Key: {
        book_id: id * 1,
      },
    }).promise().then((data) => {
      if (data.Item && data.Item.likes > 0) {
        setLikes(data.Item && data.Item.likes)
      } else setLikes(0);
    });
  }



  const allowAccess = async (res, data, twitter_data) => {
    if ((res && data) || twitter_data) {
      var Keys = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-1:b4-xxxxxx',  //replace with your Identity Pool ID
        Logins: {
          'api.twitter.com': twitter_data ? `${twitter_data.oauth_token};${twitter_data.oauth_token_secret}` : null,
          'accounts.google.com': (res && data) ? res.tokenObj.id_token : null,
        }
      });
      Keys.get(async function () {
        var tokens = {
          accessKey: Keys.accessKeyId,
          secretAccessKey: Keys.secretAccessKey,
          sessionToken: Keys.sessionToken
        };
        console.log(tokens);
        localStorage.setItem('tokens', JSON.stringify(tokens));
        localStorage.setItem('user', data ? data.email : twitter_data.screen_name);
        credentials.clearCachedId();
        window.location.href = '/';
      });
    }
  }


  const checkTokens = async (tokens) => {
    return await new Promise((res, rej) => {
      if (!tokens) {
        toast.error('Token Not Found');
        toast.clearWaitingQueue();
      } else {
        res();
      }
    });
  };


  const removeCookies = () => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    window.location.reload();
  }

  return <createAuthContext.Provider value={{
    DynamoDB,
    setLoader,
    loader,
    likes,
    fetch_one,
    setLikes,
    allowAccess,
    checkTokens,
    removeCookies,
  }}>
    {children}
  </createAuthContext.Provider>
};

export { Context, createAuthContext };

