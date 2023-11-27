window.addEventListener('DOMContentLoaded', () => {
    // get elements
    categoryMenuItemElements = document.querySelectorAll('.home__menu-categories-item')
    categoryWrapperElements = document.querySelectorAll('.home__categories-detail-wrapper')
    categoryDetailElement = document.querySelector('.home__categories-detail')

    // set events
    categoryMenuItemElements.forEach(item => {
        item.onmouseover = function(event) {
            item.classList.add('active')
            categoryDetailElement.style.display = 'flex'
            categoryWrapperElements.forEach(section => {
                section.classList.toggle('active', section.dataset.category === item.dataset.category)
            })
        }

        item.onmouseout = function(event) {
            item.classList.remove('active')
            categoryDetailElement.style.display = 'none'
        }
    })

    categoryDetailElement.onmouseout = function(event) {
        categoryMenuItemElements.forEach(item => item.classList.remove('active'))
       this.style.display = 'none'
    }

    categoryDetailElement.onmouseover = function() {
        categoryWrapperElements.forEach(item => {
            if(item.classList.contains('active')) {
                categoryMenuItemElements.forEach(menuItem => {
                    menuItem.classList.toggle('active', menuItem.dataset.category === item.dataset.category )
                })
            }
        })
        this.style.display = 'flex'
    }
})