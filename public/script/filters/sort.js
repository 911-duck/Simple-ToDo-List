export const sort = (data,type) => {
    if(type == "date1") return data.sort((a,b)=>{
        let times = [a,b].map(element => {
            let parts = element.date.split(", ")
            let dayPart = parts[0].split(".") 
            let timePart = parts[1].split(":")
            return Date.UTC(Number(dayPart[2]), Number(dayPart[1])-1, Number(dayPart[0]), Number(timePart[0]), Number(dayPart[1]), Number(dayPart[2]))
        })

        return times[0] - times[1]
    })
    if(type == "date0") return data.sort((a,b)=>{
        let times = [a,b].map(element => {
            let parts = element.date.split(", ")
            let dayPart = parts[0].split(".") 
            let timePart = parts[1].split(":")
            return Date.UTC(Number(dayPart[2]), Number(dayPart[1])-1, Number(dayPart[0]), Number(timePart[0]), Number(dayPart[1]), Number(dayPart[2]))
        })

        return times[0] - times[1]
    }).reverse()
    return data
}