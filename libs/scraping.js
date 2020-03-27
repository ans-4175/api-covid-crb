const axios = require('axios');
const cheerio = require('cheerio');

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

module.exports = {
    scrapeKab,
    scrapeKota,
    scrapeNasional,
}