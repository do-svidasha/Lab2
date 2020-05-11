'use strict';

let tableId = 'FavSerials';
let formId = 'addTableRow';

let table = document.getElementById(tableId);
let form = document.getElementById(formId);

table.addEventListener('click', (e) => {
  if (e.target.tagName === 'TH') {
    let columnIndex = e.target.cellIndex;
    sortTable(columnIndex);
  }

  if (e.target.tagName === 'IMG') {
      alert("тык");
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  appendRow();
});

const sortTable = (columnIndex) => {
    let switching = true;
    let shouldSwitch = false;
    let i = 1;
  
    while (switching) {
      switching = false;
      let rows = table.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        let x = rows[i].getElementsByTagName('TD')[columnIndex];
        let y = rows[i + 1].getElementsByTagName('TD')[columnIndex];
        if (Number(x.innerHTML) > Number(y.innerHTML) ) {
          shouldSwitch = true;
          break;
        }
        if (isNaN(x.innerHTML)){
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  };
  