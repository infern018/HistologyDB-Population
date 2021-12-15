const express = require('express');
const { google } = require('googleapis');
const mongo = require('./mongo')

const app = express();

//importing helper functions
const zillesHumanHelper = require('./util/zillesHumanHelper')
const zillesAnimalHelper = require('./util/zillesAnimalHelper')
const stephanHelper = require('./util/stephanHelper')

//importing schemas
const zillesHumanSchema = require('./schemas/zillesHumanSchema')
const zillesAnimalSchema = require('./schemas/zillesAnimalSchema')
const stephanSchema = require('./schemas/stephanSchema')

//logic for getting data from google sheets
const auth = new google.auth.GoogleAuth({
    keyFile:"creds.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const client = auth.getClient();

const googleSheets = google.sheets({ version:"v4", auth: client });

const spreadsheetId = "1FHaLxo1QNJwMIGn20zPDpVWZrO-adyI4RU3XYi1Au0Y";

//storing responses
const zillesHumanComplete = [];
const zillesAnimalComplete = [];
const stephanComplete = [];

//util funcions ---------
const getValues = async (span) => {
    const values = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: span
    })

    return values;
}



app.get("/", async (req,res) => {
    
    //Collecting Data from Sheets

    //ZILLES HUMAN
    const respZillesHuman1 = await getValues('ZillesHuman!A3:J349');
    zillesHumanHelper.addDataZillesHuman(respZillesHuman1.data.values,zillesHumanComplete);

    const respZillesHuman2 = await getValues('ZillesHuman!A353:J433');
    zillesHumanHelper.addDataZillesHuman(respZillesHuman2.data.values,zillesHumanComplete);


    //ZILLES ANIMAL
    const respZillesAnimalsVarious = await getValues('ZillesAnimals!A3:K10');
    zillesAnimalHelper.addDataZillesAnimal(respZillesAnimalsVarious.data.values, zillesAnimalComplete, 'various')

    const respZillesAnimalsMarsupalia = await getValues('ZillesAnimals!A13:K23');
    zillesAnimalHelper.addDataZillesAnimal(respZillesAnimalsMarsupalia.data.values, zillesAnimalComplete, 'marsupalia')

    const respZillesAnimalsInsectivora = await getValues('ZillesAnimals!A26:K55');
    zillesAnimalHelper.addDataZillesAnimal(respZillesAnimalsInsectivora.data.values, zillesAnimalComplete, 'insectivora')

    const respZillesAnimalsRodentia = await getValues('ZillesAnimals!A58:K82');
    zillesAnimalHelper.addDataZillesAnimal(respZillesAnimalsRodentia.data.values, zillesAnimalComplete, 'rodentia')

    const respZillesAnimalsLagomorpha = await getValues('ZillesAnimals!A85:K121');
    zillesAnimalHelper.addDataZillesAnimal(respZillesAnimalsLagomorpha.data.values, zillesAnimalComplete, 'lagomorpha')

    const respZillesAnimalsSimier = await getValues('ZillesAnimals!A124:K266');
    zillesAnimalHelper.addDataZillesAnimal(respZillesAnimalsSimier.data.values, zillesAnimalComplete, 'simier')


    //STEPHAN
    const respStephanInsectivora = await getValues('Stephan!A4:I413');
    stephanHelper.addDataStephan(respStephanInsectivora.data.values, stephanComplete, 'insectivora')

    const respStephanScandentia = await getValues('Stephan!A416:I697');
    stephanHelper.addDataStephan(respStephanScandentia.data.values, stephanComplete, 'scandentia')

    const respStephanChiroptera = await getValues('Stephan!A700:I1728');
    stephanHelper.addDataStephan(respStephanChiroptera.data.values, stephanComplete, 'chiroptera')

    const respStephanPrimates = await getValues('Stephan!A1731:I2250');
    stephanHelper.addDataStephan(respStephanPrimates.data.values, stephanComplete, 'primates')

    const respStephanMiscellaneous = await getValues('Stephan!A2253:I2399');
    stephanHelper.addDataStephan(respStephanMiscellaneous.data.values, stephanComplete, 'miscellaneous')

    res.send("Hello There");

    connectToMongoDB();
    
})

// connecting to DB
const connectToMongoDB = async () => {
    await mongo().then(async mongoose => {
        try{
            console.log("connected to mongoDB");

            //adding zillesHuman data
            await zillesHumanSchema.insertMany(zillesHumanComplete);

            //adding zillesAnimal data
            await zillesAnimalSchema.insertMany(zillesAnimalComplete)

            //adding stephans data
            await stephanSchema.insertMany(stephanComplete)
            

        } finally {
            mongoose.connection.close()
        }
    })
}

app.get("/zillesAnimals", (req,res) => {
    res.send(zillesAnimalComplete)
})

app.get("/zillesHuman", (req,res) => {
    res.send(zillesHumanComplete)
})

app.get("/stephan", (req,res) =>{
    res.send(stephanComplete)
})

//listening part
app.listen(8080, (req,res) => {
    console.log("Sprinting on 8080");
})