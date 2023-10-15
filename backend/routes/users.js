import express from "express";
import UserX from "../models/UserX.js";

const router = express.Router();

// Route to get all users
router.get("/", async (req, res) => {
	try {
		const users = await UserX.findAll();
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Route to register new user
router.post("/register", async (req, res) => {
	const { first_name, last_name, email, password } = req.body;

	// Check if the email already exists
	const existingUser = await UserX.findOne({ where: { email } });

	if (existingUser) {
		return res.status(400).json({ message: "Email already exists" });
	}

	// Hash the user's password
	// const hashedPassword = await bcrypt.hash(password, 10);

	// Before creating the user, log the values
	console.log("first_name:", first_name);
	console.log("last_name:", last_name);
	// Create a new user
	try {
		const newUser = await UserX.create({
			first_name,
			last_name,
			email,
			password,
		});
		return res
			.status(201)
			.json({ message: "User registered successfully", user: newUser });
	} catch (error) {
		return res.status(500).json({ error: "Registration failed" });
	}
});

export default router;
