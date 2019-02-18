import React, { Component } from 'react';
import axios from 'axios';

export default class auth extends Component {
  componentDidMount() {
    const returnedParam = window.location.search;
    const googleUrl = `http://localhost:3000/api/v1/google/redirect`;

    axios
      .get(googleUrl)
      .then(data => {
        console.log('This is the data comming from axios : ', data);
      })
      .catch(error =>
        console.log('This is the error comming from axios : ', error),
      );
  }

  render() {
    return <div />;
  }
}
