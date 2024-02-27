  import React, { useContext } from 'react';
  import Logo from "../img/logo1.avif";
  import { Link } from 'react-router-dom';
  import { AuthContext, AuthContextProvider } from '../context/authContext';

  const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext)

    return (
      <div className='navbar'>
        <div className="container">
          <div className="logo">
              <Link to='/'>
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="links">
          <Link className='link' to='/?cat=art'><h6>ART</h6></Link>
          <Link className='link' to='/?cat=science'><h6>SCIENCE</h6></Link>
          <Link className='link' to='/?cat=design'><h6>DESIGN</h6></Link>
          <Link className='link' to='/?cat=technology'><h6>TECHNOLOGY</h6></Link>
          <Link className='link' to='/?cat=cinema'><h6>CINEMA</h6></Link>
          <Link className='link' to='/?cat=food'><h6>FOOD</h6></Link>
          <span>{currentUser?.username}</span>
          {currentUser ? <span onClick={logout}>Logout</span> : <Link to='login' className='link'>Login</Link>}
          <span className='write'>
            <Link to="/write/" className='link'>Write</Link>
          </span>
          
          </div>
        </div>
      </div>
    )
  }

  export default Navbar