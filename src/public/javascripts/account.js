document.addEventListener("DOMContentLoaded", function () {
    var tabs = document.querySelectorAll(".left-sidebar_list .tab");
    var thongtinTaiKhoanDiv = document.getElementById("hidden");
    var quanlyDonHangDiv = document.getElementById("visible");

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function (event) {
            event.preventDefault();

            if (tab.classList.contains("thongtinTaiKhoanTab")) {
                thongtinTaiKhoanDiv.style.display = "block";
                quanlyDonHangDiv.style.display = "none";
            } else if (tab.classList.contains("quanlyDonHangTab")) {
                thongtinTaiKhoanDiv.style.display = "none";
                quanlyDonHangDiv.style.display = "block";
            }
        });
    });
});
