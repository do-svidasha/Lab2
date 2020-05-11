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
    let rowIndex = e.target.closest('TR').rowIndex;
    table.deleteRow(rowIndex);
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

const appendRow = () => {
  let title = document.getElementById('titleInput');
  let seasons = document.getElementById('seasonsInput');
  let rate = document.getElementById('rateInput');
  let year = document.getElementById('yearInput');
  let status = document.getElementById('statusInput');

  if ((title.value != '') && (parseInt(seasons.value)) && (Number(rate) != NaN) && (parseInt(year.value))) {
    let row = table.getElementsByTagName('TBODY')[0].insertRow(-1);

    appendCell(row, title.value);
    appendCell(row, seasons.value);
    appendCell(row, rate.value);
    appendCell(row, year.value);
    appendCellCheckBox(row, status);

    let delButton = document.createElement('button');
    delButton.innerHTML = '<img src="trashcan.jpg" alt="Удалить">';
    row.insertCell(-1).appendChild(delButton);

    title.value = '';
    seasons.value = '';
    rate.value = '';
    year.value = '';
    status.checked = false;
  } 
  else {
    alert('Введите корректные значения.');
  }
};

const appendCell = (row, value) => {
  row.insertCell(-1).appendChild(document.createTextNode(value));
};

const appendCellCheckBox = (row, check) => {
  if (check.checked) {
    row.insertCell(-1).appendChild(document.createTextNode("Окончен"));
  }
  else{
    row.insertCell(-1).appendChild(document.createTextNode("Не окончен"));
  }
}

  