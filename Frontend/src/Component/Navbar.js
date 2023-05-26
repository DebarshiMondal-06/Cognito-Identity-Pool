import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { createAuthContext } from '../Context/authContext';



const Navbar = () => {
  const loc = useLocation();
  const { removeCookies } = useContext(createAuthContext)
  var check = localStorage.getItem('tokens');




  return (
    <div className="navbar-section">
      <nav className="navbar shadow navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Cognito Identity</Link>
          <section className="buttons">
            {
              !(check)
                ? <Link to="/login">
                  <button className="btn">Login <i className="fas fa-sign-in-alt"></i></button>
                </Link>
                : <button onClick={() => removeCookies()} className="btn" style={{ width: 150 }}>Logout &nbsp;
                  <i className="fas fa-sign-out-alt"></i>
                </button>
            }
            {
              loc.pathname !== '/create' ? <Link to="/create">
                <button className="btn">Add <i className="fas fa-plus-square"></i></button>
              </Link> : null
            }
          </section>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;