import {Tabulator, FormatModule, EditModule, ImportModule, FrozenRowsModule, FrozenColumnsModule, ReactiveDataModule, ResizeColumnsModule} from 'tabulator-tables';
import Data from './files/week3_results.csv';
import { dataMethods, playersCount } from './data';
import { editDom } from './dom';

Tabulator.registerModule([FormatModule, EditModule, ImportModule, FrozenRowsModule, FrozenColumnsModule, ReactiveDataModule, ResizeColumnsModule]);

// at wich week are we in the pool
const week = 3;
// is the file a results file or pick file
const isResultsFile = true;
// Data is import from csv file
let arrayData = Data;
// initialisation of the player data
let playerMetrics = ['currentPlayer', 'a-player', 1];

// Function to update player metrics based on the current row
const updatePlayerMetrics = (row) => {
    const data = row.getData();
    const element = row.getElement();
    const currentPlayer = data.joueur;
    playerMetrics[0] = currentPlayer;
    element.classList.add(playerMetrics[1]);
    data.participation = playerMetrics[2];
}

// Function to update player metrics for the next row
const updateNextRowMetrics = (row) => {
    if (row.getNextRow() && row.getNextRow().getData().joueur !== playerMetrics[0]) {
        playerMetrics[1] = (playerMetrics[1] === 'a-player') ? 'another-player' : 'a-player';
        playerMetrics[2] = 1;
    } else {
        playerMetrics[2]++;
    }
}

const checkIfTeamLost = (row) => {
    const data = row.getData();

    const addGrayscaleEffect = (cell) => {
        cell.getElement().classList.add('grayscale-effect');
    };

    switch (week) {
        case 1:
            if (isResultsFile && data.win == 0) {
                addGrayscaleEffect(row.getCell('weekA'));
            }
            break;
        case 2:
            if (isResultsFile && data.win == 0) {
                addGrayscaleEffect(row.getCell('weekB'));
                if (data.weekB.trim() === "") {
                    addGrayscaleEffect(row.getCell('weekA'));
                }
            } else if (!isResultsFile && data.weekB.trim() === "") {
                addGrayscaleEffect(row.getCell('weekA'));
            }
            break;
        case 3:
            if (isResultsFile && data.win == 0) {
                addGrayscaleEffect(row.getCell('weekC'));
                if (data.weekC.trim() === "") {
                    addGrayscaleEffect(row.getCell('weekB'));
                }
                if (data.weekB.trim() === "") {
                    addGrayscaleEffect(row.getCell('weekA'));
                }
            } else if (!isResultsFile && data.weekC.trim() === "") {
                addGrayscaleEffect(row.getCell('weekB'));
                if (data.weekB.trim() === "") {
                    addGrayscaleEffect(row.getCell('weekA'));
                }
            }
            break;
        case 4:
            // logic for week 4
            break;
        default:
            // Default case for weeks other than the specified ones
    }
};

// define table
var table = new Tabulator("#pick-table", {
    data:arrayData, //Data is the csv files data
    reactiveData:true, //enable reactive data
    importFormat:"array",
    frozenRows:0,
    rowHeight:40,
    rowFormatter:function(row){
        updatePlayerMetrics(row);
        updateNextRowMetrics(row);
        checkIfTeamLost(row);
    },
    columns:[
        {title:"win", field:"win", frozen:true, visible:false},
        {title:"#", field:"participation", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", sorter:"number", width:40, frozen:true},
        {title:"JOUEURS", field:"joueur", sorter:"string", headerHozAlign:"center", hozAlign:"left", vertAlign:"middle", formatter:"plaintext", frozen:true},
        {title:"11", field:"weekA", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", width:50, formatter:function(cell, formatterParams, onRendered){
            let value = cell.getValue().toLowerCase();
            let logo = dataMethods.getLogo(value);
            dataMethods.incrementCount(value);
            dataMethods.incrementPlayersCount();
            cell.getElement().classList.add(value.replace(/\s+/g, '-').toLowerCase());

            return `<img src='images/${logo}'>`; //return the contents of the cell;
        }},
        {title:"18", field:"weekB", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", width:50, formatter:function(cell, formatterParams, onRendered){
            let stringToReturn = '';
            let value = cell.getValue();

            if (!(value.trim() === "")) {
                value = value.toLowerCase();
                let logo = dataMethods.getLogo(value);
                dataMethods.incrementCount(value);
                dataMethods.incrementPlayersCount();
                cell.getElement().classList.add(value.replace(/\s+/g, '-').toLowerCase());
                stringToReturn = `<img src='images/${logo}'>`;
            }
            return stringToReturn; //return the contents of the cell;
        }},
        {title:"25", field:"weekC", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", width:50, formatter:function(cell, formatterParams, onRendered){
            let stringToReturn = '';
            let value = cell.getValue();

            if (!(value.trim() === "")) {
                value = value.toLowerCase();
                let logo = dataMethods.getLogo(value);
                dataMethods.incrementCount(value);
                dataMethods.incrementPlayersCount();
                cell.getElement().classList.add(value.replace(/\s+/g, '-').toLowerCase());
                stringToReturn = `<img src='images/${logo}'>`;
            }
            return stringToReturn; //return the contents of the cell;
        }},
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
                return `<img src='images/${logo}'><div>${value}</div>`; //return the contents of the cell;
            },},
            {title:"PICK", field:"pick", width:55, hozAlign:"center", headerHozAlign:"center", vertAlign:"middle"},
        ],
    });

    statsTable.on("tableBuilt", function(){
        editDom.addPlayersCount(playersCount);
    })
});