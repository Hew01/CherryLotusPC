class PagesController {
    //[GET] /pages/sales
    getSalesPage(req, res, next) {
        res.render('sales')
    }

    //[GET] /pages/shoow-room
    getShowroomPage(req, res, next) {
        res.render('showroom')
    }
}

module.exports = new PagesController