import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get('http://posts.com/posts')
        // const data = await res.json()
        await setPosts(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPosts()
  }, []);



  const renderPosts = Object.values(posts).map((post) => {
    return (
      <div className="card" key={post.id}>
        <div className="card-body">
          <h1>{post.title}</h1>
          <CommentCreate postId={post.id} />
          <CommentList comments={post.comments} />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts}
    </div>
  );
}

export default PostList

