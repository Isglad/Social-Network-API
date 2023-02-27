const { User, Thought } = require("../models");

module.exports = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({ path: 'thoughts', select: '-__v'})
            .populate({ path: 'friends', select: '-__v'})
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Create a user
    createUser(req, res) {
        User.create({username: req.body.username, email: req.body.email})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // Get single user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({ path: 'friends', select: '-__v' })
            .populate({ path: 'thoughts', select: '-__v', populate: { path: 'reactions'}})
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that Id!" })
                    : res.json(user)    
            )
            .catch((err) => res.status(500).json(err));
    },

    // Update a user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: "No User found with that Id!" })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // delete user by id && remove a user's associated thoughts when deleted
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "No User find with that Id!" })
                    : Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: "User and Thought deleted!" }))
            .catch((err) => res.status(500).json(err));
    },

    // add a friend
    addFriend({ params },res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: "No user found with that Id!" })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // delete a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }  
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: "No user found with that Id!" })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
}