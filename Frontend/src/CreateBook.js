import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { sendRequest } from './API';
import { createAuthContext } from './Context/authContext';



const CreateBook = () => {
  const [value, setValue] = useState({
    book: '', description: '', author: '', url: ''
  });
  const navigate = useNavigate();
  const { checkTokens } = useContext(createAuthContext);
  var values = localStorage.getItem('tokens');



  const submit_data = () => {
    var book_id = Math.floor(100000 + Math.random() * 900000);
    sendRequest({ ...value, book_id }, 'addbook', "POST").then(() => {
      setTimeout(() => {
        navigate('/');
      }, 1500);
    })
  };


  return <section className="container contact_main">
    <form className="card shadow contact_card">
      <h2>Add Book</h2>
      <article className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control"
            onChange={(e) => setValue({ ...value, book: e.target.value })} />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Author</label>
          <input type="text" className="form-control"
            onChange={(e) => setValue({ ...value, author: e.target.value })} />
        </div>
      </article>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea type="text" className="form-control"
          onChange={(e) => setValue({ ...value, description: e.target.value })}></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input type="text" className="form-control"
          onChange={(e) => setValue({ ...value, url: e.target.value })} />
      </div>
      <button type="button" className="btn contact_btn"
        onClick={() => {
          checkTokens(values).then(() => submit_data())
        }}>
        {/* {
        btnDis ? <Loader /> : <span className="mt-1">Submit Here</span>
      } */}
        Create
      </button>
    </form>
  </section>
}

export default CreateBook;
