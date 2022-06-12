import {
  Alert,
  AlertColor,
  Button,
  Collapse,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { login } from "../../api/backend";
import FlexColumn from "../../styled-components/FlexColumn";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertBox, setAlertBox] = useState<{
    state: boolean;
    severity: AlertColor;
    message: Array<string>;
  }>({
    state: false,
    severity: "info",
    message: [""],
  });
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login(formData);
      console.log(response);
      setLoginSuccess(true);
      setAlertBox({
        state: true,
        severity: "success",
        message: ["Successfully logged in"],
      });
      localStorage.setItem("upfirm_ac_token", response.data.access_token);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setAlertBox({
        state: true,
        severity: "error",
        message: ["Invalid email or password"],
      });
    }
  };

  return (
    <>
      {!loginSuccess && (
        <form onSubmit={handleSubmit}>
          <FlexColumn>
            <Typography variant="h6">Login</Typography>

            <TextField
              label="email address"
              variant="outlined"
              size="small"
              sx={{ maxWidth: "240px" }}
              type="email"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              label="password"
              type="password"
              variant="outlined"
              size="small"
              sx={{ maxWidth: "240px" }}
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isLoading}
            >
              login
            </Button>
          </FlexColumn>
        </form>
      )}
      <Collapse in={alertBox.state}>
        <Alert severity={alertBox.severity}>
          {alertBox.message.map((field, i) => (
            <p key={i}>{field}</p>
          ))}
        </Alert>
      </Collapse>
    </>
  );
};

export default Login;
