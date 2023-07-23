// Initialize variables for the number of turns, turns taken, and score
let turns = 30;
let turnsLeft = turns;
let turnsTaken = 0;
let score = 0;

const start = 0;
const end = 30;
let currentTurn = start;

// Define the tasks array
let tasks = [
  { id: "task1", name: "Blue", turnsRequired: 4, deadline: 13, importance: 38, turnsLeft: 4, turnsTaken: 0, status: "pending" },
  { id: "task2", name: "Red", turnsRequired: 2, deadline: 20, importance: 13, turnsLeft: 2, turnsTaken: 0, status: "pending" },
  { id: "task3", name: "Green", turnsRequired: 7, deadline: 17, importance: 29, turnsLeft: 7, turnsTaken: 0, status: "pending" },
  { id: "task4", name: "Yellow", turnsRequired: 3, deadline: 12, importance: 18, turnsLeft: 3, turnsTaken: 0, status: "pending" },
  { id: "task5", name: "Brown", turnsRequired: 5, deadline: 30, importance: 9, turnsLeft: 5, turnsTaken: 0, status: "pending" },
  { id: "task6", name: "Purple", turnsRequired: 1, deadline: 18, importance: 32, turnsLeft: 1, turnsTaken: 0, status: "pending" },
  { id: "task7", name: "Orange", turnsRequired: 2, deadline: 9, importance: 41, turnsLeft: 2, turnsTaken: 0, status: "pending" },
  { id: "task8", name: "Pink", turnsRequired: 8, deadline: 24, importance: 14, turnsLeft: 8, turnsTaken: 0, status: "pending" },
  { id: "task9", name: "Black", turnsRequired: 5, deadline: 15, importance: 5, turnsLeft: 5, turnsTaken: 0, status: "pending" }
]

document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('table');
    const turnsDisplay = document.querySelector('#turns-left');
    const scoreDisplay = document.querySelector('#score');
  
    tasks.forEach(function(task) {
      const row = document.createElement('tr');
      const taskCell = document.createElement('td');
      const turnsRequiredCell = document.createElement('td');
      const deadlineCell = document.createElement('td');
      const importanceCell = document.createElement('td');
      const turnsLeftCell = document.createElement('td');
      const turnsTakenCell = document.createElement('td');
      const takeTurnButton = document.createElement('button');
      const statusCell = document.createElement('td');
  
      taskCell.textContent = task.name;
      turnsRequiredCell.textContent = task.turnsRequired;
      deadlineCell.textContent = `Turn ${task.deadline}`;
      importanceCell.textContent = task.importance;
      turnsLeftCell.textContent = task.turnsLeft;
      turnsTakenCell.textContent = task.turnsTaken;
      takeTurnButton.textContent = 'Take 1 Turn';
      statusCell.textContent = 'pending';
  
      takeTurnButton.addEventListener('click', function() {
        if (turnsLeft > 0) {
          task.turnsLeft--;
          turnsLeftCell.textContent = task.turnsLeft;
          task.turnsTaken++;
          turnsTakenCell.textContent = task.turnsTaken;
          turnsLeft--;
          currentTurn++;
          turnsDisplay.textContent = `Turns: ${currentTurn}`;
          if (task.turnsLeft === 0) {
            row.classList.add('completed');
            statusCell.textContent = 'completed';
            takeTurnButton.setAttribute('disabled', 'disabled')
            score = score + task.importance;
            scoreDisplay.textContent = `Score: ${score}`;
          }
        }
      });
  
      row.appendChild(taskCell);
      row.appendChild(turnsRequiredCell);
      row.appendChild(deadlineCell);
      row.appendChild(importanceCell);
      row.appendChild(turnsLeftCell);
      row.appendChild(turnsTakenCell);
      row.appendChild(takeTurnButton);
      row.appendChild(statusCell);
      table.appendChild(row);
  
      if (task.turnsLeft === 0) {
        row.classList.add('completed');
        statusCell.textContent = 'completed';
        takeTurnButton.setAttribute('disabled', 'disabled')
      } else if (task.deadline < turnsLeft) {
        row.classList.add('expired');
      }
      if (task.deadline < currentTurn) {
        row.classList.add('expired');
        statusCell.textContent = 'expired';
        takeTurnButton.setAttribute('disabled', 'disabled')
      }
    });
  
    turnsDisplay.textContent = `Turns: ${currentTurn}`;
    scoreDisplay.textContent = `Score: ${score}`;


    localStorage.setItem("score", score);



    
  });
  
