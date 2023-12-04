window.addEventListener('DOMContentLoaded', () => {
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)

    // select elements
    const priceTagElement = $('.pro-price')
    const sliderLeftBtnElements = $$('.detail__slider-left-btn')
    const sliderRightBtnElements = $$('.detail__slider-right-btn')
    const descriptionImages = $$('.detail__small-image')
    const mainImageContainer = $('.img-container')
    const imageBoxElement = $('#imgBox')
    const smallImageBoxElement = $('.product__small-image-container')
    const addToCartBtnElement = $('.btn-buynow')
    const modalElement = $('.modal')
    const loginFormElement = $('.login-form')
    const headerCartBadge = $('.header__cart-badge')

    var currentImageIndex = 0

    // declare handler functions
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-DE').format(value)
    }

    const handleUpdateImage = () => {
        descriptionImages.forEach(imageTag => imageTag.classList.remove('active'))
        imageBoxElement.setAttribute('src', descriptionImages[currentImageIndex].getAttribute('src'))
        descriptionImages[currentImageIndex].classList.add('active')
    }

    const handleSetSliderButton = () => {
        sliderLeftBtnElements.forEach(btn => {
           btn.classList.toggle('disabled', currentImageIndex === 0)
        })

        sliderRightBtnElements.forEach(btn => {
            btn.classList.toggle('disabled', currentImageIndex === descriptionImages.length - 1)
        })
    }

    const handleNextImage = () => {
        if(currentImageIndex === descriptionImages.length - 1)
            return
        currentImageIndex++
        smallImageBoxElement.style.transform = `translateX(-${(currentImageIndex%descriptionImages.length)*146}px)`
        handleUpdateImage()
        handleSetSliderButton()
    }

    const handleBackImage = () => {
        if(currentImageIndex === 0)
            return
        currentImageIndex--
        smallImageBoxElement.style.transform = `translateX(+${(currentImageIndex%(descriptionImages.length-1))*146}px)`
        handleUpdateImage()
        handleSetSliderButton()
    }

    // set events
    priceTagElement.innerText = formatCurrency(Number(priceTagElement.innerText)).toString() + 'đ'
    smallImageBoxElement.onmouseover = handleSetSliderButton
    mainImageContainer.onmouseover = handleSetSliderButton
    sliderRightBtnElements.forEach(btn => {
        btn.onclick = handleNextImage
    })
    sliderLeftBtnElements.forEach(btn => btn.onclick = handleBackImage)

    addToCartBtnElement.onclick = function(e) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if(!currentUser) {
            modalElement.classList.add('active')
            loginFormElement.classList.add('active')
        }
        else {
            const productId = $('.product_id').innerText
            const userId = currentUser._id
            console.log(productId, userId)
            fetch('https://localhost:3000/cart/add-product', {
                method: "POST",
                body: JSON.stringify({ userId, productId })
            })
                .then(response => {
                    if(response.status === 400)
                        window.alert('Sản phẩm đã có trong giỏ hàng của bạn')
                    else {
                        window.alert("Thêm sản phẩm thành công")
                    }
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    headerCartBadge.innerText = data.numberOfProduct
                })
                .catch(err => console.log(err))
        }
    }   

    //invoke handler functions
    handleUpdateImage()

})