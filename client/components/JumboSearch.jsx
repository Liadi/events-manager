import React from 'react';
import AdvancedSearch from './AdvancedSearch.jsx';
import SearchedCenters from './SearchedCenters.jsx';
import '../style/index.scss';
import { connect } from 'react-redux';
import { toggleAdvancedSearch } from '../actions/appAction';
import { updateCenterField, fetchCenters, fieldInputError } from '../actions/centerAction';

let JumboSearch = ({ showAdvanced, fieldError, fetching, fetched, centers, center, toggleAdvancedSearchFunc, updateCenterFieldFunc, fetchSearchedCenterFunc }) => {
  return (
  	<form className="search-form">
      <div className="row">
        <div className="input-group space-top">
          <input type="text" className="form-control form-control-lg search-widget" placeholder="Search for a center" 
          onChange={ e => {
            updateCenterFieldFunc('centerName', e.target.value);
          }}/>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-lg search-widget" onClick={ e => {
              e.preventDefault();
              fetchSearchedCenterFunc();
            }}>
              Search
            </button>
          </span>
          <div id= 'searchCenterResult'></div>
        </div>
        <div className="space-top">
          <button type="button" className="btn btn-link btn-lg search-toggle" onClick={ e => {
            e.preventDefault();
            toggleAdvancedSearchFunc();
          }}
          >
          Advanced Search
          </button>
        </div>
      </div>
      <AdvancedSearch showAdvanced={showAdvanced} updateCenterFieldFunc={updateCenterFieldFunc} fieldError={fieldError} center={center}/>
      <SearchedCenters fetching={fetching} fetched={fetched} centers={centers}/>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    showAdvanced: state.app.advancedSearch,
    fieldError: state.center.error.fieldError,
    fetching: state.center.fetching,
    fetched: state.center.fetched,
    centers: state.center.centers,
    center: state.center.center,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    toggleAdvancedSearchFunc: () => {
      dispatch(toggleAdvancedSearch());
    },

    updateCenterFieldFunc: (field, value) => {
      dispatch(updateCenterField(field, value));
    },

    fetchSearchedCenterFunc: () => {
      dispatch(fetchCenters());

    },
  }
}

JumboSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(JumboSearch)

export default JumboSearch;
