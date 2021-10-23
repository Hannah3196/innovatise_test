import React from 'react';
import { Grid, Tabs, Tab, AppBar, Card, Typography } from '@material-ui/core';
import Background from '../images/background.jpg';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import LoginComponent from '../components/Login';
import Register from '../components/Register';


const useStyles = makeStyles({
    container: {
        height: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    },
    card: {
        maxHeight: '400px',
        width: '300px',
        marginLeft: '10%',
        marginTop: '10%'
    },
    title: {
        fontWeight: 600,
        textAlign: 'center',
        padding: '8px',
    },
    image: {
        height: '20px',
        width: '20px',
        marginRight: '10px',
        marginBottom: '3px'
    }
});


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            >
                {value === index && (
                    <>{children}</>
                )}
            </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

const allyProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Login = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const handleChangeIndex = (index) => {
        setValue(index);
    }
    return (
        <Grid container className={classes.container}>
            <Grid container spacing={0} direction="column" alignItems="flex-start">
                <Card className={classes.card}>
                    <Grid className={classes.root}>
                        <Grid container justifyContent="center">
                            <Toolbar>
                                <Typography variant="h6" noWrap>Innovatise Test</Typography>
                            </Toolbar>
                        </Grid>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicateColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label=""
                            >
                                <Tab label="Login" {...allyProps(0)} />
                                <Tab label="Register" {...allyProps(1)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse': 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <LoginComponent />
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <Register handleChangeIndex={handleChangeIndex}/>
                            </TabPanel>
                        </SwipeableViews>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Login;