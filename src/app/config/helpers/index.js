const handlebarsHelpers = {
    isEmptyProductList(products) {
        return !Boolean(products.length)
    },
    getListLength(list) {
        return list.length
    },
    countFromOne(index) {
        return index + 1
    },
}

module.exports = handlebarsHelpers