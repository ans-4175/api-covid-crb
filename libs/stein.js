const axios = require('axios');
const moment = require('moment');

const addRaw = async (data) => {
    const lastUpdate = moment();
    const addValue = Object.assign({}, data, {
        ts_parsed: lastUpdate.toISOString(),
        ts: lastUpdate.unix(),
    });
    const response = await axios({
        method: 'post',
        url: `${process.env.STEIN_URL}/raw`,
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
        url: `${process.env.STEIN_URL}/covid-19`,
        data: JSON.stringify(params)
    });
    return (response.status === 200) ? true : false;
}

module.exports = {
    updateSheets,
    addRaw
}