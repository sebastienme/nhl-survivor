import {Tabulator, FormatModule, EditModule, ImportModule, FrozenRowsModule, FrozenColumnsModule, ReactiveDataModule, ResizeColumnsModule} from 'tabulator-tables';
import Data from './files/week4_pick.csv';
import { dataMethods, playersCount } from './data';
import { editDom } from './dom';

Tabulator.registerModule([FormatModule, EditModule, ImportModule, FrozenRowsModule, FrozenColumnsModule, ReactiveDataModule, ResizeColumnsModule]);

// at wich week are we in the pool
export const week = 4;
// is the file a results file or pick file
const isResultsFile = false;
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

// Function that will change class of a row when it is a new player on that row 
const updateNextRowMetrics = (row) => {
    if (row.getNextRow() && row.getNextRow().getData().joueur !== playerMetrics[0]) {
        playerMetrics[1] = (playerMetrics[1] === 'a-player') ? 'another-player' : 'a-player';
        playerMetrics[2] = 1;
    } else {
        playerMetrics[2]++;
    }
}

// Function that check if a team has lost. It knows a team has lost depending on different scenario like which week are we,
//  if the file is a a type of pick or results and finally if, on the same row, the next week cell is empty. 
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
            if (isResultsFile && data.win == 0) {
                addGrayscaleEffect(row.getCell('weekD'));
                if (data.weekD.trim() === "") {
                    addGrayscaleEffect(row.getCell('weekC'));
                }
                if (data.weekC.trim() === "") {
                    addGrayscaleEffect(row.getCell('weekB'));
                }
                if (data.weekB.trim() === "") {
                    addGrayscaleEffect(row.getCell('weekA'));
                }
            } else if (!isResultsFile && data.weekD.trim() === "") {
                addGrayscaleEffect(row.getCell('weekC'));
                if (data.weekC.trim() === "") {
                    addGrayscaleEffect(row.getCell('weekB'));
                }
                if (data.weekB.trim() === "") {
                    addGrayscaleEffect(row.getCell('weekA'));
                }
            }
            break;
        default:
            // Default case for weeks other than the specified ones
    }
};

// Function that format the cell of the weeks columns base on the value provided in the csv file. 
const formatCell = (cell, value, currentWeek) => {
    const logo = dataMethods.getLogo(value);
    const element = cell.getElement();
    element.classList.add(value.replace(/\s+/g, '-'));
    (currentWeek === week) && (dataMethods.incrementPlayersCount(), dataMethods.incrementCount(value));

    return `<img src='images/${logo}'>`;
}

const isEmpty = (value) => {
    return value.trim() === "";
}

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
            const value = cell.getValue();
            const WEEK = 1;
            //format the selected cell
            if (!isEmpty(value)) {
                return formatCell(cell, value.toLowerCase(), WEEK);
            }
            return ''; // return an empty string if the cell value is empty
        }},
        {title:"18", field:"weekB", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", width:50, formatter:function(cell, formatterParams, onRendered){
            const value = cell.getValue();
            const WEEK = 2;
            //format the selected cell
            if (!isEmpty(value)) {
                return formatCell(cell, value.toLowerCase(), WEEK);
            }
            return ''; // return an empty string if the cell value is empty
        }},
        {title:"25", field:"weekC", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", width:50, formatter:function(cell, formatterParams, onRendered){
            const value = cell.getValue();
            const WEEK = 3;
            //format the selected cell
            if (!isEmpty(value)) {
                return formatCell(cell, value.toLowerCase(), WEEK);
            }
            return ''; // return an empty string if the cell value is empty
        }},
        {title:"2", field:"weekD", hozAlign:"center", headerHozAlign:"center", vertAlign:"middle", width:50, formatter:function(cell, formatterParams, onRendered){
            const value = cell.getValue();
            const WEEK = 4;
            //format the selected cell
            if (!isEmpty(value)) {
                return formatCell(cell, value.toLowerCase(), WEEK);
            }
            return ''; // return an empty string if the cell value is empty
        }}
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
        editDom.addCurrentWeek(week);
    })
});