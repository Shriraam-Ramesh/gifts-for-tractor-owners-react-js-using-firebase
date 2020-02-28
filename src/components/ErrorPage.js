import React from 'react';

export default class ErrorPage extends React.Component {
    render() {
        return(
            <div>
                <span className="font-weight-bold text-danger h2">404 Error</span><br></br>
                <span>Page Not Found</span>
            </div>
        )
    }
}