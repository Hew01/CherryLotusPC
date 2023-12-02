document.addEventListener("DOMContentLoaded", function () {
    function checkScreenWidth() {
      var isSmallScreen = window.innerWidth < 760;
  
      var h4Elements = document.querySelectorAll("#footer h4");
      h4Elements.forEach(function (h4) {
        var ul = h4.nextElementSibling;
        if (isSmallScreen) {
          ul.style.display = "none";
        } else {
          ul.style.display = "block";
        }
      });

      h4Elements.forEach(function (h4) {
        if (isSmallScreen) {
          h4.addEventListener("click", toggleUlDisplay);
        } else {
          h4.removeEventListener("click", toggleUlDisplay);
        }
      });

      var tabs = document.querySelectorAll(".footer__info-section h4 span");
      var infoSections = document.querySelectorAll(".footer__info-section");
  
      tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
          infoSections.forEach(function (section) {
            section.classList.remove("active");
          });

          infoSections[index].classList.add("active");
        });
      });
    }

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    function toggleUlDisplay() {
      var ul = this.nextElementSibling;
      if (ul.style.display === "block") {
        ul.style.display = "none";
      } else {
        ul.style.display = "block";
      }
    }
  });