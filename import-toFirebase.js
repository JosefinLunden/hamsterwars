const hamsters = require('./data.json');
const { auth, db } = require('./firebase');


const importToFirestore = () => {
  try {
      hamsters.forEach(hamster => {
          db.collection('hamsters').doc().set(hamster);
          console.log('Json exported to firebase ');
      });
  } catch (err) {
      console.error(err);
  }
}

importToFirestore();