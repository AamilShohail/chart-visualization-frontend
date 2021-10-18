import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function PasswordResetForm() {
  const [UsernameField, setUsernameField] = useState(false);
  const [CodeBtn, setCodeBtn] = useState(true);
  const [CodeField, setCodeField] = useState(false);
  const handleBtn = () => {
    setUsernameField(true);
    setCodeField(true);
    setCodeBtn(true);
  };
  return (
    <>
      <Box
        sx={{
          width: 500,
          marginBottom: 2,
        }}
      >
        <Grid container>
          <Grid xs={8}>
            <TextField
              fullWidth
              style={{ paddingBottom: 5 }}
              label="Username"
              id="fullWidth"
              disabled={UsernameField}
              required
              onChange={() => setCodeBtn(false)}
            />
          </Grid>
          <Grid xs={4}>
            <Button
              style={{ marginTop: 10 }}
              onClick={handleBtn}
              size="small"
              disabled={CodeBtn}
            >
              Send Code
            </Button>
          </Grid>
        </Grid>
        {CodeField && (
          <Alert severity="info">
            Please find the OTP in your registered Email
          </Alert>
        )}
        {CodeField && (
          <Alert style={{ marginBottom: 5, marginTop: 5 }} severity="warning">
            OTP is valid for few seconds only
          </Alert>
        )}
        {CodeField && (
          <FormControl>
            <TextField required label="OTP" id="fullWidth" />
          </FormControl>
        )}
      </Box>
    </>
  );
}
