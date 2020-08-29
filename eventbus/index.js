const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

var events = [];


app.post('/events', async (req, res) => {
  const event = req.body;
  events.push(event)

  // try {
  //   console.log(`event received ${event.type}`)
  //   await axios.post('http://localhost:4000/events', event);
  //   console.log('event sent to 4000')
  //   await axios.post('http://localhost:4001/events', event);
  //   console.log('event sent to 4001')
  //   await axios.post('http://localhost:4002/events', event);
  //   console.log('event sent to 4002')
  //   await axios.post('http://localhost:4003/events', event);
  //   console.log('event sent to 4003')
  // } catch (e) {
  //   console.log(e);
  // }

  const promise1 = axios.post('http://localhost:4000/events', event)
  const promise2 = axios.post('http://localhost:4001/events', event)
  const promise3 = axios.post('http://localhost:4002/events', event)
  const promise4 = axios.post('http://localhost:4003/events', event)
  const promises = [promise1, promise2, promise3, promise4];

  Promise.allSettled(promises).
    then((results) => results.forEach((result) => console.log(result.status)));

  res.send({ status: 'OK' });
});


app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log('eventbus server running at 4005');
});
