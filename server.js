require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const connectDB = require("./db/db.js");
const User = require("./db/User.js");
const bcrypt = require("bcryptjs");
const secret = "feet are awful";
const jwt = require("jsonwebtoken");

app.use(express.static(__dirname + "/"));
//AuthCheck!
const authCheck = async (req, res, next) => {
	const token = req.query.t;
	if (!token) {
		console.log("no token, redirecting");
		res.redirect("/welcome?err=Access%20denied.%20You%20must%20log%20in.");
	} else {
		try {
			const decoded = jwt.verify(token, secret);
			const userExists = await User.findById(decoded.user.id);
			console.log('looking for user id', decoded.user.id);

			if (!userExists) {
				console.log("user does not exist, redirecting");
			res.redirect("/welcome?err=Access%20denied.%20You%20must%20log%20in.");
			}
			else {
				next();
			}
		} catch (err) {
			console.log("err, redirecting");
			res.redirect(
				"/welcome?err=Access%20denied.%20You%20must%20log%20in."
			);
		}
	}
};

app.get("/spacePic", function (req, res) {
	res.sendFile(path.join(__dirname, "./spacePic.html"));
});

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "./welcome.html"));
});

app.get("/welcome", function (req, res) {
	res.sendFile(path.join(__dirname, "./welcome.html"));
});

app.get("/earth", authCheck, function (req, res) {
	console.log("requested earth file");
	res.sendFile(path.join(__dirname, "./three.html"));
});
app.get("/signup", function (req, res) {
	res.sendFile(path.join(__dirname, "./signup.html"));
});

app.get("/signIn", function (req, res) {
	res.sendFile(path.join(__dirname, "./signIn.html"));
});

app.post("/signup", jsonParser, async function (req, res) {
	console.log(req.body);
//Sign Up!!! Make a new User!
	try {
		console.log(req.body);
		let newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(newUser.password, salt);

		const createdUser = await newUser.save();

		const payload = {
			user: {
				id: createdUser.id,
			},
		};

		jwt.sign(payload, secret, { expiresIn: 3000 }, (err, token) => {
			if (err) {
				console.log(err);
				throw err;
			} else {
				res.json({ token: token });
			}
		});
	} catch (err) {
		res.status(413).json({ err: err.message });
	}
});

app.post("/signIn", jsonParser, async function (req, res) {
	console.log(req.body);
//Sign In!!!
	try {
		const data = req.body;
		const userExists = await User.findOne({ email: data.email });
		if (!userExists) {
			console.log("No Such User");
			res.status(400).json({
				message:
					"Access Denied. Don't try to log into my website with the wrong user you imbecile.",
			});
		} else {
			const pwdMatch = await bcrypt.compare(
				data.password,
				userExists.password
			);
			if (!pwdMatch)
				res.status(400).json({
					message:
						"Wrong Password Idiot!",
				});
		}
		const payload = {
			user: {
				id: userExists.id,
			},
		};
		jwt.sign(payload, secret, { expiresIn: 3000 }, (err, token) => {
			if (err) {
				console.log(err);
				throw err;
			} else {
				res.json({ token: token });
			}
		});
	} catch (err) {
		res.status(422).json({ err: err.message });
	}
});

app.listen(3000, function () {
	console.log("listening!");
});

connectDB();
