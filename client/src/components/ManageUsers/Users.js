import { useEffect, useState, useContext } from "react";
import { fetchAllUser, deleteUser } from '../../services/userService';
import './Users.scss';
import ReactPaginate from 'react-paginate';
import Login from "../Login/Login";
import { toast } from 'react-toastify';
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

function Users(props) {

    const [listUsers, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [dataModalDelete, setDataModalDelete] = useState({});
    const [dataModalUser, setDataModalUser] = useState({});
    const [actionModalUser, setActionModalUser] = useState("CREATE");

    useEffect(() => {
        fetchUsers();

    }, [currentPage])

    const fetchUsers = async () => {
        let res = await fetchAllUser(currentPage, currentLimit);
        if (res && res.EC === 0) {
            setTotalPages(res.DT.totalPages);
            setListUser(res.DT.users);
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = async (user) => {
        setIsShowModalDelete(true);
        setDataModalDelete(user);
    }

    const confirmDeleteUser = async () => {
        let res = await deleteUser(dataModalDelete.id);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            await fetchUsers();
        } else {
            toast.error(res.EM);
        }
        setIsShowModalDelete(false);

    }

    const handleCloseModalDelete = () => {
        setIsShowModalDelete(false);
        setDataModalDelete({});

    }

    const handleCloseModalUser = async () => {
        setIsShowModalUser(false);
        setDataModalUser({});
        await fetchUsers();

    }

    const handleAddNewUser = () => {
        setActionModalUser("CREATE");
        setIsShowModalUser(true)
    }

    const handleUpdateUser = async (user) => {
        setActionModalUser("UPDATE");
        setIsShowModalUser(true);
        setDataModalUser(user);
    }

    const handleRefresh = async () => {
        await fetchUsers();
    }

    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table Users</h3>
                        </div>
                        <div className="actions mb-3">
                            <button
                                className="btn btn-success mx-3"
                                onClick={() => handleRefresh()}

                            >
                                <i className="fa fa-refresh mx-1"></i>
                                Refresh
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleAddNewUser()}
                            >
                                <i className="fa fa-plus-circle mx-1"></i>
                                Add new user
                            </button>
                        </div>
                    </div>

                    <div className="user-body">
                        <table style={{ width: '100%' }} className="table table-bordered table-hover">
                            <tbody >
                                <tr>
                                    <th>No</th>
                                    <th>Id</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Group</th>
                                    <th>Action</th>
                                </tr>

                                {
                                    listUsers && listUsers.length > 0 ?
                                        <>
                                            {
                                                listUsers.map((item, index) => {
                                                    return (
                                                        <tr key={`row-${index}`}>
                                                            <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                            <td>{item.id}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.username}</td>
                                                            <td>{item.Group ? item.Group.name : ''}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-warning mx-3"
                                                                    onClick={() => handleUpdateUser(item)}

                                                                >
                                                                    <i className="fa fa-pencil mx-1"></i>
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => handleDeleteUser(item)}
                                                                >
                                                                    <i className="fa fa-trash-o mx-1"></i>
                                                                    Delete
                                                                </button>
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </>
                                        :
                                        <>
                                            <tr>
                                                <td colSpan={5}>Not found users</td>
                                            </tr>
                                        </>
                                }
                            </tbody>
                        </table>
                    </div>

                    {
                        totalPages > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={4}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleCloseModalDelete}
                dataModal={dataModalDelete}
                confirmDeleteUser={confirmDeleteUser}
            />
            <ModalUser
                show={isShowModalUser}
                handleClose={handleCloseModalUser}
                action={actionModalUser}
                dataModal={dataModalUser}
            />
        </>

    )
}

export default Users;