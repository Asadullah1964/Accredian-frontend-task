import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Button, Container } from "@mui/material";

function Home() {
  const  navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");


  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        if (res.data.Status == "Success") {
          setAuth(true);
          setName(res.data.name);
         
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  }, []);

  const Logout = (e) =>{
    axios.get('http://localhost:8081/logout')
    .then(res => {
    location.reload(true);
}).catch(err => console.log(err));
  }

  return (
    <div>
      <Container maxWidth="sm">
      <Typography variant="h1" component="h1" gutterBottom>
        Welcome To Home Page
      </Typography>
      {auth ? (
        <div>
          <Typography variant="h3" gutterBottom>
            You are Authorized --- {name}
          </Typography>
          <Button variant="contained" color="error" onClick={Logout}>
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h3" gutterBottom>
            {message}
          </Typography>
          <Typography variant="h3" gutterBottom>
            Login Now
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </div>
      )}
    </Container>
    </div>
  );
}

export default Home;
