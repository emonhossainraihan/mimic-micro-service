const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

var commentsByPostId = {};
var commentIndex = 0;

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  var comments = commentsByPostId[postId] || [];

  comments.push({ id: commentIndex, content, postId, status: 'pending' });
  commentsByPostId[postId] = comments;
  try {
    await axios.post(`http://event-bus-srv:4005/events`, {
      type: 'commentCreated',
      data: { id: commentIndex, content, postId, status: 'pending' },
    });
  } catch (e) {
    console.log(e);
  }

  commentIndex += 1;
  res.send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'commentModerated') {
    const { id, content, postId, status } = data;
    const comment = commentsByPostId[postId].filter(
      (comment) => comment.id === id
    );
    comment.status = status;
    console.log(`status from comments/event:`, status)
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'commentUpdated',
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }
  console.log(`event received ${type}`);
  res.send({});
});

app.listen(4001, () => {
  console.log('comment server running at 4001');
});
