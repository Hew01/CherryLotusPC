var currentStep = 1;
var infoCustomer = {
  name: "",
  phoneNumber: "",
  province: "",
  district: "",
  ward: "",
  home: "",
};

var addressCustomer = {
  nameCus: "",
  phoneCus: "",
  adressCus: "",
}

var totalPrice = 0;

const headerCartSteps = document.querySelectorAll(".header-cart__step");
const headerCartBadge = document.querySelector('.header__cart-badge')
const orderButtonElement = document.querySelector(".order-now");
const orderButtonElementFinal = document.querySelector(".order-now-final");
const forms = document.querySelectorAll("section");
const totalContainerElement = document.querySelector(".section-info-total");
const products = document.querySelectorAll(".product-cart-item");
const totalPriceElements = document.querySelectorAll(".total-price-value");

const nameCustomer = document.querySelector("#name-customer");
const phoneCustomer = document.querySelector("#phone-customer");
const provincesCustomer = document.querySelector("#provinces");
const districtCustomer = document.querySelector("#district");
const wardCustomer = document.querySelector("#wards");
const addressHome = document.querySelector("#adress-home");

const orderMore = document.querySelector(".breadcrumb-cart--link-product");
const backStep = document.querySelector(".back");
const backStepIcon = document.querySelectorAll(".header-cart__step--icon");
const orderNow = document.querySelector(".order-now");
const orderNowFinal = document.querySelector(".order-now-final");
const productPriceTags = document.querySelectorAll(".product-price");

const updateInfo = document.querySelectorAll(".innerText-box");
const updateFinalInfo = document.querySelectorAll(".final-info");
const increaseQuantityBtnElements = document.querySelectorAll('.plus')
const decreaseQuantityBtnElements = document.querySelectorAll('.minus')
const deleteProductBtnElements = document.querySelectorAll('.delete-product')
const cartItems = document.querySelectorAll('.product-cart-item')

