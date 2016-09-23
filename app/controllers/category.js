var Category = require('../models/category');

exports.new = function(req, res) {
	res.render('category_admin', {
		title: '后台分类录入页',
		category: {}
	});
}

exports.save = function(req, res) {
	var _category = req.body.category;
	var category = new Category(_category);

	console.log('category:' + category);

	category.save(function(err, category) {
		if(err) {
			console.log(err);
		}

		res.redirect('/admin/category/list');
	})
}

// category list
exports.list = function (req, res ) {
	Category.fetch( function( err, categories) {

		console.log(categories);

		if(err) {
			console.log(err);
		}
		res.render('category_list', {
			title: 'imooc 分类列表',
			categories: categories
		});
	})
}