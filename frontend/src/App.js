import React from 'react';
import './App.css';
import PostCreate from './PostCreate';
import PostList from './PostList';

function App() {


  return (
    <div className="container">
      <h1>Create a post</h1>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
