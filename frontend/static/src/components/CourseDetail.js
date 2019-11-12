import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class CourseDetail extends Component {
  constructor(props){
    super(props);

    this.state = {
      visible: false
    }

    this.handlePayment = this.handlePayment.bind(this);
    this.togglePaymentDisplay = this.togglePaymentDisplay.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/v1/courses/${this.props.match.params.slug}/`)
    .then(res => this.setState(res.data))
    .catch(error => console.log(this.error));
  }

  togglePaymentDisplay() {
    this.setState(state => ({
     visible: !state.visible
   }));
  }

  async handlePayment(e) {
    e.preventDefault();
    let {token} = await this.props.stripe.createToken({email: "freddy@example.com"});
    let response = await axios.post(`/api/v1/courses/charge/`, JSON.stringify({
      token: token.id,
      email: token.email,
      // 13900 equals 139.00 without * 100 added (decimal places)
      amount: 13900 * 100,
      description: 'course description',
      course_id: '1',
    }));

    if(response.data.status === 'success') console.log("Purchase Complete!");

  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Purchase</h1>
          <h4>You are buying:</h4>
          <p>Course Title: <em>{this.state.title}</em></p>
          <p>Amount: ${this.state.price}</p>
          {this.state.visible && <React.Fragment><CardElement /><button type='buton' onClick={this.handlePayment}>Pay</button></React.Fragment>}
        </div>
        {!this.state.visible && <button type='button' onClick={this.togglePaymentDisplay}>Pay ${this.state.price} with Card</button>}
      </React.Fragment>
    )
  }
}

export default injectStripe(CourseDetail);
