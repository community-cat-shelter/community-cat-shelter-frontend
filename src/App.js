import React, { Component } from 'react';
import {
  Navbar,
  Panel,
  Row,
  Col,
  Image
} from 'react-bootstrap';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    axios.get('http://localhost:5000/').then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Community Cat Shelter</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Row className="show-grid">
          <Col md={4}>
         
          <Image src = {require("./cat_flat.jpg")} thumbnail/>
          
          </Col>
          <Col md={4}>
          </Col>
          <Col md={4}>
            <Panel>
              <Panel.Heading>Live Feed</Panel.Heading>
              
              <Panel.Body></Panel.Body>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
