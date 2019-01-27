import React from 'react';
import { Panel } from 'react-bootstrap';

class HistoryPanel extends React.Component {
   constructor(props) {
       super(props);
   }
 
   render() {
    const propsOut = this.props.data.map((reading, i) => {
        const javascriptDate = new Date(reading.date);
        return (
            <tr key={`table-${i}`}>
                <td>{reading.date}</td>
                <td>{reading.weight}</td>
                <td>{reading.shelterTemp}</td>
                <td>{reading.ambientTemp}</td>
            </tr>);
    });

       return (
           <div>
               <Panel>
                   <Panel.Heading>
                        <h4>Last 30 Readings</h4>
                   </Panel.Heading>
                   <Panel.Body>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Time</th>
                                <th scope="col">Weight (Oz)</th>
                                <th scope="col">Shelter Temp (&#8457;)</th>
                                <th scope="col">Ambient Temp (&#8457;)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {propsOut}
                        </tbody>
                    </table>
                   </Panel.Body>
               </Panel>
           </div>
       );
   }
}

export default HistoryPanel;