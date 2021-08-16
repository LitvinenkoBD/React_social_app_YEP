import {connect} from "react-redux";
import {
    followAC,
    unfollowAC,
    setUsersAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    isFetchingAC
} from "../../redux/users-reduser";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Fetching from "../../assets/images/fetching.gif"
import Preloader from "../common/Preloader/Preloader";

//AJAX--GET--LOGIC--CLASS--CONTAINER--AREA--AJAX--GET--LOGIC--CLASS--CONTAINER--AREA--AJAX--GET--LOGIC--CLASS--CONTAINER

class UsersAPIComponent extends React.Component {
    //это можно удалить, по дефолту это реакт и так ставит, если нет другой добавочной логики.
    constructor(props) {
        super(props);
    }
    //мы тут оращаемся к методу жизненного цикла React
    // componentDidMount, при котором компонента выполнила свое "чистое" предназначение и отрисовалась в DOM
    componentDidMount() {
        this.props.isFetchingDF(true)
        if (this.props.users.length === 0) {
            // alert("NEW");
            //делаем запрос на эндпоинт по юрл
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
                this.props.isFetchingDF(false)
                this.props.setUsersDuFu(response.data.items);
                this.props.setTotalUsersCountDF(response.data.totalCount)
            })
        }
    }
    onPagenationClick = (pageNumber) => {
        this.props.setCurrentPageDF(pageNumber);
        this.props.isFetchingDF(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${ pageNumber }&count=${this.props.pageSize}`).then(response => {
            this.props.isFetchingDF(false);
            this.props.setUsersDuFu(response.data.items)
        })
    }
    render() {
        return <>
            <div>
                {this.props.isFetching ? <Preloader/> : null}
                {/*{this.props.isFetching ? <span>>>>DOWNLOADING DATA>>></span> : null}*/}
            </div>
            <Users totalUsersCount={this.props.totalUsersCount}
                          pageSize={this.props.pageSize}
                          currentPage={this.props.currentPage}
                          onPagenationClick={this.onPagenationClick}
                          users={this.props.users}
                          unfollowDumFun={this.props.unfollowDumFun}
                          followDumFun={this.props.followDumFun}
            />

        </>
    }
}


//PROPS CREATE AREA---PROPS CREATE AREA---PROPS CREATE AREA---PROPS CREATE AREA---PROPS CREATE AREA---PROPS CREATE AREA

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        followDumFun: (userId) => {
            dispatch(followAC(userId));
        },
        unfollowDumFun: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsersDuFu: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPageDF: (current) => {
            dispatch(setCurrentPageAC(current))
        },
        setTotalUsersCountDF: (current) => {
            dispatch(setTotalUsersCountAC(current))
        },
        isFetchingDF: (isFetching) => {
            dispatch(isFetchingAC(isFetching))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);