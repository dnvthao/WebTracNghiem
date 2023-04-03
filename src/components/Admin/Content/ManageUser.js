import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModelUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
    const LIMIT_USER= 1;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});

    const[showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listUsers,setListUsers]= useState([]);

    //componentDidMount
    useEffect( ()=>{
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    }, []);

    const fetchListUsers= async ()=>{
        let res= await getAllUsers();
        if(res.EC===0){
            setListUsers(res.DT)
        }
    }
    const fetchListUsersWithPaginate= async (page)=>{
        let res= await getUserWithPaginate(page, LIMIT_USER);
        if(res.EC===0){
            console.log('res.dt =', res.DT);
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }

    const handleClickBtnDelete =(user) =>{
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus /> Add new user</button>
                </div>
                <div className="table-users-container">
                    {/*<TableUser 
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                    />*/}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}             
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalCreateUser}
                dataDelete={dataDelete}
                fetchListUsers={fetchListUsers}
                resetUpdateData={resetUpdateData}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                />
                
            </div>

        </div>
    )
}

export default ManageUser;