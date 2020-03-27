const { scrapeNasional } = require('../libs/scraping');
const crawler = require('../libs/crawler');

module.exports = async (req, res) => {
    try {
        res.json(await crawler(scrapeNasional, 'nasional'));
    } catch (err) {
        res.json({ err });
    }
};
