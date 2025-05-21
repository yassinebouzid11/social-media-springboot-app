import { createContext,  useState } from "react";
import axios from "axios";


const CommentContext = createContext({
    commentText: "",
    setCommentText: () => {},
    handleAddComment: (postId) => {},
});

export default CommentContext;

export const CommentProvider = ({ children }) => {
    const [commentText, setCommentText] = useState("");
    
    
    const handleAddComment = async (postId, userId) => {
    try {
        const response = await axios.post(
        `http://localhost:8080/comments/${postId}/${1}`,
        { text: commentText },
        {
            headers: {
            'Content-Type': 'application/json',
            },
        }
        );
        console.log("Comment added:", response.data);
        
        setCommentText(""); 
    } catch (error) {
        console.error("Error posting comment:", error);
    }
};


    return (
    <CommentContext.Provider
        value={{
            commentText,
            setCommentText,
            handleAddComment,
        }}
        >
        {children}
    </CommentContext.Provider>
    );
};
