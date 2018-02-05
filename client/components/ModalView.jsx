import React from 'react';
import { Link } from 'react-router-dom';


const ModalView = (props) => {
	if (!props.showModal) {
		return null;
	} else {
		return (
			<div id='modal-main' onClick={ e => {
						if (e.target.id === 'modal-main') {
							props.closeModalFunc();
	                	}
              		}
              	}>
              	<div id='modal-frame'>
					<button onClick={ e => {
							props.closeModalFunc();
						}
					}>
						<i className="fa fa-times"></i>
					</button>
					<div dangerouslySetInnerHTML={{ __html: props.modalContent }}></div>
				</div>
			</div>
		);
	} 
}

export default ModalView;
