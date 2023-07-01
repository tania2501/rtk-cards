import React from "react";
import s from "./CreateNewPassword.module.css";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "../../SingUp/auth.slice";
import { useNavigate, useParams } from "react-router-dom";

export const CreatePassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ password: string }>({
    mode: "onChange",
  });
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const submitHandler: SubmitHandler<{ password: string }> = (data) => {
    dispatch(
      authThunks.setPassword({
        password: data.password,
        resetPasswordToken: {token}.token,
      })
    ).then(res => {
      if(res.meta.requestStatus === 'fulfilled') {
        return navigate('/rtk-cards/login')
      }
    })
    console.log({token})
  };
  return (
    <div className={s.main}>
      <h2>Create new password</h2>
      <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
        <p className={s.error}> {errors.password && errors.password.message}</p>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="standard-adornment-password" color="secondary">
            Password
          </InputLabel>
          <Input
            fullWidth
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            color="secondary"
            {...register("password", {
              required: "Field is required",
              minLength: {
                value: 4,
                message: "Password length should be at least 4 characters",
              },
              maxLength: {
                value: 12,
                message: "Password cannot exceed more than 12 characters",
              },
              pattern: { value: /^\S*$/, message: "No spaces allowed" },
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <p className={s.text}>
          Create new password and we will send you further instructions to email
        </p>
        <Button type="submit" variant="contained" color="secondary" fullWidth disabled={!isValid}>
          Create new password
        </Button>
      </form>
    </div>
  );
};
