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

  const promise1 = axios.post('http://posts-clusterip-srv:4000/events', event)
  const promise2 = axios.post('http://comments-srv:4001/events', event)
  const promise3 = axios.post('http://query-srv:4002/events', event)
  const promise4 = axios.post('http://newfeature-srv:4003/events', event)
  const promises = [promise1, promise2, promise3, promise4]; //

  Promise.allSettled(promises).
    then((results) => results.forEach((result, i) => {
      switch (i) {
        case 0:
          console.log(`POST 4000/events status:${result.status}`)
          break
        case 1:
          console.log(`POST 4001/events status:${result.status}`)
          break
        case 2:
          console.log(`POST 4002/events status:${result.status}`)
          break
        case 3:
          console.log(`POST 4003/events status:${result.status}`)
          break
      }
    }
    ));

  res.send({ status: 'OK' });
});


app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log('eventbus server running at 4005');
});
