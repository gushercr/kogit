import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from "@material-ui/core/Button";

import { useLocalStorage } from "../useLocalStorage";
import { useState,useEffect } from "react";
import { Redirect } from "react-router";

// componentes
import Tarjeta from "./tarjeta_publicaciones";

//iconos
import PlusIcon from '@material-ui/icons/Add';

export default function Repositorio(props) {
  const classes = useStyles();
  const [token,saveToken]=useLocalStorage('token','');
  const [access,stateAccess]=useState();
  const [fullResult,saveFullResult] = useState([]);
  const [posts,savePosts] = useState([]);
  const [dispAnterior, setDispAnterior] = useState(false);
  const [dispSiguiente, setDispSiguiente] = useState(false);
  const [startPage, setStartPage] = useState(0)
  const [endPage, endStartPage] = useState(0)

  const searchValue = (props.location.search).substr(1)
  const searchOP = props.location.state

  var saveDatos=(a)=>{
    savePosts(a.posts);
    saveFullResult(a)
    a.next != null ? setDispSiguiente(false) : setDispSiguiente(true)
    a.previous != null ? setDispAnterior(false) : setDispAnterior(true)
    console.log(a)
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

      if(searchOP == 'tags') {
        fetch("https://kogit2.herokuapp.com/busqueda/posts/tags?salto=0&limite=5&valor="+searchValue , requestOptions)
          .then(response => response.json())
          .then(result => saveDatos(result))
          .catch(error => console.log('error', error));
      } else {
        fetch("https://kogit2.herokuapp.com/busqueda/posts/lenguaje?valor="+searchValue, requestOptions)
          .then(response => response.json())
          .then(result => saveDatos(result))
          .catch(error => console.log('error', error));
      }
    }
  },[])
  
  const nextSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    var next = fullResult.next;

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(next, requestOptions)
      .then(response => response.json())
      .then(result => saveDatos(result)) 
      .catch(error => console.log('error', error));
    window.scrollTo(0, 0)
  }

  const prevSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    var previous = fullResult.previous;

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(previous, requestOptions)
      .then(response => response.json())
      .then(result => saveDatos(result)) 
      .catch(error => console.log('error', error));
    window.scrollTo(0, 0)
  }
  
  return (
    <Grid container direction="column" justify="space-around" alignItems="center" className={classes.root} >
      {token==false?<Redirect to="/Login"/>:null}
      <Grid container direction="column" alignItems="center" className={classes.title}>
        <Typography variant="h5" > Resultados de Búsqueda </Typography>
        <Typography variant="subtitle1" > Resultados para: {searchValue} </Typography>
      </Grid>
      <br/>
      <Grid container xs={7} direction="row" justify="flex-end" alignItems="center" >
        <Button variant="contained" color="primary" className={classes.button} href="NuevoPost" startIcon={<PlusIcon />}>
          Nuevo 
        </Button>
      </Grid>
      <br/> 
      <Grid container xs={11} direction="column" justify="space-around" alignItems="center" className={classes.post}>        
        <Grid container direction="column" justify="flex-start" alignItems="center" spacing={3} padding={2}>
          {fullResult.total == 0 ? (
            <Grid container direction="row" alignItems="center" justify="center" className={classes.title} >
              <Typography variant="h6" style={{color:'#7e7e7e'}} > Parece que aún no hay nada aquí </Typography>
            </Grid>  
          ) : (
            <Grid>
              <ul style={{ listStyle: 'none', flexDirection: 'column', alignContent: 'center', paddingLeft: 0, }} > 
                {posts.map((post) => {
                  return (
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
                })}
              </ul>
              <Grid container direction="column" justify="center" alignItems="center" className={classes.pages}>
                <ButtonGroup variant="text">
                  <Button onClick={prevSubmit} disabled={dispAnterior} >Anterior</Button>
                  <Button onClick={nextSubmit} disabled={dispSiguiente} >Siguiente</Button>
                </ButtonGroup>
                <Typography variant="subtitle1" > Resultados totales: {fullResult.total} </Typography>
              </Grid>
            </Grid>
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
    padding: theme.spacing(4),
  },
  button: {
    borderRadius:40,
  },
  pages: {
    margin: theme.spacing(3),
  }
}));
