import roleApiService from '../service/roleApiService'

const readFunc = async (req, res) => {
    try {
        // if (req.query.page && req.query.limit) {
        //     let page = req.query.page;
        //     let limit = req.query.limit;

        //     let data = await roleApiService.getUserWithPagination(+page, +limit);
        //     return res.status(200).json({
        //         EM: data.EM, //error message
        //         EC: data.EC, //error code
        //         DT: data.DT, //data
        //     })
        // }


        let data = await roleApiService.getAllRoles();
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
const createFunc = async (req, res) => {
    try {

        let data = await roleApiService.createNewRoles(req.body);
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

        let data = await roleApiService.updateUser(req.body);
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
        let data = await roleApiService.deleteRole(req.query.id);

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

const getRoleByGroup = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await roleApiService.getRoleByGroup(id);
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

const assignRoleToGroup = async (req, res) => {
    try {
        let data = await roleApiService.assignRoleToGroup(req.body.data);

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


module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getRoleByGroup, assignRoleToGroup
}