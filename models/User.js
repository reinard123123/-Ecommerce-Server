//[Section] Activity
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	
	firstName: {
		type: String,
		required: [true, 'First Name is Required']
	},
	lastName: {
		type: String,
		required: [true, 'Last Name is Required']
	},
	email: {
		type: String,
		required: [true, 'Email is Required']
	},
	password: {
		type: String,
		required: [true, 'Password is Required']
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	mobileNo: {
		type: String,
		required: [true, 'Mobile Number is Required']
	}
});


module.exports = mongoose.model('User', userSchema);