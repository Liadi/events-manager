import React from 'react';
import { Link } from 'react-router-dom';
import '../style/index.scss';

const Footer = () => {
  return (
    <footer className="d-flex justify-content-end">
      <p> 
        <a href="#">About us</a>
      </p>
      <p>EM@gmail.com </p>
      <p>(+234)818 154 6011</p>
    </footer>
  )
}

export default Footer;
