import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";

import SubscriptionForm from "../components/SubscriptionForm";
import HeaderDashed from "../components/HeaderDashed";

const animationVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0 },
};

const Contact = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleFormSubmit = async (values, { resetForm }) => {
		setLoading(true);
		const json = JSON.stringify({
			...values,
			access_key: "7d78993e-8962-489c-a26d-7ecce59ff99a", // replace with your key
		});

		try {
			const res = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: json,
			}).then((res) => res.json());

			if (res.success) {
				toast.success("Form submitted successfully!");
				resetForm();
			} else {
				toast.error(res.message || "Something went wrong!");
				setError(res.message);
			}
		} catch (error) {
			setError("Something went wrong. Please try again later.");
			toast.error("Something went wrong. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="contact-page text-center py-3 pt-5"
		>
			<div className="container">
				{/* Header */}
				<HeaderDashed head1="CONTACT" head2="US" classStyle="fw-normal fs-3" />

				{/* Contact Form */}
				<motion.div
					className="container my-5 d-flex justify-content-center"
					variants={animationVariants}
					initial="hidden"
					animate="visible"
					transition={{ duration: 1 }}
				>
					<Formik
						initialValues={{ name: "", email: "", message: "" }}
						onSubmit={handleFormSubmit}
					>
						{({ isSubmitting }) => (
							<Form
								className="d-flex flex-column gap-4 align-items-center w-100"
								style={{ maxWidth: "500px" }}
							>
								<div className="d-flex flex-column align-items-start w-100">
									<label htmlFor="name" className="mb-2 fs-5">Name:</label>
									<Field
										name="name"
										type="text"
										id="name"
										placeholder="Enter Your Name"
										className="p-3 outline-0 w-100 border-gray"
										style={{ borderRadius: "5px", border: "1px solid #ccc" }}
									/>
									<ErrorMessage name="name" component="div" className="text-danger mt-2" />
								</div>

								<div className="d-flex flex-column align-items-start w-100">
									<label htmlFor="email" className="mb-2 fs-5">Email:</label>
									<Field
										name="email"
										type="email"
										id="email"
										placeholder="example@gmail.com"
										className="p-3 outline-0 w-100 border-gray"
										style={{ borderRadius: "5px", border: "1px solid #ccc" }}
									/>
									<ErrorMessage name="email" component="div" className="text-danger mt-2" />
								</div>

								<div className="d-flex flex-column align-items-start w-100">
									<label htmlFor="message" className="mb-2 fs-5">Message:</label>
									<Field
										name="message"
										component="textarea"
										id="message"
										placeholder="Enter your message"
										className="p-3 outline-0 w-100 border-gray"
										style={{ borderRadius: "5px", border: "1px solid #ccc" }}
									/>
									<ErrorMessage name="message" component="div" className="text-danger mt-2" />
								</div>

								<button
									type="submit"
									className="btn bg-black py-2 px-4 rounded c-white fs-5 w-100"
									style={{ backgroundColor: "#1B74E4" }}
									disabled={isSubmitting || loading}
								>
									{loading ? "Submitting..." : "Submit"}
								</button>

								{error && <p className="text-danger">{error}</p>}
							</Form>
						)}
					</Formik>
				</motion.div>

				{/* Subscription Section */}
				{/* <SubscriptionForm /> */}
			</div>
		</motion.div>
	);
};

export default Contact;
