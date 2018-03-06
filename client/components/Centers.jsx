import React from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetAppState, closeModal, openModal } from '../actions/appAction';
import { userLogout } from '../actions/userAction';
import { updateCenterField, deleteCenterFieldError, centerFieldInputError, resetCenterFields, changeCenterPage, fetchAllCenters, resetCenterEntries, deleteCenter } from '../actions/centerAction';
import ModalView from './ModalView.jsx';
import CenterSearch from './CenterSearch.jsx';
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
  }

  componentWillMount() {
    this.props.fetchAllCentersFunc();
  }

  render() {
    const { userType, userLogoutFunc, loggedIn, centerFieldError, updateCenterFieldFunc, allCenters, resetFunc, page, limit, changeCenterPageFunc, totalElement, initiateDeleteCenterFunc, closeModalFunc, modalContent, showModal, modalViewMode, modalCallbackFunc } = this.props;
    return (
      <Route render={() => (
        (loggedIn)? (
          <div>
            <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />
            <main className="container">
              <h3>Event Centers</h3>
              <CenterSearch panel={false} jumbo={false}/>
              { (allCenters.length > 0)?
                (
                  allCenters.map((center) => 
                    <div className="card mx-auto card-center" key={center.id}>
                      <div className="card-body">
                        <h4 className="card-title">{center.centerName}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{center.centerAddress}</h6>
                        <h6 className="card-subtitle mb-2">Capacity: {' ' + center.centerCapacity}</h6>
                        <h6 className="card-subtitle mb-2">Hourly rate: {' ' + center.centerRate}</h6>
                        <p className="card-text">{center.centerDescription}</p>
                        <div className="d-flex justify-content-end">
                          <div className="d-flex flex-wrap justify-content-center grp">
                            <Link to="./create-event" className="btn btn-add grp-btn">
                              Add Event
                            </Link>
                            <Link className="btn btn-primary grp-btn" to={`/centers/${center.id}`}>
                              View
                            </Link>
                            <input type='button' className="btn btn-delete grp-btn" value='Delete' onClick={ e => {
                              e.preventDefault();
                              this.modalCallbackTypeFunc = 'delete'
                              initiateDeleteCenterFunc(center.id);
                            }}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ):(
                 <h3>No center found</h3>
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
    centerFieldError: state.center.error.fieldError,
    center: state.center.center,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    modalContent: state.app.modalContent,
    modalViewMode: state.app.modalMode,
    modalCallbackFunc: state.app.modalCallBack,
    showModal: state.app.showModal,
    allCenters: state.center.centers,
    totalElement: state.center.totalElement,
    limit: state.center.limit,
    page: state.center.page,
  	userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
      dispatch(openModal('decision', '<p>Confirm center delete</p>', deleteCenter(centerId)));
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
  mapDispatchToProps
)(Centers)
