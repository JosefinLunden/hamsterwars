const { Router } = require('express');
const router = new Router(); 
const { auth, db } = require ('./../firebase');


// GET all games
router.get('/', async (req,res) => {
  
  try{

    let games = []; 

    let snapShot = await db.collection('games').get();

    snapShot.forEach(doc => {
      games.push(doc.data());
    })

    res.send(({ msg: 'This games has been played' , games}))
  }
  catch(err) {
    console.error(err)
    res.status(500).send(err);
  }

})

router.post('/', async (req,res) => {

  try {
    
    // converts the date format to YYYY-MM-DD, and split out the time. 
    let date = new Date().toISOString().split('T')[0];
    
    // create the collection game (if it not exist)
    // with id, timestamp, contestants (the hamsters from in insomnia), winners
    await db.collection('games').doc().set({
      id: req.body.id,
      timeStamp: date,
      contestants: req.body.contestants,
      winner: req.body.winner
  })
  .then(res.send({ msg: 'Game is on' }))
  .catch(err => { throw err; })
  }
  catch(err) {
    console.error(err)
    res.status(500).send(err);
  }

})



module.exports = router; 