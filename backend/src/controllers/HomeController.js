/**
 * The controller returns home page html
 * @since 0.1.0
 * @author Le Trung Nhan
 */

class HomeController {
    get(req, res, next){
        res.render('index', { title: 'Express' });
    }
}

module.exports = new HomeController;