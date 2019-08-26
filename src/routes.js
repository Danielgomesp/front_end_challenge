import React from 'react';
import Main from './pages/main';
import { BrowserRouter, Route } from 'react-router-dom';

const Routes = () => {
    return (
        <BrowserRouter>
        <Route path='/' exact component={Main} />
        </BrowserRouter>
    );
}

export default Routes;