// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const csvWriter = require('csv-write-stream');
// const taskIds = ['H', 'A', 'P', 'O', 'E', 'K']
// let headers = ['Participant ID'];

// for (let i = 1; i <= 6; i++) {
//   taskIds.forEach(taskId => {
//     headers.push(`Deadline ${taskId} - ${i}`)
//   })

//   taskIds.forEach(taskId => {
//     headers.push(`Points ${taskId} - ${i}`)
//   })

//   taskIds.forEach(taskId => {
//     headers.push(`Task ${taskId} - ${i}`)
//   })

//   headers.push(`Score ${i}`)
// }

// let writer = csvWriter(
//   {
//     separator: ',',
//     newline: '\n',
//     headers: headers,
//     sendHeaders: true
//   }
// );
// writer.pipe(fs.createWriteStream('./data/rankings.csv'));

// app.post('/submit', (req, res) => {
//   const data = req.body;

//   let csv = [data.participantId];
//   data.rounds.forEach(round => {
//     round.data.forEach(task => {
//       csv.push(task.deadline);
//     });

//     round.data.forEach(task => {
//       csv.push(task.points);
//     });

//     round.data.forEach(task => {
//       csv.push(task.ranking);
//     });

//     csv.push(round.score);
//   });

  
//   writer.write(csv);

// for (let i = 1; i <= 6; i++) {
//   taskIds.forEach(taskId => {
//     headers.push(`Deadline ${taskId} - ${i}`)
//   })

// app.get('/download', (req, res) => {
//   const filePath = path.join(__dirname, './data/rankings.csv');
//   res.download(filePath);
// });

// // this doesn't quite work yet..?
// app.get('/csv', (req, res) => {
//   const filePath = path.join(__dirname, './data/rankings.csv');
  
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('An error occurred while reading the file.');
//     }
//     let dataWithLineBreaks = data.replace('/n', '<br/>');
//     res.send(data);
//   });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



  

  // create a list that will then be turned into a csv using writer
//   let csv = [data.participantId];
//   data.rounds.forEach(round => {
//     round.data.forEach(task => {
//       csv.push(task.deadline);
//     });

//     round.data.forEach(task => {
//       csv.push(task.points);
//     });

//     round.data.forEach(task => {
//       csv.push(task.ranking);
//     });

//     csv.push(round.score);
//   });

//   // converts the list into a csv
//   writer.write(csv);

//   res.status(200).send('Data received');
// });

// app.get('/download', (req, res) => {
//   const filePath = path.join(__dirname, './data/rankings.csv');
//   res.download(filePath);
// });

