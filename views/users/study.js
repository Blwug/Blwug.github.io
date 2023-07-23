let submissionCount = 0;
const participantId = localStorage.getItem('participantId'); // change to wherever you get participant ID from

// if (!participantId) {
//   window.location.href = 'participant.html'; // change to wherever you get participant ID from
// }

// 6 tasks
let tasks = [
  { id: 'H', hours: 4, deadline: null, point: null, disabled: false },
  { id: 'A', hours: 4, deadline: null, point: null, disabled: false },
  { id: 'P', hours: 4, deadline: null, point: null, disabled: false },
  { id: 'O', hours: 4, deadline: null, point: null, disabled: false },
  { id: 'E', hours: 4, deadline: null, point: null, disabled: false },
  { id: 'K', hours: 4, deadline: null, point: null, disabled: false }
]

let response = {
  participantId: participantId,
  rounds: [],
}

// generating deadlines and points
regenerateTaskData();

function regenerateTaskData() {
  tasks.forEach(function(task) {
    task.deadline = Math.floor(Math.random() * (25 - 4 + 1)) + 4;  // 4 to 25
    var random = Math.floor(Math.random() * 100) + 1;  // some equation
    task.point = task.deadline + random;
    task.disabled = false;  // reset the disabled status
  });
}

function resetForm(tbody) {
  // Clear existing rows
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  // Re-add rows
  tasks.forEach(function(task) {
    // start of creating table on HTML file
    const row = document.createElement('tr');

    // allows row to be draggable
    row.setAttribute('class', 'align-middle');
    row.setAttribute('draggable', true);
    row.setAttribute('ondragstart', 'start()');
    row.setAttribute('ondragover', 'dragover()');

    const taskCell = document.createElement('td');
    const deadlineCell = document.createElement('td');
    const pointCell = document.createElement('td');
    const disableCell = document.createElement('td');
    const orderCell = document.createElement('td');

    // creates a checkbox for participants to disable tasks
    const disable = document.createElement('INPUT')
    disable.setAttribute('type', 'checkbox');
    disableCell.appendChild(disable);

    const orderInput = document.createElement('INPUT'); // New input for order
    orderInput.setAttribute('type', 'number');
    orderInput.setAttribute('min', '0');
    orderInput.setAttribute('max', tasks.length - 1);
    orderCell.appendChild(orderInput)

    taskCell.textContent = task.id;
    deadlineCell.textContent = `Due in ${task.deadline} hours`;
    pointCell.textContent = task.point;

    row.appendChild(taskCell);
    row.appendChild(deadlineCell);
    row.appendChild(pointCell);
    row.appendChild(disableCell);
    row.appendChild(orderCell);
    tbody.appendChild(row);

    // disable button
    disable.addEventListener('change', function() {
      if (disable.checked) {
        task.disabled = true;
        row.classList.add('table-danger');  // grays-out the row
        row.setAttribute('draggable', false);  // makes the row not draggable
        tbody.appendChild(row);  // moves row to the bottom
      }
      else {
        task.disabled = false;
        row.classList.remove('table-danger');
        row.setAttribute('draggable', true);
      }
    });

    orderInput.addEventListener('change', function() {
      const order = parseInt(orderInput.value);
      if (!isNaN(order)) {
        task.order =order; 

      }

    })

  });
}

// "listens" to user inputs in the app
document.addEventListener('DOMContentLoaded', function() {

  // finds the table from the HTML file
  const tbody = document.querySelector('tbody');

  // resets the form
  resetForm(tbody);

  // submit button
  const submit = document.querySelector('#task-submit-btn');
  submit.addEventListener('click', function() {

    const tbody = document.querySelector('tbody');
    let valid = true;
    let disabled = false;
    let hours = 0;
    let score = 0;
    let rankings = [];
    

    // check each row of ordered table
    for (i = 0; i < tasks.length; i++) {
      
      let id = tbody.rows.item(i).cells.item(0).innerHTML;
      let row = tasks.find(task => task.id == id);

      // check whether ranking is valid
      hours += row.hours;
      if (!row.disabled) {
        if (!disabled && hours <= row.deadline) {
          score += row.point;  // add points if task was not disabled
          rankings.push({ id: id, deadline: row.deadline, points: row.point, ranking: i + 1 });
        }
        else {
          if (disabled) {
            alert(`Task ${id} cannot be ranked below a disabled task.`);
          }
          else {
            alert(`This is not a valid ranking order. Task ${id} cannot be completed.`);
          }          
          valid = false;
          break;
        }
      }
      else {
        disabled = true;
        rankings.push({ id: id, deadline: row.deadline, points: row.point, ranking: 0 });
      }

    }

    if (valid) {
      rankings = orderRankings(rankings);
      response.rounds.push({data: rankings, score: score});
      if (submissionCount < 5) {
        // Regenerate task data and reset form
        regenerateTaskData();
        resetForm(tbody);
      }

      if (submissionCount == 5) {
        finalSubmit(response);
        window.location.href = 'participant.html';  // whatever next page
      }

      submissionCount++;
    }
      
  });

});

function finalSubmit(response) {
  console.log(response)
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(response)
  }).then(response => {
    if (response.ok) {
      console.log('Data sent successfully');
        alert(`You are done`);  // may change if we want a specific next page
    } else {
      console.error('Error:', response.statusText);
    }
  }).catch((error) => {
    console.error('Error:', error);
  });
}


// puts rankings in same order as tasks
function orderRankings(rankings) {
  let output = [];

  tasks.forEach(function(task) {
    let row = rankings.find(ranking => ranking.id === task.id);
    row.order = task.order !== undefined ? task.order : 0;
    output.push(row);
  });

  output.sort((a, b) => a.order - b.order);

  return output;
}

// dragging function
var row;

function start() {
  row = event.target;
}

function dragover() {
  let e = event;
  e.preventDefault();

  let children = Array.from(e.target.parentNode.parentNode.children);
  if (children.indexOf(e.target.parentNode)>children.indexOf(row)) {
    e.target.parentNode.after(row);
  }
  else {
    e.target.parentNode.before(row);
  }
}

//note down the order of the tasks being selected
tasks.forEach(function(task, index) {
  task.id = 'task-' + (index + 1);
});



document.getElementById("task-submit-btn").addEventListener("click", function() {
  localStorage.setItem('tasklist', JSON.stringify(tasks));
  console.log('tasklist', tasks); 
});




//create another column that asks the user to note down which 
//thing they want to prioritize first 