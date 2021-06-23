import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { useLocalStorage } from "../useLocalStorage";
import { useState,useEffect,useRedirect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";

//icon
import PublishIcon from "@material-ui/icons/Publish";
import CancelIcon from "@material-ui/icons/Cancel";

export default function NuevoPost() {
  const classes = useStyles();
  const history = useHistory();
  const lenguajes = [ 'Java', 'PHP', 'C#', 'Javascript', 'C++', 'Phyton', 'Otro'];
  const [lenguajeSelect, setLenguajeSelect] = React.useState([]);
  
  const [token,saveToken]=useLocalStorage('token','');
  const [tries,setTries]= React.useState(0);
  const [data,setData]=useState({ titulo:'',texto:'',lenguaje:'',tags:[] });
  const [mensajeExito, setMensajeExito] = React.useState('');

  var onSubmit = async e => {
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    const res = await fetch("https://kogit2.herokuapp.com/posts/crear", requestOptions)
      .then(response => response.json())
      .then(result=>result)
      .catch(error => console.log('error', error));
    if (res.ok==true) {
      setMensajeExito('Publicación Exitosa')
      setTimeout(() => {
        history.push('/Publicaciones')
      }, 4000);
    } else {
      setTries(tries+1)
    }
  }

  const handleSelect = (event) => {
    setData({...data, lenguaje:event.target.value})
    setLenguajeSelect(event.target.value)
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
      {token==false?<Redirect to="/Login"/>:null}
      <Grid container direction="column" alignItems="center" className={classes.title}>
        <Typography variant="h4" > Nuevo Post </Typography>
      </Grid>
      <Grid container direction="row" alignItems="center" justify="center" >
        <Typography variant="overline" className={classes.labelExito} > {mensajeExito} </Typography>
      </Grid>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Grid container direction="column" alignItems="center" justify="center" >

              <Grid container direction="row" alignItems="center" justify="flex-end" >
                <Typography className={classes.label} variant="overline" > Título </Typography>
                <TextField 
                  label="Título" 
                  variant="filled"
                  error={(data.titulo.length < 6 || data.titulo.length > 30) && tries >= 1 ? (true):(false) }
                  helperText={"El título debe debe tener de 6 a 30 caracteres"} 
                  className={classes.form} 
                  onChange={e=>setData({...data, titulo:e.target.value})} 
                />
              </Grid>
              <Grid container direction="row" alignItems="center" justify="flex-end" >
                <Typography className={classes.label} variant="overline" > Lenguaje </Typography>
                <FormControl className={classes.form} variant="filled" >
                  <InputLabel> Lenguaje </InputLabel>
                  <Select
                    value={lenguajeSelect} 
                    onChange={handleSelect}
                    error={data.lenguaje == '' && tries >= 1 ? (true):(false) }
                  >
                    {lenguajes.map((lenguaje) => (
                      <MenuItem key={lenguaje} value={lenguaje}> {lenguaje} </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid container direction="row" alignItems="center" justify="flex-end" >
                <Typography className={classes.label} variant="overline" > Tags </Typography>
                <TextField 
                  label="Tags" 
                  variant="filled"
                  error={(data.tags.length < 3 || data.tags.length > 4) && tries >= 1 ? (true):(false) }
                  helperText="Separa los Tags por comas" 
                  className={classes.form} 
                  onChange={e=>setData({...data, tags:(e.target.value).split(',')})} 
                />
              </Grid>
              <Grid container direction="row" alignItems="center" justify="flex-end" >
                <Typography className={classes.label} variant="overline" > Descripción </Typography>
                <TextField 
                  label="Descripción" 
                  multiline 
                  rows={5} 
                  variant="filled"
                  error={(data.texto.length < 20 || data.texto.length > 500) && tries >= 1 ? (true):(false) }
                  helperText="La descripción deben ser de 20 a 500 caracteres"  
                  className={classes.form} 
                  onChange={e=>setData({...data, texto:e.target.value})} 
                />
              </Grid>

          </Grid>
          </CardContent>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <CardActions>
            <Grid container direction="row" alignItems="center" justify="flex-end" >
              <Button variant="contained" color="primary" startIcon={<PublishIcon />} className={classes.button} onClick={onSubmit} > 
                Publicar
              </Button>
              <Button href="Publicaciones" variant="contained" color="secondary" startIcon={<CancelIcon />} className={classes.button}> 
                Cancelar
              </Button>
            </Grid>
          </CardActions>
        </Card>

        

      </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    flex: 1 ,   
    padding: theme.spacing(5),
    marginBottom: theme.spacing(1), 
    backgroundColor: '#E7E7E7',
  },
  labelExito: {
    fontSize: 15,
    margin: theme.spacing(3),
    fontWeight: 'bold',
    color: '#3a1'
  },
  card: {
    flex: 1,
    minWidth: 800,
    margin: theme.spacing(1),
  },
  label:{
    fontSize: 15,
    margin: theme.spacing(1),
  },
  form: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    margin: theme.spacing(1),
    width: '70ch',
  },
  button:{
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
}));
