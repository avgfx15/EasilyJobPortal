export default class Error404Controller {
    getErrorPage = async (req, res) => {
        return res.render('404Page');
    }
}
