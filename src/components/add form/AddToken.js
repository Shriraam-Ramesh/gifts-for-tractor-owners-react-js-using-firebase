import React from 'react';
import '../Style.css';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
var firebase = require('firebase/app');
require('firebase/database');
export default class formSubmit extends React.Component {
    state = {
        tokenNo: '',
        cusName: '',
        cusMobile: '',
        tractorNo: '',
        gifts: '',
        jobCardNo: '',
        tableData: [],
        checkMobile: false,
    }
    componentDidMount() {
        var config = {
            apiKey: "AIzaSyClBY9e7GY_r-oDnW_QL-ANlgo1BVwG3eM",
            databaseURL: "https://react-test-71dec.firebaseio.com/",
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }
    handleChange = (e, type) => {
        let preventMinus = document.querySelectorAll('#nominus');
        Array.from(preventMinus).forEach(field => {
            field.addEventListener('keypress', function (evt) {
                if (evt.which < 48 || evt.which > 57) {
                    evt.preventDefault();
                }
            })
        });
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case 'tokenNo':
                this.setState({ [name]: value }, () => {
                    if (!this.state.tokenNo) { this.setState({ tokenNoErr: true }) }
                    if (this.state.tokenNo) { this.setState({ tokenNoErr: false }) }
                })
                break;
            case 'cusName':
                this.setState({ [name]: value }, () => {
                    if (this.state.cusName) { this.setState({ cusNameErr: false }) }
                    if (!this.state.cusName) { this.setState({ cusNameErr: true }) }
                })
                break;
            case 'cusName':
                this.setState({ [name]: value }, () => {
                    if (this.state.cusName) { this.setState({ cusNameErr: false }) }
                    if (!this.state.cusName) { this.setState({ cusNameErr: true }) }
                })
                break;
            case 'cusMobile':
                this.setState({ [name]: value }, () => {
                    if (this.state.cusMobile) {
                        this.setState({ cusMobileErr: false })
                        const arrayOfDigits = Array.from(String(this.state.cusMobile));
                        if (arrayOfDigits.length == 10) {
                            this.setState({ checkMobile: false })
                        }
                        else {
                            this.setState({ checkMobile: true })
                        }
                    }
                    if (!this.state.cusMobile) { this.setState({ cusMobileErr: true, checkMobile: false }) }
                })
                break;
            case 'tractorNo':
                this.setState({ [name]: value }, () => {
                    if (this.state.tractorNo) { this.setState({ tractorNoErr: false }) }
                    if (!this.state.tractorNo) { this.setState({ tractorNoErr: true }) }
                })
                break;
            case 'jobCardNo':
                this.setState({ [name]: value }, () => {
                    if (this.state.jobCardNo) { this.setState({ jobCardNoErr: false }) }
                    if (!this.state.jobCardNo) { this.setState({ jobCardNoErr: true }) }
                })
                break;
            default:
                break;
        }
        this.setState({ [name]: value });
    }
    validate = () => {
        if (this.state.tokenNo) { this.setState({ tokenNoErr: false }) }
        if (!this.state.tokenNo) { this.setState({ tokenNoErr: true }) }
        if (this.state.cusName) { this.setState({ cusNameErr: false }) }
        if (!this.state.cusName) { this.setState({ cusNameErr: true }) }
        if (this.state.cusMobile) {
            this.setState({ cusMobileErr: false })
            const arrayOfDigits = Array.from(String(this.state.cusMobile));
            if (arrayOfDigits.length == 10) {
                this.setState({ checkMobile: false })
            }
            else {
                this.setState({ checkMobile: true })
            }
        }
        if (!this.state.cusMobile) { this.setState({ cusMobileErr: true, checkMobile: false }) }
        if (this.state.tractorNo) { this.setState({ tractorNoErr: false }) }
        if (!this.state.tractorNo) { this.setState({ tractorNoErr: true }) }
        if (this.state.jobCardNo) { this.setState({ jobCardNoErr: false }) }
        if (!this.state.jobCardNo) { this.setState({ jobCardNoErr: true }) }
    }
    formSubmit = (e) => {
        const { tokenNo, cusName, cusMobile, tractorNo, tableData, jobCardNo } = this.state;
        e.preventDefault()
        this.validate()
        if (tokenNo && cusName && cusMobile && tractorNo && jobCardNo) {
            let data = { token: tokenNo, name: cusName, mobile: cusMobile, tractor: tractorNo, gift_status: "Not_Given", jcNo: jobCardNo, oilChange: "No" }
            let clone = [...tableData]
            clone.push(data)
            this.setState({
                tableData: clone
            }, () => {
                this.database()
                this.props.history.push({
                    pathname: "/view",
                    data: this.state.tableData
                });
                window.location.reload()
            })
        }
    }
    database = () => {
        const { tokenNo, cusName, cusMobile, tractorNo, jobCardNo } = this.state;
        if (tokenNo && cusName && cusMobile && tractorNo && jobCardNo) {
            firebase.database().ref(`tractors/${this.state.tokenNo}`).set({
                token: this.state.tokenNo,
                name: this.state.cusName,
                mobile: this.state.cusMobile,
                tractor: this.state.tractorNo,
                oilChange: "No",
                jcNo: this.state.jobCardNo,
                gift_status: "Not_Given"
            });
        }
    }
    logOut = () => {
        localStorage.removeItem('auth')
        this.notify()
        setTimeout(()=>{this.props.history.push('/')}, 1500)
        
    }
    notify = () => toast.warning('Logged out successfully')
    render() {
        const { tokenNo, cusName, cusMobile, tractorNo, tokenNoErr, jobCardNo, jobCardNoErr,
            cusNameErr, cusMobileErr, tractorNoErr, checkMobile } = this.state
        return (
            <div>
                <form noValidate>
                    <div className="container">
                        <div>
                            <ToastContainer/>
                            <h3 className="text-center font-weight-bold font-italic text-primary">ADD TOKENS</h3>
                            <Button style={{float:'right'}} className="btn-info" onClick={this.logOut}>Log out</Button>
                        </div>
                        <div className="row" id="tractors">
                            <div className="mt-5 col-2">
                                <label className="font-weight-bold">Token No<span className="text-danger">*</span></label>
                            </div>
                            <div className="mt-5 col-6">
                                <input className={tokenNoErr ? "form-control errorField" : "form-control"} type="text" name="tokenNo" value={tokenNo} onChange={this.handleChange} placeholder="Enter Token No Here" />
                            </div>
                            <div className="mt-5 col-4">
                                {tokenNoErr ? <span className="text-danger">Token No is required</span> : ''}
                            </div>

                            <div className="mt-5 col-2">
                                <label className="font-weight-bold">Customer Name<span className="text-danger">*</span></label>
                            </div>
                            <div className="mt-5 col-6">
                                <input className={cusNameErr ? "form-control errorField" : "form-control"} type="text" name="cusName" value={cusName} onChange={this.handleChange} placeholder="Enter Customer Name Here" />
                            </div>
                            <div className="mt-5 col-4">
                                {cusNameErr ?
                                    <span className="text-danger">Customer name is required</span> : ''}
                            </div>

                            <div className="mt-5 col-2">
                                <label className="font-weight-bold">Customer Mobile<span className="text-danger">*</span></label>
                            </div>
                            <div className="mt-5 col-6">
                                <input className={cusMobileErr ? "form-control errorField" : "form-control"} type="number" id="nominus" min={0} name="cusMobile" value={cusMobile} onChange={this.handleChange} placeholder="Enter Mobile No Here" />
                            </div>
                            <div className="mt-5 col-4">
                                {cusMobileErr ? <span className="text-danger">Customer Mobile No is required</span> : ''}
                                {checkMobile ? <span className="text-danger">Enter valid mobile number</span> : ''}
                            </div>
                            <div className="mt-5 col-2">
                                <label className="font-weight-bold">Tractor No<span className="text-danger">*</span></label>
                            </div>
                            <div className="mt-5 col-6">
                                <input className={tractorNoErr ? "form-control errorField" : "form-control"} type="text" name="tractorNo" value={tractorNo} onChange={this.handleChange} placeholder="Enter Tractor No Here" />
                            </div>
                            <div className="mt-5 col-4">
                                {tractorNoErr ? <span className="text-danger">Tractor No is required</span> : ''}
                            </div>

                            <div className="mt-5 col-2">
                                <label className="font-weight-bold">Job Card No<span className="text-danger">*</span></label>
                            </div>
                            <div className="mt-5 col-6">
                                <input className={jobCardNoErr ? "form-control errorField" : "form-control"} type="text" name="jobCardNo" value={jobCardNo} onChange={this.handleChange} placeholder="Enter Job Card No Here" />
                            </div>
                            <div className="mt-5 col-4">
                                {jobCardNoErr ? <span className="text-danger">Job Card No is required</span> : ''}
                            </div>
                            <div className="mt-5 col-2"> </div>
                            <div className="mt-5 col-6">
                                <button className="btn btn-outline-success" onClick={(e) => this.formSubmit(e)}>Add Token</button>
                                <Button className="addBtn btn-warning" id="view" onClick={() => { this.props.history.push('/view') }}>View All Tokens</Button>
                                <UncontrolledTooltip placement="top" target="view">
                                    View added tokens
                                </UncontrolledTooltip>
                            </div>
                            <div className="mt-5 col-4">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}