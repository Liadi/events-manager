import React from 'react';
import CenterAdvancedSearch from './CenterAdvancedSearch.jsx';
import CenterSearchResult from './CenterSearchResult.jsx';
import '../style/index.scss';
import { connect } from 'react-redux';
import { validateUser } from '../util';
import { toggleAdvancedSearch } from '../actions/appAction';
import { updateCenterField, fetchAllCenters, fieldInputError, updateCenterSortOrder, updateCenterSortItem, updateCenterLimit, resetCenterEntries, resetCenterFields, changeCenterPage } from '../actions/centerAction';

class CenterSearch extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      showAdvanced: false,
      showResult: false,
    };

    this.toggleAdvancedSearchFunc = this.toggleAdvancedSearchFunc.bind(this);
    this.toggleSearchResultFunc = this.toggleSearchResultFunc.bind(this);
  }

  toggleAdvancedSearchFunc(){
    if (this.state.showAdvanced) {
      let searchName = this.props.center.centerName || '';
      this.props.resetCenterFieldsFunc();
      this.props.updateCenterFieldFunc('centerName', searchName);
    }
    
    this.setState((prevState) => ({
      showAdvanced: !prevState.showAdvanced,
    }));
  }

  toggleSearchResultFunc(){
    this.setState((prevState) => ({
      showResult: !prevState.showResult,
    }));
  }

  render () {
    const {fetching, fetched, centers, center, limit, sortObj, panel, jumbo, updateCenterFieldFunc, fetchSearchedCenterFunc, updateCenterSortOrderFunc, updateCenterSortItemFunc, updateCenterLimitFunc, loggedIn, resetCenterEntriesFunc } = this.props;
    return (
      <form className="search-form">
        <div>
          <div className="input-group space-top">
            <input type="text" value={center.centerName || ''} className={jumbo?("form-control form-control-lg search-widget"):("form-control form-control-sm")} placeholder="Search for a center" 
            onChange={ e => {
              updateCenterFieldFunc('centerName', e.target.value.trim());
            }}/>
            <span className="input-group-btn">
              <button type="submit" className={jumbo?("btn btn-lg search-widget"):("btn")} onClick={ e => {
                e.preventDefault();
                this.toggleSearchResultFunc();
                fetchSearchedCenterFunc();
              }}>
                {jumbo?("Search"):(<i className="fa fa-search fa-1x mx-auto" aria-hidden="true"></i>)
                }
              </button>
            </span>
          </div>

          {loggedIn? (
            <div className="row">
              <div className="form-group">
                <label htmlFor="pageSize">Page size</label>
                <select value={limit|| 10}className="form-control form-control-sm" id="pageSize" onChange={ e => {
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
              <div className="form-group">
                <label htmlFor="sortItem">sort by</label>
                <select value={(sortObj.item === 'centerRate')?('Price'):('Capacity')} className="form-control form-control-sm" id="sortItem" onChange={ e => {
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
                <div>
                  <div className="form-check">
                    <input checked={(sortObj.order === "INC")?(true):(false)} className="form-check-input" type="radio" name="order" id="orderAscending" value="INC" onChange={ e => {
                      updateCenterSortOrderFunc(e.target.value);
                    }}/>
                    <label className="form-check-label" htmlFor="orderAscending">
                      low to high
                    </label>
                  </div>
                  <div className="form-check">
                    <input checked={(sortObj.order === "DESC")?(true):(false)} className="form-check-input" type="radio" name="order" id="orderDescending" value="DESC" onChange={ e => {
                      updateCenterSortOrderFunc(e.target.value);
                    }}/>
                    <label className="form-check-label" htmlFor="orderDescending">
                      high to low
                    </label>
                  </div>
                </div>
              </div>
            </div>  
          ):(
            null
          )}

          

          <div className="space-top">
            <button type="button" className="search-toggle" onClick={ e => {
              e.preventDefault();
              this.toggleAdvancedSearchFunc();
            }}
            >
            Advanced Search
            </button>
          </div>
        </div>
        <CenterAdvancedSearch loggedIn={loggedIn} showAdvanced={this.state.showAdvanced} updateCenterFieldFunc={updateCenterFieldFunc} center={center}/>
        {(panel && this.state.showResult)?(
            <CenterSearchResult toggleSearchResultFunc={this.toggleSearchResultFunc} resetCenterEntriesFunc={resetCenterEntriesFunc} fetching={fetching} fetched={fetched} centers={centers}/>
          ):(
            null
          )
        }
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const loggedIn = validateUser(state.user.userToken, state.user.accountUser.userId);
  return {
    fetching: state.center.fetching,
    fetched: state.center.fetched,
    centers: state.center.centers,
    center: state.center.center,
    panel: ownProps.panel,
    jumbo: ownProps.jumbo,
    limit: state.center.limit,
    sortObj: state.center.sort,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAdvancedSearchFunc: () => {
      dispatch(toggleAdvancedSearch());
      dispatch(resetCenterFields());
    },

    resetCenterFieldsFunc: () => {
      dispatch(resetCenterFields());
    },

    resetCenterEntriesFunc: () => {
      dispatch(resetCenterEntries());
    },

    updateCenterFieldFunc: (field, value) => {
      dispatch(updateCenterField(field, value));
    },

    updateCenterSortOrderFunc: (order) => {
      dispatch(updateCenterSortOrder(order));
      dispatch(changeCenterPage(1));
      dispatch(fetchAllCenters());
    }, 
    updateCenterSortItemFunc: (item) => {
      dispatch(updateCenterSortItem(item));
      dispatch(changeCenterPage(1));
      dispatch(fetchAllCenters());
    },

    updateCenterLimitFunc: (limit) => {
      dispatch(updateCenterLimit(limit));
      dispatch(changeCenterPage(1));
      dispatch(fetchAllCenters());
    },

    fetchSearchedCenterFunc: () => {
      dispatch(changeCenterPage(1));
      dispatch(fetchAllCenters());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterSearch);