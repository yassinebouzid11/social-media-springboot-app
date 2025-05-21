import { createContext, useEffect, useState} from "react";
import axios from "axios";
const PostContext=createContext({
    postsList: [],
    comments:[],
    commentPostId: "",
    showComments: false,
    setShowComments: () => {},
    handleComment: (postId) => {},
})
export default PostContext;

export const PostProvider = ({ children }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentPostId, setCommentPostId] = useState(""); 
    const [postsList, setPostsList] = useState([]);
    const [comments, setComments] = useState([]);
    const [likesByPost, setLikesByPost] = useState({}); // { postId: likeCount }
    const [userLikes, setUserLikes] = useState({});     // { postId: true/false }

    const fetchLikesForPost = async (postId, userId) => {
        try {
            const [countRes, userRes] = await Promise.all([
            axios.get(`http://localhost:8080/likes/count/${postId}`),
            axios.get(`http://localhost:8080/likes/hasliked/${postId}/1`),
            ]);
            setLikesByPost((prev) => ({ ...prev, [postId]: countRes.data }));
            setUserLikes((prev) => ({ ...prev, [postId]: userRes.data }));
        } catch (error) {
            console.error("Error fetching like data", error);
        }
    };

    const likePost = async (postId, userId) => {
    try {
        await axios.post(`http://localhost:8080/likes/add/${postId}/1`);
        setLikesByPost((prev) => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
        setUserLikes((prev) => ({ ...prev, [postId]: true }));
    } catch (err) {
        console.error("Error liking post", err);
    }
};

    const unlikePost = async (postId, userId) => {
        try {
            await axios.post(`http://localhost:8080/likes/delete/${postId}/1`);
            setLikesByPost((prev) => ({ ...prev, [postId]: Math.max(0, (prev[postId] || 1) - 1) }));
            setUserLikes((prev) => ({ ...prev, [postId]: false }));
        } catch (err) {
            console.error("Error unliking post", err);
        }
    };

    const fetchComments = async (postId) => {
        try {
        const response = await axios.get(`http://localhost:8080/comments/${postId}`);
        console.log("Fetched comments:", response.data);
        setComments(response.data);
        } catch (error) {
        console.error("Error fetching comments:", error);
        }
    };

    const handleComment = async (postId) => {
        setShowComments(!showComments);
        setCommentPostId(postId);
        await fetchComments(postId);
    };

    const createPost = async (postData, userId) => {
    try {
        const response = await axios.post(`http://localhost:8080/posts/user/1`, postData);
        setPostsList((prev) => [response.data, ...prev]); 
    } catch (error) {
        console.error("Error creating post", error);
        throw error;
    }
    };


    useEffect(() => {
        const fetchAllPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/posts/all");
            setPostsList(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
        };
        fetchAllPosts();
    }, []);

    return (
        <PostContext.Provider
        value={{
            postsList,
            showComments,
            commentPostId,
            handleComment,
            comments,
            setShowComments,
            fetchComments,
            likesByPost,
            userLikes,
            fetchLikesForPost,
            likePost,
            unlikePost,
            createPost 
        }}
        >
        {children}
        </PostContext.Provider>
    );
};
