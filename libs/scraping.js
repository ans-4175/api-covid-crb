const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

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

    const panels = $('#beranda > div > div > div:nth-child(5) > div').find('.col-sm-4');
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

const scrapeJabar = async () => {
    const resp = await axios.get('https://covid19-public.digitalservice.id/analytics/aggregation/');
    const respData = resp.data;

    const today = moment().format('DD-MM-YYYY');
    const elFind = respData.find((el) => el.tanggal === today);
    const data = {
        odp: 0,
        pdp: 0,
        positif: 0,
        rawat: 0,
        mati: 0,
    }
    if (elFind) {
        data.odp = elFind.total_odp;
        data.pdp = elFind.total_pdp;
        data.positif = elFind.total_positif_saat_ini;
        data.rawat = elFind.total_positif_saat_ini - (elFind.total_meninggal + elFind.total_sembuh);
        data.mati = elFind.total_meninggal;
    }
    
    return data;
}

const scrapeBandung = async () => {
    const resp = await axios.get('https://covid19.bandung.go.id/api/covid19bdg/v1/covidsummary/get',
        { headers: { Authorization: 'RkplDPdGFxTSjARZkZUYi3FgRdakJy' }}
    );
    const respData = resp.data.data;
    
    return {
        odp: respData.odp,
        pdp: respData.pdp,
        positif: respData.positif,
        rawat: respData.positif - (respData.meninggal + respData.sembuh),
        mati: respData.meninggal,
    }
}

module.exports = {
    scrapeKab,
    scrapeKota,
    scrapeBandung,
    scrapeJabar,
    scrapeNasional,
}