import React, { useState } from "react";
import axios from "axios";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5000/register", {
				email,
				password,
			});
			alert(response.data.message);
		} catch (error) {
			alert(error.response.data.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Register</h2>
			<div>
				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button type="submit">Register</button>
		</form>
	);
};

export default Register;
