import React, { Component } from 'react';
import { Panel, Label } from 'react-bootstrap';
import styled from 'styled-components';

const OccupancyLabel = styled(Label)`
  float: right;
`;

export default class CurrentDataPanel extends Component {
  render() {
    const occupied = parseInt(this.props.weight) > 16 ? true : false
    return (
      <Panel>
        <Panel.Heading>
          <h4>
            Current Status
            {
              occupied ? <OccupancyLabel bsStyle="success">Occupied</OccupancyLabel> :
                <OccupancyLabel>Unoccupied</OccupancyLabel>
            }
          </h4>
        </Panel.Heading>
        <Panel.Body>
          <h4>Shelter Temperature</h4>
          <h5>{this.props.shelterTemp ? this.props.shelterTemp : '-'} (&#8457;)</h5>
          <br></br>
          <h4>Ambient Temperature</h4>
          <h5>{this.props.ambientTemp ? this.props.ambientTemp : '-'} (&#8457;)</h5>
          <br></br>
          <h4>Weight</h4>
          <h5>{this.props.weight ? Number((this.props.weight / 16).toFixed(2)) : '-'} (lb)</h5>
        </Panel.Body>
      </Panel>
    );
  }
};
