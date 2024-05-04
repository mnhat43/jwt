import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup, createNewUser, updateUser } from '../../services/userService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {

    const { action, dataModal } = props;

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        groupId: '',
    }

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        groupId: true,
    }

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [sex, setSex] = useState("");

    const [userGroup, setUserGroup] = useState([]);

    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);


    useEffect(() => {
        getGroups();
    }, [])

    useEffect(() => {
        if (action === "UPDATE") {
            setUserData({ ...dataModal, groupId: dataModal.Group ? dataModal.Group.id : '' });
        }
    }, [dataModal])

    useEffect(() => {
        if (action === "CREATE") {
            if (userGroup && userGroup.length > 0) {
                setUserData({ ...userData, groupId: userGroup[0].id })
            }
        }
    }, [action])


    const getGroups = async () => {
        let res = await fetchGroup();

        if (res && res.EC === 0) {
            toast.success(res.EM);
            setUserGroup(res.DT);
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT;
                setUserData({ ...userData, groupId: groups[0].id })
            }
        } else {
            toast.error(res.EM);
        }

    }

    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const checkValidateInputs = () => {

        if (action === "UPDATE") return true;

        setValidInputs(validInputsDefault);
        let arr = ['email', 'phone', 'password', 'groupId'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);

                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }

    const handleConfirmUser = async () => {
        let check = checkValidateInputs();
        console.log("check >> ", check);
        if (check) {
            let res = action === "CREATE" ? await createNewUser(userData) : await updateUser(userData);
            console.log(res);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                setUserData({ ...defaultUserData, groupId: userGroup && userGroup.length > 0 ? userGroup[0].id : '' })
                props.handleClose();
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    }

    const handleCloseModalUser = () => {
        props.handleClose();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    }

    return (
        <>

            <Modal show={props.show} onHide={handleCloseModalUser} size='lg' className='modal-user'>
                <Modal.Header closeButton>
                    <Modal.Title><span>{action === "CREATE" ? 'Create new user' : 'UPDATE a user'}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-6 form-group'>
                            <label>Email (<span style={{ color: 'red' }}>*</span>): </label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                type='email'
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                value={userData.email}
                                onChange={(event) => handleOnChangeInput(event.target.value, "email")}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Phone number (<span style={{ color: 'red' }}>*</span>): </label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                type='text'
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                value={userData.phone}
                                onChange={(event) => handleOnChangeInput(event.target.value, "phone")}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Usename: </label>
                            <input
                                type='text'
                                className={validInputs.username ? 'form-control' : 'form-control is-invalid'}
                                value={userData.username}
                                onChange={(event) => handleOnChangeInput(event.target.value, "username")}
                            />
                        </div>

                        <div className='col-6 form-group'>
                            {
                                action === "CREATE" &&
                                <>
                                    <label>Password (<span style={{ color: 'red' }}>*</span>): </label>
                                    <input
                                        type='password'
                                        className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                        value={userData.password}
                                        onChange={(event) => handleOnChangeInput(event.target.value, "password")}
                                    />
                                </>
                            }

                        </div>
                        <div className='col-12 form-group'>
                            <label>Address: </label>
                            <input
                                type='text'
                                className={validInputs.address ? 'form-control' : 'form-control is-invalid'}
                                value={userData.address}
                                onChange={(event) => handleOnChangeInput(event.target.value, "address")}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Gender: </label>
                            <select
                                className='form-select'
                                onChange={(event) => handleOnChangeInput(event.target.value, "sex")}
                                value={userData.sex}

                            >
                                <option defaultValue="Male" value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Group (<span style={{ color: 'red' }}>*</span>): </label>
                            <select
                                className={validInputs.password ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnChangeInput(event.target.value, "groupId")}
                                value={userData.groupId}
                            >
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
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalUser}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === "CREATE" ? "Save" : "Update"}

                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    )
}

export default ModalUser;