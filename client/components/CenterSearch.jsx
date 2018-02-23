import React from 'react';
import AdvancedSearch from './AdvancedSearch.jsx';
import CenterSearchResult from './CenterSearchResult.jsx';
import '../style/index.scss';
import { connect } from 'react-redux';
import { toggleAdvancedSearch } from '../actions/appAction';
import { updateCenterField, fetchAllCenters, fieldInputError, updateCenterSortOrder, updateCenterSortItem, updateCenterLimit } from '../actions/centerAction';

class CenterSearch extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render () {
    const { showAdvanced, fetching, fetched, centers, center, panel, jumbo, toggleAdvancedSearchFunc, updateCenterFieldFunc, fetchSearchedCenterFunc, updateCenterSortOrderFunc, updateCenterSortItemFunc, updateCenterLimitFunc } = this.props;
    return (
      <form className="search-form">
        <div>
          <div className="input-group space-top">
            <input type="text" className={jumbo?("form-control form-control-lg search-widget"):("form-control form-control-sm")} placeholder="Search for a center" 
            onChange={ e => {
              updateCenterFieldFunc('centerName', e.target.value.trim());
            }}/>
            <span className="input-group-btn">
              <button type="submit" className={jumbo?("btn btn-lg search-widget"):("btn")} onClick={ e => {
                e.preventDefault();
                fetchSearchedCenterFunc();
              }}>
                {jumbo?("Search"):(<i className="fa fa-search fa-1x mx-auto" aria-hidden="true"></i>)
                }
              </button>
            </span>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="pageSize">Page size</label>
              <select className="form-control" id="pageSize" defaultValue='10' onChange={ e => {
                updateCenterLimitFunc(parseInt(e.target.value, 10));
              }}>
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
                <option>60</option>
                <option>70</option>
                <option>80</option>
                <option>90</option>
                <option>100</option>
              </select>
            </div>

            <div>
              <div className="form-group">
                <label htmlFor="sortItem">sort by</label>
                <select className="form-control" id="sortItem" defaultValue='Price' onChange={ e => {
                  switch (e.target.value) {
                    case 'Price': {
                      updateCenterSortItemFunc('centerRate');
                      break;
                    }
                    case 'Capacity': {
                      updateCenterSortItemFunc('centerCapacity');
                      break;
                    }
                    default: {
                      updateCenterSortItemFunc(undefined);
                    }
                  }
                }}>
                  <option>Price</option>
                  <option>Capacity</option>
                </select>
              </div>

              <div className="form-group">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="order" id="orderAscending" value="INC" onChange={ e => {
                    updateCenterSortOrderFunc(e.target.value);
                  }}/>
                  <label className="form-check-label" htmlFor="orderAscending">
                    low to high
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="order" id="orderDescending" value="DESC" onChange={ e => {
                    updateCenterSortOrderFunc(e.target.value);
                  }}/>
                  <label className="form-check-label" htmlFor="orderDescending">
                    high to low
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-top">
            <button type="button" className="search-toggle" onClick={ e => {
              e.preventDefault();
              toggleAdvancedSearchFunc();
            }}
            >
            Advanced Search
            </button>
          </div>
        </div>
        <AdvancedSearch showAdvanced={showAdvanced} updateCenterFieldFunc={updateCenterFieldFunc} center={center}/>
        {panel?(
            <CenterSearchResult fetching={fetching} fetched={fetched} centers={centers}/>
          ):(
            null
          )
        }
        <button id="reset-btn" className="btn" type="reset">Reset</button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    showAdvanced: state.app.advancedSearch,
    fetching: state.center.fetching,
    fetched: state.center.fetched,
    centers: state.center.centers,
    center: state.center.center,
    panel: ownProps.panel,
    jumbo: ownProps.jumbo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAdvancedSearchFunc: () => {
      dispatch(toggleAdvancedSearch());
      const advancedSearchFields = ['centerCountry', 'centerState', 'centerCity', 'centerCapacity', 'centerPriceLoewer', 'centerPriceUpper'];
      advancedSearchFields.forEach((field)=> {
        dispatch(updateCenterField(field, ""));
      })
    },

    updateCenterFieldFunc: (field, value) => {
      dispatch(updateCenterField(field, value));
    },

    updateCenterSortOrderFunc: (order) => {
      dispatch(updateCenterSortOrder(order));
      dispatch(fetchAllCenters());
    }, 
    updateCenterSortItemFunc: (item) => {
      dispatch(updateCenterSortItem(item));
      dispatch(fetchAllCenters());
    },

    updateCenterLimitFunc: (limit) => {
      dispatch(updateCenterLimit(limit));
      dispatch(fetchAllCenters());
    },

    fetchSearchedCenterFunc: () => {
      dispatch(fetchAllCenters());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterSearch);
