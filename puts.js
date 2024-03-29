// Get reference to the HTML table
var table = document.getElementById("option_chain_table_id-puts");

// Get the header row of the table
var headerRow = table.getElementsByTagName("tr")[0];

// Create a new th element for the return percentage column header
var returnHeader = document.createElement("th");
returnHeader.textContent = "Return%";

// Create a new th element for the annualized return percentage column header
var annualizedReturnHeader = document.createElement("th");
annualizedReturnHeader.textContent = "Annualized Return%";

// Append the new header cells to the header row
headerRow.appendChild(returnHeader);
headerRow.appendChild(annualizedReturnHeader);

// Get the selected expiration date from the dropdown
var selectedExpirationDate = document.getElementById("expiration_date_select_form_id").value;

// Extract the expiration date from the selected option value
var expirationDate = new Date(selectedExpirationDate.substring(0, 10)); // Extracts the date part from the value

// Calculate the difference in days between the expiration date and the current date
var currentDate = new Date();
var millisecondsPerDay = 1000 * 60 * 60 * 24;
var daysUntilExpiration = Math.round((expirationDate - currentDate) / millisecondsPerDay);

// Get all rows of the table except the header
var rows = table.getElementsByTagName("tr");
for (var i = 1; i < rows.length; i++) { // Start from index 1 to skip the header row
    // Get the cells of each row
    var cells = rows[i].getElementsByTagName("td");
    
    // Extract bid and strike values from the respective columns
    var bid = parseFloat(cells[2].innerText); // Assuming bid is in the third column (index 2)
    var strike = parseFloat(cells[1].innerText); // Assuming strike is in the second column (index 1)

    // Calculate return percentage
    var returnPercentage = (bid / strike) * 100;

    // Calculate annualized return percentage
    var annualizedReturnPercentage = (returnPercentage / daysUntilExpiration) * 365;

    // Create a new cell for the return percentage and append it to the row
    var returnCell = document.createElement("td");
    returnCell.textContent = returnPercentage.toFixed(2) + "%"; // Limiting to two decimal places
    rows[i].appendChild(returnCell);

    // Create a new cell for the annualized return percentage and append it to the row
    var annualizedReturnCell = document.createElement("td");
    annualizedReturnCell.textContent = annualizedReturnPercentage.toFixed(2) + "%"; // Limiting to two decimal places
    rows[i].appendChild(annualizedReturnCell);
}
