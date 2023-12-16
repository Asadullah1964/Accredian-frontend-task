import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState(""); // State for login errors
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (loginStatus) {
      timer = setTimeout(() => {
        setLoginStatus("");
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [loginStatus]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/");
        } else {
          setLoginStatus("Invalid email or password"); // Set the error message
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setLoginStatus("An error occurred. Please try again later."); // Set the error message
      });
  };
  return (
    <div>
      <Container maxWidth="sm" style={{ marginTop: "100px" }}>
        <Box boxShadow={2} p={4} borderRadius={4}>
          <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            {loginStatus && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {loginStatus}
              </div>
            )}
            <div>
              <TextField
                id="email"
                name="email"
                label="email"
                variant="outlined"
                type="email"
                margin="normal"
                fullWidth
                required
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
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
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              Login
            </Button>

            <Link to="/register">
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                style={{ marginTop: "10px" }}
              >
                Create Account
              </Button>
            </Link>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