const updateProgress = () => {
  headerCartSteps.forEach((step, index) => {
    if (index + 1 <= currentStep && index !== 0) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
};

const updateProductElement = () => {
  totalContainerElement.style.display = "block";
  forms.forEach((form, index) => {
    if (index + 1 === currentStep) {
      if (currentStep === 4) {
        totalContainerElement.style.display = "none";
      }
      form.classList.add("active");
    } else {
      form.classList.remove("active");
    }
  });
};

const updateTotalPrice = () => {
  totalPrice = 0;
  products.forEach((product) => {
    const quantity = Number(
      product.querySelector(".product-quantity").innerText
    );
    totalPrice += Number(product.dataset.price) * quantity;
  });
  totalPriceElements.forEach(
    (priceTag) =>
      (priceTag.innerText = `${formatCurrency(totalPrice).toString()} đ`)
  );
};

function updateStep() {
  if (currentStep === 2 || currentStep === 3) {
    backStep.classList.add("active");
    orderMore.classList.remove("active");
  }
  if (currentStep === 1) {
    backStep.classList.remove("active");
    orderMore.classList.add("active");
  }
  if (currentStep === 4) {
    backStep.classList.remove("active");
    orderMore.classList.remove("active");
  }
}

function updateOrderNow() {
  if (currentStep === 1 || currentStep === 2) {
    orderNow.classList.add("active");
    orderNowFinal.classList.remove("active");
  }
  if (currentStep === 3) {
    orderNow.classList.remove("active");
    orderNowFinal.classList.add("active");
  }
  if (currentStep === 4) {
    orderNow.classList.remove("active");
    orderNowFinal.classList.remove("active");
  }
}

const handleBackStep = () => {
  currentStep--;
  updateProgress();
  updateProductElement();
  updateStep();
};

const handleBackStepIcon = () => {
  backStepIcon.forEach((step, index) => {
    if (index < backStepIcon.length - 2 && currentStep !== 4) {
      step.onclick = function () {
        currentStep = index + 1;
        updateProgress();
        updateProductElement();
        updateOrderNow();
        updateStep();
      };
    }
  });
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-DE").format(value);
};

const handleFormatPrice = () => {
  productPriceTags.forEach((priceTag) => {
    priceTag.innerText =
      formatCurrency(Number(priceTag.innerText)).toString() + " đ";
  });
};

const handleMoveNextStep = () => {
  if (currentStep === 4) {
    return;
  }

  if (currentStep === 2) {
    let isEmpty = checkEmptyInvalid([
      phoneCustomer,
      nameCustomer,
      provincesCustomer,
      districtCustomer,
      wardCustomer,
      addressHome,
    ]);
    let isLength = checkLengthPhone(phoneCustomer);
    if (isEmpty) {
      return;
    } else {
      if (isLength) {
        return;
      }
      updateUserInfo();
      updateInfoCustomerPayment();
    }
  }

  if (currentStep === 3) {
    const userId = JSON.parse(localStorage.getItem('currentUser'))._id
    fetch('https://localhost:3000/order/place-order', {
       method: 'POST',
       body: JSON.stringify({ userId, name : infoCustomer.name, totalPrice, address : `${infoCustomer.home},${infoCustomer.ward},${infoCustomer.district},${infoCustomer.province}`, phoneNumber : infoCustomer.phoneNumber})
    })
    .then(res => {
        console.log(res)
        headerCartBadge.innerText = 0
        updateInfoCustomerPaymentFinal();
    })
    .catch(err => console.log(err))
  }

  currentStep++;
  updateProgress();
  updateProductElement();
  updateStep();
  updateOrderNow();
};

// set events
orderButtonElement.onclick = handleMoveNextStep;
orderButtonElementFinal.onclick = handleMoveNextStep;
backStep.onclick = handleBackStep;

function updateUserInfo() {
  infoCustomer.name = nameCustomer.value;
  infoCustomer.phoneNumber = phoneCustomer.value;
  provincesCustomer.querySelectorAll("option").forEach((option) => {
    if (option.selected) {
      infoCustomer.province = option.innerText;
    }
  });
  districtCustomer.querySelectorAll("option").forEach((option) => {
    if (option.selected) {
      infoCustomer.district = option.innerText;
    }
  });
  wardCustomer.querySelectorAll("option").forEach((option) => {
    if (option.selected) {
      infoCustomer.ward = option.innerText;
    }
  });
  infoCustomer.home = addressHome.value;
}

function updateInfoCustomerPayment() {
  addressCustomer.adressCus =
    infoCustomer.home +
    "," +
    infoCustomer.ward +
    "," +
    infoCustomer.district +
    "," +
    infoCustomer.province;
    addressCustomer.nameCus = infoCustomer.name;
    addressCustomer.phoneCus = infoCustomer.phoneNumber;
    updateInfo.forEach((input, index) => {
      if (index === 0) {
        input.innerText = addressCustomer.nameCus;
      }
      if (index === 1) {
        input.innerText = addressCustomer.phoneCus;
      }
      if (index === 2) {
        input.innerText = addressCustomer.adressCus;
      }
    });
}

function updateInfoCustomerPaymentFinal() {
  addressCustomer.adressCus =
    infoCustomer.home +
    "," +
    infoCustomer.ward +
    "," +
    infoCustomer.district +
    "," +
    infoCustomer.province;
  addressCustomer.nameCus = infoCustomer.name;
  addressCustomer.phoneCus = infoCustomer.phoneNumber;
  updateFinalInfo.forEach((input, index) => {
    if (index === 0) {
      input.innerText = addressCustomer.nameCus;
    }
    if (index === 1) {
      input.innerText = addressCustomer.phoneCus;
    }
    if (index === 2) {
      input.innerText = addressCustomer.adressCus;
    }
  });
}

// Validate form
function showError(input) {
  let parent = input.parentElement;
  parent.classList.add("error");
}

function showSuccess(input) {
  let parent = input.parentElement;
  parent.classList.remove("error");
}

function checkLengthPhone(input) {
  const value = input.value;
  let isLength10 = false;
  if (value.length < 10 || value.length > 12 || value[0] !== "0") {
    showError(input);
    isLength10 = true;
  } else {
    showSuccess(input);
  }
  return isLength10;
}

function checkEmptyInvalid(listInput) {
  let isEmptyError = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();

    if (!input.value) {
      showError(input);
      isEmptyError = true;
      if (
        (input.onclick = function () {
          showSuccess(input);
        })
      );
    } else {
      showSuccess(input);
    }
  });
  return isEmptyError;
}

const updateMinusButton = () => {
  decreaseQuantityBtnElements.forEach(btn => {
    const quantity = Number(btn.parentElement.querySelector('.product-quantity').innerText)
    btn.classList.toggle('disabled', quantity === 1)
  })
}

