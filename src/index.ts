import {getAirQualityData} from "./fetch";
import {getResult, getToPage, PromiseToAirQualityData} from "./PaginaEdati"
import {RowSensor} from "./type"


const promises : Array<Promise<Array<RowSensor>>> = [
    getAirQualityData("https://data.sensor.community/airrohr/v1/sensor/5959/"),
    getAirQualityData("https://data.sensor.community/airrohr/v1/sensor/8059/")
]

const p : Promise<RowSensor[][]> = Promise.all(promises);

p.then(PromiseToAirQualityData).then(getResult).then(getToPage)

