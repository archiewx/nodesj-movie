var mongoose = require("mongoose");


var MovieSchema = new mongoose.Schema({
	guider : String,
	title : String,
	language : String,
	country : String ,
	source : String,
	poster : String,
	summary: String,
	year : Number,
	meta : {
		createAt : {
			type : Date,
			default : Date.now()
		},
		updateAt :{
			type : Date,
			default : Date.now()
		}
	}
});

MovieSchema.pre("save" , function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt;
	}else {
		this.meta.updateAt = Date.now;
	}
	next();
})

MovieSchema.statics = {
	fetch : function (cb) {
		return this
				.find({})
				.sort("meta.updateAt")
				.exec(cb);
	},
	findById : function( id ,cb) {
		return this
				.findOne({_id : id})
				.exec(cb);
	},
	// remove: function(id, cb) {
	// 	return this
	// 			.remove({_id: id})
	// 			.exec(cb);
	// }
}

module.exports = MovieSchema;
