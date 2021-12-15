const addDataZillesHuman = (fetchedData, zillesHumanComplete) => {

    for(let i=0;i<fetchedData.length;i++){
        let singleEntry = fetchedData[i];

        let singleFormattedEntry = {
            code:singleEntry[0],
            sex:singleEntry[1],
            age:singleEntry[2],
            bodyWeight:singleEntry[3],
            brainWeight:singleEntry[4],
            part:singleEntry[5],
            staining:singleEntry[6],
            sectionThickness:singleEntry[7],
            planeOfSectioning:singleEntry[8],
            distance:singleEntry[9]
        }

        zillesHumanComplete.push(singleFormattedEntry);
    }
}

module.exports = { addDataZillesHuman }