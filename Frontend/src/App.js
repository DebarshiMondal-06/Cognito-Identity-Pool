import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './Component/Navbar';
import { Context } from './Context/authContext';
import CreateBook from './CreateBook';
import Home from './Home';
import './index.css';
import View from './View';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';



const App = () => {
  

  return <Router>
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_G_CLIENT_ID}>
      <Context>
        <ToastContainer autoClose="1500" limit={1} />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/create" element={<CreateBook />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </Context>
    </GoogleOAuthProvider>
  </Router>
}

export default App;
