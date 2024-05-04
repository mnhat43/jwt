import userApiService from '../service/userApiService'

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await userApiService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, //error code
                DT: data.DT, //data
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //data
        })
    }
}
const createFunc = async (req, res) => {
    try {

        let data = await userApiService.createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //data
        })
    }
}
const updateFunc = async (req, res) => {
    try {

        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //data
        })
    }
}
const deleteFunc = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.query.id);

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //data
        })
    }
}

const getUserAccount = async (req, res) => {

    return res.status(200).json({
        EM: 'ok !',
        EC: 0,
        DT: {
            access_token: req.token,
            email: req.user.email,
            username: req.user.username,
            groupWithRoles: req.user.groupWithRoles,
        },
    })
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getUserAccount
}