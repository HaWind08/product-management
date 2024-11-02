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
            const express = require('express');
            const app = express();
            const port = 3001;

            app.get("/", (req, res) => {
                res.send("Trang chủ");
            });

            app.get("/movies", (req, res) => {
                res.send("Trang danh sách phim");
            });

            app.listen(port, () => {
                console.log(`App listening on port ${port}`);
            });
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

* Một số thư viện
npm i multer: upload ảnh từ máy 
npm i --save tinymce: bộ soạn thảo văn bản
npm i md5 : mã hóa String(password)
npm i nodemailer : gửi OTP về mail
npm i body-parser: trả về req.body
                    const bodyParser = require("body-parser");
                    app.use(bodyParser.urlencoded({ extended: false }));
npm i method-override: để gửi phương thức PATCH
                    const methodOverride = require('method-override');
                    app.use(methodOverride("_method"));
npm i express-flash: thông báo
                    const flash = require("express-flash");
                    const cookieParser = require("cookie-parser");
                    const session = require("express-session");
                + npm i cookie-parser
                + npm i express-session
                    app.use(cookieParser("FSDFEWRTRWT"));
                    app.use(session({ cookie: { maxAge: 60000 } }));
                    app.use(flash());
npm i mongoose-slug-updater: 
                    const slug = require("mongoose-slug-updater");
                    mongoose.plugin(slug);
npm i mongodb: kết nối CSDL Online
npm i moment: chuyển đổi ngày giờ String thành dạng thông dụng


Includes
    ● Dùng để nhúng nội dung của 1 file PUG vào 1 file PUG khác.
Mixins
    ● Dùng để tạo ra các khối có thể tái sử dụng.

Folder Config: thư mục cấu hình

Folder Middleware: là những đoạn mã trung gian nằm giữa các request và response.