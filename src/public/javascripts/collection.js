window.addEventListener('DOMContentLoaded', () => {
    // get elements
    const productCardElements = document.querySelectorAll('.product-card')
    const productPriceTagElements = document.querySelectorAll('.card-price')

    // set events
    productPriceTagElements.forEach(tag => {
        tag.innerText = formatCurrency(Number(tag.innerText)).toString() + ' đ'
    })

    productCardElements.forEach(card => {
        card.onclick = function() {
            window.location.href = `http://localhost:3000/products/details/${this.dataset.id}`
        }
    })

    // declare functions
    function formatCurrency (value) {
        return new Intl.NumberFormat('en-DE').format(value)
    }
})