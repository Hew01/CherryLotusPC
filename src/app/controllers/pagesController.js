class PagesController {
    //[GET] /pages/sales
    getSalesPage(req, res, next) {
        res.render('sales')
    }
}

module.exports = new PagesController