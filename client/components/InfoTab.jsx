import React from 'react';

const InfoTab = (props) => {
	if (!props.showInfoTab) {
		return null;
	}/* this condition doesn't work for now */
	 else if (props.infoTabMsg === 'loading') {
		return (
			<div className='container'>
				<div className="mx-auto col-2">
					<i className='fa fa-spinner fa-spin fa-3x fa-fw'></i>
					<span className='sr-only'>Loading...</span>
					<button onClick={props.closeInfoTabFunc}>
						<i className="fa fa-times"></i>
					</button>
				</div>
			</div>
		)
	} else if (props.infoTabMsg.length > 0) {
		return(
		  <div className='outputBox'>
        <button onClick={props.closeInfoTabFunc}>
          <i className="fa fa-times"></i>
        </button>
        {props.infoTabMsg.map((msg, index) => 
          <div key={index} className='container'>
            <p className="mx-auto col-9">{msg}</p>
          </div>
        )}
      </div>
		);
	}
	return null;
}

export default InfoTab;
