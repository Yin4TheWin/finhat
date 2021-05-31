import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    root: {
        height: '100%'
      },
      media: {
        height: 200,
      }
}))

export default function GalleryEntry(props){
    const classes=useStyles()
    const {image, title, caption, desc, click} = props
    return(<Card className={classes.root}>
        <CardActionArea href={click} className={classes.root}>
          <CardMedia
            className={classes.media}
            image={image}
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom variant="body2" component="h6">
              {desc}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {caption}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>)
}