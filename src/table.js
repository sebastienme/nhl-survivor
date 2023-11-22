import {Tabulator, FormatModule, EditModule, ImportModule, FrozenRowsModule, FrozenColumnsModule} from 'tabulator-tables';
import Data from './files/Pool_Survivor_2023-2024.csv';
import { dataMethods } from './data';

Tabulator.registerModule([FormatModule, EditModule, ImportModule, FrozenRowsModule, FrozenColumnsModule]);

var arrayData = Data;
  
//define lookup function
function paramLookup(cell){
    //cell - the cell component
    
    //do some processing and return the param object
    return {width:50};
}
//define table
var table = new Tabulator("#pick-table", {
    data:arrayData, //Data is the csv files data
    importFormat:"array",
    frozenRows:0,
    rowHeight:40,
    columns:[
        {title:"Participation", field:"participation", hozAlign:"center", vertAlign:"middle", sorter:"number", width:40, frozen:true},
        {title:"Joueurs", field:"joueur", sorter:"string", headerHozAlign:"center", hozAlign:"left", vertAlign:"middle", formatter:"plaintext", frozen:true,formatter:function(cell, formatterParams, onRendered){
            //cell - the cell component
            //formatterParams - parameters set for the column
            //onRendered - function to call when the formatter has been rendered
            
            
            

            return cell.getValue(); //return the contents of the cell;
        },},
        {title:"Samedi 11 novembre", field:"weekA", hozAlign:"center", vertAlign:"middle", width:155, formatter:function(cell, formatterParams, onRendered){
            //cell - the cell component
            //formatterParams - parameters set for the column
            //onRendered - function to call when the formatter has been rendered
            let value = cell.getValue().toLowerCase();
            let logo = dataMethods.getLogo(value);
            dataMethods.incrementCount(value);

            return `<img src='/src/images/${logo}'>`; //return the contents of the cell;
        },},
        {title:"Samedi 18 novembre", field:"weekB", formatter:"plaintext"},
        {title:"Samedi 25 novembre", field:"weekC", formatter:"plaintext"},
        {title:"Samedi 2 décembre", field:"weekD", formatter:"plaintext"}
    ],
});

table.on("tableBuilt", function(){
    //table.hideColumn("joueur") //hide the "name" column
    //table.getColumn("joueur").setWidth(50);
    var column = table.getColumn("joueur");

    column.setWidth(123);
    // console.log(column.getWidth())
    dataMethods.getMostCommonTeam();

}); 


