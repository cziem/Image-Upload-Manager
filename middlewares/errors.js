const express = require("express");
const app = express()

module.exports = app.use((req, res, next) => {
	const err = new Error("Resource Not Found")
	err.status = 404
	next(err)
});

module.exports = app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		error: {
			message: err.message
		}
	})
})
