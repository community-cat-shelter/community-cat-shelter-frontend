import React, { Component } from 'react';
import {
  Navbar,
  Row,
  Col,
  Image,
  Panel
} from 'react-bootstrap';

import { getCatFlat } from './actions/catFlat';

import CurrentDataPanel from './components/CurrentDataPanel';

import HistoryPanel from './components/HistoryPanel';


class App extends Component {
  state = {
    data: [],
    mostRecentShelterTemp: '',
    mostRecentAmbientTemp: '',
    mostRecentWeight: ''
  }

  componentDidMount() {
    getCatFlat(30).then((response) => {
      const data = response.data
      const mostRecentShelterTemp = data[0].shelterTemp
      const mostRecentAmbientTemp = data[0].ambientTemp
      const mostRecentWeight = data[0].weight

      this.setState({ 
        data,
        mostRecentShelterTemp,
        mostRecentAmbientTemp,
        mostRecentWeight
      });

      console.log(response.data)
    });
  }

  render() {
    return (
      <div>

        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Cat Flat</a>
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
          <Col md={3}>
          </Col>
          <Col md={4}>
            <CurrentDataPanel shelterTemp={this.state.mostRecentShelterTemp} ambientTemp={this.state.mostRecentAmbientTemp} weight={this.state.mostRecentWeight}/>
          </Col>
       
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
