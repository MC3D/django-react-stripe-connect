import React, {Component} from 'react';
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Authorize extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.handleConnect = this.handleConnect.bind(this);
  }

  handleConnect() {
    axios(`/api/v1/accounts/authorize/`, {headers: {'Access-Control-Allow-Origin': '*'}})
    .then(res => console.log(res))
    .catch(error => console.log(error));
  }

  render() {

    return  (

      <React.Fragment>
        <h1>Django React Stripe Connect</h1>
        <button type='button' onClick={this.handleConnect}>Connect Stripe Account</button>
      </React.Fragment>

    )
  }
}

export default Authorize;
