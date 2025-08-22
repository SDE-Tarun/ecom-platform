import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import HeaderDashed from "../components/HeaderDashed";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values) => {
    setServerErrors([]);

    try {
      const res = await axios.post("http://localhost:5001/api/users/login", values);
      login(res.data.user);
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setServerErrors([msg]);
      toast.error(msg);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="Login-Page text-center sec-padd">
      <div className="container">
        <HeaderDashed head1="Log" head2="IN" />

        <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="mt-5 d-flex flex-column gap-4 align-items-center border p-4 border-2">
              <div className="d-flex flex-column w-100 align-items-start">
                <label htmlFor="email" className="mb-2 fs-4">Email</label>
                <Field name="email" type="email" placeholder="Enter Email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger mt-2" />
              </div>

              <div className="d-flex flex-column w-100 align-items-start">
                <label htmlFor="password" className="mb-2 fs-4 d-flex justify-content-between w-100">
                  Password
                  <span className="cursor c-gray" onClick={() => setShowPassword(p => !p)}>Show</span>
                </label>
                <Field name="password" type={showPassword ? "text" : "password"} placeholder="Enter Password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger mt-2" />
              </div>

              {serverErrors.length > 0 && (
                <div className="text-danger">
                  {serverErrors.map((err, i) => <p key={i}>{err}</p>)}
                </div>
              )}

              <motion.button type="submit" disabled={isSubmitting} className="btn btn-dark w-100">
                Login
              </motion.button>

              <Link to="/register" className="text-primary mt-3">Don’t have an account? Sign up</Link>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default Login;
