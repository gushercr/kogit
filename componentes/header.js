import Logo from './../multimedia/logo2.png'
import {Link} from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';
import { useEffect, useState } from 'react';

// Búsqueda
import { fade, makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import FilterIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';

export default function Header() {
    const [token,saveToken]=useLocalStorage('token','');
    const [logueado,saveLog]=useState('');
    const [clase,saveClass]=useState('');

    // Búsqueda
    const history = useHistory();
    const classes = useStyles();
    const [Dialogopen, setDialogOpen] = useState(false);
    const [searchOP, setSearchcOP] = useState('tags');
    const [valueSearch, setValueSearch] = useState('');

    useEffect(()=>{
        if (token!='') {
            saveLog('')
            saveClass('visually-hidden');
        }else{
            saveLog('visually-hidden')
            saveClass('');
        }        
    });
    function cerrarSesion(){
        saveToken('');
        window.location.replace('');   
    }

    const seeMoreSubmit = () => {
        var path = {
          pathname: '/ResultBusqueda',
          search: valueSearch,
          state: searchOP,
        }
        history.push(path);
    }
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    return (
        <div className="header">
            <div className="row align-items-center">
                <div className="col-2">
                    <Link to="/"><img className="logo" src={Logo} /></Link>
                </div>

                {/* barra de busqueda */}
                <div className="col-7">
                    <div className="centrar">
                        <div className={classes.search}>
                            <InputBase
                            placeholder="Buscar"
                            classes={{ input: classes.inputInput }}
                            onChange={e=> setValueSearch(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton type="submit" onClick={handleDialogOpen}> <FilterIcon /> </IconButton>
                                </InputAdornment> }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton type="submit" onClick={seeMoreSubmit}> <SearchIcon /> </IconButton>
                                </InputAdornment> }
                            />
                        </div>
                    </div>
                </div>

                {/* Botones de logueo */}
                <div className="col-3">
                    <div className={logueado}>
                        <Link className="btn bt text-light fs-5 " to="/Perfil">Mi perfil</Link>
                        <div className="dropdown">
                                <a className="btn dropdown-toggle inlines" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"/>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><button className="dropdown-item" onClick={()=>cerrarSesion()} >Cerrar sesion</button></li>
                                </ul>
                        </div>
                    </div>  
                    
                    <div className={clase}>
                        <Link className="btn text-light fs-5 inlines" to="/Login">Iniciar Sesion</Link>
                        <div className="inlines separacion"/> 
                        <Link className="btn text-light fs-5 inlines" to="/Registro" >Registrarme</Link>
                    </div>
                        
                </div>
            </div>
            <div className="direccionesHeader">
                <div className={logueado}>
                    <a href="/Publicaciones" >Publicaciones</a>
                    <a href="#" >Repositorios</a>
                </div>
                
            </div>

            <Dialog open={Dialogopen} onClose={handleDialogClose}>
                <DialogTitle id="form-dialog-title">Búsqueda Avanzada</DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset" style={{ width: '30ch' }} onChange={e=> setSearchcOP(e.target.value)} >
                        <FormLabel component="legend">Buscar por</FormLabel>
                        <RadioGroup>
                            <FormControlLabel checked={searchOP == 'tags'} value="tags" control={<Radio />} label="Tags" />
                            <FormControlLabel checked={searchOP == 'lenguaje'} value="lenguaje" control={<Radio />} label="Lenguaje" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary"> Aceptar </Button>
                </DialogActions>
            </Dialog>

        </div>
        
    );
}

const useStyles = makeStyles((theme) => ({
    search: {
        width: '76%',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': { backgroundColor: fade(theme.palette.common.white, 0.25) },
    },
    inputInput: {
        width: '37ch',
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create('width'),
    },
  }));