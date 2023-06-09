import React from "react";
import s from "./ForgotPassword.module.css";
import { Button, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch} from "../../../app/hooks";
import { authThunks } from "../SingUp/auth.slice";
import { NavLink, useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
  } = useForm<{ email: string }>({
    mode: "onChange",
    defaultValues: { email: "" },
  });
  const navigate = useNavigate();
  const submitHandler: SubmitHandler<{ email: string }> = (data) => {
    console.log(data);
    dispatch(authThunks.forgot(data.email)).then( res => {
      if(res.meta.requestStatus === 'fulfilled') {
        return navigate('/rtk-cards/checking')
      }
    })
   
  };
  
  return (
    <div className={s.main}>
      <h3>Forgot your password?</h3>
      <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
        <TextField
          fullWidth
          variant="standard"
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
            },
          })}
        ></TextField>
        <p className={s.instruction}>
          Enter your email address and we will send you further instruction
        </p>
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Send instructions
        </Button>
      </form>
      <h5>Did you remember your password?</h5>
      <Button variant="text">
        <NavLink to="/rtk-cards/login">Try logging in</NavLink>
      </Button>
    </div>
  );
};
