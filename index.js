const express = require('express');
//Nhúng method override
const methodOverride = require('method-override');
//Nhúng body parser
const bodyParser = require("body-parser");
//Nhúng cookie parser
const cookieParser = require("cookie-parser");
//Nhúng session
const session = require("express-session");
//Nhúng express flash (thông báo)
const flash = require("express-flash");
//Nhúng moment (chuyển đổi ngày tháng)
const moment = require("moment");
const path = require("path");
// SocketIO
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');


//Nhúng env
require("dotenv").config();

// Nhúng database từ config
const database = require("./config/database");
database.connect();

// Nhúng router
const router = require("./routers/client/index.router");
// Nhúng routerAdmin
const routerAdmin = require("./routers/admin/index.router");

const app = express();
const port = process.env.PORT;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Use socketIO
const server = createServer(app);
const io = new Server(server);
global._io = io;

// use method override
app.use(methodOverride("_method"));
// use body parser
app.use(bodyParser.urlencoded({ extended: false }));
// use express flash
app.use(cookieParser("ASDFSDFSRETER"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End use express flash

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE

// Nhúng system.js (config)
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin; // tạo biến tòan cục để file pug dùng
app.locals.moment = moment;

// Nhúng file tĩnh
app.use(express.static(`${__dirname}/public`));

// Gọi router
router(app);
routerAdmin(app);
app.get("*", (req, res) => {
    res.render("client/pages/errors/404.pug", {
        pageTitle: "404 Not Found"
    });
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});