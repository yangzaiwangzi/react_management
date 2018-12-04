import React from 'react';
import {Route,Switch}from 'react-router-dom';

import Library from './../views/library/index.jsx';
import ControlPanel from './../views/test/ControlPanel.jsx';
import Error from './../views/404/index.jsx';

class routerContent extends React.Component {
    render() {
        return ( 
            <Switch>
                <Route exact path="/"     component={ Library } />
                <Route exact path="/test" component={ ControlPanel } />
                <Route component={Error} /> 
            </Switch>
        )
    }
}
export default routerContent;