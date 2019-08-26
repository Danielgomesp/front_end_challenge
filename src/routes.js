import React from 'react';
import Main from './pages/main';
import Details from './pages/details';
import { BrowserRouter, Route } from 'react-router-dom';

const Routes = () => {
    return (
        <BrowserRouter>
        <Route path='/' exact component={Main} />
        <Route path='/details' component={Details}/>
        </BrowserRouter>
    );
}

export default Routes;