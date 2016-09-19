var mongoose = require('moogoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new moogoose.Schema({
	movie: {type: ObjectId, ref: 'Movie'},
	from: {type: ObjectId, ref: 'User'},
	to: {type: ObjectId, ref: 'User'},
	Content: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		}
	}

}); 