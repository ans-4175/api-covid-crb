const { scrapeKota } = require('../libs/crawlers');
const { updateSheets, addRaw } = require('../libs/stein');

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
        const addData = {
            type: 'kota',
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
