const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  // try {
    const posts = await loadPostsCollection();  
    res.send(await posts.find({}).toArray());
  // } catch (error) {
  //   return res.send(error)
  // }
});

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  // try {
    const client = await mongodb.MongoClient.connect(
      'mongodb+srv://admin:admin@firstcluster-lic1d.mongodb.net/test?retryWrites=true',
      // 'mongodb://admin:admin@firstcluster-shard-00-00-lic1d.mongodb.net:27017,firstcluster-shard-00-01-lic1d.mongodb.net:27017,firstcluster-shard-00-02-lic1d.mongodb.net:27017/test?ssl=true&replicaSet=FirstCluster-shard-0&authSource=admin&retryWrites=true',
      {
        useNewUrlParser: true
      }  );
  
    return client.db('vue_express').collection('posts');  
  // } catch (error) {
  //   console.log(error)
  // }
 
}

module.exports = router;
