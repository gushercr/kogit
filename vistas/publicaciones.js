import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useLocalStorage } from "../useLocalStorage";
import { useState,useEffect,useRedirect } from "react";
import { Redirect } from "react-router";

// componentes
import Tarjeta from "./tarjeta_publicaciones";

//iconos
import PlusIcon from '@material-ui/icons/Add';

export default function Repositorio() {
  const classes = useStyles();

  const [token,saveToken]=useLocalStorage('token','');
  const [access,stateAccess]=useState();
  const [posts,savePosts]=useState([]);

  var saveDatos=(a)=>{    
    savePosts(a);
  }

  useEffect(()=>{
    if (token=='') {
      stateAccess(false)
    }else{
      var myHeaders = new Headers();
      myHeaders.append("token", token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://kogit2.herokuapp.com/posts/misposts", requestOptions)
      .then(response => response.json())
      .then(result => saveDatos(result.posts))
      .catch(error => console.log('error', error));
    }
  },[])    

  const listPosts = posts.map((post) =>
    <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20, }} > 
      <Tarjeta 
        fecha={post.fecha} 
        titulo={post.titulo} 
        lenguaje={post.lenguaje}
        tags={post.tags}
        texto={post.texto} 
        likes={post.likes}
        id={post.uid}
      />
    </li>
  );
  
  return (
    <Grid container direction="column" justify="space-around" alignItems="center" className={classes.root} >
      {token==false?<Redirect to="/Login"/>:null}
      <Grid container direction="column" alignItems="center" className={classes.title}>
        <Typography variant="h4" > PUBLICACIONES </Typography>
        <Typography variant="subtitle1" > Visualiza tus posts  </Typography>
      </Grid>
      <br/>
      <Grid container xs={7} direction="row" justify="flex-end" alignItems="center" >
        <Button variant="contained" color="primary" className={classes.button} href="NuevoPost" startIcon={<PlusIcon />}>
          Nuevo 
        </Button>
      </Grid>
      <Grid container xs={11} direction="column" justify="space-around" alignItems="center" className={classes.post}>        
        <br/>
        <Grid container direction="column" justify="flex-start" alignItems="center" spacing={3} padding={2}>
          { posts.map.length <= 0 ? (
            <Grid container direction="row" alignItems="center" justify="center" className={classes.progress} >
              <Typography variant="subtitle1" > Parece que aún no hay nada aquí </Typography>
            </Grid>  
          ) : (
            <ul style={{ listStyle: 'none', flexDirection: 'column', alignContent: 'center', paddingLeft: 0, }} > 
              {listPosts}
            </ul>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles =  makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  post: {
    flex: 1 ,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),    
    padding: theme.spacing(2),
  },
  title: {
    flex: 1 ,   
    padding: theme.spacing(5),
    backgroundColor: '#E7E7E7',
  },
  button: {
    borderRadius:40,
  },
  progress: {
    margin: theme.spacing(2),
  },
}));
