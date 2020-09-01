const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'commentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    console.log(`status from moderation/events:`, status);

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'commentModerated',
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      },
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log('moderation server running at 4003');
});
