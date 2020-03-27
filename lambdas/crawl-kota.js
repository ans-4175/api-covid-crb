const { scrapeKota } = require('../libs/scraping');
const crawler = require('../libs/crawler');

module.exports = async (req, res) => {
    try {
        res.json(await crawler(scrapeKota, 'kota'));
    } catch (err) {
        res.json({ err });
    }
};
