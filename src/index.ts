import {loadSensors} from "./airQualityDataService"
const requests: string[]= [
    "https://data.sensor.community/airrohr/v1/sensor/5959/",
    "https://data.sensor.community/airrohr/v1/sensor/8059/"
]



loadSensors(requests)

