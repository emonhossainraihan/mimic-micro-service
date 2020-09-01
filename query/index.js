const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

var posts = {};

function eventHandler(type, data) {
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
    console.log()
    const comment = posts[postId].comments.find(
      comment => {
        return comment.id === id
      });
    comment.status = status;
    console.log('comment updated by status ', status);
  }
}


app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  eventHandler(type, data)

  res.send({});
});

app.listen(4002, async () => {
  console.log('query server running at 4002');
  try {
    const res = await axios.get('http://event-bus-srv:4005/events')
    for (let event of res.data) {
      console.log(`Processing event: ${event.type}`)
      eventHandler(event.type, event.data)
    }
  } catch (e) {
    console.log(e)
  }
});
