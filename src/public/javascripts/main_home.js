window.addEventListener('DOMContentLoaded', () => {
    // get elements
    const categoryMenuItemElements = document.querySelectorAll('.home__menu-categories-item')
    const categoryWrapperElements = document.querySelectorAll('.home__categories-detail-wrapper')
    const categoryDetailElement = document.querySelector('.home__categories-detail')
    const cardPriceTagElements = document.querySelectorAll('.home__card-price')
    const productSectionElements = document.querySelectorAll('.home__product-section')
    const productCardElements = document.querySelectorAll('.home__product-card ')
    const mainBannerElement = document.querySelector('.home__main-banner')
    const nextBannerBtnElement = document.querySelector('.home__banner-btn--next')
    const prevBannerBtnElement = document.querySelector('.home__banner-btn--prev')

    var currentBannerIndex = 1

    // declare functions
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-DE').format(value)
    }       
    
    const updateProductSectionTitle = () => {
        productSectionElements.forEach(section => {
            const titleElement = section.querySelector('.home__section-title')
            switch(section.dataset.title) {
                case 'keyboard' : 
                {
                    titleElement.innerText = 'Bàn phím hot'
                    return
                }
                case 'mouse' : {
                    titleElement.innerText = 'Chuột máy tính'
                    return
                }
                case 'laptop' : {
                    titleElement.innerText = 'Laptop bán chạy'
                    return
                }
                case 'headphone' : {
                    titleElement.innerText = 'Tai nghe'
                    return
                }
                default : 
                    return 
            }
        })
    }

    const handleChangeBanner = () => {
        setInterval(() => {
            mainBannerElement.style.opacity = 0.5
            currentBannerIndex++
            if(currentBannerIndex === 4)
                currentBannerIndex = 1
            setTimeout(() => {
                mainBannerElement.setAttribute('src', `/assets/images/banner${currentBannerIndex}.jpg`)
                mainBannerElement.style.opacity = 1
            }, 200)
        }, 3400)
    }

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

    cardPriceTagElements.forEach(priceTag => {
        priceTag.innerText = formatCurrency(Number(priceTag.innerText)).toString() + ' đ'
    })

    productCardElements.forEach(card => {
        card.onclick = function() {
            window.location.href = `https://localhost:3000/products/details/${this.dataset.id}`
        }
    })

    nextBannerBtnElement.onclick = function(event) {
        mainBannerElement.style.opacity = 0.5
        currentBannerIndex++
        if(currentBannerIndex === 4)
            currentBannerIndex = 1
        setTimeout(() => {
            mainBannerElement.setAttribute('src', `/assets/images/banner${currentBannerIndex}.jpg`)
            mainBannerElement.style.opacity = 1
        }, 200)
    }

    prevBannerBtnElement.onclick = function(event) {
        mainBannerElement.style.opacity = 0.5
        currentBannerIndex--
        if(currentBannerIndex < 1)
            currentBannerIndex = 4
        setTimeout(() => {
            mainBannerElement.setAttribute('src', `/assets/images/banner${currentBannerIndex}.jpg`)
            mainBannerElement.style.opacity = 1
        }, 200)
    }

    //invoke functions
    updateProductSectionTitle()
    handleChangeBanner()
})