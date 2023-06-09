import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from './ReduxForm.module.css';

type LoginFormType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export const ReduxForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({
    mode: "onChange",
    defaultValues: { email: "" },
  });
  const submitHandler: SubmitHandler<LoginFormType> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Grid container justifyContent={"center"}>
        <Grid item xs={4} md={10}>
          <div className={s.title}>Sing in</div>
          <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
            <FormGroup>
              <div>
                {/* {props.error ? (
                  <span className={s.error}>{props.error}</span>
                ) : (
                  ""
                )} */}
                {
                  <p className={s.error}>
                    {" "}
                    {errors.email && errors.email.message}
                  </p>
                }
                <TextField
                  label="Email"
                  fullWidth
                  variant="standard"
                  color="secondary"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
              </div>
              <div>
                {
                  <p className={s.error}>
                    {" "}
                    {errors.password && errors.password.message}
                  </p>
                }
                <TextField
                  label="Password"
                  fullWidth
                  variant="standard"
                  color="secondary"
                  type="password"
                  {...register("password", {
                    required: "Field is required",
                    minLength: {
                      value: 4,
                      message:
                        "Password length should be at least 4 characters",
                    },
                    maxLength: {
                      value: 12,
                      message: "Password cannot exceed more than 12 characters",
                    },
                    pattern: { value: /^\S*$/, message: "No spaces allowed" },
                  })}
                />
              </div>
              <div className={s.remember}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("rememberMe")}
                      color="secondary"
                      size="small"
                    />
                  }
                  label="Remember me"
                />
              </div>
              <div className={s.forgot}>Forgot password?</div>
              
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  type="submit"
                  // disabled={!isValid}
                  className={s.buttons}
                >
                  Sing in
                </Button>
           
            </FormGroup>
          </form>
          <div className={s.singup}>Don`t have an account?</div>
          <Button variant="text">Sing up</Button>
        </Grid>
      </Grid>
    </div>
  );
};