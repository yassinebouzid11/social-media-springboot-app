import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostContext from "../store/PostContext";

export const CreatePostForm = () => {
    const [user]=useState(1)
    const { createPost } = useContext(PostContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
        title,
        description,
        };

        try {
        await createPost(postData, user); // assuming user has uid
        navigate("/"); // redirect to homepage or posts list
        } catch (err) {
        console.error("Failed to create post", err);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
            />
            <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
            />
            <input
            type="submit"
            value="Create"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            />
        </form>
        </div>
    );
};
