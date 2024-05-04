import { set } from 'lodash';
import React, { useState, createContext, useEffect } from 'react';
import { getUserAccount } from '../services/userService';


const UserContext = createContext();

const UserProvider = ({ children }) => {

    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {}
    }
    const [user, setUser] = useState(userDefault);

    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    }

    const logoutContext = () => {
        setUser({ ...userDefault, isLoading: false });
    }

    const fetchUser = async () => {
        let res = await getUserAccount();
        if (res && res.EC === 0) {
            let token = res.DT.token;
            let groupWithRoles = res.DT.groupWithRoles;
            let email = res.DT.email;
            let username = res.DT.username;
            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username },
                isLoading: false
            }
            setUser(data);
        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }

    useEffect(() => {
        if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
            fetchUser();
        } else {
            setUser({ ...user, isLoading: false });
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };