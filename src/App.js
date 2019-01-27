import React, { Component } from 'react';
import {
  Navbar,
  Row,
  Col,
  Image,
  Panel,
  Label


} from 'react-bootstrap';
import axios from 'axios';

import CurrentDataPanel from './components/CurrentDataPanel';
import styled from 'styled-components';


const catImage = styled(Image)`
  float: right;
`;

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
            <Navbar.Brand >
              <a href="#home">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Row>
          <Col md={5}>

            <Panel style={{ float: 'right' }}>
            <center>
            <h1><small>Backyard Shelter</small></h1>
            </center>
            <Panel.Body>
              <Image  src={require("./cat_flat.jpg")} thumbnail />
              </Panel.Body>
            </Panel>
          </Col>
         
          <Col md={6}>
            <CurrentDataPanel />
          </Col>
       
        </Row>
        <hr></hr>
        <Row>
          <Col md={1}></Col>
          <Col md={11}>
            <h1>History</h1>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
