import React from 'react';
import Error from './../multimedia/404.png'
const PageNotFound = () => {
    return (
        <div className="container PageNotFound">
            <img className="mx-auto d-block" src={Error} />
            <h1 className="text-center">Upss!, lo sentimos pero esta pagina no fue encontrada, porfavor regrese</h1>
        </div>
    );
}

export default PageNotFound;
