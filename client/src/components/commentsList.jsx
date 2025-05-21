import { useContext, useState } from 'react';
import AddComment from './AddComment';

import '../styles/comments.css';

import PostContext from '../store/PostContext';

function CommentList({ idPost }) {
  const [user] = useState(true);


  const {comments, commentPostId}=useContext(PostContext)
  return (
    <div className="comments-section">
      <h3>Comments ({comments.length})</h3>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-text">{comment.text}</div>
            <div className="comment-time">
              {comment.createdAt} 
            </div>  
          </div>
        ))}
      </div>
      <AddComment idPost={commentPostId} userId={user.uid}/>
    </div>
  );
}

export default CommentList;