const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt');
const validate = require('mongoose-validator');

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required field!'],
	},
	email: {
		type: String,
		required: [true, 'Email is required field!'],
		unique: true,
		uniqueCaseInsensitive: true,
		validate: [validate({
			validator: 'isEmail',
			message: 'Please provide a valid email'
		})]
	},
	password: {
		type: String,
		required: [true, 'Password is required field!'],
		minlength: [1, 'Password must be of 8 characters or more.']
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: { type: Date },
	deletedAt: { type: Date },
});

// hashing password before saving
UserSchema.pre('save', async function (next) {
	const user = this;

	const hash = await bcrypt.hash(this.password, 10);

	this.password = hash;

	next();
});

// hashing password before updating
UserSchema.pre('findOneAndUpdate', async function (next) {
	const update = this.getUpdate();

	const hash = await bcrypt.hash(update.password, 10);

	update.password = hash;

	next();
});

UserSchema.methods.isValidPassword = async function (password) {
	const user = this;
	return await bcrypt.compare(password, user.password);
}

UserSchema.plugin(uniqueValidator, { message: "{VALUE} already exists." });

module.exports = mongoose.model('User', UserSchema);
