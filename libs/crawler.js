const { updateSheets, addRaw } = require('./stein');

module.exports = async (scrapeFn, type) => {
	const data = await scrapeFn();
	const updateData = {};
	updateData[`odp_${type}`] = data.odp;
	updateData[`pdp_${type}`] = data.pdp;
	updateData[`positif_${type}`] = data.positif;
	updateData[`rawat_${type}`] = data.rawat;
	updateData[`mati_${type}`] = data.mati;
    const addData = {
        type,
        odp: data.odp,
        pdp: data.pdp,
        positif: data.positif,
        rawat: data.rawat,
        mati: data.mati,
    }
    return {
    	updateLatest: await updateSheets(updateData),
    	addRaw: await addRaw(addData),
    };
}