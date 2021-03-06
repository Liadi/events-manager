import React from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetAppState, closeModal, openModal } from '../actions/appAction';
import { userLogout } from '../actions/userAction';
import { updateCenterField, deleteCenterFieldError, centerFieldInputError, resetCenterFields, changeCenterPage, fetchAllCenters, resetCenterEntries, deleteCenter } from '../actions/centerAction';
import ModalView from './ModalView.jsx';
import CenterSearch from './CenterSearch.jsx';
import ListFetching from './ListFetching.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import NotFound from './NotFound.jsx';
import PageControl from './PageControl.jsx';
import '../style/centers.scss';
import { validateUser } from '../util';

const inputFieldSet = new Set();

class Centers extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillUnmount() {
    this.props.resetCenterEntriesFunc();
    this.props.resetFunc();
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.fetchAllCentersFunc();
    }
  }

  render() {
    const { fetching, userType, userLogoutFunc, loggedIn, centerFieldError, updateCenterFieldFunc, allCenters, resetFunc, page, limit, changeCenterPageFunc, totalElement, initiateDeleteCenterFunc, closeModalFunc, modalContent, showModal, modalViewMode, modalCallbackFunc } = this.props;
    return (
      <Route render={() => (
        (loggedIn)? (
          <div>
            <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />
            <main className="container">
              <h3>Event Centers</h3>
              <CenterSearch panel={false} jumbo={false}/>
              
              { fetching?
                (
                  <ListFetching />
                ):(
                  (allCenters.length > 0)?
                  (
                    allCenters.map((center) => 
                      <div className="card mx-auto card-center" key={center.id}>
                        <div className="card-body">
                          <h4 className="card-title">{center.centerName}</h4>
                          <h6 className="card-subtitle mb-2 text-muted">{center.centerAddress}</h6>
                          <h6 className="card-subtitle mb-2">Capacity: {' ' + center.centerCapacity}</h6>
                          <h6 className="card-subtitle mb-2">Daily rate: {' ' + center.centerRate}</h6>
                          <p className="card-text">{center.centerDescription}</p>
                          <div className="d-flex justify-content-end">
                            <div className="d-flex flex-wrap justify-content-center grp">
                              
                              <Link className="btn btn-primary grp-btn" to={`/centers/${center.id}`}>
                                View
                              </Link>
                              { userType === 'admin'?(
                                <input type='button' className="btn btn-delete grp-btn" value='Delete' onClick={ e => {
                                  e.preventDefault();
                                  initiateDeleteCenterFunc(center.id);
                                }}/>
                              ):(
                                null
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ):(
                   <h3>No center found</h3>
                  )
                )
              }

              <PageControl page={page} limit={limit} changePageFunc={changeCenterPageFunc} totalElement={totalElement} />
            </main>
            <ModalView mode={modalViewMode} callback={modalCallbackFunc} closeModalFunc={closeModalFunc} modalContent={modalContent} showModal={showModal}/>
            <Footer />
          </div>
        ) : <NotFound />
      )}/>
    )
  }
}

const mapStateToProps = (state) => {
  const loggedIn = validateUser(state.user.userToken, state.user.accountUser.userId);
  const userType = state.user.accountUser.userType;
  return {
    fetching: state.center.fetching,
    centerFieldError: state.center.error.fieldError,
    center: state.center.center,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    modalContent: state.app.modalContent,
    modalViewMode: state.app.modalMode,
    modalCallBack: state.app.modalCallBack,
    showModal: state.app.showModal,
    allCenters: state.center.centers,
    totalElement: state.center.totalElement,
    limit: state.center.limit,
    page: state.center.page,
  	userType,
    loggedIn,
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,

    closeInfoTabFunc: () => {
      dispatch(closeInfoTab());
    },

    closeModalFunc: () => {
      dispatch(closeModal());
    },

    fetchAllCentersFunc: () => {
      dispatch(fetchAllCenters());
    },

    updateCenterFieldFunc: (field=null, value=null) => {
      dispatch(updateCenterField(field, value));
    },

    changeCenterPageFunc: (page) => {
      dispatch(changeCenterPage(page));
      dispatch(fetchAllCenters());
    },

    initiateDeleteCenterFunc: (centerId) => {
      dispatch(openModal('decision', `
      <h4>Are you sure you want to delete this center?</h4>
      <p>***Note all events associated with this center will be deleted</p>
      `, deleteCenter(centerId)));
    },

    userLogoutFunc: () => {
      dispatch(userLogout());
    },

    resetFunc: () => {
      if (inputFieldSet.size > 0) {
        dispatch(resetCenterFields());
      }
      dispatch(resetAppState());
    },

    resetCenterEntriesFunc: () => {
      dispatch(resetCenterEntries());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Centers)
