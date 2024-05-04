import { useContext, useEffect } from "react"
import {
    Route,
} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom";


const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);

    if (user && user.isAuthenticated) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        )
    }
    return (
        <Redirect to='/login'>
        </Redirect>
    )

}

export default PrivateRoutes