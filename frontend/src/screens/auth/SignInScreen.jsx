import React, { useState } from "react";
import styled from "styled-components";
import { FormGridWrapper, FormTitle } from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import AuthOptions from "../../components/auth/AuthOptions";
import { Link } from "react-router-dom";
import { BaseButtonBlack } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const SignInScreenWrapper = styled.section`
  .form-separator {
    margin: 32px 0;
    display: flex;
    align-items: center;
    column-gap: 18px;

    @media (max-width: ${breakpoints.lg}) {
      margin: 24px 0;
    }

    .separator-text {
      border-radius: 50%;
      min-width: 36px;
      height: 36px;
      background-color: ${defaultTheme.color_purple};
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
    }

    .separator-line {
      width: 100%;
      height: 1px;
      background-color: ${defaultTheme.color_platinum};
    }
  }

  form {
    margin-top: 24px;

    .form-elem-text {
      margin-top: -16px;
      display: block;
    }
  }

  .form-grid-content {
    display: flex;
    gap: 40px;

    @media (max-width: ${breakpoints.lg}) {
      flex-direction: column;
      gap: 20px;
    }

    .form-grid-left {
      flex: 1;
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }

    .form-grid-right {
      flex: 1;
      max-width: 400px;
    }
  }

  .account-rel-text {
    margin-top: 16px;
    font-size: 14px;
  }

  .custom-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    position: relative;
  }

  .custom-input-label {
    font-size: 14px;
    font-weight: 500;
  }

  .custom-input {
    padding: 12px;
    border: 1px solid ${defaultTheme.color_platinum};
    border-radius: 4px;
    width: 100%;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
      border-color: ${defaultTheme.color_purple};
      outline: none;
    }
  }

  .password-toggle-btn {
    position: absolute;
    right: 12px;
    top: 42px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: ${defaultTheme.color_purple};
    font-weight: 500;

    &:hover {
      color: ${defaultTheme.color_black};
    }
  }
`;

const SignInScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <SignInScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            {/* Left Side with Image */}
            <div className="form-grid-left">
              <img src={staticImages.form_img1} className="object-fit-cover" alt="Sign In" />
            </div>

            {/* Right Side with Form */}
            <div className="form-grid-right">
              <FormTitle>
                <h3>Sign In</h3>
              </FormTitle>

              <AuthOptions />

              <div className="form-separator flex items-center justify-center">
                <span className="separator-line"></span>
                <span className="separator-text">OR</span>
                <span className="separator-line"></span>
              </div>

              <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Email or Username */}
                <div className="custom-input-wrapper">
                  <label htmlFor="email" className="custom-input-label">
                    Email Address
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    className="custom-input"
                  />
                </div>

                {/* Password */}
                <div className="custom-input-wrapper">
                  <label htmlFor="password" className="custom-input-label">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                    className="custom-input"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Forgot Password */}
                <Link to="/reset" className="form-elem-text text-end font-medium">
                  Forgot your password?
                </Link>

                {/* Sign In Button */}
                <BaseButtonBlack type="submit" className="form-submit-btn">
                  Sign In
                </BaseButtonBlack>
              </form>

              {/* Sign Up Link */}
              <p className="flex flex-wrap account-rel-text">
                Don&apos;t have an account?
                <Link to="/sign_up" className="font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignInScreenWrapper>
  );
};

export default SignInScreen;
