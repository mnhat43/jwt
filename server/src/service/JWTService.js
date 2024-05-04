import db from "../models";

const getGroupWithRoles = async (user) => {
    let groupWithRoles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],
        include: {
            model: db.Role,
            attributes: ["id", "url", "description"],
            through: { attributes: [] }
        },
        raw: false,
        nest: true
    })
    return groupWithRoles ? groupWithRoles : {};
}

module.exports = {
    getGroupWithRoles
}