import React from 'react';
import '../style/index.scss';

const ListFetching = (props) => {
  return (
    <div className='container-fluid list-content-center'>
      <div className='space-top list-load-div'>
        <i className='fa fa-spinner fa-spin fa-5x fa-fw'></i>
        <span className='sr-only'>Loading</span>
      </div>
      <div className='space-top list-load-div'>
        <i className='fa fa-spinner fa-spin fa-4x fa-fw'></i>
        <span className='sr-only'>Loading</span>
      </div>
      <div className='space-top list-load-div'>
        <i className='fa fa-spinner fa-spin fa-3x fa-fw'></i>
        <span className='sr-only'>Loading</span>
      </div>
    </div>
  );
}

export default ListFetching;