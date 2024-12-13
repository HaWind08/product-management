// JavaScript để hiển thị thông báo khi có thông tin từ flash messages (thành công hoặc lỗi)
document.addEventListener("DOMContentLoaded", () => {
    const showAlert = document.querySelector("[show-alert]");

    if (showAlert) {
        const time = parseInt(showAlert.getAttribute("data-time"));
        const closeAlert = showAlert.querySelector("[close-alert]");
        const progress = showAlert.querySelector(".progress");

        // Hiển thị thông báo
        showAlert.classList.add("active");
        progress.classList.add("active");

        // Ẩn thông báo sau một khoảng thời gian (time)
        setTimeout(() => {
            showAlert.classList.remove("active");
        }, time);

        setTimeout(() => {
            progress.classList.remove("active");
        }, time + 300); // Ẩn progress sau 300ms

        // Đóng thông báo khi click vào icon đóng
        closeAlert.addEventListener("click", () => {
            showAlert.classList.remove("active");

            // Ẩn progress sau khi đóng
            setTimeout(() => {
                progress.classList.remove("active");
            }, 300);
        });
    }
});
