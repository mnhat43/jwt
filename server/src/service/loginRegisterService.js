import db from "../models";
import bcrypt, { hash } from 'bcryptjs';
import { Op } from 'sequelize';
import { getGroupWithRoles } from './JWTService';
import { createJWT } from '../middleware/JWTActions';
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    })
}

const checkEmailExit = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) return true;
    else return false;
}

const checkPhoneExit = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })

    if (user) return true;
    else return false;
}

const registerNewUser = async (rawUserData) => {
    try {
        let isEmailExit = await checkEmailExit(rawUserData.email);
        if (isEmailExit) {
            return {
                EM: 'The email is already exist',
                EC: 1,
                DT: '',
            }
        }
        let isPhoneExit = await checkPhoneExit(rawUserData.phone);
        if (isPhoneExit) {
            return {
                EM: 'The phone is already exist',
                EC: 1,
                DT: '',
            }
        }
        let hashPassword = await hashUserPassword(rawUserData.password);
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashPassword,
            groupId: 4
        })
        return {
            EM: 'A user is created successfully',
            EC: 0,
            DT: '',
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

const checkPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin },
                ]
            }
        })

        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword) {
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    username: user.username,
                    groupWithRoles,
                }
                let token = createJWT(payload);

                return {
                    EM: 'ok !',
                    EC: 0,
                    DT: {
                        access_token: token,
                        email: user.email,
                        username: user.username,
                        groupWithRoles: groupWithRoles,
                    },
                }
            }
        }

        return {
            EM: 'Your email or phone number or password is incorrect !',
            EC: 1,
            DT: '',
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

module.exports = {
    registerNewUser, handleUserLogin, hashUserPassword, checkEmailExit, checkPhoneExit
}