import Post from '../models/Post.js'
import User from '../models/user.js'

// CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId: userId,
            firstname: user.firstname,
            lastname: user.lastname,
            location: user.location,
            description,
            picturepath,
            userPicturePath: user.picturepath,
            likes: {},
            comments: []
        });

        await newPost.save();

        const post = await Post.find();
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Read
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id)
        const isliked = post.likes.get(userId)

        if(isliked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedpost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedpost);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}