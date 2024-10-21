import React, { useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CheckboxGroup,
  FormGridWrapper,
  FormTitle,
} from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import AuthOptions from "../../components/auth/AuthOptions";
import { FormElement, Input } from "../../styles/form";
import { Link } from "react-router-dom";
import { BaseButtonBlack } from "../../styles/button";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpScreenWrapper = styled.section`
  form {
    margin-top: 40px;
    .form-elem-text {
      margin-top: -16px;
      display: block;
    }
  }
  .text-space {
    margin: 0 4px;
  }
`;

const StyledInput = styled(Input)`
  border: 2px solid ${({ isValid, isTouched }) => 
    isTouched ? (isValid ? 'green' : 'red') : '#ccc'};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ isValid, isTouched }) => 
      isTouched ? (isValid ? 'green' : 'red') : '#66afe9'};
  }
`;

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    zipCode: Yup.string().min(4, "Zip Code must be 4 numbers").required("Zip Code is required"),
    profileImage: Yup.mixed()
      .required("A profile image is required")
      .test("fileSize", "Image size is too large. Max 2MB.", (value) => {
        return value && value.size <= 2 * 1024 * 1024;
      })
      .test("fileType", "Unsupported file format. Allowed: jpeg, png.", (value) => {
        return value && ["image/jpeg", "image/png"].includes(value.type);
      }),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      zipCode: "",
      profileImage: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("address", values.address);
        formData.append("zipCode", values.zipCode);
        if (values.profileImage) {
          formData.append("profileImage", values.profileImage);
        }

        const url = "http://localhost:4000/api/auth/signup";
        await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Registration successful!");
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed");
      }
    },
  });

  return (
    <SignUpScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img
                src={staticImages.form_img2}
                className="object-fit-cover"
                alt=""
              />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Sign Up</h3>
                <p className="text-base">
                  Sign up for free to access to in any of our products
                </p>
              </FormTitle>
              <AuthOptions />
              <form onSubmit={formik.handleSubmit}>
                <FormElement>
                  <div className="form-elem-block full-width">
                    <label htmlFor="username" className="forme-elem-label">
                      Username
                    </label>
                    <StyledInput
                      id="username"
                      type="text"
                      placeholder="Enter Your Username"
                      className="form-elem-control"
                      isValid={!formik.errors.username}
                      isTouched={formik.touched.username}
                      {...formik.getFieldProps("username")}
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div className="form-elem-text text-danger">
                        {formik.errors.username}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-elem-block">
                    <label htmlFor="email" className="forme-elem-label">
                      Email
                    </label>
                    <StyledInput
                      id="email"
                      type="text"
                      placeholder="Enter Your Email"
                      className="form-elem-control"
                      isValid={!formik.errors.email}
                      isTouched={formik.touched.email}
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="form-elem-text text-danger">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-elem-block">
                    <label htmlFor="password" className="forme-elem-label">
                      Password
                    </label>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <StyledInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="form-elem-control"
                        isValid={!formik.errors.password}
                        isTouched={formik.touched.password}
                        {...formik.getFieldProps("password")}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{ marginLeft: "8px" }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="form-elem-text text-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-elem-block">
                    <label htmlFor="firstName" className="forme-elem-label">
                      First Name
                    </label>
                    <StyledInput
                      id="firstName"
                      type="text"
                      placeholder="Enter Your First Name"
                      className="form-elem-control"
                      isValid={!formik.errors.firstName}
                      isTouched={formik.touched.firstName}
                      {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="form-elem-text text-danger">
                        {formik.errors.firstName}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-elem-block">
                    <label htmlFor="lastName" className="forme-elem-label">
                      Last Name
                    </label>
                    <StyledInput
                      id="lastName"
                      type="text"
                      placeholder="Enter Your Last Name"
                      className="form-elem-control"
                      isValid={!formik.errors.lastName}
                      isTouched={formik.touched.lastName}
                      {...formik.getFieldProps("lastName")}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="form-elem-text text-danger">
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-elem-block">
                    <label htmlFor="phoneNumber" className="forme-elem-label">
                      Phone
                    </label>
                    <StyledInput
                      id="phoneNumber"
                      type="text"
                      placeholder="Enter Your Phone Number"
                      className="form-elem-control"
                      isValid={!formik.errors.phoneNumber}
                      isTouched={formik.touched.phoneNumber}
                      {...formik.getFieldProps("phoneNumber")}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <div className="form-elem-text text-danger">
                        {formik.errors.phoneNumber}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-elem-block">
                    <label htmlFor="address" className="forme-elem-label">
                      Address
                    </label>
                    <StyledInput
                      id="address"
                      type="text"
                      placeholder="Enter Your Address"
                      className="form-elem-control"
                      isValid={!formik.errors.address}
                      isTouched={formik.touched.address}
                      {...formik.getFieldProps("address")}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <div className="form-elem-text text-danger">
                        {formik.errors.address}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-elem-block">
                    <label htmlFor="zipCode" className="forme-elem-label">
                      Zip Code
                    </label>
                    <StyledInput
                      id="zipCode"
                      type="text"
                      placeholder="Enter Your Zip Code"
                      className="form-elem-control"
                      isValid={!formik.errors.zipCode}
                      isTouched={formik.touched.zipCode}
                      {...formik.getFieldProps("zipCode")}
                    />
                    {formik.touched.zipCode && formik.errors.zipCode ? (
                      <div className="form-elem-text text-danger">
                        {formik.errors.zipCode}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-elem-block">
                    <label htmlFor="profileImage" className="forme-elem-label">
                      Profile Image
                    </label>
                    <input
                      id="profileImage"
                      type="file"
                      accept="image/jpeg, image/png"
                      onChange={(event) => {
                        formik.setFieldValue("profileImage", event.currentTarget.files[0]);
                      }}
                    />
                    {formik.touched.profileImage && formik.errors.profileImage ? (
                      <div className="form-elem-text text-danger">
                        {formik.errors.profileImage}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-elem-block">
                    <BaseButtonBlack type="submit" className="full-width">
                      Sign Up
                    </BaseButtonBlack>
                  </div>
                </FormElement>
              </form>

              <p className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/sign_in" className="text-space">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignUpScreenWrapper>
  );
};

export default SignUpScreen;
