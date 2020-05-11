const { Router } = require('express');
const router = new Router(); 
const { auth, db } = require ('./../firebase');

// GET random hamster
router.get('/random', async (req , res) => {

  try {
    let hamster;
    let randomHamsterId = Math.floor(Math.random() * 41); // försöka lösa utan *41. 
    let snapShot = await db.collection('hamsters').where("id", "==", randomHamsterId).get();
    console.log(snapShot)
    
    snapShot.forEach(doc => {
      hamster = doc.data();
      console.log(hamster)
    })
    res.send(hamster)

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
    
    // get all hamsters from firebase.
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

//PUT wins and defeats 
router.put('/:id/results', async (req,res) => {
  
  try{
    // find hamster with id
    let snapShot = await db.collection('hamsters').where("id", "==", parseInt(req.params.id)).get();
    console.log(req.body)
    console.log(snapShot)
    snapShot.forEach(doc => {
      let hamster = doc.data();
      
      // update wins, defeats, games 
      hamster.wins += parseInt(req.body.wins);
      hamster.defeats += parseInt(req.body.defeats);
      hamster.games ++;

      // update FB.
      db.collection('hamsters').doc(doc.id).set(hamster)
      .then(res.send({ msg: 'Hamster updated' }))
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