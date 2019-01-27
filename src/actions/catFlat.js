import axios from 'axios';

export const getCatFlat = (limit) => {
  const queryParams = limit ? `?limit=${limit}` : ''
  return axios.get(`http://localhost:5000/catData${queryParams}`).then(resp => {
    let formattedResp = []
    resp.data.forEach(element => {
      var utcSeconds = element.date;
      var d = new Date(0);
      d.setUTCSeconds(utcSeconds);
      formattedResp.push({date: d, weight: element.weight, shelterTemp: element.shelterTemp, ambientTemp: element.ambientTemp});
    });
    return formattedResp;
  });
};
