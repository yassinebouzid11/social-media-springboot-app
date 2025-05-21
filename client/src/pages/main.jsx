
import { useState, useEffect, useContext } from "react";

import { Post } from "../components/post";

import { PostSearch } from "../components/postSearch";
import { RightSidebar } from "../components/rightSidbar";
import '../styles/main.css'
import CommentList from "../components/commentsList";
import PostContext from "../store/PostContext";
import AuthContext from "../store/AuthContext";

export const Main = () => {

    const [user] = useState(true);

    const [searchInput, setSearchInput] = useState("");

    const {postsList, showComments}=useContext(PostContext)
    
    
    const filteredPosts = postsList.filter((post) =>
        post.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (
        <div className="container">
        {showComments &&
            <div className="comment-layout">
                <div className="comment-section">
                    <CommentList />
                </div>
            </div>
        }
        <div className="main-content">
                <PostSearch searchInput={searchInput} setSearchInput={setSearchInput} />
                {filteredPosts.map((post) => (
                <Post key={post.id} post={post} user={user} />
                ))}
        </div>
            {user && (
                <div className="right-sidebar">
                    <RightSidebar />
                </div>
            )}
        </div>
        
    );
};
