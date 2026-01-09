export const filter = (data,type) => {
    if(type == "done") return data.filter(element => element.done == true)
    if(type == "notDone") return data.filter(element => !element.done == true)
}