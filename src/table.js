import {Tabulator, FormatModule, EditModule, ImportModule} from 'tabulator-tables';
import Data from './files/Pool_Survivor_2023-2024.csv';

Tabulator.registerModule([FormatModule, EditModule, ImportModule]);

var arrayData = Data;
  

//define table
var table = new Tabulator("#pick-table", {
    data:arrayData, //Data is the csv files data
    importFormat:"array",
    columns:[
        {title:"Participation", field:"participation", sorter:"number", width:200, editor:true},
        {title:"Joueurs", field:"joueur", sorter:"string", hozAlign:"right", formatter:"plaintext"},
        {title:"Samedi 11 novembre", field:"weekA", formatter:"plaintext", formatter:function(cell, formatterParams, onRendered){
            //cell - the cell component
            //formatterParams - parameters set for the column
            //onRendered - function to call when the formatter has been rendered
            let value = cell.getValue();
            if (value !== undefined && cell.getValue().includes("Boston")) {
                value = "Le Boston";
            }

            return value; //return the contents of the cell;
        },},
        {title:"Samedi 18 novembre", field:"weekB", formatter:"plaintext"},
        {title:"Samedi 25 novembre", field:"weekC", formatter:"plaintext"},
        {title:"Samedi 2 décembre", field:"weekD", formatter:"plaintext"}
    ],
});
