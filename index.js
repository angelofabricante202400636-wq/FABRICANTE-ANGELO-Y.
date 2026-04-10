const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
//serve HTML file in back end
app.use(express.static(path.join(__dirname, 'public')));

//Dataset
const students = [
  {
    id: 1,
    name: 'nigger1 ',
    yearLevel: 1,
  },
  {
    id: 2,
    name: 'nigger2 ',
    yearLevel: 2,
  },
  {
    id: 3,
    name: 'nigger3 ',
    yearLevel: 3,
  },
];

//API endpoint
app.get('/api/students', (req, res) => {
  res.json(students);
});

//Listen for incoming request
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
