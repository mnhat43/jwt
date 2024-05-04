import bcrypt from 'bcryptjs';
import mysql from 'mysql2';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

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

const createNewUser = async (email, password, username) => {
    let hashPassword = await hashUserPassword(password);
    try {
        await db.User.create({
            email: email,
            password: hashPassword,
            username: username
        })
    } catch (error) {
        console.log(error);
    }

}

const getUserList = async () => {
    let users = [];
    try {
        users = await db.User.findAll();
    } catch (error) {
        console.log(error);
    }
    return users;
}

const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: { id: id }
        });
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    // let user = {};
    try {
        let user = await db.User.findOne({
            where: { id: id }
        });

        return user;

    } catch (error) {
        console.log(error);
    }

}

const updateUserInfor = async (id, email, username) => {
    try {
        await db.User.update(
            {
                email: email, username: username
            },
            {
                where: { id: id }
            },
        );

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}

