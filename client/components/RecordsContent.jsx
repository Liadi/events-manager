import React from 'react';

const RecordsContent = (props) => {
  if (props.show) {
    return (
      <div className="tab-content">
        <h4>
          Records
        </h4>
        <div>
        </div>
      </div>
    );
  }
  return null
}

export default RecordsContent;
