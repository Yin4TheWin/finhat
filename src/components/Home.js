import React from 'react';
import Navbar from './Navbar'
import Hero from '../images/hero.jpg'
import Pulse from 'react-reveal/Pulse';
import GalleryEntry from './GalleryEntry'
import { Paper, makeStyles, Typography, Grid, Avatar } from '@material-ui/core';
import Logo from '../images/twinhat.png'
import RegisterStep from '../images/RegisterStep.png'
import DashboardStep from '../images/DashboardStep.png'
import VisitStep from '../images/VisitStep.png'

const useStyles = makeStyles((theme)=>({
    root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
    hero: {
        display: "flex",
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage:`url(${Hero})`
      }, panelTwo: {
        width: '100%',
        height: '100vh',
        spacing: 0,
      },
      text: {
       fontSize: 60,
       alignSelf: 'center'
      }, aboutText: {
          paddingLeft: '2vw',
          margin: 'auto'
      }, paper: {
        display: "flex",
        flexDirection: 'column',
        alignItems:'center',
        height: '100%'
      }, aboutPaper: {
          margin: 'auto',
          width: '88%',
      },
      whiteText:{
        color: "#ededed"
      }
}))
export default function Homepage(){
    const classes=useStyles();
    return(<React.Fragment>
        <Navbar/>
        <Paper className={classes.hero} variant="outlined" elevation={3}>
            <img src={Logo} style={{}} alt="logo"/>
            <div style={{width: '50%', textAlign:'center'}}>
            <Typography variant="h3" className={classes.whiteText}>The Two Minute Chat</Typography>
            <br></br>
              <Typography variant="h6" className={classes.whiteText}>Set up a live customer service chat for your company (or an anonymous chat with your friends) in under two minutes, for free.</Typography>
            </div>
        </Paper>
        <Paper className={classes.aboutPaper}>
          <br/>
          <Typography variant="h3" id="games" style={{textAlign:"center", paddingTop: "2vh", paddingBottom: "2vh"}}>Setup Instructions</Typography>
      <p className={classes.aboutText}>Setting up a chat room is super simple, and can be done in less than two minutes. Simply follow the instructions below.</p>
      <br/>
      <Grid container spacing={3} style={{margin:'auto', width:'98%'}}>
          <Grid item xs={12} sm={4}>
            <GalleryEntry image={RegisterStep} title="1. Register" caption="Navigate to the top right corner of your screen and click the Login button. Then, at the bottom of the form that appears, click Register. Register for an account with a unique email, as well as any username and a secure password."/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <GalleryEntry image={DashboardStep} title="2. Pick a name, then create" caption="After successfully registering, you will be taken to your dashboard. Here, you can view and edit your previously created chatrooms. To create a new one, enter a creative name into the Chat Name box, then press the Create button."/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <GalleryEntry image={VisitStep} title="3. View your chatroom!" caption="That's it! After creation, the link to your new chatroom will be displayed on screen. If you are signed into this website while visiting your chatroom, your name will be bolded and say MODERATOR. Moderation options and the ability to invite more moderators will come in the future."/>
          </Grid>
      </Grid>
      <br/><br/>
            <Pulse>
            <Typography variant="h3" id="about" style={{textAlign:"center", paddingTop: "2vh", paddingBottom: "2vh"}}>Featured Companies</Typography>
            <Typography variant="h6" style={{textAlign:"center", paddingBottom: "2vh"}}>A few companies, groups, or products who use TwinHat for their customer service solution.</Typography>
            </Pulse>
            <br/>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
                <br></br>
                <Avatar>Y</Avatar>
                <br></br>
                <Typography variant="h6">You could be featured here!</Typography>
                <br></br>
                <Typography style={{width:'90%', margin:'auto'}}>
                  Want your company or product to be featured here, along with an icon and description of your choice? Send me an email at yin4thewin@gmail.com to learn more and get it featured for free!
                </Typography>
                <br></br>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
                <br></br>
                <Avatar>Y</Avatar>
                <br></br>
                <Typography variant="h6">You could be featured here!</Typography>
                <br></br>
                <Typography style={{width:'90%', margin:'auto'}}>Want your company or product to be featured here, along with an icon and description of your choice? Send me an email at yin4thewin@gmail.com to learn more and get it featured for free!</Typography>
                <br></br>
            </Paper>
            </Grid>
      </Grid>
      <br/><br/><br/>
        </Paper>
    </React.Fragment>)
}