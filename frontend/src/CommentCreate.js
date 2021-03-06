import React, { useState } from 'react';
import axios from 'axios';

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });
    setContent('');
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>New Comment </label>
          <input
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
            type="text"
            value={content}
          ></input>
        </div>
        <button className="btn btn-primary">submit</button>
      </form>
    </div>
  );
}
