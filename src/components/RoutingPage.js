import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AddToken from './add form/AddToken'
import TableView from './table view/TableView'
import LoginPage from './login/LoginPage';
const RoutingPage = () => {
    let authCheck = localStorage.getItem('auth');
    return (
        <div>
           <Switch>
                <PrivateRoute exact path="/" component={LoginPage} authCheck={authCheck} />
                <PrivateRoute exact path="/add" component={AddToken} authCheck={authCheck} />
                <PrivateRoute exact path="/view" component={TableView} authCheck={authCheck} />
                <Redirect to="/ErrorPage" />    
            </Switch>
        </div>
    );
};
export default RoutingPage;
var PrivateRoute = ({ component: Components, authCheck, ...props }) => {
    console.log(props);
    return <Route {...props}
        render={props =>
            authCheck ?
                <Components {...props} />
                :
                <Redirect to={{
                    pathname: "/",
                    // state: { from: props.location }
                }} />
        } />
}
