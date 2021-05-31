import React from 'react';
import Navbar from './Navbar'
import Hero from '../images/hero.jpg'
import Pulse from 'react-reveal/Pulse';
import GalleryEntry from './GalleryEntry'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Paper, makeStyles, Typography, Grid, Avatar } from '@material-ui/core';
import Cutscene from '../images/hero.jpg'
import Title from '../images/hero.jpg'
import Fight from '../images/hero.jpg'
import Logo from '../images/twinhat.png'

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
        color: "#d1cdca"
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
              <Typography variant="h6" className={classes.whiteText}>Set up a live customer service chat for your company (or an anonymous chat for your friends!) in under two minutes, for free.</Typography>
            </div>
        </Paper>
        <Paper className={classes.aboutPaper}>
            <Pulse>
                <Typography variant="h3" id="about" style={{textAlign:"center", paddingTop: "2vh", paddingBottom: "2vh"}}>Welcome to NNMG Studios</Typography>
            </Pulse>
            <p className={classes.aboutText}>Hello</p>
            <Typography variant="h5" fontWeight="fontWeightBold" m={1} style={{paddingTop: "2vh", paddingLeft: "2vw"}}>Meet the Team</Typography>
            <br/>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
                <br></br>
                <Avatar>Y</Avatar>
                <br></br>
                <Typography variant="h6">Franklin "YinFTW" Yin</Typography>
                <br></br>
                <Typography style={{width:'90%', margin:'auto'}}>Hi everyone! My name's Franklin (or Yin4TheWin), and I'm the developer for NNMG. I do all the code stuff for the game, and I made this site as well! If you want to see this site's code you can check it out <a href="https://github.com/Yin4TheWin/nnmg-site">here</a> on Github. I'm still pretty new to React, so feedback would be appreciated: hit me up at yin4thewin@gmail.com.<br/><br/>Other reasons to hit me up include questions about the game, loneliness, boredom or literally anything. We're also always open for new programmers, writers, voice actors or artists, so let me know about that too!</Typography>
                <br></br>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
                <br></br>
                <Avatar>D</Avatar>
                <br></br>
                <Typography variant="h6">Duke of Marlins (Name anon)</Typography>
                <br></br>
                <Typography style={{width:'90%', margin:'auto'}}>Duke of Marlins is your friendly fish for writing. The Duke of Marlins holds the following credits, as their subjects will testify under the threat of becoming undone: Saving the world multiple times, predicting the fate of the universe, being a really good writer, and coming up with the pre-production title of this game: MarlinQuest. If there are any queries or criticisms of the game, please ask someone else. They are solely responsible for 5% of the plot, and not actually programming. The Duke will update accordingly when they hear about it.<br/><br/></Typography>
                <br></br>
            </Paper>
            </Grid>
      </Grid>
      <br/>
      <Typography variant="h3" id="games" style={{textAlign:"center", paddingTop: "2vh", paddingBottom: "2vh"}}>Our Games</Typography>
      <p className={classes.aboutText}>Hello</p>
      <br/>
      <Grid container spacing={3} style={{margin:'auto', width:'98%'}}>
          <Grid item xs={12} sm={4}>
            <GalleryEntry image={Title} title="Main Menu" caption="A look at the game's current menu scene (it's animated!). The crystal is a central element to Quixotic Quest: more will be revealed later."/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <GalleryEntry image={Hero} title="A Tree" caption="The above is an in-game screenshot taken because I thought the sun looked really nice shining between the trees. All credit for the environment assets go to the Fantasy Adventure Environment asset on the Unity store."/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <GalleryEntry image={Fight} title="Demo: Battle" caption="The linked video (click this card to view!) demonstrates the battle system that currently exists in the game. It also demoes a camera that moves around mid-fight, because I think it looks cool." click='https://youtu.be/mspSiIVixHo'/>
          </Grid><Grid item xs={12} sm={4}>
            <GalleryEntry image={Cutscene} title="Demo: Cutscenes" caption="The initial cutscene system was a click-to-continue storybook-like experience. The current system plays more like a movie, though extended animated scenes are still a challenge. Click this card to see a demo of it." click='https://youtu.be/N90vSCB2ujo'/>
          </Grid>
      </Grid>
      <Typography variant="h3" id="contact" style={{textAlign:"center", paddingTop: "8vh", paddingBottom: "2vh"}}>Contact</Typography>
      <br/>
      <Typography className={classes.aboutText}>Whether you have questions about the development process or feedback about the game, we're here to fulfill any NNMG-related request you might have. Click to expand the accordions below and see our various modes of contact.</Typography>
      <br/>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography>Game Updates and General Support</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Join our Discord! Although the Devblog will cover major updates, day to day changes, down to the exact commits that are being pushed to Github, will be posted on our Discord server.
            If you have questions about the game or its dev process, this is also where I'll likely respond the quickest. Here's the link to join: <a href="https://discord.gg/RUZNp3r">https://discord.gg/RUZNp3r</a>.
            Hope to see you there, we'd be happy to have you!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br/>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography>Applications for Dev Team</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We're a small crew, and always looking for new people to join our team. If you have the time and are willing to apply, please send me an email at yin4thewin@gmail.com. I'd be honored to know that you think our projects are worth your time! We're currently looking for:<br/><br/>
            -Programmer (Unity)<br/>
            -Programmer (Web)<br/>
            -Writer<br/>
            -Artist<br/><br/>
            Unfortunately we are unable to offer financial compensation at this time. Additionally I cannot guarantee that we will generate any revenue, much less profit. However, if you've ever wanted to make a video game, want a cool project for your resume, or just want to hang out with a chill team, I encourage you to contact me! And if we ever do make money, know that you will definitely be compensated accordingly.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br/>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography>Applications for Beta Testing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              QA/Beta Testers are an indispensable part of any good dev team. They catch bugs, point out loopholes and generally offer the feedback necessary to make a great game a reality. I haven't worked out the specifics yet, but I'm currently thinking of implementing a "drops" system where users active on the devblog/Discord can get access to early release builds. A user's activity can be measured by them creating an account on this site that is also linked to their Discord account (hence the log in button in the navbar).
              While logged in, views and comments on the Devblog will contribute to that user's drop chances. I'll update this later when I work it all out, but in the meantime feel free to join the <a href="https://discord.gg/RUZNp3r">Discord</a> to stay tuned!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br/><br/><br/>
        </Paper>
    </React.Fragment>)
}