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
          <h5>{this.props.shelterTemp} degrees</h5>
          <h4>Ambient Temperature</h4>
          <h5>{this.props.ambientTemp} degrees</h5>
          <h4>Weight</h4>
          <h5>{this.props.weight} oz</h5>
        </Panel.Body>
      </Panel>
    );
  }
};
