import React from 'react';
import { Link } from 'react-router-dom';
import '../style/index.scss';

const Footer = () => {
  return (
    <footer className="container-fluid">
      <div className='row space-bottom-2x space-top-2x'>
        <div className='text-center col-lg-4 space-top'>
          <h2 className='footer-link'> (+234)8181546011 </h2>
          <h2 className='footer-link'> (+234)9038657766 </h2>
        </div>

        <div className='text-center col-lg-4 space-top'>
          <h2> <Link to='/under-construction' className='link footer-link'> Contact Info </Link></h2>
        </div>

        <div className='text-center col-lg-4 space-top'>
          <h2> <a target='_blank' href='https://github.com/Liadi/events-manager#readme' className='link footer-link'> Project Info </a> </h2>
        </div>
      </div>

      <div className="dropdown-divider"></div>

      <div className='row'>
        <div className='col-lg-4 col-md-6 col-sm-8'>
          <Link className='link footer-link space-right' to='/under-construction'>
            <i className='fa fa-facebook-square fa-4x'></i>
          </Link>
          <Link className='link footer-link space-right' to='/under-construction'>
            <i className='fa fa-twitter-square fa-4x'></i>
          </Link>
          <Link className='link footer-link space-right' to='/under-construction'>
            <i className='fa fa-instagram fa-4x'></i>
          </Link>
          <Link className='link footer-link space-right' to='/under-construction'>
            <i className='fa fa-whatsapp fa-4x'></i>
          </Link>
        </div>
      </div>

      <div className='space-top'><small>liadi.omotola@gmail.com</small></div>
      <div><small>Copyright 2018, Labule Initiative</small></div>
    </footer>
  )
}

export default Footer;
