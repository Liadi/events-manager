import React from 'react';
import { Link } from 'react-router-dom';

const ModalView = (props) => {
	if (!props.showModal) {
		return null;
	} else {
		return (
			<div id='modal-main' onClick={ e => {if (e.target.id === 'modal-main') props.closeModalFunc();}}>
        <div id='modal-frame'>
					<button className='btn' onClick={ e => {props.closeModalFunc();}}>
						<i className="fa fa-times"></i>
					</button>
          <div className='space-top-sm space-bottom' dangerouslySetInnerHTML={{ __html: props.modalContent }}></div>
          {(props.mode === 'decision' || props.mode === 'confirmation')?(
            <div className='modal-grp-btn space-bottom'>
              <button className="btn btn-warning grp-btn" onClick={ e => {
                e.preventDefault();
                props.callback();
                props.closeModalFunc();
              }}>{(props.mode === 'decision')?('YES'):('OK')}</button>
              <button className="btn btn-danger grp-btn space-right-sm" onClick={ e => {props.closeModalFunc();}}>{(props.mode === 'decision')?('NO'):('CANCEL')}</button>
            </div> 
          ):(
            null
          )}
        </div>
			</div>
		);
	} 
}

export default ModalView;
