var mongoose = require("mongoose");
var MovieSchema = require("../schemas/movie");

//生成movie模型
var Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
