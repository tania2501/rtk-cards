import { Paper } from "@mui/material";
import React from "react";
import { ReduxForm } from "../ReduxForm/ReduxForm";
import s from './Login.module.css'

export const Login = () => {
  return <div>
    <Paper elevation={3} className={s.paper}>
      <ReduxForm />
    </Paper>
  </div>;
};
