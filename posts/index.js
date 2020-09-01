const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

var posts = {};
var index = 0;

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const { title } = req.body;
  posts[index] = { id: index, title };
  try {
    await axios.post(`http://event-bus-srv:4005/events`, {
      type: 'postCreated',
      data: posts[index],
    });
  } catch (e) {
    console.log(e);
  }

  index += 1;
  res.send(posts[index]);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log(`event received ${type}`);
  res.send({});
});

app.listen(4000, () => {
  console.log('post server running at 4000');
});
