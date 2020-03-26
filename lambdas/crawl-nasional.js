const { scrapeNasional } = require('../libs/crawlers');
const { updateSheets, addRaw } = require('../libs/stein');

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
        const addData = {
            type: 'nasional',
            odp: data.odp,
            pdp: data.pdp,
            positif: data.positif,
            rawat: data.rawat,
            mati: data.mati,
        }
        res.json({
            updateLatest: await updateSheets(updateData),
            addRaw: await addRaw(addData),
        });
    } catch (err) {
        res.json({ err });
    }
};
