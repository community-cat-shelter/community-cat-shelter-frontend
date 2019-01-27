import React from 'react';

class HistoryPanel extends React.Component {
   constructor(props) {
       super(props);
   }
 
   render() {
    const propsOut = this.props.data.map((reading, i) => {
        const javascriptDate = new Date(reading.date);
        return (
            <tr key={`table-${i}`}>
                <td>{reading.date.toString()}</td>
                <td>{reading.weight}</td>
                <td>{reading.shelterTemp}</td>
                <td>{reading.ambientTemp}</td>
            </tr>);
    });

       return (
           <div>
               <h2>Last 30 Readings</h2>
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
           </div>
       );
   }
}

export default HistoryPanel;