const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-DE').format(value)
}

const mongooseToObject = (obj) => {
    return obj.toObject()
}

const mongooseToObjectAll = (arr) => {
    return arr.map(item => item.toObject())
}


module.exports = { formatCurrency, mongooseToObject , mongooseToObjectAll}