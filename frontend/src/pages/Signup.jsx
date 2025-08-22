import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeaderDashed from "../components/HeaderDashed";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post("http://localhost:5001/api/users/register", values);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed";
      toast.error(msg);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="Signup-Page text-center sec-padd"

    >
      <div className="container">
        <HeaderDashed head1="Sign" head2="UP" />

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-5 d-flex flex-column gap-4 align-items-center border p-4 border-2">
              <div className="d-flex flex-column w-100 align-items-start">
                <label htmlFor="name" className="mb-2 fs-4">Name</label>
                <Field name="name" type="text" placeholder="Enter Name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger mt-2" />
              </div>

              <div className="d-flex flex-column w-100 align-items-start">
                <label htmlFor="email" className="mb-2 fs-4">Email</label>
                <Field name="email" type="email" placeholder="Enter Email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger mt-2" />
              </div>

              <div className="d-flex flex-column w-100 align-items-start">
                <label htmlFor="password" className="mb-2 fs-4">Password</label>
                <Field name="password" type="password" placeholder="Enter Password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger mt-2" />
              </div>

              <motion.button type="submit" disabled={isSubmitting} className="btn btn-dark w-100">
                Sign Up
              </motion.button>

              <Link to="/login" className="text-primary mt-3">
                Already have an account? Login
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default Signup;

