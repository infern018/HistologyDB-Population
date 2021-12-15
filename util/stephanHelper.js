const addDataStephan = (fetchedData, stephanComplete, order) => {

    for(let i=0;i<fetchedData.length;i++){
        let singleEntry = fetchedData[i];

        let singleFormattedEntry = {
            code:singleEntry[2],
            species:singleEntry[0],
            sex:singleEntry[1],
            bodyWeight:singleEntry[3],
            brainWeight:singleEntry[4],
            staining:singleEntry[7],
            sectionThickness:singleEntry[6],
            planeOfSectioning:singleEntry[5],
            distance:singleEntry[8],
            order:order
        }

        stephanComplete.push(singleFormattedEntry);
    }
}

module.exports = { addDataStephan }