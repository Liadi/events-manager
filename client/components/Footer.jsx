import React from 'react';
import { Link } from 'react-router-dom';
import '../style/index.scss';

const Footer = () => {
  return (
    <footer className="container-fluid">
      <div className='row'>
        <div className='col-lg-6'>
          <div className='d-flex d-flex-row justify-content-between'>
            <Link className='link' to='/under-construction'>
              <i className='fa fa-facebook-square fa-4x'></i>
            </Link>
            <Link className='link' to='/under-construction'>
              <i className='fa fa-twitter-square fa-4x'></i>
            </Link>
            <Link className='link' to='/under-construction'>
              <i className='fa fa-instagram fa-4x'></i>
            </Link>
            <Link className='link' to='/under-construction'>
              <i className='fa fa-whatsapp fa-4x'></i>
            </Link>
          </div>
        </div>

        <div className='col-lg-6'>
          <div className='d-flex flex-row justify-content-between'>
            <div className='space-top-2x'>
              <p><Link className='link' to='/under-construction'>About Us</Link></p>
              <p><Link className='link' to='/under-construction'>Latest News</Link></p>
              <p><Link className='link' to='/under-construction'>Jobs</Link></p>
              <p><Link className='link' to='/under-construction'>Contributors</Link></p>
            </div>
            <div className= 'space-top-2x'>
              <p>P.O.B (12024 Ode Remo, Ogun) </p>
              <p>Fax: 738893:)</p>
              <p>EM@gmail.com </p>
              <p>(+234)818 154 6011</p>
            </div>
          </div>
        </div>

        <div className='footer-bottom space-top-2x'>
          <p>Labule Inititaive (10 Imobido street by Oxford Computer Institute, Iperu-Remo, Ogun)</p>
          <p>Copyight {new Date().getFullYear()}</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer;
