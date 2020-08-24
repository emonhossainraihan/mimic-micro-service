const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

var posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'postCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    console.log('post proceed');
  }
  if (type === 'commentCreated') {
    const { id, content, postId, status } = data;

    posts[postId].comments.push({ id, content, status });
    console.log('comment proceed');
  }
  if (type === 'commentUpdated') {
    const { id, postId, status } = data;

    const comment = posts[0].comments.find(
      comment => {
        return comment.id === id
      });
    comment.status = status;
    console.log('comment updated by status ', status);
  }
  res.send({});
});

app.listen(4002, () => {
  console.log('query server running at 4002');
});
