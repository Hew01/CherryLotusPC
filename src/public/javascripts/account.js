document.addEventListener("DOMContentLoaded", function () {
    // get elements
    const mainBoxContainerElements = document.querySelectorAll('.right-main-box');
    const leftSidebarTabElements = document.querySelectorAll(".left-sidebar_list .tab");
    const orderTabElements = document.querySelectorAll('.nav-info-item')
    const orderSectionElements = document.querySelectorAll('.account__order-container div')
    const updateInfoBtnElement = document.querySelector('#update-info')

    // declare functions
    const updateFirstTab = () => {
        mainBoxContainerElements.forEach(box => {
           box.classList.toggle('active', box.dataset.id === 'order')
        })

        orderSectionElements.forEach(section => {
            section.classList.toggle('active', section.dataset.id === 'orders-pending')
        })
    }

    // set events
    leftSidebarTabElements.forEach (tab => {
        tab.onclick = function() {
            leftSidebarTabElements.forEach(tabItem => tabItem.classList.remove('active'))
            this.classList.add('active')
            mainBoxContainerElements.forEach(box => {
                box.classList.toggle('active', box.dataset.id === this.dataset.id)
            })
        }
    })

    orderTabElements.forEach(tab => {
        tab.onclick = function() {
            orderTabElements.forEach(tabItem => tabItem.classList.remove('active'))
            this.classList.add('active')
            orderSectionElements.forEach(section => {
                section.classList.toggle('active', section.dataset.id === this.dataset.id)
            })
        }
    })

    updateInfoBtnElement.onclick = function(e) {
        e.preventDefault()
    }

    // declare functions
    updateFirstTab()
});
