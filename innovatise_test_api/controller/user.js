const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
module.exports = {
	/**
	 * User registration.
	 *
	 * @param {string}      firstName
	 * @param {string}      lastName
	 * @param {string}      email
	 * @param {string}      password
	 *
	 * @returns {Object}
	 */
	userRegister(req, res){
		UserModel.findOne({ email: req.body.email }).then((user) => {
			console.log('userrr-->>', user)
			if (user) {
				console.log('user--->>', user);
				res.send({success: false, message: "E-mail already in use"});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						res.send({ success: false, error: err })
					}
					else {
						const request = {
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							password: hash
						}
						UserModel.create(request).then((resp) => {
							res.send({ success: true, message: 'User registered successfully', data: resp })
						})
							.catch((err) => {
								res.send({ success: false, message: err });
							})
					}
				})
			}
		});
	},
/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
	userLogin(req, res) {
		UserModel.findOne({ email: req.body.email }).then((user) => {
			if (user) {
				bcrypt.compare(req.body.password,user.password,function (err,same) {
					if(same){
								let userData = {
									_id: user._id,
									firstName: user.firstName,
									lastName: user.lastName,
									email: user.email,
								};
								//Prepare JWT token for authentication
								const jwtPayload = userData;
								const jwtData = {
									expiresIn: process.env.JWT_TIMEOUT_DURATION,
								};
								const secret = process.env.JWT_SECRET;
								//Generated JWT token with Payload and secret.
								userData.token = jwt.sign(jwtPayload, secret, jwtData);
								res.send({success: true, data: userData})

						}else{
							res.send({success: false, message: 'Incorrect password'})
						}
				});
			} else {
				res.send({success: false, message: 'User doesnot exists'})
			}
		});
	},
/**
 * Get users.
 * 
 * @returns {Array}
 */
	getUsers(req, res) {
		UserModel.find({}).then(resp => {
			console.log('resp--->',resp)
			const newArray = resp.map((el) =>  { 
				let data = {
					firstName: el.firstName,
					lastName: el.lastName,
					email: el.email,
					id: el._id
				}
				return data;
			});
			console.log('newwArray', newArray);
			res.send({success: true, data: newArray})
		}).catch(err => {
			res.send({success: true, error: err})
		})
	},
/**
 * Get users by id.
 * @param {string}  id
 *
 * @returns {Array}
 */
	getUserById(req,res) {
		if(!req.params.id) {
			res.send({status: 'error', message: 'No id is provided'})
		} else {
			UserModel.findOne({_id: req.params.id}).then(resp => {
				const data = {
					firstName: resp.firstName,
					lastName: resp.lastName,
					email: resp.email,
					id: resp._id
				}
				res.send({success: true, data: data})
			}).catch(err => {
				res.send({success: false, error: err})
			})
		}
	}
}