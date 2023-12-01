import {Tabulator, FormatModule, EditModule, ImportModule, FrozenRowsModule, FrozenColumnsModule, ReactiveDataModule, ResizeColumnsModule} from 'tabulator-tables';
import Data from './files/Pool_Survivor_2023-2024.csv';
import { dataMethods, playersCount } from './data';
import { editDom } from './dom';

Tabulator.registerModule([FormatModule, EditModule, ImportModule, FrozenRowsModule, FrozenColumnsModule, ReactiveDataModule, ResizeColumnsModule]);

let arrayData = Data;
let classToggle = ['currentPlayer', 'a-player'];

  
//define table
var table = new Tabulator("#pick-table", {
    data:arrayData, //Data is the csv files data
    reactiveData:true, //enable reactive data
    importFormat:"array",
    frozenRows:0,
    rowHeight:40,
    rowFormatter:function(row){
        let data = row.getData(); //get data object for row
        let currentPlayer = data.joueur;
        classToggle[0] = currentPlayer;

        row.getElement().classList.add(classToggle[1]);
        
        if (row.getNextRow() && row.getNextRow().getData().joueur != currentPlayer) {
            if (classToggle[1] == 'a-player') {
                classToggle[1] = 'another-player';
            } else {
                classToggle[1] = 'a-player';
            }
            
        }
        
    },
    columns:[
        {title:"win", field:"win", frozen:true, visible:false},
        {title:"#", field:"participation", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", sorter:"number", width:40, frozen:true},
        {title:"JOUEURS", field:"joueur", sorter:"string", headerHozAlign:"center", hozAlign:"left", vertAlign:"middle", formatter:"plaintext", frozen:true,formatter:function(cell, formatterParams, onRendered){
            //cell - the cell component
            //formatterParams - parameters set for the column
            //onRendered - function to call when the formatter has been rendered
            
            
            

            return cell.getValue(); //return the contents of the cell;
        },},
        {title:"11", field:"weekA", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", width:50, formatter:function(cell, formatterParams, onRendered){
            let value = cell.getValue().toLowerCase();
            let logo = dataMethods.getLogo(value);
            dataMethods.incrementCount(value);
            dataMethods.incrementPlayersCount();
            cell.getElement().classList.add(value.replace(/\s+/g, '-').toLowerCase());

            return `<img src='/src/images/${logo}'>`; //return the contents of the cell;
        },},
        {title:"18", field:"weekB", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", width:50},
        {title:"25", field:"weekC", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", width:50},
        {title:"2", field:"weekD", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", width:50}
    ],
});

table.on("dataProcessed", function(){
    let top3teams = dataMethods.getMostCommmonTeams();

    //define some sample data
    var tabledata = [
        {id:1, position:"1", equipe:`${top3teams[0].team}`, pick:`${top3teams[0].count}`},
        {id:2, position:"2", equipe:`${top3teams[1].team}`, pick:`${top3teams[1].count}`},
        {id:3, position:"3", equipe:`${top3teams[2].team}`, pick:`${top3teams[2].count}`},
    ];
    
    //create Tabulator on DOM element with id "example-table"
    var statsTable = new Tabulator("#stats-table", {
        data:tabledata, //assign data to table
        layout:"fitColumns",
        rowHeight:50,
        rowFormatter:function(row){
            var data = row.getData(); //get data object for row
    
            if(data.equipe == `${top3teams[0].team}`){
                row.getElement().classList.add(top3teams[0].team.replace(/\s+/g, '-').toLowerCase());
            } else if (data.equipe == `${top3teams[1].team}`) {
                row.getElement().classList.add(top3teams[1].team.replace(/\s+/g, '-').toLowerCase());
            } else {
                row.getElement().classList.add(top3teams[2].team.replace(/\s+/g, '-').toLowerCase());
            }
        },
        columns:[ //Define Table Columns
            {title:"#", field:"position", width:25, headerHozAlign:"center", hozAlign:"center", vertAlign:"middle"},
            {title:"ÉQUIPE", field:"equipe", headerHozAlign:"center", vertAlign:"middle", formatter:function(cell, formatterParams, onRendered){
                let value = cell.getValue();
                let logo = dataMethods.getLogo(value);
                return `<img src='/src/images/${logo}'><div>${value}</div>`; //return the contents of the cell;
            },},
            {title:"PICK", field:"pick", width:55, hozAlign:"center", headerHozAlign:"center", vertAlign:"middle"},
        ],
    });

    statsTable.on("tableBuilt", function(){
        editDom.addPlayersCount(playersCount);
    })
});