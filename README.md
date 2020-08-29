## This is test project where I try to build(mimicking) a small microservice frontend


| service ENDPOINT      | available HTTP method | description                                            |
| --------------------- | --------------------- | ------------------------------------------------------ |
| http://localhost:4000 | GET/POST              | post service: get all posts and create a post          |
| http://localhost:4001 | GET/POST              | comment service: get all comments and create a comment |
| http://localhost:4002 | GET/POST              | query service: combine post and comment data           |
| http://localhost:4003 | POST                  | moderation service: watch 'commentCreated' event       |
| http://localhost:4005 | GET/POST              | eventbus service: watch event and dispatch event       |
| http://localhost:3000 | -                     | frontend                                               |



## Things I learnt via this project 

### `fetch` usecase:

```js
function getUser(name){
 fetch(`http://localhost:4002/posts`)
//   .then(function(response) {
//     return response.json();
//   })
  .then(function(data) {
    console.log(data);
  });
};
getUser()
```

### `Promise.allSettled(promises)`

### axios concurrent mode

[Details](https://www.pluralsight.com/guides/all-need-to-know-about-axios)

### remaining Issues to fix

- <s>when event bus got error at axios.post() then it haunt the process that why comment is not moderated after the query server alive</s>
- need refresh to fetch updated data in react application