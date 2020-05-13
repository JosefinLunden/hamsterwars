const { Router } = require('express');
const router = new Router(); 
const { auth, db } = require ('./../firebase');



router.get('/total', async (req,res) => {

  try {
    // get all games
    let snapShot = await db.collection('games').get();
    console.log(snapShot)
    
    // the number of games is _size in snapshot obj. 
    let numberOfGames = snapShot.size;
    
    // send the respond. 
    res.send({ msg: `Total number of games: ${numberOfGames}`})
  
  
  }
  catch(err) {
    console.error(err)
    res.status(500).send(err);
  
  }
})

module.exports = router; 