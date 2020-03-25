const { scrapeKab } = require('../libs/crawlers');
const { updateSheets } = require('../libs/stein');

module.exports = async (req, res) => {
    try {
        const data = await scrapeKab();
        const updateData = {
            odp_kab: data.odp,
            pdp_kab: data.pdp,
            positif_kab: data.positif,
            rawat_kab: data.rawat,
            mati_kab: data.mati
        }
        res.json({
            updateLatest: await updateSheets(updateData),
        });
    } catch (err) {
        res.json({ err });
    }
};
