const { scrapeKota } = require('../libs/crawlers');
const { updateSheets } = require('../libs/stein');

module.exports = async (req, res) => {
    try {
        const data = await scrapeKota();
        const updateData = {
            odp_kota: data.odp,
            pdp_kota: data.pdp,
            positif_kota: data.positif,
            rawat_kota: data.rawat,
            mati_kota: data.mati
        }
        res.json({
            updateLatest: await updateSheets(updateData),
        });
    } catch (err) {
        res.json({ err });
    }
};
