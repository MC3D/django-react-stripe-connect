import React, {Component} from 'react';
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class CourseList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    axios.get('/api/v1/courses/')
    .then(res => this.setState({courses: res.data}))
    .catch(error => console.log(this.error));
  }

  render() {
    let courses = this.state.courses.map(course => (
      <React.Fragment key={course.id}>
        <h4>{course.title}</h4>
        <p>{course.description}</p>
        <p><a href={`/courses/${course.id}/`}>Enroll</a></p>
      </React.Fragment>
    ));
    return  (
      <React.Fragment>
        {courses}
      </React.Fragment>
    )
  }
}

export default CourseList;
