const UserModel = require('../models/userModel');

exports.getSignup = (req, res) => {
    res.render('signup');
}

exports.createUser = async(req, res) => {
	if (!req.body.userName || !req.body.email || !req.body.password) {
		res.render('signup', {err: "Please provide all credentials"});
		return;
	}

	const user = new UserModel({
		userName: req.body.userName,
		email: req.body.email,
		password: req.body.password
	});

	let isDuplicate = false;

	await user.save().catch((reason) => {

		res.render('signup', {err: "A user with this user name or email already exists"});

		isDuplicate = true;
		return
	});

	if (isDuplicate) {
		return
	}

	res.redirect(`/profile/?userName=${req.body.userName}`);
}

exports.getLogin = (req, res) => {
	res.render('login');
}

exports.login = async(req, res)=> {
	if (!req.body.userName || !req.body.password) {
		res.render('login', {err: "Please provide all credentials"});
		return;
	}

	let user = await UserModel.validateUser(req.body); // false || user document

	if (user) { //user is returned
		console.log(user);

		// success, render profile page
		res.render('profile', {user: user.toObject()});
		return;
	}

	res.render('login', {err: "the entered password is incorrect"});
}

exports.getProfile = async(req, res) => {
	let user = await UserModel.findOne({userName: req.query.userName});

	if (user == null) {
		res.render('profile', {err: "that user doesn't exist"});
		return;
	}

	res.render('profile', {user: user.toObject()});
}