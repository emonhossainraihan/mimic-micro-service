import React, { useState } from 'react';
import axios from 'axios';


export default function PostCreate({ setPosts }) {
  const [title, setTitle] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post('http://posts.com/posts/create', { title });

    // try to reload/refresh my posts again 
    // setPosts in ./PostList.js 
    // async function refreshPosts(setPosts) {
    //   const res = await axios.get('http://posts.com/posts')
    //   // const data = await res.json()
    //   await setPosts(res.data)
    // }
    setTitle('')
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>title</label>
          <input
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
          ></input>
        </div>
        <button className="btn btn-primary">submit</button>
      </form>
    </div>
  );
}
