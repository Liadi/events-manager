import React from 'react';
import AdvancedSearch from './AdvancedSearch.jsx';
import '../style/index.scss';
import { connect } from 'react-redux';
import { toggleAdvancedSearch } from '../actions/centerAction'

let JumboSearch = ({ showAdvanced, toggleAdvancedSearchFunc }) => {
  return (
  	<form className="search-form">
      <div className="row">
        <div className="input-group space-top">
          <input type="text" className="form-control form-control-lg search-widget" placeholder="Search for a center" />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-lg search-widget">Search</button>
          </span>
          <div id= 'searchCenterResult'></div>
        </div>
        <div className="space-top">
          <button type="button" className="btn btn-link btn-lg search-toggle" onClick={ e => {
            e.preventDefault();
            toggleAdvancedSearchFunc()
          }}
          >
          Advanced Search
          </button>
        </div>
      </div>
      <AdvancedSearch showAdvanced={showAdvanced} />
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    showAdvanced: state.center.advancedSearch,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAdvancedSearchFunc: () => {
      dispatch(toggleAdvancedSearch());
    }
  }
}

JumboSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(JumboSearch)


JumboSearch = connect()(JumboSearch)

export default JumboSearch;
