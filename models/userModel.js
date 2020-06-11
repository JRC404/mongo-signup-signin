const {Schema, model} = require('mongoose');

const user = new Schema({
	userName: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true, unique: true},
}, {
	toObject: {virtuals: true}
});

user.statics.validateUser = async function(body) {

	let user = await this.findOne({userName: body.userName});

	if (!user) {
		return false;
	}

	if (user.password != body.password) {
		return false;
	}

	return user;
	// console.log(this); // Model { users }
}

module.exports = model('users', user);