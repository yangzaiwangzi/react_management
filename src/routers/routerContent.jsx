import React from 'react';
import {Route,Switch}from 'react-router-dom';

import Home from './../views/Home/index.jsx';
import Meeting from './../views/meeting/index.jsx';
import EditMeeting from './../views/meeting/editMeeting/index.jsx';

import Test from './../components/uploadFile/test.jsx';
import Error from './../views/404/index.jsx';

class routerContent extends React.Component {
    render() {
        return ( 
            <Switch>
                <Route exact path="/"     component={ Home } />
                <Route exact path="/meeting"     component={ Meeting } />
                <Route exact path="/editMeeting"     component={ EditMeeting } />
                <Route exact path="/test" component={ Test } />
                <Route component={Error} /> 
            </Switch>
        )
    }
}
export default routerContent;