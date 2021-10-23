import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { loginUser as loginUserAction } from "../redux/authentication";
import { showError, showSuccess } from "./toaster";

const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 50,
  },
  container: {
    display: "Flex",
    justifyContent: "center",
  },
  actions: {
    float: "right",
  },
  item: {
    padding: "8px",
  },
});

const LoginComponent = (props) => {
  const { classes, loginUser } = props;
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit(values) {
      const request = {
        email: values.email,
        password: values.password,
      };
      loginUser(request, (json) => {
        if (json.success) {
          showSuccess("Login Success".json);
          localStorage.setItem("token", json.data.token);
          history.push("/users");
        } else {
          showError(json.message);
        }
      });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string().required("Enter your password"),
    }),
  });

  return (
    <Grid className={classes.container} container alignItems="center">
      <form onSubmit={formik.handleSubmit}>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="Email"
            type="email"
            className={classes.item}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email ? formik.errors.email : ""}
            error={formik.touched.email && Boolean(formik.errors.email)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={formik.values.password}
            className={classes.item}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.password ? formik.errors.password : ""}
            error={formik.touched.password && Boolean(formik.errors.password)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid container justify="center" item xs={12} className={classes.item}>
          <Button type="submit" color="primary" variant="contained">
            SUBMIT
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

LoginComponent.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, { loginUser: loginUserAction })(
  withStyles(styles)(LoginComponent)
);