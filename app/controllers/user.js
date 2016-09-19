var User = require('../models/user');

// signin
exports.showSignup = function(req, res) {
	res.render('signup', {
		title: '注册页面'
	});
}

exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '登录页面'
	});
}
 
exports.signin = function(req, res) {
	var _user = req.body.user;
	var name = _user.name;
	var passowrd = _user.password;

	User.findOne({name:name}, function(err, user) {
		if(err) {
			console.log(err);
		}

		if(!user) {
			return res.redirect('/signup');
		}
		user.comparePassword(passowrd, function(err, isMatch) {
			if(err) {
				console.log(err);
			}

			if(isMatch) {
				req.session.user = user;
				return res.redirect('/');
			} else {
				return res.redirect('/signin');
			}
		});
	});
};

// logout
exports.logout = function(req, res) {

	delete req.session.user;
	// delete app.locals.user;
	res.redirect('/');
};



// signup
exports.signup = function(req, res) {
	var _user = req.body.user;

	// 查找用户名是否存在
	User.findOne({name:_user.name}, function(err, user) {
		if(err) {
			console.log(err);
		}

		if(user) {
			return res.redirect('/signup');
		} else {
			var user = new User(_user);
			// 保存用户
			user.save(function (err, user) {
				if(err) {
					console.log(err);
				}
				console.log(_user);
				res.redirect('/');
			});
		}
	});
};
// user_list
exports.list = function(req, res) {

	User.fetch(function(err, users) {
		if(err) {
			console.log(err);
		}
		res.render('user_list', {
			title: '用户列表',
			users: users
		});
	});
};

// middware for user
exports.signinRequired = function (req, res, next) {
	var user = req.session.user;
	if(!user) {
		return res.redirect('/signin');
	}
	next();
}

exports.adminRequired = function (req, res, next) {
	var user = req.session.user;
	if(user.role <= 10) {
		return res.redirect('/signin');
	} 
	next();
}











