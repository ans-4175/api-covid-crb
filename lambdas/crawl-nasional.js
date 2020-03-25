const { scrapeNasional } = require('../libs/crawlers');
const { updateSheets } = require('../libs/stein');

module.exports = async (req, res) => {
    try {
        const data = await scrapeNasional();
        const updateData = {
            odp_nasional: data.odp,
            pdp_nasional: data.pdp,
            positif_nasional: data.positif,
            rawat_nasional: data.rawat,
            mati_nasional: data.mati
        }
        res.json({
            updateLatest: await updateSheets(updateData),
        });
    } catch (err) {
        res.json({ err });
    }
};
