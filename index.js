// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const fs = require('fs'); // File system module to read JSON file
const path = require('path'); // Add this line to import the path module
const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());

const dataFilePath = path.join(__dirname,'data.json');

const getStudent = () => {
    try{
        const data = fs.readFileSync(dataFilePath,'utf-8');
        return JSON.parse(data);
    }
    catch(err){
        console.error('Error in reading the file:',err);
        return [];
    }
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));  
});

app.post('/students/above-threshold',(req,res)=>{
    const {threshold} = req.body;

    if (threshold === undefined){
        return res.status(400).send({
            error:'Threshold required in the request body'
        })
    }

const students = getStudent();
const filterStudents = students.filter(student => student.total > threshold);

return res.json({
    count:filterStudents.length,
    students: filterStudents,
});
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

