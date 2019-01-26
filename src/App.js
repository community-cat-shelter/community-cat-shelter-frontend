import React, { Component } from 'react';
import './App.css';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Brand</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Text>
              Signed in as: <Navbar.Link href="#">Mark Otto</Navbar.Link>
            </Navbar.Text>
            <Navbar.Text pullRight>Have a great day!</Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Button bsStyle="primary">Hi</Button>
      </div>
    );
  }
}

export default App;
