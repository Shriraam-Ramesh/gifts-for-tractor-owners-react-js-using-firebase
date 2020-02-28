import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export class LoginPage extends Component {
    state = {
        username: '',
        password: '',
        loginImg: '/login.png'
    }
    componentDidMount = () => {
        let auth = localStorage.getItem('auth')
        if(auth) {
            this.props.history.push('/')
        }
    }
    handleChage = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    loginCheck = (e) => {
        e.preventDefault()
        if(this.state.username == '' && this.state.password == '') {
            this.notify()
        }
        else if(this.state.username == 'admin' && this.state.password == 'shri') {
            localStorage.setItem('auth', true)
            this.notifyYes()
            setTimeout(() => { this.props.history.push('/add')}, 1500)
        }
        else {
            this.notifyWrong()
        }
    }
    notifyYes = () => toast.success("Logged in successfully");
    notifyWrong = () => toast.error("Invalid Login");
    notify = () => toast.error("Enter Login Details");
    render() {
        return (
            <div className="box-container">
                <form>
                    <div className="text-center">
                    <img className="w-50 h-60 loginImg" src={this.state.loginImg} alt="tractor"></img>
                    </div>
                    <ToastContainer/>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            name="username"
                            value={this.state.username} 
                            onChange={this.handleChage} 
                            className="form-control"
                            autoComplete="off"
                            placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            autoComplete="off"
                            value={this.state.password} 
                            onChange={this.handleChage} 
                            className="form-control"
                            placeholder="Password" />
                    </div>
                    <div className="text-center submitBtn">
                        <button onClick={this.loginCheck} className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default LoginPage;