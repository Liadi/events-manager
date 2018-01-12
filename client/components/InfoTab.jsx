import React from 'react';

const InfoTab = (props) => {
	if (props.infoTabMsg === '') {
		return null;
	}
	else if (props.infoTabMsg === 'loading') {
		return (
			<div className='container'>
				<div className="mx-auto col-2">
					<i className='fa fa-spinner fa-spin fa-3x fa-fw'></i>
					<span className='sr-only'>Loading...</span>
				</div>
			</div>
		)
	} else {
		return(
			<div className=''> { props.infoTabMsg } </div>
		)
	}
}

export default InfoTab;
