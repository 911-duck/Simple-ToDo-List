import JsonServer from "./jsonServer/JsonServer.js";
import { API, type } from "./config/config.js";

const CONTAINER = document.querySelector(".list")

// buttons
const ADD_BUTTON = document.querySelector(".add")

// inputs
const HEADER_INPUT = document.querySelector(".functions__header-input")
const DISCRIPTION_INPUT = document.querySelector(".functions__discription-input")

const jsonServer = new JsonServer(API,type)

await jsonServer.display(CONTAINER)

ADD_BUTTON.addEventListener('click',async e=>{
    await jsonServer.add(HEADER_INPUT.value,DISCRIPTION_INPUT.value)
    await jsonServer.display(CONTAINER)
})
