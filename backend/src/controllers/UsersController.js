/**
 * The controller contains logic for users resources
 * @since 0.1.0
 * @author Le Trung Nhan
 */


class UsersController {
    get(req, res, next) {
        res.send("respond with a resource");
    }
}

module.exports = new UsersController;