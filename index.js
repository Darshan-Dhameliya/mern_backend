// import express from "express";
// import cors from "cors";
// import Signup from "./route/signup";

const express = require("express");
const app = express();

const Signup = require("./route/signup");
const Login = require("./route/login");
const Databyid = require("./route/databyid");
const Update = require("./route/Update");
const Deleteac = require("./route/deleteac");

const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/signup", Signup);

app.post("/logindata", Login);

app.get("/getdetails/:id", Databyid);

app.post("/updateusername", Update.Updateusername);

app.post("/deleteac", Deleteac);

app.post("/changepass/:id", Update.password);

app.listen(3020, () => console.log("Server OK"));
