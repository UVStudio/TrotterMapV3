const express = require('express');
const path = require('path');
const app = express();

//Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//init middleware to allow us to get data in req.body, or else we get undefined
app.use(express.json({ extended: false }));

//data route
app.use('/api/weather', require('./api/weather'));

//set static folder
app.use(express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
