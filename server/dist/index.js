"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const dbConnection_1 = __importDefault(require("./utils/dbConnection"));
require("dotenv").config();
app.use((0, cors_1.default)({
    origin: "http://localhost:3006", // frontend origin
    credentials: true,
}));
app.use(express_1.default.json());
app.use(require("./routes/studentRoute"));
app.use(require("./routes/syncRoute"));
app.use(require("./routes/detailRoute"));
//connecting to database
let connectToDb = new dbConnection_1.default();
connectToDb.connect(process.env.DATABASE_URL);
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("server started");
});
