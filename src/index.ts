
import {getAirQualityData} from "./fetch";
import {getResult, getToPage, PromiseToAirQualityData} from "./PaginaEdati"

const promises = [
    getAirQualityData("https://data.sensor.community/airrohr/v1/sensor/5456/"),
    getAirQualityData("https://data.sensor.community/airrohr/v1/sensor/50530/")
]

const p : any = Promise.all(promises);

p.then(PromiseToAirQualityData).then(getResult).then(getToPage)

