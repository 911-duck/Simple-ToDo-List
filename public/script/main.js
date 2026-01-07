// imports
import JsonServer from "./jsonServer/JsonServer.js";
import { API, type } from "./config/config.js";

// container
const CONTAINER = document.querySelector(".list")

// buttons
const ADD_BUTTON = document.querySelector(".add")

// inputs
const HEADER_INPUT = document.querySelector(".functions__header-input")
const DISCRIPTION_INPUT = document.querySelector(".functions__discription-input")
const PRIORITY_INPUT = document.querySelector(".functions__select")

// objects
const jsonServer = new JsonServer(API,type)

let obj = await jsonServer.display(CONTAINER)
await jsonServer.displayDOM(CONTAINER,obj)

ADD_BUTTON.addEventListener('click',async e=>{
    await jsonServer.add(HEADER_INPUT.value,DISCRIPTION_INPUT.value,PRIORITY_INPUT.value)
    obj = await jsonServer.display(CONTAINER)
    await jsonServer.displayDOM(CONTAINER,obj)
})
