import React from 'react';

const LogList = (props) => {
  const itemsArray = [];
  for (let field in props.item) {
    if (props.item.hasOwnProperty(field)) {
      itemsArray.push([field, props.item[field]]);
    }
  }
  return (
    (itemsArray.length === 0)?(
      <p className="card-text">Empty</p>
    ):(
      <div>
        {itemsArray.map((entry, index) => <p className="card-text" key={index}>{entry[0] + ': ' + entry[1]}</p>)}
      </div>
    )
  )
}

class LogListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      open: false
    };
  }
  render() {
    const {log} = this.props;
    return (
      <div className='card mx-auto card-center'>
        <div className="card-body">
          <h5>{log.action + ' ' + log.entity + ' ' + log.entityName}</h5>
          <h6>{new Date(log.createdAt).toDateString() + ' ' + new Date(log.createdAt).toTimeString()}</h6>
          <button className='btn' onClick={ e => {
            e.preventDefault();
            this.setState((prevState, props) => ({
              open: !prevState.open,
            }));
          }}>
            {this.state.open?(
                'Hide Change'
              ):(
                'View Change'
              )
            }
          </button>
          {this.state.open?(
            <div>
              <h5>Before</h5>
              <LogList item={JSON.parse(log.before)} />
              <h5>After</h5>
              <LogList item={JSON.parse(log.after)} />
            </div>
          ):(
            null
          )}
        </div>
      </div>
    )
  }
}

export default LogListComponent;
