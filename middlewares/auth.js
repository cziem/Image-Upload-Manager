const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
	const token = req.header("x-auth-token")
	if (!token) res.status(401).send("Access Denied! No token provided")

	try {
		const decode = jwt.verify(token, process.env.SECRET_KEY)
		req.user = decode

		next()
	} catch (error) {
		res.status(400).json({
			message: "Invalid Token",
			error
		})
	}
}
