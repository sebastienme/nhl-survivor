import {Tabulator, FormatModule, EditModule} from 'tabulator-tables';

Tabulator.registerModule([FormatModule, EditModule]);

//define data
var tableData = [
    {id:1, name:"Billy Bob", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1},
    {id:2, name:"Mary May", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true},
]

var table = new Tabulator("#example-table", {
    data:tableData, //set initial table data
    height:"100%",
    columns:[
        {title:"Name", field:"name"},
        {title:"Age", field:"age"},
        {title:"Gender", field:"gender"},
        {title:"Height", field:"height"},
        {title:"Favourite Color", field:"col"},
        {title:"Date Of Birth", field:"dob"},
        {title:"Cheese Preference", field:"cheese"},
    ],
});