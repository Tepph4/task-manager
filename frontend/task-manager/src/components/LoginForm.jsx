// src/components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../service/auth";
import { useAuth } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
// import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AuthLayout from "../layouts/AuthLayout.jsx";


const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameErrorMessage, setusernameErrorMessage] = useState("");
  const [passwordErrorMessage, setpasswordErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginAPI(username, password);
      login(token, user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  //   const validateInputs = (username , password) => {
  //   // const username = document.getElementById('username');
  //   // const password = document.getElementById('password');

  //   let isValid = true;

  //   if (!username.value || !/\S+@\S+\.\S+/.test(username.value)) {
  //     setUsernameError(true);
  //     setusernameErrorMessage('Please enter a valid username address.');
  //     isValid = false;
  //   } else {
  //     setUsernameError(false);
  //     setusernameErrorMessage('');
  //   }

  //   if (!password.value || password.value.length < 4) {
  //     setPasswordError(true);
  //     setpasswordErrorMessage('Password must be at least 6 characters long.');
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setpasswordErrorMessage('');
  //   }

  //   return isValid;
  // };

  return (
    <AuthLayout>
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              error={usernameError}
              helperText={usernameErrorMessage}
              id="Username"
              type="Username"
              name="Username"
              placeholder="Username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              variant="outlined"
              color={usernameError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "baseline" }}
              >
                Forgot your password?
              </Link>
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // onClick={validateInputs(username, password)}
          >
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <span>
              <Link href="/signup" variant="body2" sx={{ alignSelf: "center" }}>
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </AuthLayout>
  );
}

export default LoginForm;
