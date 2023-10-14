import { useState } from "react";

const Login = () => {
	// set variables to track username, password and remember me
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [message, setMessage] = useState('');

	// event handler for input changes
	const handleEmailChange = (event) => {
		event.preventDefault();
		setEmail(event.target.value);
	};
	const handlePasswordChange = (event) => {
		event.preventDefault();
		setPassword(event.target.value);
	};
	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	// event handler for form submission
	const handleSubmit = (event) => {
		event.preventDefault(); // prevent form submission on refresh i.e.

		if (email.trim() === "" || password.trim() === "") {
			alert("Please fill in both email and password fields.");
			return; // Do not proceed with submission if fields are empty
		}

		console.log("Email:", email);
		console.log("Password:", password);
		console.log("Remember Me:", rememberMe);

		// Perform the form submission using fetch to send the data to the server
		fetch("/auth", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message === "Authentication successful") {
					// Authentication succeeded; you can redirect or set user state here.
					setMessage("Authentication successful");
				} else {
					// Authentication failed; you can show an error message.
					setMessage("Authentication failed");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				setMessage("An error occurred");
			});
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900 bg-transparent">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img
						className="w-14 h-14 mr-2"
						src="../../src/assets/Gym-Fitness-club-logo.png"
						alt="logo"
					/>
					FitNest
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							action="/signin"
							onSubmit={handleSubmit}
						>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									value={email}
									onChange={handleEmailChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
									required=""
								/>
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									value={password}
									onChange={handlePasswordChange}
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required=""
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											checked={rememberMe}
											onChange={handleRememberMeChange}
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											required=""
										/>
									</div>
									<div className="ml-3 text-sm">
										<label className="text-gray-500 dark:text-gray-300">
											Remember me
										</label>
									</div>
								</div>
								<a
									href="#"
									className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Forgot password?
								</a>
							</div>
							<button
								type="submit"
								className="w-full text-black bg-cyan-300 hover:bg-cyan-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-400 dark:hover:bg-green-400 dark:focus:bg-cyan-400"
							>
								Sign in
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?{" "}
								<a
									href="#"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Sign up
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
