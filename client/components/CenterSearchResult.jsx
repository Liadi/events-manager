import React from 'react';
import { Link } from 'react-router-dom';

class CenterSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render () {
    if (this.props.fetching) {
      return (
        <div className='container'>
          <div className="mx-auto col-2">
            <i className='fa fa-spinner fa-spin fa-3x fa-fw'></i>
            <span className='sr-only'>Loading</span>
          </div>
        </div>
      );
    } else {
      return(
        <div className='outputBox'>
          <button className='btn badge badge-warning space-top-sm form-cancel' onClick={ e => {
            e.preventDefault();
            this.props.resetCenterEntriesFunc();
            this.props.toggleSearchResultFunc();
          }}>
            <i className="fa fa-times"></i>
          </button>

          {(this.props.centers.length > 0? (
            this.props.centers.map((center) => 
              <div key={center.id} className='container'>
                <Link to={`centers/${center.id}`} className='link'><h3 className="mx-auto col-9">{center.centerName}</h3></Link>
              </div>
            )
          ):(
            <h4>Nothing found</h4>
          ))}
        </div>
      );
    }

    return null;
  }
}


export default CenterSearchResult;