const { Router } = require('express');
const router = new Router(); 
const { auth, db } = require ('./../firebase');

// GET random hamster
router.get('/random', async (req , res) => {

  try {

    let hamstersArray = [];
    // get all hamsters from firebase
    let snapShot = await db.collection('hamsters').get();
   
    console.log(snapShot)
    
    snapShot.forEach(doc => {
      hamstersArray.push(doc.data());
    })
    // get a random hamster with math.random. 
    // * hamsterslength så den fungerar oavsett hur många hamstrar som läggs till eller tas bort. 
    res.send(hamstersArray[Math.floor(Math.random() * hamstersArray.length)])

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
    
    // loopa igenom dom och pusha in i hamestersarray
    snapShot.forEach(doc => {
      hamstersArray.push(doc.data());
    })

    res.send({hamsters: hamstersArray})
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
    
    snapShot.forEach(async doc => {
      let hamster = doc.data();
      
      // updates wins, defeats och games with data from insomnia(req.body)
      let results = {
      wins: hamster.wins += parseInt(req.body.wins),
      defeats: hamster.defeats += parseInt(req.body.defeats),
      games: hamster.games + parseInt(req.body.games)
    }

      // update FB with the new result
      await db.collection('hamsters').doc(doc.id).update(results)
      .then(res.send({ msg: 'Result updated', newResult: results }))
      .catch(err => { throw err; })
    })
  }
  catch (err) {
    console.error(err)
    res.status(500).send(err);
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
    res.send(hamsterId)
  }
  catch(err) {
    console.error(err)
    res.status(500).send(err);
  }


})


module.exports = router;