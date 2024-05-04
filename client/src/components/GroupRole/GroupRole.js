import { useEffect, useState } from 'react';
import './GroupRole.scss';
import { fetchGroup } from '../../services/userService';
import { toast } from 'react-toastify';
import { fetchAllRole, fetchRolesByGroup, assignRoleToGroup } from '../../services/roleService';
import { validate } from 'uuid';
import _ from 'lodash';

const GroupRole = () => {

    const [userGroup, setUserGroup] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");
    const [listRoles, setListRoles] = useState([]);

    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

    useEffect(() => {
        getGroups();
        getAllRole();
    }, [])

    const getGroups = async () => {
        let res = await fetchGroup();

        if (res && res.EC === 0) {
            toast.success(res.EM);
            setUserGroup(res.DT);
        } else {
            toast.error(res.EM);
        }

    }

    const getAllRole = async () => {
        let res = await fetchAllRole();
        if (res && +res.EC === 0) {
            setListRoles(res.DT);
        }
    }

    const handleOnchangeGroup = async (groudId) => {
        setSelectGroup(groudId);
        if (groudId) {
            let res = await fetchRolesByGroup(groudId);
            if (res && +res.EC === 0) {
                let result = buildDataRolesByGroup(res.DT.Roles, listRoles);
                setAssignRolesByGroup(result);
            }
        }
    }

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];

        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let object = {};
                object.url = role.url;
                object.id = role.id;
                object.description = role.description;
                object.isAssigned = false;

                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(item => item.url === object.url)
                }

                result.push(object);
            })
        }
        return result;
    }

    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value);
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned;
        }
        setAssignRolesByGroup(_assignRolesByGroup);
    }

    const builDataToSave = () => {
        let result = {};
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        result.groupId = +selectGroup;
        let groupRolesFilter = _assignRolesByGroup.filter(item => item.isAssigned === true);
        let finalGroupRoles = groupRolesFilter.map(item => {
            let data = { groupId: +selectGroup, roleId: +item.id };
            return data;
        })
        result.groupRoles = finalGroupRoles;
        return result;
    }

    const handleSave = async () => {
        let data = builDataToSave();
        let res = await assignRoleToGroup(data);
        console.log(res);
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='mt-3'>
                    <h4>Group Role</h4>
                    <div className='assign-group-role'>
                        <div>
                            <div className='col-6 form-group'>
                                <label>Select Group (<span style={{ color: 'red' }}>*</span>): </label>
                                <select
                                    className='form-select'
                                    onChange={(e) => handleOnchangeGroup(e.target.value)}
                                >
                                    <option value=''>Please select your group</option>
                                    {
                                        userGroup && userGroup.length > 0 &&
                                        userGroup.map((item, index) => {
                                            return (
                                                <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <hr />
                            {
                                selectGroup &&
                                <div className='roles'>
                                    <h4>Assign Roles: </h4>
                                    {
                                        assignRolesByGroup && assignRolesByGroup.length > 0
                                        && assignRolesByGroup.map((item, index) => {
                                            return (
                                                <div className='form-check' key={`list-role-${index}`}>
                                                    <input
                                                        className='form-check-input'
                                                        type='checkbox'
                                                        value={item.id}
                                                        id={`checkbox1-${index}`}
                                                        checked={item.isAssigned}
                                                        onChange={(e) => handleSelectRole(e.target.value)}
                                                    />
                                                    <label className='form-check-label' htmlFor={`checkbox1-${index}`}>
                                                        {item.url}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='mt-3'>
                                        <button className='btn btn-warning' onClick={() => handleSave()}>Save</button>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GroupRole;