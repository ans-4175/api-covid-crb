const axios = require('axios');
const moment = require('moment');

const addData = async (data) => {
    const lastUpdate = moment();
    const addValue = Object.assign({}, data, {
        tag: lastUpdate.unix(),
        last_updated: lastUpdate.toISOString(),
        last_updated_ts: lastUpdate.unix(),
    });
    const response = await axios({
        method: 'post',
        url: `https://api.steinhq.com/v1/storages/5d66929d1ec06404b5572f6f/covid-19`,
        data: JSON.stringify([addValue])
    });
    return (response.status === 200) ? true : false;
}

const updateSheets = async (data) => {
    const lastUpdate = moment();
    const updateData = Object.assign({}, data, {
        last_updated: lastUpdate.toISOString(),
        last_updated_ts: lastUpdate.unix(),
    });
    const params = {
        condition: { tag: 'latest' },
        set: updateData,
    }
    const response = await axios({
        method: 'put',
        url: `https://api.steinhq.com/v1/storages/5d66929d1ec06404b5572f6f/covid-19`,
        data: JSON.stringify(params)
    });
    return (response.status === 200) ? true : false;
}

module.exports = {
    updateSheets,
    addData
}