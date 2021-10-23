import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Card,
    CardContent,
} from "@material-ui/core";
import DenseAppBar from "../components/Appbar";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { showError } from "../components/toaster";
import { getUserById as getUserByIdAction } from '../redux/authentication';

const UserDetails = (props) => {
    const { id } = useParams();
    const { getUserById } = props;
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const request = {
            id: id
        }
        getUserById( request,(json) => {
            console.log('hiiiii', request)
            if(json.success) {
                setUserData(json.data);
                console.log(json.data)
            } else {
                showError(json.message);
            }
        })
    }, [ getUserById, id])

    return (
        <>
            <DenseAppBar />
            <Card sx={{ maxWidth: 345 }} style={{    width: "219px",
                marginTop: "60px",
                marginLeft: "50px",
                border: "1px solid blue"}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {userData.firstName} {userData.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {userData.email}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
UserDetails.propTypes = {
    getUserById: PropTypes.func.isRequired,
};

export default connect(null, { getUserById: getUserByIdAction})(UserDetails);