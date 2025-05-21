import { useContext } from 'react';
import CommentContext from '../store/CommentContext';
import PostContext from '../store/PostContext';

export default function AddComment({ idPost, userId }) {
  const { handleAddComment, commentText, setCommentText } = useContext(CommentContext);
  const { fetchComments } = useContext(PostContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddComment(idPost, userId); 
    await fetchComments(idPost);            
    setCommentText("");                     
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit">Post</button>
    </form>
  );
}
