import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { fetchAllRole, deleteRoles } from '../../services/roleService';
import { set } from "lodash";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {

    const [listRoles, setListRoles] = useState([]);

    useEffect(() => {
        getAllRole();
    }, []);

    useImperativeHandle(ref, () => ({
        fetListRolesAgain() {
            getAllRole();
        }
    }));

    const getAllRole = async () => {
        let res = await fetchAllRole();
        if (res && +res.EC === 0) {
            setListRoles(res.DT);
        }
    }

    const handleDeleteRoles = async (role) => {
        let res = await deleteRoles(role.id);
        if (res && +res.EC === 0) {
            // toast.success(res.EM)
            await getAllRole();
        }
    }

    return (
        <div>
            <table style={{ width: '100%' }} className="table table-bordered table-hover">
                <tbody >
                    <tr>
                        <th>Id</th>
                        <th>URL</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    {
                        listRoles && listRoles.length > 0 ?
                            <>
                                {
                                    listRoles.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{item.id}</td>
                                                <td>{item.url}</td>
                                                <td>{item.description}</td>
                                                <td>
                                                    {/* <button
                                                        className="btn btn-warning mx-3"
                                                        onClick={() => handleDeleteRoles(item)}

                                                    >
                                                        <i className="fa fa-pencil mx-1"></i>
                                                        Edit
                                                    </button> */}
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDeleteRoles(item)}
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
                                    <td colSpan={5}>Not found roles</td>
                                </tr>
                            </>
                    }
                </tbody>
            </table>
        </div>
    )
})

export default TableRole;