import React from 'react';
import { Table, Button, PaginationItem, PaginationLink, Pagination, UncontrolledTooltip } from "reactstrap";
import '../Style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var firebase = require('firebase/app');
require('firebase/database');
export default class TableView extends React.Component {
    state = {
        databaseData: [],
        text1: false,
        text2: false,
        text3: false,
        text4: false,
        text5: false,
        text6: false,
        text7: false,
        typedData: "",
        filterData: [],
        currentPage: 0,
        pagiNation: true,
        noDataFound: false,
        dbDataToken: {},
        modal: false,
        gifts: ''
    }
    componentDidMount() {
        var set = this
        var config = {
            apiKey: "AIzaSyClBY9e7GY_r-oDnW_QL-ANlgo1BVwG3eM",
            databaseURL: "https://react-test-71dec.firebaseio.com/",
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        let database = firebase.database()
        let ref = database.ref('tractors');
        ref.on('value', gotData, errorData)
        function gotData(data) {
            let dbData = data.val()
            if (dbData != null) {
                let format = Object.values(dbData)
                set.setState({ databaseData: format, filterData: format })
            }
            // set.setFunction(format) //send data through function
        }
        function errorData(err) {
            console.log('dbError', err)
        }
    }
    // setFunction = (data) => {     // receiving data through function
    //       this.setState({databaseData: data})
    // }
    handleClick(event, index) {
        event.preventDefault();
        this.setState({
            currentPage: index
        });
        console.log(`Viewing Page ${index + 1} Data`);
    }
    changeText1 = () => {
        const { text1 } = this.state;
        this.setState({
            text1: !text1
        });
        if (text1 === true) {
            this.sortByTokenAsc();
        } else {
            this.sortByTokenDesc();
        }
    };
    changeText2 = () => {
        const { text2 } = this.state;
        this.setState({
            text2: !text2
        });
        if (text2 === true) {
            this.sortByNameAsc();
        } else {
            this.sortByNameDesc();
        }
    };
    changeText3 = () => {
        const { text3 } = this.state;
        this.setState({
            text3: !text3
        });
        if (text3 === true) {
            this.sortByMobileAsc();
        } else {
            this.sortByMobileDesc();
        }
    };
    changeText4 = () => {
        const { text4 } = this.state;
        this.setState({
            text4: !text4
        });
        if (text4 === true) {
            this.sortByTractorAsc();
        } else {
            this.sortByTractorDesc();
        }
    };
    changeText5 = () => {
        const { text5 } = this.state;
        this.setState({
            text5: !text5
        });
        if (text5 === true) {
            this.sortByJobCardAsc();
        } else {
            this.sortByJobCardDesc();
        }
    };
    changeText6 = () => {
        const { text6 } = this.state;
        this.setState({
            text6: !text6
        });
        if (text6 === true) {
            this.sortByStatusAsc();
        } else {
            this.sortByStatusDesc();
        }
    };
    changeText7 = () => {
        const { text7 } = this.state;
        this.setState({
            text7: !text7
        });
        if (text7 === true) {
            this.sortByOilChangeAsc();
        } else {
            this.sortByOilChangeDesc();
        }
    };
    sortByTokenAsc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.token < b.token) {
                    return -1;
                }
                if (a.token > b.token) {
                    return 1;
                }
                return 0;
            });
        });
    };
    sortByTokenDesc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.token > b.token) {
                    return -1;
                }
                if (a.token < b.token) {
                    return 1;
                }
                return 0;
            });
        });
    };
    sortByNameAsc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        });
    };
    sortByNameDesc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name < b.name) {
                    return 1;
                }
                return 0;
            });
        });
    };
    sortByMobileAsc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => a.mobile - b.mobile);
        });
    };
    sortByMobileDesc = () => {
        this.setState(() => {
            this.state.filterData
                .sort((a, b) => a.mobile - b.mobile)
                .reverse();
        });
    };
    sortByTractorAsc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.tractor < b.tractor) {
                    return -1;
                }
                if (a.tractor > b.tractor) {
                    return 1;
                }
                return 0;
            });
        });
    };
    sortByTractorDesc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.tractor > b.tractor) {
                    return -1;
                }
                if (a.tractor < b.tractor) {
                    return 1;
                }
                return 0;
            });
        });
    };
    sortByJobCardAsc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.jcNo < b.jcNo) {
                    return -1;
                }
                if (a.jcNo > b.jcNo) {
                    return 1;
                }
                return 0;
            });
        });
    }
    sortByJobCardDesc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.jcNo > b.jcNo) {
                    return -1;
                }
                if (a.jcNo < b.jcNo) {
                    return 1;
                }
                return 0;
            });
        });
    };
    sortByStatusAsc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.gift_status < b.gift_status) {
                    return -1;
                }
                if (a.gift_status > b.gift_status) {
                    return 1;
                }
                return 0;
            });
        });
    };
    sortByStatusDesc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.gift_status > b.gift_status) {
                    return -1;
                }
                if (a.gift_status < b.gift_status) {
                    return 1;
                }
                return 0;
            });
        });
    };
    sortByOilChangeAsc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.oilChange < b.oilChange) {
                    return -1;
                }
                if (a.oilChange > b.oilChange) {
                    return 1;
                }
                return 0;
            });
        });
    };
    sortByOilChangeDesc = () => {
        this.setState(() => {
            this.state.filterData.sort((a, b) => {
                if (a.oilChange > b.oilChange) {
                    return -1;
                }
                if (a.oilChange < b.oilChange) {
                    return 1;
                }
                return 0;
            });
        });
    };
    handleSearchInputChange = (e, pageSize) => {
        this.setState({ typedData: e.target.value }, () => {
            this.getInput();
        });
        console.log([e.target.value]);
        // this.hidePagination(pageSize);
    };
    getInput = () => {
        let newDetails = [...this.state.databaseData];
        const filterData = newDetails.filter(item => {
            return (
                item.token
                    .toLowerCase()
                    .indexOf(this.state.typedData.toLowerCase()) !== -1 ||
                item.name
                    .toLowerCase()
                    .indexOf(this.state.typedData.toLowerCase()) !== -1 ||
                item.mobile
                    .toLowerCase()
                    .indexOf(this.state.typedData.toLowerCase()) !== -1 ||
                item.tractor
                    .toLowerCase()
                    .indexOf(this.state.typedData.toLowerCase()) !== -1 ||
                item.jcNo
                    .toLowerCase()
                    .indexOf(this.state.typedData.toLowerCase()) !== -1 ||
                item.gift_status
                    .toLowerCase()
                    .indexOf(this.state.typedData.toLowerCase()) !== -1 ||
                item.oilChange
                    .toLowerCase()
                    .indexOf(this.state.typedData.toLowerCase()) !== -1
            );
        });
        if (filterData.length === 0) {
            console.log("no data found");
            this.notify()
            // window.confirm("No Such Data Found");
            this.setState({
                noDataFound: true
            })
        } else {
            this.setState({
                filterData: filterData
            });
        }
        console.log(`Filtered Data ---->${filterData.length}`);
    };
    hidePagination = () => {
        let pageSize = 500;
        if (this.state.filterData.length <= pageSize) {
            this.setState({
                pagiNation: false
            });
        } else {
            this.setState({
                pagiNation: true
            });
        }
    };
    notify = () => toast.error("No such data Here...");
    updateGifts = (e, i) => {
        this.setState({ dbDataToken: i.token, dbDataGiftStatus: i.gift_status, dbDataOilChange: i.oilChange }, () => {
            if (this.state.dbDataGiftStatus == 'Not_Given') {
                firebase.database().ref().child('/tractors/' + `${this.state.dbDataToken}`)
                    .update({ gift_status: `Given` });
                window.location.reload()
            }
        })
    }
    updateOilChange = (e, i) => {
        this.setState({ dbDataToken: i.token, dbDataGiftStatus: i.gift_status, dbDataOilChange: i.oilChange }, () => {
            if (this.state.dbDataOilChange == 'No') {
                firebase.database().ref().child('/tractors/' + `${this.state.dbDataToken}`)
                    .update({ oilChange: 'Yes' });
                window.location.reload()
            }
        })
    }
    deleteRow = (e, i) => {
        this.setState({ tokenToRemove: i.token }, () => {
            firebase.database().ref().child('tractors/' + `${this.state.tokenToRemove}`)
                .remove();
            window.location.reload()
        })
    }
    render() {
        console.log('db',this.state.databaseData)
        const { currentPage } = this.state;
        this.pageSize = 25;
        this.pagesCount = Math.ceil(this.state.filterData.length / this.pageSize);
        return (
            <div className="p-0 m-0 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="container p-0 m-0 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="search-block col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h3 className="search-heading d-flex justify-content-center">
                            Quick Access
                        </h3>
                        <ToastContainer />
                        <div className="search">
                            <input
                                id="searchData"
                                className="search-input-field"
                                name={this.state.typedData}
                                onChange={e => this.handleSearchInputChange(e)}
                                placeholder="Search Tokens Here.."
                            />
                            <UncontrolledTooltip placement="right" target="searchData">
                                Filter data you want to see
                                </UncontrolledTooltip>
                            <Button className="addBtn btn-warning" id="addNew" onClick={() => { this.props.history.push('/add') }}>Add Token</Button>
                            <UncontrolledTooltip placement="left" target="addNew">
                                Add new token
                                </UncontrolledTooltip>
                        </div>

                        {this.pagesCount > 1 && <div className="d-flex justify-content-center">
                            {this.state.pagiNation && (
                                <div className="page">
                                    <Pagination>
                                        <PaginationItem disabled={currentPage <= 0}>
                                            <PaginationLink
                                                className="prev-next-buttons"
                                                onClick={e => this.handleClick(e, currentPage - 1)}
                                                href="#"
                                            >
                                                Previous
                                        </PaginationLink>
                                        </PaginationItem>
                                        {[...Array(this.pagesCount)].map((currentPageno, i) => (
                                            <PaginationItem active={i === currentPage} key={i}>
                                                <PaginationLink
                                                    className="page-numbers"
                                                    onClick={e => this.handleClick(e, i)}
                                                    href="#"
                                                >
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                                            <PaginationLink
                                                className="prev-next-buttons"
                                                onClick={e => this.handleClick(e, currentPage + 1)}
                                                href="#"
                                            >
                                                Next
                                       </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                            )}
                        </div>}
                        <div className='p-0 m-0 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <Table className="tableData w-100 p-0 m-0 table table-striped col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <thead>
                                    <tr>
                                        <th className="heading">

                                        </th>
                                        <th className="heading">
                                            Token No <span />
                                            <Button
                                                id="first"
                                                outline
                                                style={{ border: 'none' }}
                                                type="button"
                                                onClick={e => this.changeText1(e)}
                                            >
                                                {this.state.text1 ? <i className="fas fa-sort-amount-down-alt"></i> : <i className="fas fa-sort-amount-down"></i>}
                                                {this.state.text1 ?
                                                    <UncontrolledTooltip placement="top" target="first">
                                                        Ascending
                                                    </UncontrolledTooltip> :
                                                    <UncontrolledTooltip placement="top" target="first">
                                                        Desscending
                                                    </UncontrolledTooltip>
                                                }
                                            </Button>
                                        </th>
                                        <th className="heading">
                                            Customer Name <span />
                                            <Button
                                                id="second"
                                                style={{ border: 'none' }}
                                                outline
                                                type="button"
                                                onClick={e => this.changeText2(e)}
                                            >
                                                {this.state.text2 ? <i className="fas fa-sort-amount-down-alt"></i> : <i className="fas fa-sort-amount-down"></i>}
                                            </Button>
                                            {this.state.text2 ?
                                                    <UncontrolledTooltip placement="top" target="second">
                                                        Ascending
                                                    </UncontrolledTooltip> :
                                                    <UncontrolledTooltip placement="top" target="second">
                                                        Desscending
                                                    </UncontrolledTooltip>
                                                }
                                        </th>
                                        <th className="heading">
                                            Customer Mobile <span />
                                            <Button
                                                id="third"
                                                outline
                                                style={{ border: 'none' }}
                                                type="button"
                                                onClick={e => this.changeText3(e)}
                                            >
                                                {this.state.text3 ? <i className="fas fa-sort-amount-down-alt"></i> : <i className="fas fa-sort-amount-down"></i>}
                                            </Button>
                                            {this.state.text3 ?
                                                    <UncontrolledTooltip placement="top" target="third">
                                                        Ascending
                                                    </UncontrolledTooltip> :
                                                    <UncontrolledTooltip placement="top" target="third">
                                                        Desscending
                                                    </UncontrolledTooltip>
                                                }
                                        </th>
                                        <th className="heading">
                                            {" "}
                                            Tractor No <span />
                                            <Button
                                                id="fourth"
                                                outline
                                                style={{ border: 'none' }}
                                                type="button"
                                                onClick={e => this.changeText4(e)}
                                            >
                                                {this.state.text4 ? <i className="fas fa-sort-amount-down-alt"></i> : <i className="fas fa-sort-amount-down"></i>}
                                            </Button>
                                            {this.state.text4 ?
                                                    <UncontrolledTooltip placement="top" target="fourth">
                                                        Ascending
                                                    </UncontrolledTooltip> :
                                                    <UncontrolledTooltip placement="top" target="fourth">
                                                        Desscending
                                                    </UncontrolledTooltip>
                                                }
                                        </th>
                                        <th className="heading">
                                            {" "}
                                            JOB CARD NO <span />
                                            <Button
                                                id="fifth"
                                                outline
                                                style={{ border: 'none' }}
                                                type="button"
                                                onClick={e => this.changeText5(e)}
                                            >
                                                {this.state.text5 ? <i className="fas fa-sort-amount-down-alt"></i> : <i className="fas fa-sort-amount-down"></i>}
                                            </Button>
                                            {this.state.text5 ?
                                                    <UncontrolledTooltip placement="top" target="fifth">
                                                        Ascending
                                                    </UncontrolledTooltip> :
                                                    <UncontrolledTooltip placement="top" target="fifth">
                                                        Desscending
                                                    </UncontrolledTooltip>
                                                }
                                        </th>
                                        <th className="heading">
                                            {" "}
                                            GIFTS <span />
                                            <Button
                                            id="sixth"
                                                outline
                                                style={{ border: 'none' }}
                                                type="button"
                                                onClick={e => this.changeText6(e)}
                                            >
                                                {this.state.text6 ? <i className="fas fa-sort-amount-down-alt"></i> : <i className="fas fa-sort-amount-down"></i>}
                                            </Button>
                                            {this.state.text6 ?
                                                    <UncontrolledTooltip placement="top" target="sixth">
                                                        Ascending
                                                    </UncontrolledTooltip> :
                                                    <UncontrolledTooltip placement="top" target="sixth">
                                                        Desscending
                                                    </UncontrolledTooltip>
                                                }
                                        </th>
                                        <th className="heading">
                                            {" "}
                                            OIL CHANGE <span />
                                            <Button
                                            id="seventh"
                                                outline
                                                style={{ border: 'none' }}
                                                type="button"
                                                onClick={e => this.changeText7(e)}
                                            >
                                                {this.state.text7 ? <i className="fas fa-sort-amount-down-alt"></i> : <i className="fas fa-sort-amount-down"></i>}
                                            </Button>
                                            {this.state.text7 ?
                                                    <UncontrolledTooltip placement="top" target="seventh">
                                                        Ascending
                                                    </UncontrolledTooltip> :
                                                    <UncontrolledTooltip placement="top" target="seventh">
                                                        Desscending
                                                    </UncontrolledTooltip>
                                                }
                                        </th>
                                        <th className="heading">
                                            {" "}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filterData.length > 0 ? this.state.filterData
                                        .slice(
                                            currentPage * this.pageSize,
                                            (currentPage + 1) * this.pageSize
                                        )
                                        .map((i, index) => {
                                            return (
                                                <tr key={i.mobile}>
                                                    <td>{index + 1}</td>
                                                    <td>{i.token ? i.token : '-'}</td>
                                                    <td>{i.name ? i.name : '-'}</td>
                                                    <td>{i.mobile ? i.mobile : '-'}</td>
                                                    <td>{i.tractor ? i.tractor : '-'}</td>
                                                    <td>{i.jcNo ? i.jcNo : '-'}</td>
                                                    <td onClick={(e) => this.updateGifts(e, i)}>{i.gift_status == 'Not_Given' ? <div className="Not_Given">Not Given</div> : <div className="Given">Given</div>}</td>
                                                    <td onClick={(e) => this.updateOilChange(e, i)}>{i.oilChange == 'No' ? <div className="Not_Given">No</div> : <div className="Given">Yes</div>}</td>
                                                    <td><i style={{ cursor: 'pointer' }} onClick={(e) => this.deleteRow(e, i)} className="delBtn fas fa-trash-alt text-danger"></i></td>
                                                </tr>
                                            );
                                        }) : <tr>
                                            <td colSpan="9" className="text-center"><span className="text-warning font-weight-bold">OOPS! NO DATA FOUND</span></td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
