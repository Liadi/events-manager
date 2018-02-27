import React from 'react';

const AmenitiesList = (props) => {
  const {center} = props;
  let tempArray = [];
  if (center['centerAmenities']) {
    tempArray = JSON.parse(center['centerAmenities']);
  }
  if ( tempArray && tempArray.length > 0) {
    return(
      <div className='outputBox'>
        {tempArray.map((entry, index) =>
          <p className="card-text" key={index}>{entry}</p>
        )}
      </div>
    );
  }
  return null;
}

export default AmenitiesList;