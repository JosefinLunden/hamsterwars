const { Router } = require('express');
const router = new Router(); 
const { auth, db } = require ('./../firebase');


router.get('/top', async (req,res) => {

  try {
    // empty array to put the five hamsters in.
    let hamstersArray = []; 
    // find the hamsters, limit(5) to only return five and orderby() sort the data returned in descending order. 
    let snapShot = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get()

    snapShot.forEach(doc => {
      hamstersArray.push(doc.data());
    })
  
    res.send(hamstersArray)


  }
  catch(err) {
    console.error(err)
    res.status(500).send(err);

  }
})

router.get('/bottom', async (req,res) => {

  try {

    let hamstersArray = []; 
    
    let snapShot = await db.collection('hamsters').orderBy('defeats', 'desc').limit(5).get()

    snapShot.forEach(doc => {
      hamstersArray.push(doc.data());
    })
  
    res.send(hamstersArray)



  }
  catch(err) {
    console.error(err)
    res.status(500).send(err);

  }

})



module.exports = router; 