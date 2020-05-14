const { Router } = require('express');
const router = new Router(); 
const { auth, db } = require ('./../firebase');

// GET random hamster
router.get('/random', async (req , res) => {

  try {

    let hamstersArray = [];
    
    // get all hamsters from firebase
    let snapShot = await db.collection('hamsters').get();
    // get the total number of hamsters in the collection
    let numberOfHamsters = snapShot.size;
   
    console.log(snapShot)
    
    snapShot.forEach(doc => {
      hamstersArray.push(doc.data());
    })
    // get a random hamster with math.random. 
    // * numberOfHamsters så den fungerar oavsett hur många hamstrar som läggs till eller tas bort. 
    res.send({ msg: `Here is your random hamster.`, randomHamster: hamstersArray[Math.floor(Math.random() * numberOfHamsters)]})

  }
  catch(err) {
    console.error(err)
    res.status(500).send(err);
  }
})


//  GET all hamsters
router.get('/', async (req,res) => {
  try {
     
    // tom array för att lägga in alla hamsters som hämtas med GET. 
    let hamstersArray = []; 
    
    // hämtar alla hamstrar i firebase. 
    let snapShot = await db.collection('hamsters').get();
    
    // loopa igenom och pusha in i hamestersarray
    snapShot.forEach(doc => {
      hamstersArray.push(doc.data());
    })

    res.send({ msg: `Here is all the hamsters, ready for war`, AllHamsters: hamstersArray })
  }
  catch(err) {
    console.error(err)
    res.status(500).send(err);
  }
 
})

//PUT wins, defeats and games
router.put('/:id/results', async (req,res) => {

  try{
    
    // find hamster with id
    let snapShot = await db.collection('hamsters').where("id", "==", parseInt(req.params.id)).get();
    
    snapShot.forEach(doc => {
      let hamster = doc.data();
      
      // updates wins, defeats och games with data from insomnia(req.body)
      let upDateResults = {
      wins: hamster.wins += parseInt(req.body.wins),
      defeats: hamster.defeats += parseInt(req.body.defeats),
      games: hamster.games + 1
    }

      // update FB with the new result
      db.collection('hamsters').doc(doc.id).update(upDateResults)
      res.send({ msg: 'Result updated', upDateResults })
      
    })
  }
  catch (err) {
    console.error(err)
    res.status(500).send();
  }
  
})

// GET hamster by ID 
router.get('/:id', async (req, res) => {
  
  try {

    let hamsterId;
    // find hamster with id
    let snapShot = await db.collection('hamsters').where("id", "==", parseInt(req.params.id)).get();

    snapShot.forEach(doc => {
      hamsterId = doc.data();
    })
    res.send({ msg: `Here is the hamster you were looking for:`, hamster: hamsterId })
  }
  catch(err) {
    console.error(err)
    res.status(500).send(err);
  }


})


module.exports = router;