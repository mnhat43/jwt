import mysql from 'mysql2';
import userService from '../service/userService'

const handleHomePage = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList });
}

const handleCreateNewUser = async (req, res) => {
    let { email, password, username } = req.body;
    // let check = bcrypt.compareSync(password, hashPassword);

    await userService.createNewUser(email, password, username);

    return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
    let id = req.params.id;

    await userService.deleteUser(id);

    return res.redirect("/user");
}

const handleUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    return res.render("user-update.ejs", { user });
}

const handleUpdateUser = async (req, res) => {
    let { email, username, id } = req.body;
    await userService.updateUserInfor(id, email, username);
    return res.redirect("/user");
}

module.exports = {
    handleHomePage, handleUserPage, handleCreateNewUser, handleDeleteUser, handleUpdateUserPage, handleUpdateUser
}