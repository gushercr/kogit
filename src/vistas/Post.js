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
import Link from '@material-ui/core/Link';

import { useLocalStorage } from "../useLocalStorage";
import { useState,useEffect,useRedirect } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [change, stateChange] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const id = useParams()

  const [token,saveToken] = useLocalStorage('token','');
  const [userUid,saveUserUid]= useLocalStorage('uid','');
  const [autorUid,saveAutorUid]= useState('');
  const [access,stateAccess] = useState();
  const [posts,savePosts] = useState([]);
  const [tries,setTries]= useState(0);
  const [mensaje, setMensaje] = useState('');

  const [newData,setNewData]=useState({ titulo:'',lenguaje:'',tags:[] })
  const [newTitulo, setNewTitulo] = useState('')
  const [newLenguaje, setNewLenguaje] = useState('')
  const [newTags, setNewTags] = useState([])
  const [comments, setComments] = useState([])
  const [autor, setAutor] = useState([])
  const [comentario, setComentario] = useState('')
  const [like, setLike] = useState(false)

  var saveDatos=(a)=>{
    setNewTitulo(a.titulo)
    setNewLenguaje(a.lenguaje)
    setNewTags(a.tags)
    setLike(a.me_gusta)
    setComments(a.comentarios)
    setAutor(a.autor)
    saveAutorUid(a.autor._id)
    savePosts(a)
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
      
      console.log(id)

      fetch(`https://kogit2.herokuapp.com/posts/${id.id}`, requestOptions)
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

    const res = await fetch("https://kogit2.herokuapp.com/posts/editar/"+id, requestOptions)
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

    const res = await fetch("https://kogit2.herokuapp.com/posts/eliminar/"+id, requestOptions)
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

    fetch("https://kogit2.herokuapp.com/posts/megusta/"+id, requestOptions)
      .then(response => response.json())
      .then(result => saveDatos(result.post))
      .catch(error => console.log('error', error));
  }

  const SubmitComment = async e => {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("texto", comentario);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    setComentario('')

    fetch("https://kogit2.herokuapp.com/posts/comentar/"+id, requestOptions)
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
              <IconButton onClick={() => history.goBack()} color="primary"> <ArrowBackIcon /> </IconButton>
              <IconButton onClick={handleOpenMenu}> <MoreIcon /> </IconButton>
                <Menu keepMounted anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                  { autorUid == userUid ? (
                    <Grid>
                      <MenuItem onClick={handleChangeEdit}>Editar</MenuItem>
                      <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
                    </Grid>
                  ) : (
                    <Grid>
                      <MenuItem disabled >Editar</MenuItem>
                      <MenuItem disabled >Eliminar</MenuItem>
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
            <Typography style={{ fontSize: 15 }} variant="overline" > 
              <Link href={`/Perfil/${autor._id}`} color="inherit"> {autor.username} </Link>
            </Typography>
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
                  helperText="Separa mínimo 3 y máximo 4 tags por comas"
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
                  error={newLenguaje == '' && tries >= 1 ? (true):(false) }
                >
                  <MenuItem value={'c'}>C</MenuItem>
                  <MenuItem value={'c++'}>C++</MenuItem>
                  <MenuItem value={'c#'}>C#</MenuItem>
                  <MenuItem value={'fortran'}>Fortran</MenuItem>
                  <MenuItem value={'go'}>Go</MenuItem>
                  <MenuItem value={'java'}>Java</MenuItem>
                  <MenuItem value={'javascript'}>Javascript</MenuItem>
                  <MenuItem value={'kotlin'}>Kotlin</MenuItem>
                  <MenuItem value={'php'}>Php</MenuItem>
                  <MenuItem value={'python'}>Python</MenuItem>
                  <MenuItem value={'r'}>R</MenuItem>
                  <MenuItem value={'ruby'}>Ruby</MenuItem>
                  <MenuItem value={'ruby-on-rails'}>Ruby on rails</MenuItem>
                  <MenuItem value={'swift'}>Swift</MenuItem>
                  <MenuItem value={'typescript'}>TypeScript</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <br/>
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
                  value={comentario}
                  onChange={e=>setComentario(e.target.value)}
                  style={{ marginBottom: 5 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton> <SendIcon onClick={SubmitComment} color="primary" /> </IconButton>
                      </InputAdornment>
                  ),}}
                />
                {comments.map((comment) => {
                  return (
                    <li style={{ display: 'inline', flexDirection: 'column', width: '100%', marginTop: 3 }} >
                      <Grid container direction="column" alignItems="flex-start" justify="flex-start" style={{ backgroundColor: '#F8F8F8', borderRadius: 10, width: '100%', margin: 2, padding: 5, paddingLeft: 5 }} >
                        <Grid container direction="row" alignItems="center" justify="flex-start">
                          <Typography variant="subtitle1" style={{ fontSize: 15, color: '#6B6B6B' }} > {comment.usuario.username} &nbsp; </Typography>
                          <Typography variant="body2" style={{ fontSize: 10, color: '#ABABAB' }} > {comment.fecha} </Typography>
                        </Grid>
                        <Typography variant="subtitle1" > {comment.texto} </Typography>
                      </Grid>
                    </li>
                  );
                })}
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
    paddingRight: theme.spacing(2),
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
