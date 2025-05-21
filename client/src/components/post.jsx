import { useContext, useEffect } from "react";
import PostContext from "../store/PostContext";
import"../styles/post.css"
export const Post = ({ post, user }) => {
    const {
        likesByPost,
        userLikes,
        fetchLikesForPost,
        likePost,
        unlikePost,
        handleComment,
    } = useContext(PostContext);

    const postId = post.id;
    const userId = user.uid;

    useEffect(() => {
        fetchLikesForPost(postId, userId);
    }, [postId, userId]);

    const userLiked = userLikes[postId] || false;
    const likes = likesByPost[postId] || 0;

    return (
        <div className="post">
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="desc">
                <p>{post.description}</p>
            </div>
            <div className="user">
                <p>@{post.username}</p>
            </div>

            <button onClick={() => userLiked ? unlikePost(postId, userId) : likePost(postId, userId)}>
                {userLiked ? <>👎</> : <>👍</>}
            </button>
            <span> Likes: {likes} </span>

            <button onClick={() => handleComment(post.id)}>Comments</button>
        </div>
    );
};
