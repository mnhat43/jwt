import express from "express";
const router = express.Router();
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import roleController from '../controller/roleController';
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermisson } from '../middleware/JWTActions';

const initApiRoutes = (app) => {

    router.all('*', checkUserJWT, checkUserPermisson);

    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);
    router.get("/account", userController.getUserAccount);

    //user routes
    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.post("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    //role routes
    router.get("/role/read", roleController.readFunc);
    router.post("/role/create", roleController.createFunc);
    router.post("/role/update", roleController.updateFunc);
    router.delete("/role/delete", roleController.deleteFunc);
    router.get("/role/by-group/:id", roleController.getRoleByGroup);
    router.post("/role/assign-to-group", roleController.assignRoleToGroup);

    //group routes
    router.get("/group/read", groupController.readFunc);


    return app.use("/api/v1/", router);
}

export default initApiRoutes;