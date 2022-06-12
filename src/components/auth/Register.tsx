import {
  Alert,
  AlertColor,
  Autocomplete,
  Button,
  Collapse,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent } from "react";
import FlexColumn from "../../styled-components/FlexColumn";
import country_list from "../../constants/country_list";
import { useState } from "react";
import { register } from "../../api/backend";
import { AxiosError } from "axios";

const initialFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  age: 16,
  gender: "",
  country: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [alertBox, setAlertBox] = useState<{
    state: boolean;
    severity: AlertColor;
    message: Array<string>;
  }>({
    state: false,
    severity: "info",
    message: [""],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { confirmPassword, ...submitData } = formData;
    try {
      const response = await register(submitData);
      if (response.status === 201) {
        setAlertBox({
          state: true,
          severity: "success",
          message: ["Congratulation! Successfully registered"],
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error?.response?.data?.meta?.target) {
          setAlertBox({
            state: true,
            severity: "error",
            message: error?.response?.data?.meta?.target.map(
              (field: string) => field + " is taken."
            ),
          });
        }
        if (error?.response?.data?.message) {
          setAlertBox({
            state: true,
            severity: "error",
            message: error?.response?.data?.message,
          });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FlexColumn>
        <Typography variant="h6">Register Account</Typography>
        <TextField
          label="username"
          variant="outlined"
          size="small"
          sx={{ maxWidth: "240px" }}
          required
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <TextField
          label="email address"
          variant="outlined"
          size="small"
          sx={{ maxWidth: "240px" }}
          type="email"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          inputProps={{ minLength: 8 }}
        />
        <TextField
          label="confirm password"
          type="password"
          variant="outlined"
          size="small"
          sx={{ maxWidth: "240px" }}
          required
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          inputProps={{ minLength: 8 }}
          error={
            formData.password !== formData.confirmPassword &&
            formData.confirmPassword !== ""
          }
        />
        <TextField
          label="age"
          type="number"
          variant="outlined"
          size="small"
          sx={{ maxWidth: "240px" }}
          required
          inputProps={{ max: 120, min: 16 }}
          helperText="16-120 years old"
          onChange={(e) => setFormData({ ...formData, age: +e.target.value })}
        />
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          sx={{ padding: "0 8px" }}
        >
          Gender
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{ padding: "0 8px" }}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <FormControlLabel
            value="male"
            control={<Radio size="small" required />}
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={<Radio size="small" required />}
            label="Female"
          />
          <FormControlLabel
            value="other"
            control={<Radio size="small" required />}
            label="Other"
          />
        </RadioGroup>
        <Autocomplete
          options={country_list}
          sx={{ width: 240 }}
          size="small"
          renderInput={(params) => (
            <TextField {...params} label="Country" required={true} />
          )}
          onChange={(e, value) => setFormData({ ...formData, country: value! })}
        />
        <Collapse in={alertBox.state}>
          <Alert severity={alertBox.severity}>
            {alertBox.message.map((field, i) => (
              <p key={i}>{field}</p>
            ))}
          </Alert>
        </Collapse>

        <Button
          color="secondary"
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          register
        </Button>
      </FlexColumn>
    </form>
  );
};

export default Register;
