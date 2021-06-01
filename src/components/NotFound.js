import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Disc from '../logo.svg'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          ThinHat
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function NotFound(){
    const classes = useStyles();
    return(<Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar} src={Disc}>
      </Avatar>
      <br></br>
      <Typography component="h1" variant="h5">
        Chat Room Not Found :(
      </Typography>
      <br></br>
      <Typography>
          Sorry! We could not find a chat room with that address. Please ensure you typed the address correctly. If you would like 
          to create a chatroom at this address, please <Link href="/dashboard">
              {"click here to be taken to the room creation page."}
            </Link>
      </Typography>
    </div>
    <Box mt={8}>
        <Copyright />
      </Box>
  </Container>)
}