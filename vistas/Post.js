import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useLocalStorage } from "../useLocalStorage";
import { useState,useEffect,useRedirect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";

//icon
import PublishIcon from "@material-ui/icons/Publish";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import SendIcon from '@material-ui/icons/Send';
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export default function NuevoPost(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [change, stateChange] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const lenguajes = [ 'Java', 'PHP', 'C#', 'Javascript', 'C++', 'Phyton', 'Otro'];
  const uid = props.location.state

  const [token,saveToken] = useLocalStorage('token','');
  const [userUid,saveUserUid]=useLocalStorage('uid','');
  const [access,stateAccess] = React.useState();
  const [posts,savePosts] = React.useState([]);
  const [tries,setTries]= React.useState(0);
  const [mensaje, setMensaje] = React.useState('');

  const [newData,setNewData]=useState({ titulo:'',lenguaje:'',tags:[] })
  const [newTitulo, setNewTitulo] = React.useState('')
  const [newLenguaje, setNewLenguaje] = React.useState('')
  const [newTags, setNewTags] = React.useState([])
  const [comentario, setComentario] = useState('')
  const [like, setLike] = useState(false)

  var saveDatos=(a)=>{
    setNewTitulo(a.titulo)
    setNewLenguaje(a.lenguaje)
    setNewTags(a.tags)
    setLike(a.me_gusta)    
    savePosts(a)
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

      fetch("https://kogit2.herokuapp.com/posts/"+uid, requestOptions)
        .then(response => response.json())
        .then(result => saveDatos(result.post))
        .catch(error => console.log('error', error));
    }
  },[])

  const handleSelect = (event) => {
    setNewLenguaje(event.target.value)
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    setDialogOpen(true);
  };
  const handleChangeEdit = () => {
    stateChange(!change);
    setAnchorEl(null);
    setMensaje("");
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  const onSubmitData = async e => {
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    setNewData(newData.titulo = newTitulo)
    setNewData(newData.lenguaje = newLenguaje)
    setNewData(newData.tags = newTags)

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(newData),
      redirect: 'follow'
    };

    const res = await fetch("https://kogit2.herokuapp.com/posts/editar/"+uid, requestOptions)
      .then(response => response.json())
      .then(result => result)
      .catch(error => console.log('error', error));
    if (res.ok==true) {
      setDialogOpen(false);
      setMensaje("El post se editó exitosamente")
      setTimeout(() => {
        history.push('/Publicaciones')
      }, 2000);
    } else{
      setTries(tries+1)
      setMensaje("Hubo un error al editar el Post")
    }
  }

  const handleDeleteDialog = async e => {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    const res = await fetch("https://kogit2.herokuapp.com/posts/eliminar/"+uid, requestOptions)
      .then(response => response.json())
      .then(result => result)
      .catch(error => console.log('error', error));
    if (res.ok==true) {
      setDialogOpen(false);
      setMensaje("El post se eliminó exitosamente")
      setTimeout(() => {
        history.push('/Publicaciones')
      }, 2000);
    } else{
      setMensaje("Hubo un error al eliminar el Post")
    }
  }

  const SubmitLike = async e =>{
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://kogit2.herokuapp.com/posts/megusta/"+uid, requestOptions)
      .then(response => response.json())
      .then(result => saveDatos(result.post))
      .catch(error => console.log('error', error));
  }

  const SubmitComment = async e => {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("texo", comentario);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://kogit2.herokuapp.com/posts/comentar/"+uid, requestOptions)
      .then(response => response.json())
      .then(result => saveDatos(result.post))
      .catch(error => console.log('error', error));
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
      {token==false?<Redirect to="/Login"/>:null}

      <Grid container direction="row" alignItems="center" justify="center" >
        <Typography variant="overline" className={classes.labelExito} color="primary" > {mensaje} </Typography>
      </Grid>

      <Card variant="outlined" className={classes.card}>
        <CardContent>

          {change ? (
            <Grid container direction="row" alignItems="center" justify="space-between" >
              <IconButton href="Publicaciones" color="primary"> <ArrowBackIcon /> </IconButton>
              <IconButton onClick={handleOpenMenu}> <MoreIcon /> </IconButton>
                <Menu keepMounted anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                  {uid==userUid ? (
                    <Grid>
                      <MenuItem disabled onClick={handleChangeEdit}> uwu </MenuItem>
                    </Grid>
                  ) : (
                    <Grid>
                      <MenuItem onClick={handleChangeEdit}>Editar</MenuItem>
                      <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
                    </Grid>
                  )}
                </Menu>
           </Grid>
          ) : (
            <Grid container direction="row" alignItems="center" justify="flex-end" >
              <Typography className={classes.labelFecha} variant="overline" color="primary" > Se está editando el post </Typography>
           </Grid>
          )}

          <Grid container direction="column" alignItems="center" justify="center"  className={classes.padding} >
            { change ? (
              <Grid direction="column" justify="flex-start" alignItems="flex-start" style={{ flex: 1 }}>
                <Typography className={classes.inputTitle} variant="h4"> {posts.titulo} </Typography>
              </Grid>
            ) : (
              <TextField 
                fullWidth
                variant="outlined"
                value={newTitulo} 
                onChange={e=>setNewTitulo(e.target.value)} 
                InputProps={{ style: {fontSize: 40} }} 
                className={classes.inputTitle}
                error={(newTitulo.length < 6 || newTitulo.length > 30) && tries >= 1 ? (true):(false)}
                helperText="El título debe debe tener de 6 a 30 caracteres" 
              />
              )}
            <Typography className={classes.labelFecha} variant="overline" > {posts.fecha} </Typography>
            
            <Grid container direction="column" justify="flex-start" alignItems="flex-start" >
              {change ? (
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" >
                  {newTags.map((tag) => {
                    return (
                      <li style={{ display: 'inline', flexDirection: 'row', marginRight: 10 }} > 
                        <Chip label={tag} variant="outlined" color="primary" />
                      </li>
                    );
                  })}
                </Grid>
              ) : (
                <TextField 
                  variant="outlined"
                  helperText="Separa los Tags por comas"
                  value={(JSON.stringify(newTags)).replace(/['"]+/g, '').slice(1, -1)}
                  error={(newTags.length < 3 || newTags.length > 4) && tries >= 1 ? (true):(false) }
                  onChange={e=>setNewTags((e.target.value).split(','))} 
                  className={classes.input} style={{ width: '50ch' }} 
                />
              )}
            </Grid>
          </Grid>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} /> 
          {change ? (
            <Grid container direction="column" justify="flex-start" alignItems="flex-start"  className={classes.padding}>
              <Typography variant="h5" > {posts.lenguaje} </Typography>
            </Grid>
          ) : (
            <Grid container direction="column" justify="flex-start" alignItems="flex-start"  className={classes.padding}>
              <FormControl className={classes.input} style={{ width: '50ch' }} >
                <InputLabel> Lenguaje </InputLabel>
                <Select
                  value={newLenguaje}
                  onChange={handleSelect}
                  error={newTags == '' && tries >= 1 ? (true):(false) }
                >
                  {lenguajes.map((lenguaje) => (
                    <MenuItem key={lenguaje} value={lenguaje}> {lenguaje} </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          
          <Grid container direction="column" justify="flex-start" alignItems="flex-start"  className={classes.padding}>
            <TextField 
              fullWidth 
              disabled 
              value={posts.texto} 
              variant="outlined" 
              className={classes.input} 
              multiline 
              rows={6}
            />
          </Grid>

          </CardContent>
          <Divider style={{ marginTop: 10, marginBottom: 10, }} />
          <CardActions>
            {change ? (
              <Grid container direction="column" alignItems="center" justify="flex-end" className={classes.padding} >
                <Grid container direction="row" alignItems="center" justify="flex-start" className={classes.padding}>
                  <Typography className={classes.labelFecha} variant="overline" > Comentarios </Typography>
                  <FormControlLabel
                    checked={like}
                    style={{ marginLeft: 'auto' }}
                    label={posts.likes}
                    labelPlacement='start'
                    onChange={SubmitLike}
                    control={ <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} size="small" /> }
                  />
                </Grid>
                <TextField 
                  fullWidth
                  variant="filled"
                  label="Realiza un comentario" 
                  onChange={e=>setComentario(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton> <SendIcon onClick={SubmitComment} color="primary" /> </IconButton>
                      </InputAdornment>
                  ),}}
                />
                
              </Grid>
            ) : (
              <Grid container direction="row" alignItems="center" justify="flex-end" >
                <Button variant="contained" color="primary" startIcon={<PublishIcon />} onClick={onSubmitData} className={classes.button} > 
                  Publicar
                </Button>
                <Button variant="contained" color="secondary" startIcon={<CancelIcon />} onClick={handleChangeEdit} className={classes.button}> 
                  Cancelar
                </Button>
              </Grid>
            )}
          </CardActions>
        </Card>

        <Dialog open={dialogOpen} onClose={handleCloseDialog} >
          <DialogTitle id="alert-dialog-title">{"¿Seguro que desea eiminar el Post?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary"> Cancelar </Button>
            <Button onClick={handleDeleteDialog} color="primary" autoFocus> Aceptar </Button>
        </DialogActions>
      </Dialog>
        
      </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  
  labelExito: {
    fontSize: 15,
    margin: theme.spacing(3),
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    minWidth: 1000,
    marginTop: theme.spacing(0) ,
    margin: theme.spacing(3),
  },
  inputTitle: {
    flex: 1 ,
    textAlignLast: 'center',
    fontSize: 40
  },
  labelFecha: {
    fontSize: 15,
    alignSelf: 'flex-start',
    textAlignLast: 'flex-start',
    marginLeft: theme.spacing(3),
    color: '#A9A9A9',
  },
  padding: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  input: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: '#111'
  },
  button:{
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
}));
