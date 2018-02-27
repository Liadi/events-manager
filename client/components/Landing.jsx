import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetAppState } from '../actions/appAction';
import { resetCenterFields, resetCenterEntries } from '../actions/centerAction';
import Footer from './Footer.jsx';
import CenterSearch from './CenterSearch.jsx';
import '../style/index.scss';
import '../awesome/scss/font-awesome.scss';
import { validateUser } from '../util';


class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <Route render={props => (
        loggedIn ? (
          <Redirect to={{
            pathname: '/dashboard'
          }}/>
        ) : (
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-big" >
              <Link className="navbar-brand" to='/'>EM</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item navbar-item mx-auto">
                    <Link className="nav-link" to='/signup'>Sign up</Link>
                  </li>
                  <li className="navbar-item">
                    <Link className="nav-link btn btn-light" to='/login'>Log in</Link>
                  </li>
                </ul>
              </div>
            </nav>

            <main className="container mx-auto">
              <img src="../images/top.png" alt="yap" className="img-fluid"/>
              <div className="container">
                <CenterSearch panel={true} jumbo={true}/>
                <div id="caro-div" className="carousel slide mx-auto img-thumbnail" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src="../images/pic3.jpg" alt="Los Angeles" className="img-fluid" />
                      <div className="carousel-caption">
                        <h3>Valtrop</h3>
                        <p>The heart of lagos</p>
                      </div>   
                    </div>
                    <div className="carousel-item">
                      <img src="../images/pic2.jpg" alt="Chicago" className="img-fluid" />
                      <div className="carousel-caption">
                        <h3>A3</h3>
                        <p>Ibadan, ki ni so..</p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="../images/pic7.jpg" alt="New York" className="img-fluid" />
                      <div className="carousel-caption">
                        <h3>Malfex</h3>
                        <p>Kaduna, We rock North!</p>
                      </div>
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#caro-div" data-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                  </a>
                  <a className="carousel-control-next" href="#caro-div" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                  </a>
                </div>
              </div>
            </main>


            <Footer />
          </div>
        )
      )}/>
    )
  }
}

const mapStateToProps = (state) => {
  const loggedIn = validateUser(state.user.userToken, state.user.accountUser.userId);
  return {
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    unmountFunc: () => {
      dispatch(resetCenterFields());
      dispatch(resetAppState());
      dispatch(resetCenterEntries());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);


