import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import NotFound from './NotFound.jsx';
import EventForm  from './EventForm.jsx';
import ModalView from './ModalView.jsx';
import PageFetching from './PageFetching.jsx';
import '../style/center-events.scss';
import { validateUser } from '../util';
import { userLogout } from '../actions/userAction';
import { closeModal, openModal, closeInfoTab, resetAppState, toggleEventForm } from '../actions/appAction';
import { fetchEvent, deleteEvent, resetEventAdvancedFields, resetEventEntries, resetEventFields } from '../actions/eventAction';

class SingleEvent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.id = props.match.params.id;
    this.accountUserId = props.accountUserId;
    this.state = {
      showEventUpdateForm: false,
    };
    this.toggleEventUpdateFormFunc = this.toggleEventUpdateFormFunc.bind(this);
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  componentWillMount() {
  	if (this.props.loggedIn && parseInt(this.id, 10)) {
  		this.props.fetchCurrentEventFunc(this.id);
  	}
  }

  toggleEventUpdateFormFunc(){
    if (this.state.showAdvanced) {
      this.props.resetEventAdvancedFieldsFunc();
    }
    this.setState((prevState) => ({
      showEventUpdateForm: !prevState.showEventUpdateForm,
    }));
  }

  render() {
    if (!this.props.loggedIn) {
      return(<NotFound />);
    }

    const { fetching, eventsArray, userType, userLogoutFunc, accountUserId, initiateDeleteEventFunc, modalViewMode, modalCallbackFunc, closeModalFunc, modalContent, showModal } = this.props;

    let currentEvent;

    for (let i in eventsArray){
      if (eventsArray[i].id === parseInt(this.id)) {
        currentEvent = eventsArray[i];
      }
    }

    if (fetching) {
      return(
        <PageFetching />
      )
    }

    return (
      <Route render={() => (
        (currentEvent && (currentEvent.userId ===  accountUserId || userType === 'admin')) ? (
          <div>
            <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />

            <main className="container">
              { (currentEvent.userId ===  accountUserId)?
                (<label className="custom-control custom-checkbox d-inline">
                  <input type="checkbox" className="custom-control-input" id="updateFormToggle" onChange={ e => {
                    this.toggleEventUpdateFormFunc();
                  }}/>
                  <span className="custom-control-indicator"></span>
                  { this.state.showEventUpdateForm?
                    (
                      <span className="custom-control-description">Close Update Form</span>
                    ):
                    (
                      <span className="custom-control-description">Update Event</span>
                    )
                  }
                </label>): (null)
              }
              
              {this.state.showEventUpdateForm ? (
                <div>
                  <EventForm eventId={currentEvent.id} type='update' currentEventTime = {new Date(currentEvent.eventTime)}/>
                </div>
              ) : (null)}

              <div className="card space-top" id="card-div">
                <div className="card-center d-flex flex-wrap flex-row-reverse justify-content-center" id="center-descrip">
                  <div className="card-body">
                    <h4 className="card-title">{currentEvent.eventName}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Status</h6>
                    <p className="card-text">{currentEvent.eventStatus}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Amount Paid</h6>
                    <p className="card-text">{currentEvent.eventAmountPaid}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Time of Event</h6>
                    <p className="card-text">{new Date(currentEvent.eventTime).toDateString()}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Center</h6>
                    <p className="card-text">Name: {currentEvent.center.centerName}</p>
                    <p className="card-text">Address: {currentEvent.center.centerAddress}</p> 
                  </div>
                </div>
              </div>

              { (parseInt(currentEvent.userId, 10) == parseInt(accountUserId, 10) || userType === 'admin') ? 
                (
                  <input type='button' className="btn btn-delete grp-btn" value='Delete' onClick={ e => {
                    e.preventDefault();
                    initiateDeleteEventFunc(currentEvent.id);
                  }}/>
                ):(
                  null
                )
              }
            </main>
            <ModalView mode={modalViewMode} callback={modalCallbackFunc} closeModalFunc={closeModalFunc} modalContent={modalContent} showModal={showModal}/>
            
            <Footer />
          </div>
        ) : (
          <NotFound />
        )
      )}/>
    )
  }
}

const mapStateToProps = (state) => {
  const loggedIn = validateUser(state.user.userToken, state.user.accountUser.userId);
  const userType = state.user.accountUser.userType;
  const accountUserId = state.user.accountUser.userId;
  return {
    fetching: state.event.fetching,
    eventsArray: state.event.events,
    accountUserId,
    modalContent: state.app.modalContent,
    modalViewMode: state.app.modalMode,
    modalCallBack: state.app.modalCallBack,
    showModal: state.app.showModal,
    userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,

    unmountFunc: () => {
      dispatch(resetAppState());
      dispatch(resetEventEntries());
      dispatch(resetEventFields());
    },

    fetchCurrentEventFunc: (id) => {
      dispatch(fetchEvent(id));
    },

    userLogoutFunc: () => {
      dispatch(userLogout());
    },

    closeModalFunc: () => {
      dispatch(closeModal());
    },

    resetEventAdvancedFieldsFunc: () => {
      dispatch(resetEventAdvancedFields());
    },

    initiateDeleteEventFunc: (eventId) => {
      dispatch(openModal('decision', `
      <h4>Are you sure you want to delete this event?</h4>
      <p>***Terms and conditions apply on refund</p>
      `, deleteEvent(eventId)));
    },
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    modalCallbackFunc: () => {
      dispatchProps.dispatch(stateProps.modalCallBack());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SingleEvent)
