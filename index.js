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

(async () => {
	try {
	    const dataKota = await scrapeKota();
	    const dataKab = await scrapeKab();
	    const dataNasional = await scrapeNasional();
	    const lastUpdate = moment();
	    const updateData = {
	        odp_kota: dataKota.odp,
	        odp_kab: dataKab.odp,
	        odp_prov: null,
	        odp_nasional: dataNasional.odp,
	        pdp_kota: dataKota.pdp,
	        pdp_kab: dataKab.pdp,
	        pdp_prov: null,
	        pdp_nasional: dataNasional.pdp,
	        positif_kota: dataKota.positif,
	        positif_kab: dataKab.positif,
	        positif_prov: null,
	        positif_nasional: dataNasional.positif,
	        rawat_kota: dataKota.rawat,
	        rawat_kab: dataKab.rawat,
	        rawat_prov: null,
	        rawat_nasional: dataNasional.rawat,
	        mati_kota: dataKota.mati,
	        mati_kab: dataKab.mati,
	        mati_prov: null,
	        mati_nasional: dataNasional.mati,
	        last_updated: lastUpdate.toISOString(),
	        last_updated_ts: lastUpdate.unix()
	    }
	    console.log(await addData(updateData));
	    console.log(await updateSheets(updateData));
	  } catch (err) {
	  	console.error(err);
	  }
})()
