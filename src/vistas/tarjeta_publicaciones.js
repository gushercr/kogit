import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from '@material-ui/core/Link';

import Favorite from "@material-ui/icons/Favorite";

import { useHistory } from "react-router-dom";

const Tarjeta = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const fecha = new Date(props.fecha)
  const texto = (props.texto).substring(0, 300) + "...";

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <Grid container direction="column" justify="space-between" alignItems="flex-start" >
          <Grid direction="column" justify="flex-start" alignItems="flex-start" style={{ width: '100%' }}>
            <Typography className={classes.title} variant="overline" >
              {fecha.toString()}
            </Typography>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                {props.titulo}
              </Typography>
              <Typography variant="h6">
                &nbsp; - {props.lenguaje}
              </Typography>
            </Grid>
            { props.autor? 
              <Typography variant="h6"> 
                <a style={{textDecoration:"none",color:"#000"}} href={`/Perfil/${props.autor._id}`}>{props.autor.username}</a>
              </Typography> 
            : <> </> }
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          </Grid>
          <Grid direction="column" justify="flex-start" alignItems="flex-start" style={{ flex: 1 }}>
            {props.tags.map((tag) => {
              return (
                <li style={{ display: 'inline', flexDirection: 'row', marginRight: 10 }} > 
                  <Chip label={tag} variant="outlined" color="primary" size="small" />
                </li>
              );
            })}
          </Grid>
        </Grid>
        <br/>
        <Typography variant="body2" component="p" className={classes.texto} >
          {texto}
        </Typography>
      </CardContent>
      <CardActions justify="space-between" style={{ paddingLeft: 20, paddingRight: 30 }} >
        <Button size="small" color="primary" href={`/Post/${props.id}`} >Ver M??s</Button>
        <FormControlLabel
          style={{ marginLeft: 'auto' }}
          label={props.likes}
          labelPlacement='start'
          disabled
          control={ <Favorite style={{ color:'#A9A9A9' }} fontSize="small" /> }
        />
      </CardActions>        
    </Card>
  );
}

export default Tarjeta

const useStyles = makeStyles({
  root: {
    flex: 1,
    minWidth: 800,
    maxWidth: 805,
  },
  title: {
    fontSize: 14,
  },
  texto: {
    width: '100%',
  },
});

