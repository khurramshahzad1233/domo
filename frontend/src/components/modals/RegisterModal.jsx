import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "../../config/fbConfig";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RegisterModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(null);
  // const navigate = useNavigate();

  console.log(loading)
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   setData(data);

  // };

  const createUser = (data) => {
    setLoading(true);
    const auth = getAuth();
    console.log("data", data);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const userid = userCredential.user.uid;

        firebase
          .firestore()
          .collection("users")
          .doc(userid)
          .set({
            userId: userid,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.contactNo,
            email: userCredential.user.email,
            username: data.username,
          })
          .then((res) => {
            //checkout goes here
            console.log("res", res);
            toast.success("Account Created Successfully!");
            handleClose();
          })
          .catch((err) => {
            // toast.error(err.message);
            setLoading(false);
            toast.error(err.message);
            handleClose();
          });

        // navigate("/home");
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  return (
    <>
      <Link to onClick={handleShow}>
        Sign up
      </Link>
      <Modal
        className="p-0"
        size="lg"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Body className="p-0">
          <div className="common_author_boxed rounded-3">
            <div className="common_author_heading">
              <h3>Register account</h3>
              <h2>Register your account</h2>
            </div>
            <div className="common_author_form mt-3 p-3">
              <form onSubmit={handleSubmit(createUser)} id="main_author_form">
                <div className="row row-cols-1 row-cols-lg-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter first name*"
                      // required
                      {...register("firstName", { required: true })}
                    />
                    {errors.firstName && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter last name*"
                      {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address*"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile number*"
                      {...register("contactNo", { required: true })}
                    />
                    {errors.contactNo && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User name*"
                      {...register("username", { required: true })}
                    />
                    {errors.username && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password*"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="common_form_submit">
                  <button className="btn btn_theme btn_md" type="submit">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
