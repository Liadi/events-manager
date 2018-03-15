import React from 'react';
import '../style/index.scss';

const PageFetching = (props) => {
  return (
    <div className='container-fluid page-content-center'>
      <i className='fa fa-spinner fa-spin fa-5x fa-fw' id='load-div'></i>
      <span className='sr-only'>Loading</span>
    </div>
  );
}

export default PageFetching;