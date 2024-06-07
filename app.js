const express = require("express")
const cors = require("cors")
require("dotenv").config()
const routerUsuario = require("./routers/routerUsuario")
const routerCaminhao = require("./routers/routerCaminhao")

const porta = process.env.PORTA


const app = express()


app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.use("/usuario", routerUsuario);
app.use("/caminhao",routerCaminhao)

app.listen(porta|| 3000)