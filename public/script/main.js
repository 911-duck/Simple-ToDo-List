// imports
import JsonServer from "./jsonServer/JsonServer.js";
import { API, type } from "./config/config.js";
import { filter } from "./filters/filter.js";
import { sort } from "./filters/sort.js";

// container
const CONTAINER = document.querySelector(".list")

// buttons
const ADD_BUTTON = document.querySelector(".add")

// inputs
const HEADER_INPUT = document.querySelector(".functions__header-input")
const DISCRIPTION_INPUT = document.querySelector(".functions__discription-input")
const PRIORITY_INPUT = document.querySelector(".functions__select")
const SELECT_FILTER = document.querySelector(".filters__filter")
const SELECT_SORT = document.querySelector(".filters__sort")

// objects 
const jsonServer = new JsonServer(API,type)

let obj = await jsonServer.display(CONTAINER)
await jsonServer.displayDOM(CONTAINER,obj)

ADD_BUTTON.addEventListener('click',async e=>{
    await jsonServer.add(HEADER_INPUT.value,DISCRIPTION_INPUT.value,PRIORITY_INPUT.value)
    obj = await jsonServer.display(CONTAINER)
    await jsonServer.displayDOM(CONTAINER,obj)
})

SELECT_FILTER.addEventListener("input",async e=>{
    obj = await jsonServer.display(CONTAINER)
    obj = filter(obj,SELECT_FILTER.value)
    await jsonServer.displayDOM(CONTAINER,obj)
})

SELECT_SORT.addEventListener("input",async e=>{
    obj = await jsonServer.display(CONTAINER)
    obj = sort(obj,SELECT_SORT.value)
    await jsonServer.displayDOM(CONTAINER,obj)
})