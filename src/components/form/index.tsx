import { useForm } from "react-hook-form";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import type { AuthForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useLazyGetStateInstanceQuery } from "../../store/api/greenApi";
import { useEffect } from "react";

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<AuthForm>({ mode: "onChange" });
  const [getStateInstance, {isFetching, isSuccess, data}] = useLazyGetStateInstanceQuery()
  const navigate = useNavigate();

  const onSubmit = (data: AuthForm) => {
    getStateInstance(data)
  };

  useEffect(()=>{
    if(isSuccess && data?.stateInstance === 'authorized'){
      const formValues = getValues();
      localStorage.setItem('idInstance', formValues.idInstance);
      localStorage.setItem('apiTokenInstance', formValues.apiTokenInstance)
      navigate('/chat');
    }
  },[isSuccess])

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Authenticate</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="ID Instance"
            variant="outlined"
            margin="normal"
            {...register("idInstance", {
              required: "ID Instance is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "ID must be a number",
              },
            })}
            error={!!errors.idInstance}
            helperText={errors.idInstance?.message}
          />

          <TextField
            fullWidth
            label="API Token"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("apiTokenInstance", {
              required: "API Token is required",
              minLength: {
                value: 10,
                message: "API Token must be at least 10 characters",
              },
            })}
            error={!!errors.apiTokenInstance}
            helperText={errors.apiTokenInstance?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isValid || isFetching}
            sx={{ mt: 2 }}
          >
            {isFetching ? "Authenticating..." : "Authenticate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
