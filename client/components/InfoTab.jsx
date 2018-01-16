import React from 'react';

const InfoTab = (props) => {
	if (!props.showInfoMsg) {
		return null;
	} else if (props.infoTabMsg === 'loading') {
		return (
			<div className='container'>
				<div className="mx-auto col-2">
					<i className='fa fa-spinner fa-spin fa-3x fa-fw'></i>
					<span className='sr-only'>Loading...</span>
				</div>
			</div>
		)
	} else if (props.infoTabMsg.length > 0) {
		return(
			<div className='searchOutputBox'>
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
