import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LogoutProps } from '../types/main';

const HeaderLoggedIn = ({ onLogout }: LogoutProps) => {
  let history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
      <Link to="/" className="navbar-brand">
        <h2>Stack Overload</h2>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/about" className="nav-link" id="header-link">
              <h4>About</h4> <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/top_posts" className="nav-link" id="header-link">
              <h4>Top Posts</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/archive" className="nav-link" id="header-link">
              <h4>Archive</h4>
            </Link>
          </li>
        </ul>
        <button className="btn btn-outline-primary pl-5 pr-5" type="submit" onClick={() => history.push('/dashboard')}>
          Dashboard
        </button>
        <button className="btn btn-outline-primary my-2 my-sm-0 ml-2 pl-5 pr-5" type="submit" onClick={() => onLogout()}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default HeaderLoggedIn;
