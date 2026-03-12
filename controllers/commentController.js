const Comment = require('../models/commentModel');
const Video = require('../models/videoModel');


//get comments for a video
exports.getCommentsForVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    // ensure video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ status: 'fail', message: 'Video not found' });
    }

    const comments = await Comment.find({ video: videoId })
      .populate('user', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: comments.length,
      data: { comments }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// create a comment
exports.createComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { content } = req.body;

    //ensure video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ status: 'fail', message: 'Video not found' });
    }

    const comment = await Comment.create({
      content,
      user: req.user._id,
      video: videoId
    });

    const populatedComment = await comment.populate('user', 'name email');

    res.status(201).json({
      status: 'success',
      data: { comment: populatedComment }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};