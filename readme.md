<!-- XÂY DỰNG TRANG QUẢN LÝ SẢN PHẨM -->

1. Tạo cấu trúc dự án theo mô hình MVC
Các bước thiết lập dự án:
    ● Cấu hình chung
        + Tạo dự án product-management
        + Khởi tạo NPM: npm init
        + Cài đặt Express: npm i express
        + Cài đặt Nodemon: npm i --save-dev nodemon
        + Sửa file package.json: "start": "nodemon --inspect index.js"
        + Tạo file index.js trong thư mục gốc
    ● Cài đặt PUG
        + Cài đặt Pug: npm i pug
            app.set("views", "./views");
            app.set("view engine", "pug");
    ● Tạo views (tất cả file PUG)
    ● Cấu hình folder routes (router là link truy cập dạng localhost:3000 / localhost:3000/products /....)
    ● Cấu hình folder controllers (controller là các HÀM sau khi routing)
    ● Cấu hình .env (nơi chứa các hằng số)
        + Cài đặt: npm i dotenv
    ● Cấu trúc lại folder PUG

2. Sửa lại layout website
    ● Nhúng Bootstrap 4
    ● Nhúng file tĩnh
    ● Sửa layout

3. Cấu hình Database
    ● Tạo database: product-management
    ● Tạo collection: products
    ● Insert Data (Gửi trong lúc học)
    ● Cài đặt Mongoose
        + npm i mongoose

4. Làm trang danh sách sản phẩm bên Client


* Một số thư viện
npm i multer: upload ảnh từ máy 
npm i --save tinymce: bộ soạn thảo văn bản
npm i md5 : mã hóa String(password)
npm i nodemailer : gửi OTP về mail
