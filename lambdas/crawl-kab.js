const { scrapeKab } = require('../libs/scraping');
const crawler = require('../libs/crawler');

module.exports = async (req, res) => {
    try {
        res.json(await crawler(scrapeKab, 'kab'));
    } catch (err) {
        res.json({ err });
    }
};
