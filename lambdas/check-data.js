const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

const addData = async (data) => {
    const addValue = Object.assign({}, data, {
        tag: data.last_updated_ts,
    });
    const response = await axios({
        method: 'post',
        url: `https://api.steinhq.com/v1/storages/5d66929d1ec06404b5572f6f/covid-19`,
        data: JSON.stringify([addValue])
    });
    return (response.status === 200) ? true : false;
}

const updateSheets = async (data) => {
    const params = {
        condition: { tag: 'latest' },
        set: data,
    }
    const response = await axios({
        method: 'put',
        url: `https://api.steinhq.com/v1/storages/5d66929d1ec06404b5572f6f/covid-19`,
        data: JSON.stringify(params)
    });
    return (response.status === 200) ? true : false;
}

const scrapeKota = async () => {
    const html = await axios.get("http://covid19.cirebonkota.go.id");
    const $ = cheerio.load(html.data);
    const dataKota = {
        odp: 0,
        pdp: 0,
        positif: 0,
        rawat: 0,
        mati: 0,
    }

    const panels = $('#beranda > div > div > div:nth-child(4) > div').find('.col-sm-4');
    panels.each((idx, elem) => {
        const title = $(elem).find('h2.p-0').text().trim();
        switch (idx) {
            case 0:
                dataKota['odp'] = title;
                break;
            case 1:
                dataKota['pdp'] = title;
                break;
            case 2:
                dataKota['positif'] = title;
                break;
        }
        if (idx === 2) {
            const details = $(elem).find('h5.p-0');
            details.each((idx, elem) => {
                const value = $(elem).text().trim();
                switch (idx) {
                    case 0:
                        dataKota['rawat'] = value;
                        break;
                    case 2:
                        dataKota['mati'] = value;
                        break;
                }
            });
        }
    });
    return dataKota;
}

const scrapeKab = async () => {
    const html = await axios.get("http://covid19.cirebonkab.go.id");
    const $ = cheerio.load(html.data);
    const dataKota = {
        odp: 0,
        pdp: 0,
        positif: 0,
        rawat: 0,
        mati: 0,
    }

    const panels = $('#main > div.hero-section.app-hero > div > div > div:nth-child(2)').find('.col-lg-3');
    panels.each((idx, elem) => {
        const titleH2 = $(elem).find('b.bigsize').text().trim();
        switch (idx) {
            case 0:
                dataKota['odp'] = titleH2;
                break;
            case 1:
                dataKota['pdp'] = titleH2;
                break;
            case 2:
                dataKota['positif'] = titleH2;
                break;
        }
        if (idx === 2) {
            const details = $(elem).find('h6.rathersize');
            details.each((idx, elem) => {
                const value = $(elem).text().trim();
                switch (idx) {
                    case 0:
                        dataKota['rawat'] = value;
                        break;
                    case 2:
                        dataKota['mati'] = value;
                        break;
                }
            });
        }
    });

    return dataKota;
}

const scrapeNasional = async () => {
    const resp = await axios.get('https://api.kawalcovid19.id/case/summary');
    const respData = resp.data;
    
    return {
        odp: 0,
        pdp: 0,
        positif: respData.confirmed,
        rawat: respData.activeCare,
        mati: respData.deceased,
    }
}

module.exports = async (req, res) => {
    const respObj = {};
    try {
        const dataKota = await scrapeKota();
        Object.assign(respObj, dataKota);
    } catch (err) {
        console.error(err);
    }

    try {
        const dataKab = await scrapeKab();
        Object.assign(respObj, dataKab);
    } catch (err) {
        console.error(err);
    }

    try {
        const dataNasional = await scrapeNasional();
        Object.assign(respObj, dataNasional);
    } catch (err) {
        console.error(err);
    }

    res.json(respObj)
};
