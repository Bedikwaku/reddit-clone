import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Grid, Snackbar, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useUser } from "../context/AuthContext";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";

interface IFormInput {
  username: string;
  password: string;
}

export default function Signup() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signInError, setSignInError] = useState<string>("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await Auth.signIn(data.username, data.password);
      router.push(`/`);
    } catch (error) {
      console.error(error);
      setSignInError(error.message);
      setOpen(true);
    }
  };

  const handleClose = (evenet?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid
        style={{ marginTop: 16 }}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item>
          <TextField
            variant="outlined"
            id="username"
            label="Username"
            type="text"
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username.message : null}
            {...register("username", {
              required: { value: true, message: "Please enter a username." },
              minLength: {
                value: 3,
                message: "Please enter a username between 3-16 characters.",
              },
              maxLength: {
                value: 16,
                message: "Please enter a username between 3-16 characters.",
              },
            })}
          />
        </Grid>

        <Grid item>
          <TextField
            variant="outlined"
            id="password"
            label="Password"
            type="password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : null}
            {...register("password", {
              required: { value: true, message: "Please enter a password." },
              minLength: {
                value: 8,
                message: "Please enter a stronger password",
              },
            })}
          />
        </Grid>

        <Grid>
          <Button variant="contained" type="submit">
            SignIn
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {signInError}
        </Alert>
      </Snackbar>
    </form>
  );
}
