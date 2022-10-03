export const getTimeFromData = (dataTime) =>{
    let allTimeData = '';
    let timeCurrent = [];
    let timeInDateFormat = new Date(dataTime);
    let hours = timeInDateFormat.getHours();
    let minutes = timeInDateFormat.getMinutes();
    let seconds = timeInDateFormat.getSeconds();
    
    if(hours < 10){
        timeCurrent[0] = [`0${hours}`]
    }else{
        timeCurrent[0] = [hours]
    }
    if(minutes < 10){
        timeCurrent[1] = [`0${minutes}`]
    }else{
        timeCurrent[1] = [minutes]
    }
    if(seconds < 10){
        timeCurrent[2] = [`0${seconds}`]
    }else{
        timeCurrent[2] = [seconds]
    }
    allTimeData = `${timeCurrent[0]}:${timeCurrent[1]}:${timeCurrent[2]}`;
    return allTimeData;
    };