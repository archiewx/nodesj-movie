var moogoose = require('mongoose');
var CommentSchema = require('../schemas/comment');
var Comment = moogoose.model('Comment', CommentSchema);

module.exports = Comment;