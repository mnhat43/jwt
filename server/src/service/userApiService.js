import { where } from "sequelize/dist/index.js";
import db from "../models";
import { checkEmailExit, checkPhoneExit, hashUserPassword } from './loginRegisterService'

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
            raw: true,
            nest: true
        });

        if (users) {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: users,
            }
        } else {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: [],
            }
        }

    } catch (error) {
        console.log(error);

        return {
            EM: 'Something wrongs with server',
            EC: 1,
            DT: [],
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        let { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            include: { model: db.Group, attributes: ["id", "name", "description"] },
            order: [
                ['id', 'DESC']
            ],
            raw: true,
            nest: true
        })

        let totalPages = Math.ceil(count / limit)

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
        }


        return {
            EM: 'ok',
            EC: 0,
            DT: data,
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Somthing wrongs in service',
            EC: -2,
            DT: '',
        }
    }
}

const createNewUser = async (data) => {
    try {
        let isEmailExit = await checkEmailExit(data.email);
        if (isEmailExit) {
            return {
                EM: 'The email is already exist',
                EC: 1,
                DT: 'email',
            }
        }
        let isPhoneExit = await checkPhoneExit(data.phone);
        if (isPhoneExit) {
            return {
                EM: 'The phone is already exist',
                EC: 1,
                DT: 'phone',
            }
        }

        let hashPassword = await hashUserPassword(data.password);

        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: 'Create user success',
            EC: 0,
            DT: [],
        }
    } catch (error) {
        console.log(error);

        return {
            EM: 'Something wrongs with server',
            EC: 1,
            DT: [],
        }
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) return {
            EM: 'Error with empty GroupId',
            EC: 1,
            DT: 'groupId',
        }
        let user = await db.User.findOne({
            where: { id: data.id },
            raw: false

        })

        if (user) {
            user.username = data.username;
            user.address = data.address;
            user.sex = data.sex;
            user.groupId = data.groupId;

            await user.save();

            return {
                EM: 'Update user success',
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: 'User not found !',
                EC: 2,
                DT: [],
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrongs with server',
            EC: 1,
            DT: [],
        }
    }
}

const deleteUser = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Require paramter : id',
                EC: 0,
                DT: [],
            }
        }
        let user = await db.User.findOne({
            where: { id: id }
        })

        if (user) {
            await db.User.destroy({
                where: { id: id }
            });
            return {
                EM: 'Delete user success',
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: 'User not exist',
                EC: 2,
                DT: [],
            }
        }
        await db.User.delete({
            where: { id: id }
        })
    } catch (error) {
        console.log(error);

        return {
            EM: 'Something wrongs with server',
            EC: 1,
            DT: [],
        }
    }


}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}