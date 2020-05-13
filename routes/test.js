try {
  let hamsterId;
  let results;
  let hamsterQuery = await db.collection('hamsters')
      .where("id", "==", parseInt(req.params.id)).get();

  hamsterQuery.forEach(async hamster => {
      let hamsterResults = hamster.data()
      hamsterId = hamster.id
      results = {
          wins: hamsterResults.wins + req.body.wins,
          defeats: hamsterResults.defeats + req.body.defeats,
          games: hamsterResults.games + req.body.games
      }

      await db.collection('hamsters').doc(hamsterId).update(results)

  })

  res.status(200).send({ msg: "Result updated with", newResult: results })

} catch (err) {
  console.error(err)
  res.status(500).send(err)
}