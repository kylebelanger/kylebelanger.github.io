/*  This code is kinda a mess, BUT it works correctly...
    I didn't have enough time to tidy it up yet
*/

function createTable() {
    
    // declare variables
    var output = document.getElementById('output'),
        table = document.createElement('table'),
        rows = document.getElementById('rows').value,
        columns = document.getElementById('columns').value;

    var multiple = 10;
    var firstMultiple = 10;




    // Begin creating table
    // for each row
    for(var r = 0; r < rows; r++) {

        var newNumber = r * 10;

        var tr = table.insertRow();         // create row

        // for each column
        for(var c = 0; c < columns; c++) {

            var td = tr.insertCell();   // create cell

            // if row == 0
            if (r == 0) {

                // if first column, then put "N"
                if (c === 0) {
                    // create column
                    td.appendChild(document.createTextNode('N'));              
                }
                else {
                    td.appendChild(document.createTextNode(firstMultiple + ' * N')); 
                    firstMultiple = firstMultiple * 10;             

                }


            }
            else {

                // if first column of row
                if (c === 0) {
                    // create column
                    td.appendChild(document.createTextNode(r));     // output 1, 2, 3, etc...             
                }
                else {
                    td.appendChild(document.createTextNode(newNumber)); 
                    newNumber = newNumber * multiple;             
                }
            }

    
        }


    }
    
    // append table to body
    output.appendChild(table);
}

