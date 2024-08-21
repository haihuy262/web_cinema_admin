const toggler = document.querySelector(".toggler-btn");
toggler.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("collapsed");
});

document.addEventListener("DOMContentLoaded", function () {
  // Lấy URL hiện tại
  const currentPath = window.location.pathname;

  // Các điều kiện để mở sidebar và highlight mục hiện tại
  if (currentPath.includes("/employee/list") || currentPath.includes("/employee/add")) {
    const staffMenu = document.getElementById("staff");
    const staffLink = staffMenu.previousElementSibling;

    // Mở dropdown và highlight mục 'Danh sách nhân viên'
    staffLink.classList.remove("collapsed");
    staffMenu.classList.add("show");

    if (currentPath === "/employee/list") {
      document.querySelector('a[href="/employee/list"]').classList.add("active");
    } else {
      document.querySelector('a[href="/employee/add"]').classList.add("active");
    }

    // Đóng các dropdown khác
    closeOtherDropdowns("staff");
  } else if (currentPath.includes("/customer/list")) {
    const userMenu = document.getElementById("user");
    const userLink = userMenu.previousElementSibling;

    // Mở dropdown và highlight mục 'Danh sách khách hàng'
    userLink.classList.remove("collapsed");
    userMenu.classList.add("show");
    document.querySelector('a[href="/customer/list"]').classList.add("active");

    // Đóng các dropdown khác
    closeOtherDropdowns("user");
  } else if (currentPath.includes("/tickets/list")) {
    const ticketMenu = document.getElementById("ticket");
    const ticketLink = ticketMenu.previousElementSibling;

    ticketLink.classList.remove("collapsed");
    ticketMenu.classList.add("show");
    document.querySelector('a[href="/tickets/list"]').classList.add("active");

    closeOtherDropdowns("ticket");
  } else if (
    currentPath.includes("/movie/list") ||
    currentPath.includes("/movie/add") ||
    currentPath.includes("/movie/listActor") ||
    currentPath.includes("/movie/actor") ||
    currentPath.includes("/movie/listDirectors") ||
    currentPath.includes("/movie/addDirectors") ||
    currentPath.includes("/genre/listGenre") ||
    currentPath.includes("/genre/addGenre")
  ) {
    const movieMenu = document.getElementById("movie");
    const movieLink = movieMenu.previousElementSibling;

    // Mở dropdown và highlight mục 'Danh sách nhân viên'
    movieLink.classList.remove("collapsed");
    movieMenu.classList.add("show");

    if (currentPath === "/movie/list") {
      document.querySelector('a[href="/movie/list"]').classList.add("active");
    } else if (currentPath === "/movie/add") {
      document.querySelector('a[href="/movie/add"]').classList.add("active");
    } else if (currentPath === "/movie/listActor") {
      document.querySelector('a[href="/movie/listActor"]').classList.add("active");
    } else if (currentPath === "/movie/actor") {
      document.querySelector('a[href="/movie/actor"]').classList.add("active");
    } else if (currentPath === "/movie/listDirectors") {
      document.querySelector('a[href="/movie/listDirectors"]').classList.add("active");
    } else if (currentPath === "/movie/addDirectors") {
      document.querySelector('a[href="/movie/addDirectors"]').classList.add("active");
    } else if (currentPath === "/genre/listGenre") {
      document.querySelector('a[href="/genre/listGenre"]').classList.add("active");
    } else {
      document.querySelector('a[href="/genre/addGenre"]').classList.add("active");
    }

    // Đóng các dropdown khác
    closeOtherDropdowns("movie");
  } else if (currentPath.includes("/seat/list")) {
    const seatMenu = document.getElementById("seat");
    const seatLink = seatMenu.previousElementSibling;

    // Mở dropdown và highlight mục 'Danh sách khách hàng'
    seatLink.classList.remove("collapsed");
    seatMenu.classList.add("show");
    document.querySelector('a[href="/seat/list"]').classList.add("active");

    // Đóng các dropdown khác
    closeOtherDropdowns("seat");
  } else if (
    currentPath.includes("/cinema/cinemaList") ||
    currentPath.includes("/cinema/cinemaAdd") ||
    currentPath.includes("/cinema/roomList") ||
    currentPath.includes("/cinema/roomAdd")
  ) {
    const cinemaAMenu = document.getElementById("cinemaA");
    const cinemaALink = cinemaAMenu.previousElementSibling;

    // Mở dropdown và highlight mục 'Danh sách khách hàng'
    cinemaALink.classList.remove("collapsed");
    cinemaAMenu.classList.add("show");

    if (currentPath === "/cinema/cinemaList") {
      document.querySelector('a[href="/cinema/cinemaList"]').classList.add("active");
    } else if (currentPath === "/cinema/cinemaAdd") {
      document.querySelector('a[href="/cinema/cinemaAdd"]').classList.add("active");
    } else if (currentPath === "/cinema/roomList") {
      document.querySelector('a[href="/cinema/roomList"]').classList.add("active");
    } else {
      document.querySelector('a[href="/cinema/roomAdd"]').classList.add("active");
    }

    // Đóng các dropdown khác
    closeOtherDropdowns("cinemaA");
  } else if (
    currentPath.includes("/discount/discountList") ||
    currentPath.includes("/discount/discountAdd")
  ) {
    const discountMenu = document.getElementById("discount");
    const discountLink = discountMenu.previousElementSibling;

    // Mở dropdown và highlight mục 'Danh sách khách hàng'
    discountLink.classList.remove("collapsed");
    discountMenu.classList.add("show");

    if (currentPath === "/discount/discountList") {
      document.querySelector('a[href="/discount/discountList"]').classList.add("active");
    } else {
      document.querySelector('a[href="/discount/discountAdd"]').classList.add("active");
    }

    // Đóng các dropdown khác
    closeOtherDropdowns("discount");
  } else if (currentPath.includes("/service/serviceList") || currentPath.includes("/service/serviceAdd")) {
    const serviceMenu = document.getElementById("service");
    const serviceLink = serviceMenu.previousElementSibling;

    // Mở dropdown và highlight mục 'Danh sách khách hàng'
    serviceLink.classList.remove("collapsed");
    serviceMenu.classList.add("show");

    if (currentPath === "/service/serviceList") {
      document.querySelector('a[href="/service/serviceList"]').classList.add("active");
    } else {
      document.querySelector('a[href="/service/serviceAdd"]').classList.add("active");
    }

    // Đóng các dropdown khác
    closeOtherDropdowns("service");
  } else if (
    currentPath.includes("/showtime/list/showtime") ||
    currentPath.includes("/showtime/add/time") ||
    currentPath.includes("/showtime/add/showtime")
  ) {
    const showtimeMenu = document.getElementById("showtime");
    const showtimeLink = showtimeMenu.previousElementSibling;

    // Mở dropdown và highlight mục 'Danh sách khách hàng'
    showtimeLink.classList.remove("collapsed");
    showtimeMenu.classList.add("show");

    if (currentPath === "/showtime/list/showtime") {
      document.querySelector('a[href="/showtime/list/showtime"]').classList.add("active");
    } else if (currentPath === "/showtime/add/time") {
      document.querySelector('a[href="/showtime/add/time"]').classList.add("active");
    } else {
      document.querySelector('a[href="/showtime/add/showtime"]').classList.add("active");
    }

    // Đóng các dropdown khác
    closeOtherDropdowns("showtime");
  }

  function closeOtherDropdowns(exceptId) {
    const dropdowns = document.querySelectorAll(".sidebar-dropdown");
    dropdowns.forEach((dropdown) => {
      if (dropdown.id !== exceptId) {
        const link = dropdown.previousElementSibling;
        dropdown.classList.remove("show");
        link.classList.add("collapsed");
      }
    });
  }
});
