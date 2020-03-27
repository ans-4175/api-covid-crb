const { scrapeJabar } = require('../libs/scraping');
const crawler = require('../libs/crawler');

module.exports = async (req, res) => {
    try {
        res.json(await crawler(scrapeJabar, 'jabar'));
    } catch (err) {
        res.json({ err });
    }
};
