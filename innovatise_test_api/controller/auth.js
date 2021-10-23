let jwt = require('jsonwebtoken');

module.exports = {
	checkToken(req, res, next) {
		let token = req.headers['x-access-token'] || req.headers['authorization'];
		if (token && token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		}

		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.json({
						status: 'error',
						message: 'Token is not valid'
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.json({
				status: 'error',
				message: 'Auth token in not given'
			})
		}
	}
};
