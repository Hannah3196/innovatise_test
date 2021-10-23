import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { showError, showSuccess } from "./toaster";
import { registerUser as registerUserAction } from "../redux/authentication";
const styles = () => ({
	container: {
		display: "flex",
		justifyContent: "center",
		overflowY: "auto",
		maxHeight: "200px",
	},
	item: {
		padding: "4px",
	},
});
const Register = (props) => {
	const { classes, handleChangeIndex, registerUser } = props;
	const formik = useFormik({
		initialValues: {
			email: "",
			firstName: "",
			lastName: "",
			password: "",
			confirmPassword: "",
		},
		onSubmit(values) {
			const request = {
				email: values.email,
				password: values.password,
				firstName: values.firstName,
				lastName: values.lastName,
			};
			registerUser(request, (json) => {
				if (json.success) {
					handleChangeIndex(0);
					showSuccess("User registration completed.");
				} else {
					showError(json.message);
				}
			});
		},
		validationSchema: Yup.object().shape({
			firstName: Yup.string().required("First Name is Required"),
			lastName: Yup.string().required("Last Name is Required"),
			email: Yup.string().email("Enter a valid email").required("Email is required"),
			password: Yup.string().required("Enter your password"),
			confirmPassword: Yup.string().required("Confirm your password").oneOf([Yup.ref("password")], "Password does not match"),
		}),
	});
	return (
		<>
			<Grid className={classes.container} container justify="center">
				<form onSubmit={formik.handleSubmit}>
					<Grid item xs={12} className={classes.item}>
						<TextField
							id="firstName"
							label="First Name"
							value={formik.values.firstName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={formik.touched.firstName ? formik.errors.firstName : ""}
							error={formik.touched.firstName && Boolean(formik.errors.firstName)}
							margin="dense" variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} className={classes.item}>
						<TextField
							id="lastName"
							label="Last Name"
							value={formik.values.lastName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={formik.touched.lastName ? formik.errors.lastName : ""}
							error={formik.touched.lastName && Boolean(formik.errors.lastName)}
							margin="dense"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} className={classes.item}>
						<TextField
							id="email"
							label="Email"
							type="email"
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
					<Grid item xs={12} className={classes.item}>
						<TextField
							id="password"
							label="Password"
							type="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={formik.touched.password ? formik.errors.password : ""}
							error={formik.touched.password && Boolean(formik.errors.password)}
							margin="dense"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} className={classes.item}>
						<TextField
							id="confirmPassword"
							label="Confirm Password"
							type="password"
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
							error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
							margin="dense"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} container justify="center" className={classes.item} >
						<Button type="submit" variant="contained" color="primary">
							REGISTER
						</Button>
					</Grid>
				</form>
			</Grid>
		</>
	);
};
Register.propTypes = { registerUser: PropTypes.func.isRequired, };
export default connect(null,
	{ registerUser: registerUserAction }
)(withStyles(styles)(Register));