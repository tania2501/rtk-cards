import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from "react";
import { setAppError } from "app/app.slice";

export const GlobalError = () => {
  const error = useAppSelector((state) => state.app.error);
  const dispatch = useAppDispatch();

  if (error !== null) {
    toast.error(error, {toastId: error as string});
  }

  // Данный код необходим для того, чтобы занулять ошибку в стейте
  // после того как ошибка установилась.
  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(setAppError({ error: null }));
      }, 1000);
    }
  }, [error, dispatch]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};
