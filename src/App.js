import React, { Component } from 'react';
import {
  Navbar,
  Row,
  Col
} from 'react-bootstrap';
import axios from 'axios';

import CurrentDataPanel from './components/CurrentDataPanel';
import HistoryPanel from './components/HistoryPanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/catData?limit=30').then((response) => {
      this.setState({data: response.data})
    });
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Row>
          <Col md={4}>
          </Col>
          <Col md={3}>
          </Col>
          <Col md={4}>
            <CurrentDataPanel/>
          </Col>
          <Col md={1}></Col>
        </Row>
        <hr></hr>
        <Row>
          <Col md={1}></Col>
          <Col md={11}>
            <HistoryPanel data={this.state.data}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
