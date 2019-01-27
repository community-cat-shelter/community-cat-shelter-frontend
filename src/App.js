import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
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
    mostRecentShelterTemp: 0,
    mostRecentAmbientTemp: 0,
    mostRecentWeight: 0
  }

  componentDidMount() {
    getCatFlat(30).then((data) => {
      let mostRecentShelterTemp = 0;
      let mostRecentAmbientTemp = 0;
      let mostRecentWeight = 0;

      if (data.length > 0) {
        mostRecentShelterTemp = data[0].shelterTemp;
        mostRecentAmbientTemp = data[0].ambientTemp;
        mostRecentWeight = data[0].weight;
      }

      this.setState({ 
        data,
        mostRecentShelterTemp,
        mostRecentAmbientTemp,
        mostRecentWeight
      });
    });
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Cat Flat.</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              About
            </NavItem>
            <NavItem eventKey={2} href="#">
              DIY Instructions
            </NavItem>
            <NavItem eventKey={3} href="#">
              Resources
            </NavItem>
            <NavItem eventKey={4} href="#">
              Gallery
            </NavItem>
            <NavItem eventKey={5} href="#">
              Contact
            </NavItem>
            <NavItem eventKey={6} href="#">
              Register Flat
            </NavItem>
            <NavDropdown eventKey={7} title="Login" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Profile</MenuItem>
              <MenuItem eventKey={3.2}>Privacy</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Row>
          <Col md={1}>
          </Col>
          <Col md={5}>

            <Panel>
              <Panel.Heading>
                <h4>
                  Shelter Profile
                </h4>
              </Panel.Heading>
              <Panel.Body>
                <h4>Name</h4>
                <h5>Backyard Shelter</h5>
                <br></br>
                <h4>Location</h4>
                <h5>Minneapolis, MN</h5>
                <br></br>
                <h4>Photo</h4>
                <Image src={require("./cat_flat.jpg")} thumbnail />
              </Panel.Body>
            </Panel>
          </Col>
          <Col md={5}>
            <CurrentDataPanel shelterTemp={this.state.mostRecentShelterTemp} ambientTemp={this.state.mostRecentAmbientTemp} weight={this.state.mostRecentWeight}/>
          </Col>
       
        </Row>
        <hr></hr>
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <HistoryPanel data={this.state.data}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
