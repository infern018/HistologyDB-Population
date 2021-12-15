const addDataZillesAnimal = (fetchedData, zillesAnimalComplete, order) => {

    for(let i=0;i<fetchedData.length;i++){
        let singleEntry = fetchedData[i];

        let singleFormattedEntry = {
            code:singleEntry[0],
            species:singleEntry[1],
            sex:singleEntry[2],
            number:singleEntry[3],
            bodyWeight:singleEntry[4],
            brainWeight:singleEntry[5],
            part:singleEntry[6],
            staining:singleEntry[7],
            sectionThickness:singleEntry[8],
            planeOfSectioning:singleEntry[9],
            distance:singleEntry[10],
            order:order
        }

        zillesAnimalComplete.push(singleFormattedEntry);
    }
}

module.exports = { addDataZillesAnimal }