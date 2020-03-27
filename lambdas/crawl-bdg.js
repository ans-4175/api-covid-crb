const { scrapeBandung } = require('../libs/scraping');
const crawler = require('../libs/crawler');

module.exports = async (req, res) => {
    try {
        res.json(await crawler(scrapeBandung, 'bdg'));
    } catch (err) {
        res.json({ err });
    }
};
