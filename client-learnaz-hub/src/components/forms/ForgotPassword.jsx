import { useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const defaultTheme = createTheme();


function ForgotPassword() {
  const [errMsg, setErrMsg] = useState("");

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const resetUrl = `${baseUrl}/auth/forgot-password`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userEmail = { email: data.get("email") };

    try {
      await axios.post(resetUrl, userEmail);
      alert("Password reset link sent to your email");
    } catch (error) {
      setErrMsg(error.response.data.message);
    }
  };

  return (
    <section className="mt-28 mb-10 py-5">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <div className={`${!errMsg && "invisible"} text-red-400 h-5`}>
              <p>{errMsg}</p>
            </div>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Registered Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={() => setErrMsg("")}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </section>
  );
}

export default ForgotPassword;
