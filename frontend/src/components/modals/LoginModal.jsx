import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("running", data);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        // navigate("/home");
        console.log("res", res);
        toast.success("Login Successfull!");
        handleClose();
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.message);
      });
    // dispatch(login(data));
  };

  return (
    <>
      <Link to onClick={handleShow}>
        Login
      </Link>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body className="p-0">
          <div className="common_author_boxed rounded-3">
            <div className="common_author_heading">
              <h3>Login your account</h3>
              <h2>Logged in to stay in touch</h2>
            </div>
            <div className="common_author_form mt-3 p-3">
              <form onSubmit={handleSubmit(onSubmit)} id="main_author_form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter user name"
                    required
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                    {...register("password", { required: true })}
                  />
                  {/* <Link to >Forgot password?</Link> */}
                </div>
                <div className="common_form_submit">
                  <button type="submit" className="btn btn_theme btn_md">
                    Log in
                  </button>
                </div>
                {/* <div className="have_acount_area">
                  <p>
                    Dont have an account?{" "}
                    <Link to="register.html">Register now</Link>
                  </p>
                </div> */}
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
