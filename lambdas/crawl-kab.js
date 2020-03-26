const { scrapeKab } = require('../libs/crawlers');
const { updateSheets, addRaw } = require('../libs/stein');

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
        const addData = {
            type: 'kab',
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
