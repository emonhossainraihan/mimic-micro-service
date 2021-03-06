import React from 'react';

export default function CommentList({ comments }) {
  const renderComments = comments.map((comment) => {
    let content
    if (comment.status === 'approved') {
      content = comment.content
    }
    if (comment.status === 'pending') {
      content = 'This comment is waiting for moderation'
    }
    if (comment.status === 'rejected') {
      content = 'This comment is rejected'
    }
    return <li key={comment.id}>{content}</li>;
  });
  return <ul>{renderComments}</ul>;
}
