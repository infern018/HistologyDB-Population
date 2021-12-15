# HistologyDB-Population
A NodeJs web-app to populate a mongoDB database with the existing INM brain collections using [Google-Sheets API](https://developers.google.com/sheets/api).

 - [Collections Link](https://www.fz-juelich.de/inm/inm-1/EN/Home/_Schnellzugriff/Hirnsammlung/Brain_collection_node.html)
 - [Sheet Link](https://docs.google.com/spreadsheets/d/1FHaLxo1QNJwMIGn20zPDpVWZrO-adyI4RU3XYi1Au0Y/edit?usp=sharing)

## To add data in your mongoDB database
Firstly make sure that your mongoDB database(either the online one or your local database) is up and running, once ensured then in the file **mongo.js** change the following :

```
const mongoURL = "mongodb://localhost:27017"; //add your URL here to connect to your DB
```
then go to `localhost:8080` and the data should have been populated in your DB.
