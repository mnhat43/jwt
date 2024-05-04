import { useEffect, useRef, useState } from 'react';
import './Role.scss';
import _, { fromPairs } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createRoles } from '../../services/roleService';
import TableRole from './TableRole';

const Role = (props) => {

    const dataChildDefault = { url: '', description: '', isValidUrl: true };
    const [listChilds, setListChilds] = useState({
        child1: dataChildDefault,
    })

    const childRef = useRef();

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        if (name === "url" && value) {
            _listChilds[key]['isValidUrl'] = true;
        }
        setListChilds(_listChilds);
    }

    const handleAddNewInput = async () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = dataChildDefault
        setListChilds(_listChilds);
    }

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    }

    const builDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        Object.entries(listChilds).map(([key, value], index) => {
            result.push({
                url: value.url,
                description: value.description,
            })
        })
        return result;
    }

    const handleSave = async () => {
        let check = true;
        let isValidObj = Object.entries(listChilds).find(([key, value], index) => {
            return value && !value.url;
        })

        if (!isValidObj) {
            let data = builDataToPersist();
            let res = await createRoles(data);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                setListChilds({
                    child1: dataChildDefault,
                });
                childRef.current.fetListRolesAgain();
            }
        } else {
            toast.error("Input URL must not be empty...")
            let _listChilds = _.cloneDeep(listChilds);
            const key = isValidObj[0];
            _listChilds[key]['isValidUrl'] = false;
            setListChilds(_listChilds);
        }
    }

    return (
        <div className='role-container'>
            <div className='container'>
                <div className='adding-roles mt-3'>
                    <div className='title-role'>
                        <h4>Add a new role</h4>
                    </div>
                    <div className=' role-parent'>
                        {
                            Object.entries(listChilds).map(([key, value], index) => {
                                return (
                                    <div className='role-child row' key={`child-${key}`}>
                                        <div className={`col-5 form-group ${key}`}>
                                            <label>URL:</label>
                                            <input
                                                type='text'
                                                className={value.isValidUrl ? 'form-control' : 'form-control is-invalid'}
                                                value={value.url}
                                                onChange={(event) => handleOnchangeInput('url', event.target.value, key)}
                                            />
                                        </div>
                                        <div className='col-5 form-group'>
                                            <label>Description:</label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                value={value.description}
                                                onChange={(event) => handleOnchangeInput('description', event.target.value, key)}
                                            />
                                        </div>
                                        <div className='col-2 mt-4 actions'>
                                            <i className='fa fa-plus-circle add' onClick={() => handleAddNewInput()}></i>
                                            {
                                                index >= 1 && <i className="fa fa-trash-o delete" onClick={() => handleDeleteInput(key)}></i>
                                            }
                                        </div>
                                    </div >
                                )
                            })
                        }
                        <div>
                            <button className='btn btn-warning mt-3' onClick={() => handleSave()}>Save</button>
                        </div>
                    </div>
                </div>

                <hr />
                <div className='mt-3'>
                    <h4>List current roles: </h4>
                    <TableRole ref={childRef} />
                </div>
            </div>
        </div >
    )
}

export default Role;