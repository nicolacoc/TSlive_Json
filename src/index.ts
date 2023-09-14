import {getAirQualityData} from "./fetch";
import {getResult, getToPage, PromiseToAirQualityData} from "./PaginaEdati"
import {rowSensor} from "./type"


const promises : Array<Promise<Array<rowSensor>>> = [
    getAirQualityData("https://data.sensor.community/airrohr/v1/sensor/5456/"),
    getAirQualityData("https://data.sensor.community/airrohr/v1/sensor/50530/")
]

const p : Promise<Awaited<Array<Array<rowSensor>>>> = Promise.all(promises);

p.then(PromiseToAirQualityData).then(getResult).then(getToPage)