// Start Select Tỉnh, TP
fetch(
  `https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100`
)
  .then((response) => response.json())
  .then((data) => {
    let provinces = data.results;
    provinces.map(
      (value) =>
        (document.getElementById(
          "provinces"
        ).innerHTML += `<option value='${value.id}'>${value.name}</option>`)
    );
  })

  .catch((error) => {
    console.error("Lỗi khi gọi api", error);
  });

// Select huyện

function fetchDistricts(provincesID) {
  fetch(
    `https://vnprovinces.pythonanywhere.com/api/districts/?province_id=${provincesID}&basic=true&limit=100`
  )
    .then((response) => response.json())
    .then((data) => {
      let district = data.results;
      let count_object = district.length;
      document.getElementById(
        "district"
      ).innerHTML = `<option value=''>Chọn Quận, Huyện</option>`;
      if (count_object < 100) {
        district.map(
          (value) =>
            (document.getElementById(
              "district"
            ).innerHTML += `<option value="${value.id}">${value.name}</option>`)
        );
      }
    })
    .catch((error) => {
      console.error("Lỗi khi gọi api", error);
    });
}
//Select xax phuong
function fetchWards(districtsID) {
  fetch(
    `https://vnprovinces.pythonanywhere.com/api/wards/?district_id=${districtsID}&basic=true&limit=100`
  )
    .then((response) => response.json())
    .then((data) => {
      let wards = data.results;
      let count_object = wards.length;
      document.getElementById(
        "wards"
      ).innerHTML = `<option value=''>Chọn Phường, Xã</option>`;
      if (count_object < 90) {
        wards.map(
          (value) =>
            (document.getElementById(
              "wards"
            ).innerHTML += `<option value="${value.id}">${value.name}</option>`)
        );
      }
    })
    .catch((error) => {
      console.error("Lỗi khi gọi api", error);
    });
}

function getProvinces() {
  // Biến kiểm tra
  var event = window.event || event;
  fetchDistricts(event.target.value);
  document.getElementById(
    "wards"
  ).innerHTML = `<option value="">Chọn Phường, Xã</option>`;
}

function getDistricts() {
  var event = window.event || event;
  fetchWards(event.target.value);
}

// set events
increaseQuantityBtnElements.forEach(btn => {
  btn.onclick = function(event) {
      event.stopPropagation()
      const productQuantityTagElement = this.parentElement.querySelector('.product-quantity')

      let newQuantity = Number(productQuantityTagElement.innerText) + 1
      
      productQuantityTagElement.innerText = newQuantity
      updateTotalPrice()
      
      const userId = JSON.parse(localStorage.getItem('currentUser'))._id
      const productId = event.target.closest('.product-cart-item').dataset.id
      fetch('https://localhost:3000/cart/increase-quantity', {
        method: "POST",
        body : JSON.stringify({ userId, productId })
      })
      .then(response => {
        console.log(response)
        window.location.reload()
      })
      .catch(err => console.log(err))
    }

})

decreaseQuantityBtnElements.forEach(btn => {
  btn.onclick = function(event) {
    event.stopPropagation()
    const productQuantityTagElement = this.parentElement.querySelector('.product-quantity')
    const newQuantity = Number(productQuantityTagElement.innerText) - 1
    if(newQuantity === 1)
      updateMinusButton()
   
    productQuantityTagElement.innerText = newQuantity
    updateTotalPrice()
    
    const userId = JSON.parse(localStorage.getItem('currentUser'))._id
    const productId = event.target.closest('.product-cart-item').dataset.id
    fetch('https://localhost:3000/cart/decrease-quantity', {
      method: "POST",
      body : JSON.stringify({ userId, productId })
    })
    .then(response => {
      console.log(response)
      window.location.reload()
    })
    .catch(err => console.log(err))
    
  }
})

deleteProductBtnElements.forEach(btn => {
  btn.onclick = function(event) {
    event.stopPropagation()
    const userId = JSON.parse(localStorage.getItem('currentUser'))._id
    const productId = event.target.closest('.product-cart-item').dataset.id
    fetch('https://localhost:3000/cart/delete-product', {
        method : "POST",
        body: JSON.stringify({ userId, productId })
    })
    .then(res =>{
      console.log(res)
      window.location.reload()
    })
    .catch(err => console.log(err))
  }
})

cartItems.forEach(item => {
  item.onclick = function(event) {
        window.location.href = `https://localhost:3000/products/details/${this.dataset.id}`
  }
})

//invoke functions
updateProgress();
updateStep();
updateOrderNow();
handleBackStepIcon();
updateProductElement();
handleFormatPrice();
updateTotalPrice();
updateMinusButton();

