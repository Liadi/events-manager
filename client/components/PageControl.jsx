import React from 'react';

const PageControl = (props) => {
  const { page, limit, changeCenterPageFunc, totalElement } = props;
  
  let lastPage = Math.min(Math.ceil(totalElement/limit), Math.ceil(page / 5) * 5 + 1);
  let firstPage = Math.max(lastPage - 5, 1);
  const pageArray = []
  for (let i = firstPage; i <= lastPage; i++) {
    pageArray.push(i);
  }
  return ( 
    <div id="page-control">
      <input type='button' value='<<<' onClick={ e => {
        if (page !== 1) {
          changeCenterPageFunc(1);
        }
      }}/>
      <input type='button' value='<' onClick={ e => {
        if (page > 1) {
          changeCenterPageFunc(page - 1);
        }
      }}/>
      {pageArray.map((elem) =>
        <input id={(elem === page)?('currentPage'):('')} type='button' key={elem} value={elem} onClick={ e => {
          if (page !== elem) {
            changeCenterPageFunc(elem);
          }
        }}/>
      )}
      <input type='button' value='>' onClick={ e => {
        if (page < Math.ceil(totalElement/limit)) {
          changeCenterPageFunc(page + 1);
        }
      }}/>
      <input type='button' value='>>>' onClick={ e => {
        if (page < Math.ceil(totalElement/limit)) {
          changeCenterPageFunc(Math.ceil(totalElement/limit));
        }
      }}/>
    </div>
  );
}

export default PageControl;

// 