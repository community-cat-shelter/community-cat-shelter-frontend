import React, { Component } from 'react';
import { Panel, Label } from 'react-bootstrap';
import styled from 'styled-components';

const OccupancyLabel = styled(Label)`
  float: right;
`;

export default class CurrentDataPanel extends Component {
  render() {
    return (
      <Panel>
        <Panel.Heading>
          <h4>
            Current Status
            <OccupancyLabel bsStyle="success">Occupied</OccupancyLabel>
          </h4>
        </Panel.Heading>
        <Panel.Body>
          <h4>Shelter Temperature</h4>
          <h5>{this.props.shelterTemp} (&#8457;)</h5>
          <br></br>
          <h4>Ambient Temperature</h4>
          <h5>{this.props.ambientTemp} (&#8457;)</h5>
          <br></br>
          <h4>Weight</h4>
          <h5>{this.props.weight} (Oz)</h5>
        </Panel.Body>
      </Panel>
    );
  }
};
