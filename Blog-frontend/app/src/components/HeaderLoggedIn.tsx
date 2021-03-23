import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaBriefcase } from 'react-icons/fa';
import { LogoutProps } from '../types/main';

const HeaderLoggedIn = ({ onLogout }: LogoutProps) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
      <Link to="/" className="navbar-brand">
        <h2>Mikael Svensson</h2>
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
        <a title="Linkedin" className="header-icon" href="https://www.linkedin.com/in/mikael-svensson-627b3918b/">
          <FaLinkedin size={25} color="#0072b1" />
        </a>
        <a title="Github" className="header-icon" href="https://github.com/MikaelErikSvensson">
          <FaGithub size={25} color="#333" />
        </a>
        <a title="Portfolio" className="header-icon" href="https://www.mikaeleriksvensson.com/">
          <FaBriefcase size={25} color="#333" />
        </a>

        <button className="btn btn-outline-primary my-2 my-sm-0 ml-5 pl-5 pr-5" type="submit" onClick={() => onLogout()}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default HeaderLoggedIn;
