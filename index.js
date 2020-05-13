const express = require('express');
const app = express();

app.use(express.json());

app.use('/assets', express.static('hamsters'));

// routes 

// hamsters 
const hamstersRoute = require('./routes/hamsters');
app.use('/hamsters', hamstersRoute);


// charts
const chartsRoute = require('./routes/charts');
app.use('/charts', chartsRoute);

// games 
const gamesRoute = require('./routes/games');
app.use('/games', gamesRoute)

// stats
const statsRoute = require('./routes/stats');
app.use('/stats', statsRoute);




app.listen(3000, () => {
  console.log('Server up n running')
})