var Movie = require("../models/movie")
var _ = require("underscore")
var Comment = require('../models/comment')
var Category = require('../models/category')


// list page
exports.list = function(req , res) {
	Movie.fetch( function( err, movies) {
		if(err) {
			console.log(err)
		}
		res.render("list" , {
			title : 'Movie 列表页' ,
			movies : movies
		})
	})
}

// new
exports.new = function(req , res) {
	Category.find({}, function(err, categories) {
		res.render("admin" , {
			title : 'Movie 后台录入页',
			movie : {},
			categories: categories
		})
	})
}

// admin update
exports.update = function(req, res) {
	var id = req.params.id
	if(id ) {
		Movie.findById(id , function(err, movie) {
			Category.find({}, function(err, categories) {
				if(err) {
					console.log(err)
				}
				res.render("admin" , {
					title : "后台更新页",
					movie : movie,
					categories: categories
				})
			})
		})
	}
}

// save
exports.save = function(req ,res) {
	var movieObj = req.body.movie
	var id = movieObj._id
	var _movie = null
	// 更新操作
	if( id ) {
		Movie.findById(id , function( err, movie) {
			if( err ) 
				console.log(err)
			// 合并movie和 movieObj对象，保留不同内容
			_movie = _.extend(movie, movieObj )
			console.log(movieObj)
			
			Category.findById(movie.category, function(err, category) {
				// 删除该分类下电影
				var movies = category.movies
				var index = movies.indexOf(_movie._id)
				if(index > -1) {
					movies.splice(index, 1)
					console.log(movies)
					category.movies = movies
					// 保存当前分类
					category.save(function(err, category) {
						// 添加新的分类中
						Category.findById(movieObj.category, function(err, newCategory) {
							newCategory.movies.push(_movie)
							console.log(newCategory)
							newCategory.save(function(err, category) {
								// 保存电影
								_movie.save(function(err, movie) {
									if( err) {
										console.log(err)
									}
									res.redirect('/movie/' + movie._id)
								})
							})
						})
					})
				}
			})

		})
	}else { // 插入操作
		_movie = new Movie(movieObj)
		var categoryId = movieObj.category
		var categoryName = movieObj.categoryName

		_movie.save(function(err , movie) {
			if( err ) {
				console.log(err)
			}

			// 判断是否选择分类还是自定义分类
			// 选择分类
			if(categoryId) {
				Category.findById(categoryId, function(err, category) {
					category.movies.push(movie._id)

					category.save(function(err, category) {
						res.redirect("/movie/" + movie._id)
					})
				})
			} else if(categoryName) { // 自定义分类
				var category = new Category({
					name: categoryName,
					movies: [movie._id]
				})
				category.save(function(err, category) {
					movie.category = category._id;
					movie.save(function(err, movie) {
						res.redirect('/movie/' + movie._id);
					})
				})
			}
			

		})
	}
}

// detail page
exports.detail = function(req , res) {
	var id = req.params.id
	Movie.findById(id , function(err , movie) {
		Comment
			.find({movie: id})
			// 到user表中查到name给from中name赋值
			.populate('from', 'name')
			.populate('replys.from replys.to', 'name')
			.exec(function(err, comments){
				res.render("detail" , {
					title : movie.title,
					movie : movie,
					comments: comments
				})
			})
	})

}

// list delete movie

exports.del = function(req, res) {
	var id = req.query.id

	if(id) {
		Movie.remove({_id: id}, function (err, movie) {
			if(err) {
				console.log(err)
			} else {
				res.json({success: 1})
			}
		})
	}
}