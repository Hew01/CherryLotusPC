window.addEventListener("DOMContentLoaded", () => {
  var currentStep = 1;
  const headerCartSteps = document.querySelectorAll(".header-cart__step");
  const orderButtonElement = document.querySelector(".order-now");
  const forms = document.querySelectorAll("section");
  const totalContainerElement = document.querySelector(".section-info-total");

  const updateProgress = () => {
    headerCartSteps.forEach((step, index) => {
      if (index + 1 <= currentStep && index != 0) {
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

  const handleMoveNextStep = () => {
    if (currentStep === 4) {
      return;
    }
    currentStep++;
    updateProgress();
    updateProductElement();
    console.log(currentStep);
  };

  updateProgress();

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
        console.log(data);
        let wards = data.results;
        let count_object = wards.length;
        document.getElementById(
          "wards"
        ).innerHTML = `<option value=''>Chọn Quận, Huyện</option>`;
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

  // set events
  orderButtonElement.onclick = handleMoveNextStep;

  function getProvinces(event) {
    fetchDistricts(event.target.value);
    document.getElementById(
      "wards"
    ).innerHTML = `<option value=''>Chọn Quận, Huyện</option>`;
  }

  function getDistricts(event) {
    fetchWards(event.target.value);
  }
  // END SELECT Tỉnh Thành Phố

  // Bắt đầu nút click điền thông tin công ty nếu lấy hóa đơn
  // Lấy tham chiếu đến checkbox
  const checkbox = document.querySelector(".tick-input");

  // Lấy tham chiếu đến phần tử .form-group
  const formGroup = document.querySelector(".form-group");

  // Thêm sự kiện 'change' cho checkbox
  checkbox.addEventListener("change", function () {
    // Kiểm tra trạng thái của checkbox và hiển thị/ẩn phần tử .form-group tương ứng
    formGroup.style.display = this.checked ? "block" : "none";
  });

  // Kết thuc nút click điền thông tin công ty nếu lấy hóa đơn

  // Lấy thông tin sản phẩm

  // Kết thúc lấy thông tin sản phẩm
});
