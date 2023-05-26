/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { createAuthContext } from '../Context/authContext';
import { sendRequest } from '../API';


const Likes = ({ id }) => {
  const tokens = localStorage.getItem('tokens');
  const { fetch_one, likes, checkTokens } = useContext(createAuthContext);
  useEffect(() => {
    fetch_one(id);
  }, [id]);



  const update_likes = (val) => {
    sendRequest({ count: val, book_id: (id * 1) },'','PUT').then(() => {
      fetch_one(id);
    }).catch((err) => {
      console.log(err);
    });
  }
  


  return <> <button className="btn" onClick={() => {
    checkTokens(tokens).then(() => update_likes(likes + 1));
  }}>
    <i className="fas fa-thumbs-up"></i>
  </button> &nbsp; &nbsp; <span> {likes}</span>
  </>
}

export default Likes
