var mongoose = require('moogoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new moogoose.Schema({
	movie: {type: ObjectId, ref: 'Movie'},
	from: {type: ObjectId, ref: 'User'},
	to: {type: ObjectId, ref: 'User'},
	content: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}

}); 

CommentSchema.pre('save', function(next) {
	if(this.isNew) {

	}
});







