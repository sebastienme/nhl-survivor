import {Tabulator, FormatModule, EditModule, ImportModule, FrozenRowsModule, FrozenColumnsModule, ReactiveDataModule, ResizeColumnsModule} from 'tabulator-tables';
import Data from './files/Pool_Survivor_2023-2024.csv';
import { dataMethods } from './data';

Tabulator.registerModule([FormatModule, EditModule, ImportModule, FrozenRowsModule, FrozenColumnsModule, ReactiveDataModule, ResizeColumnsModule]);

var arrayData = Data;
  
//define table
var table = new Tabulator("#pick-table", {
    data:arrayData, //Data is the csv files data
    reactiveData:true, //enable reactive data
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
        {title:"11", field:"weekA", hozAlign:"center", vertAlign:"middle", width:50, formatter:function(cell, formatterParams, onRendered){
            let value = cell.getValue().toLowerCase();
            let logo = dataMethods.getLogo(value);
            dataMethods.incrementCount(value);

            return `<img src='/src/images/${logo}'>`; //return the contents of the cell;
        },},
        {title:"18", field:"weekB", hozAlign:"center", vertAlign:"middle", width:50},
        {title:"25", field:"weekC", hozAlign:"center", vertAlign:"middle", width:50},
        {title:"2", field:"weekD", hozAlign:"center", vertAlign:"middle", width:50}
    ],
});

table.on("tableBuilt", function(){
    //table.hideColumn("joueur") //hide the "name" column
    //table.getColumn("joueur").setWidth(50);
    var column = table.getColumn("joueur");
    console.log("built")
    column.setWidth(123);
    // console.log(column.getWidth())

});

table.on("dataProcessed", function(){
    let top3teams = dataMethods.getMostCommmonTeams();

    //define some sample data
    var tabledata = [
        {id:1, position:"1", equipe:`${top3teams[0].team}`, choisie:`${top3teams[0].count}`},
        {id:2, position:"2", equipe:`${top3teams[1].team}`, choisie:`${top3teams[1].count}`},
        {id:3, position:"3", equipe:`${top3teams[2].team}`, choisie:`${top3teams[2].count}`},
    ];
    
    //create Tabulator on DOM element with id "example-table"
    var statsTable = new Tabulator("#stats-table", {
        height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data:tabledata, //assign data to table
        rowHeight:40,
        columns:[ //Define Table Columns
            {title:"Position", field:"position", width:25},
            {title:"Équipe", field:"equipe", hozAlign:"left",width:50, formatter:function(cell, formatterParams, onRendered){
                let value = cell.getValue();
                let logo = dataMethods.getLogo(value);
                return `<img src='/src/images/${logo}'>`; //return the contents of the cell;
            },},
            {title:"Choisie", field:"choisie"},
        ],
    });

});

