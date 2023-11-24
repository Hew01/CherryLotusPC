const handlebarsHelpers = {
    isEmptyProductList(products) {
        return !Boolean(products.length)
    }
}

module.exports = handlebarsHelpers