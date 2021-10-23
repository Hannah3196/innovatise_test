import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
    Typography,
    Grid,
    Card,
    CardMedia,
    CardActions,
    CardContent,
    Button,
} from "@material-ui/core";
import DenseAppBar from "../components/Appbar";
import {
    getUsers as getUserAction,
} from "../redux/authentication";
import { showError } from "../components/toaster";
import UserImage from "../images/user-icon.png";

const useStyles = makeStyles((theme) => ({
    title: {
        color: "#3f51b5",
        fontWeight: 600,
    },
    item: {
        padding: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
    tablehead: {
        backgroundColor: "#3f51b5",
    },
    tablecell: {
        color: "#fff",
        fontWeight: 600,
    },
    emptyrow: {
        textAlign: "center",
        fontSize: "small",
        height: "30px",
    },
    root: {
        maxWidth: 345,
        marginTop: '20px',
    },
    media: {
        height: 140,
    },
}));

const UserList = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { getUsers } = props;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers( (json) => {
            if (json.success) {
                setUsers(json.data);
            } else {
                showError(json.message);
            }
        });
    }, [getUsers]);

    const handleHistoryClick = (event, user) => {
        history.push({ pathname: `/user/${user.id}` })
    }

    return (
        <>
            <DenseAppBar />
            <Grid container>
                <Grid item container>
                    {users &&
                        users.length > 0 &&
                        users.map((user) => (
                            <Grid item key={user.id} xs={6}>
                                <Card className={classes.root}>
                                    <CardMedia
                                        className={classes.media}
                                        image={UserImage}
                                        title={user.firstName}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {user.firstName}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            He/she is an active user.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={(event) => handleHistoryClick(event, user)}>
                                            View Details
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    {users.length === 0 && (
                        <Grid container justify="center">
                            <Typography variant="h6">No users!!!</Typography>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
};
UserList.propTypes = {
    getUsers: PropTypes.func.isRequired,
};

export default connect(null, {
    getUsers: getUserAction,
})(UserList);
