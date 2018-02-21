import React from 'react';

const SearchedCenters = (props) => {
  if (props.fetching) {
    return (
      <div className='container'>
        <div className="mx-auto col-2">
          <i className='fa fa-spinner fa-spin fa-3x fa-fw'></i>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    );
  } else if (props.fetched) {
    return(
      <div className='outputBox'>
        {props.centers.map((center) => 
          <div key={center.id} className='container'>
            <h3 className="mx-auto col-9">{center.centerName}</h3>
          </div>
        )}
      </div>
    );
  }
  return null;
}

export default SearchedCenters;