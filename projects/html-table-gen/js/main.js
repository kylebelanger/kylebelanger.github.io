/*  createTable function dynamically creates an HTML table based on
    user input values. 

    Also generates the multiples of each row based on the number of columns.
    1 - 10 - 100 - 1000
    2 - 20 - 200 - 2000
    3 - 30 - 300 - 3000... etc.
*/

function createTable() {
    
    // dom variables
    var output = document.getElementById('output'),
        table = document.createElement('table'),
        rows = document.getElementById('rows').value,
        columns = document.getElementById('columns').value;


    //  Begin creating table
    //  ----------------------------
    // for each row
    for(var r = 0; r < rows; r++) {

        // loop variables
        var firstMultiple = 10;             // for first row
        var newNumber = r * 10;             // all other rows
        var tr = table.insertRow();         // create row

        // for each column
        for(var c = 0; c < columns; c++) {

            // create cell
            var td = tr.insertCell();

            // if row 0
            if (r == 0) {
                // if first column, then put "N"
                if (c === 0) {
                    // create column
                    td.appendChild(document.createTextNode('N'));              
                }
                // otherwise, put "N" plus the firstMultiple (10, 100, 1000, etc.)
                else {
                    td.appendChild(document.createTextNode(firstMultiple + ' * N')); 
                    firstMultiple = firstMultiple * 10;        
                }
            }
            // all other rows
            else {
                // if first column of row
                if (c === 0) {
                    // create column
                    td.appendChild(document.createTextNode(r));     // output 1, 2, 3, etc...             
                }
                else {
                    td.appendChild(document.createTextNode(newNumber)); 
                    newNumber = newNumber * 10;             
                }
            }
        }
    }
    //  ----------------------------
    //  End creating table
    
    // append table to body
    output.appendChild(table);
}

