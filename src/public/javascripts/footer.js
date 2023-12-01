document.addEventListener("DOMContentLoaded", function () {
    // Lấy danh sách các tab và các phần thông tin tương ứng
    var tabs = document.querySelectorAll(".footer__info-section h4");
    var infoSections = document.querySelectorAll(".footer__info-section");
    var h4Elements = document.querySelectorAll("#footer h4");
    
    // Ẩn tất cả các thẻ con của h4 mặc định
    h4Elements.forEach(function (h4) {
        var ul = h4.nextElementSibling;
        ul.style.display = "none";
    });

    h4Elements.forEach(function (h4) {
        h4.addEventListener("click", function () {
            // Ẩn/hiện các thẻ con của h4
            var ul = h4.nextElementSibling; // Lấy thẻ ul kế tiếp của h4
            if (ul.style.display === "block") {
                ul.style.display = "none";
            } else {
                ul.style.display = "block";
            }
        });
    });

    // Xử lý khi click vào tab
    tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
            // Ẩn tất cả các phần thông tin
            infoSections.forEach(function (section) {
                section.classList.remove("active");
            });

            // Hiển thị phần thông tin tương ứng với tab được click
            infoSections[index].classList.add("active");
        });
    });
});
