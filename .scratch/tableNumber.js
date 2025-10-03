// Find all tables with class 'strike-table'
const tables = document.querySelectorAll("table.strike-table");

if (tables.length > 0) {
  tables.forEach((table, tableIndex) => {
    console.log(`Processing table ${tableIndex + 1}`);

    // Get all rows in the table body
    const rows = table.querySelectorAll("tbody tr");

    // Add a new header cell for the row numbers
    const headerRow =
      table.querySelector("thead tr") ||
      table.querySelector("tbody tr:first-child");
    if (headerRow) {
      const numberHeader = document.createElement("th");
      numberHeader.textContent = "#";
      numberHeader.style.textAlign = "center";
      numberHeader.style.width = "50px";
      headerRow.insertBefore(numberHeader, headerRow.firstChild);
    }

    // Add row numbers to each data row
    let rowNumber = 1; // Start numbering from 1
    rows.forEach((row, index) => {
      // Skip the header row if it's in tbody
      if (row.querySelector("th")) {
        return;
      }

      const numberCell = document.createElement("td");
      numberCell.textContent = rowNumber;
      numberCell.style.textAlign = "center";
      numberCell.style.fontWeight = "bold";
      numberCell.style.backgroundColor = "#f0f0f0";
      row.insertBefore(numberCell, row.firstChild);

      rowNumber++; // Increment for next row
    });

    console.log(
      `Added row numbers to ${rowNumber - 1} rows in table ${tableIndex + 1}`
    );
  });

  console.log(`Processed ${tables.length} tables total`);
} else {
  console.log('No tables with class "strike-table" found');
}
