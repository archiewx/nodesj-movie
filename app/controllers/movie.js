var Movie = require("../models/movie");
var _ = require("underscore");
// list page
exports.list = function(req , res) {
	Movie.fetch( function( err, movies) {
		if(err) {
			console.log(err);
		}
		res.render("list" , {
			title : 'Movie 列表页' ,
			movies : movies
		})
	})
}

// new
exports.new = function(req , res) {
	res.render("admin" , {
		title : 'Movie 后台录入页',
		movie : {
			title : '',
			guider : '',
			country : "",
			year : "",
			poster : "",
			source : "",
			summary : "",
			langauge : ""
		}
	})
}

// admin update
exports.update = function(req, res) {
	var id = req.params.id;
	if(id ) {
		Movie.findById(id , function(err, movie) {
			if(err) {
				console.log(err);
			}
			res.render("admin" , {
				title : "后台更新页",
				movie : movie
			})
		})
	}
}

// save
exports.save = function(req ,res) {
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	console.log(id);
	if( id !== "undefined") {
		Movie.findById(id , function( err, movie) {
			if( err ) 
				console.log(err);
			// 合并movie和 movieObj对象，保留不同内容
			_movie = _.extend(movie , movieObj);
			_movie.save(function(err, movie) {
				if( err) {
					console.log(err);
				}
				res.redirect('/movie/' + movie._id);
			})
		});
	}else {
		_movie = new Movie( {

			guider : movieObj.guider,
			title : movieObj.title,
			country : movieObj.country,
			language :movieObj.language,
			year : movieObj.year,
			poster : movieObj.poster,
			summary : movieObj.summary,
			source : movieObj.source
		});
		_movie.save(function(err , movie) {
			if( err ) {
				console.log(err);
			}
			res.redirect("/movie/" + movie._id);
		})
	}
}

// detail page
exports.detail = function(req , res) {
	var id = req.params.id;
	Movie.findById(id , function(err , movie) {
		res.render("detail" , {
			title : movie.title,
			movie : movie
		});
	});

}

// list delete movie

exports.del = function(req, res) {
	var id = req.query.id;

	if(id) {
		Movie.remove({_id: id}, function (err, movie) {
			if(err) {
				console.log(err);
			} else {
				res.json({success: 1});
			}
		});
	}
}