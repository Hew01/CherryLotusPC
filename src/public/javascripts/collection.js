window.addEventListener('DOMContentLoaded', () => {
    // get elements
    const productCardElements = document.querySelectorAll('.product-card')
    const productPriceTagElements = document.querySelectorAll('.card-price')
    const sortConditionElement = document.querySelector('.collection__sort-condition')
    const sortOptionElements = document.querySelectorAll('.collection__sort-box li')

    // set events
    productPriceTagElements.forEach(tag => {
        tag.innerText = formatCurrency(Number(tag.innerText)).toString() + ' đ'
    })

    productCardElements.forEach(card => {
        card.onclick = function() {
            window.location.href = `http://localhost:3000/products/details/${this.dataset.id}`
        }
    })

    sortOptionElements.forEach(option => {
        option.classList.toggle('active', option.dataset.type === sortConditionElement.dataset.type)
    })

    if(sortConditionElement.dataset.type === 'asc')
        sortConditionElement.innerText = 'Giá tăng dần'
    else  sortConditionElement.innerText = 'Giá giảm dần'


    // declare functions
    function formatCurrency (value) {
        return new Intl.NumberFormat('en-DE').format(value)
    }
})