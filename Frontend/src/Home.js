/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import BookCard from './Component/BookCard';
import { createAuthContext } from './Context/authContext';


const Home = () => {
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState('');
  const { DynamoDB, setLoader, loader } = useContext(createAuthContext);



  useEffect(() => {
    setLoader(true);
    DynamoDB.scan({
      TableName: "Book_Table",
    }).promise()
      .then((data) => {
        setLoader(false);
        setValue(data.Items)
      }).catch((err) => err);
  }, []);


  var filterData = [];
  filterData = value.filter((ele) => {
    return ele.book.toLowerCase().includes(search.toLowerCase());
  });


  if (loader) {
    return <section>
      <h2 className="text-center">Loading...</h2>
    </section>
  }
  return <section className="container mt-5">
    <div className="search mb-5">
      <h3>Search</h3>
      <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} />
    </div>
    <div>
      <h3>Avialable Books:</h3>
      <main>
        <h5 className="text-center mt-4">{!filterData.length > 0 ? 'No Data' : null}</h5>
        <BookCard rawData={filterData} />
      </main>
    </div>
  </section>
}

export default Home;
