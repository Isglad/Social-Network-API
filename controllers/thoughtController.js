const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    getAllThoughts(req, res){
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).
            json(err));
    },

    // Get one thought by ID
    getThoughtById(req, res){
      Thought.findOne( { _id: req.params.id})
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought found with that ID' })
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },

    // create a thought and push the created thought's id to the associated user's thoughts array field 
    createThought( { body }, res) {
        Thought.create({ thoughtText: body.thoughtText, username: body.username })
          .then(({ _id }) => 
            User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            ))
          .then((thought => res.json(thought)))
          .catch((err) => res.status(500).json(err));
    },

    // Update a thought by its id
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Delete a thought by its id
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.id })
        .then((thought) => 
          !thought
            ? res.status(404).json({ message: "No thought found with this ID!" })
            : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => res.status(500).json(err));
    },

    // create a reaction stored in a single thought's reactions array field
    createReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
    // createReaction({ params, body }, res) {
    //   Thought.findOneAndUpdate(
    //     { _id: params.thoughtId },
    //     { $push: { reactions: { reactionBody: body.reactionBody, username: body.username } } },
        { runValidators: true, new: true }
      )
      .then((thought) => 
        !thought 
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },

    // pull and remove a reaction by the reaction's reactionId value
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
      .then((thought) => 
        !thought 
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json({ message: "Reaction removed successfully!" })
      )
      .catch((err) => res.status(500).json(err));
    },
}