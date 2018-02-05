import React from 'react';

const ModalView = (props) => {
	if (!props.showModal) {
		return null;
	} else {
		return (
			<div id='modal-main'>
				<div id='modal-frame'>
					<h1>Hello World!</h1>
				</div>
			</div>
		);
	} 
}

export default ModalView;
