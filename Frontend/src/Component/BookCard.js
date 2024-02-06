import React from 'react';
import { Link } from 'react-router-dom';
import './component.css';



const BookCard = ({ rawData }) => {


  return <section className="card_section">
    {
      rawData.map((item, i) => {
        const { url, author, book_id } = item;

        return <Link to={`/view/${book_id}`} key={i}>
          <div className="card shadow" style={{ width: '21rem', border: 'none', cursor: 'pointer', borderRadius: 10 }}>
            <img src={url} className="card_image p-3 card-img-top"
              alt="SOME" width="200" height="350" />
            <div className="card-body" style={{ marginTop: -15 }}>
              <h4 className="h5 card_title p-0">{author}</h4>
            </div>
          </div>
        </Link>
      })
    }
  </section>
}

export default BookCard
