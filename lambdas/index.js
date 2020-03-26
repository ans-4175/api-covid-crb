const axios = require('axios');
const cors = require('micro-cors')()

const handler = async (req, res) => {
  const resp = await axios.get('https://api.steinhq.com/v1/storages/5d66929d1ec06404b5572f6f/covid-19?search={%22tag%22:%22latest%22}');
  res.json(resp.data);
};

module.exports = cors(handler);