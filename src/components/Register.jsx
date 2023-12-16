import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    c_password: "",
  });

  const [registerStatus, setRegisterStatus] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setRegisterStatus("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [registerStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.password.length < 8) {
      setRegisterStatus("Password should be at least 8 characters long");
      return;
    }

    if (values.password !== values.c_password) {
      setRegisterStatus("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:8081/register", values)
      .then((response) => {
        if (response.data.Status === "Success") {
          navigate("/login");
        } else {
          setRegisterStatus("Error");
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
            setRegisterStatus("Invalid email format");
          } else if (
            status === 500 &&
            data.message === "Email already exists"
          ) {
            setRegisterStatus(
              "Email already in use. Please use a different email."
            );
          }
          // Handle other response statuses if needed
        } else {
          setRegisterStatus("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div>
      <Container maxWidth="sm" style={{ marginTop: "100px" }}>
        <Box boxShadow={2} p={4} borderRadius={4}>
          <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
            Create Account
          </Typography>
          <form onSubmit={handleSubmit}>
            {registerStatus && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {registerStatus}
              </div>
            )}
            <div>
              <TextField
                id="username"
                name="username"
                label="Username"
                type="text"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => {
                  setValues({ ...values, username: e.target.value });
                }}
              />
            </div>
            <div>
              <TextField
                id="email"
                name="email"
                label="email"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => {
                  setValues({ ...values, email: e.target.value });
                }}
              />
            </div>
            <div>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => {
                  setValues({ ...values, password: e.target.value });
                }}
              />
            </div>
            <div>
              <TextField
                id="c_password"
                name="c_password"
                label="Confirm Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => {
                  setValues({ ...values, c_password: e.target.value });
                }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              Sign Up
            </Button>
            {/* Button to navigate back to the login page */}
            <Button
              component={Link} // Use Link component from react-router-dom
              to="/login" // Replace '/login' with the actual route for the login page
              variant="outlined"
              color="primary"
              fullWidth
              style={{ marginTop: "10px" }}
            >
              Back to Login
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default Register;
