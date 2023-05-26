/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Likes from './Component/Likes';
import { createAuthContext } from './Context/authContext';



const View = () => {
  const { id } = useParams();
  const [state, setState] = useState({});
  const { DynamoDB, setLoader, loader } = useContext(createAuthContext);



  useEffect(() => {
    setLoader(true);
    DynamoDB
      .get({
        TableName: "Book_Table",
        Key: {
          book_id: id * 1,
        },
      }).promise()
      .then(data => {
        setLoader(false);
        setState(data.Item)
      }).catch(console.error)
  }, [id]);


  if (loader) {
    return <section>
      <h2 className="text-center">Loading...</h2>
    </section>
  }
  return <section className="container view_section">
    <main className="row">
      <div className="card col-md-5 p-2">
        <img className="card-img-top" src={state.url} alt="view"
          height="500" />
      </div>
      <div className="view_content col-md-5">
        <h2>{state.book}</h2>
        <h5 className="mb-4"><i>{state.author}</i></h5>
        <p>{state.description}</p>
        <article className="view_likes">
          <Likes id={id} />
        </article>
      </div>
    </main>
  </section>
}

export default View;
