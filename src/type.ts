export type DataLocation = {
    Location: {
        long: number,
        lat: number,
        placeID: number,
    },
    DataSnapshot: Array<DataSnapshot>
}

export type DataSnapshot = {
    Values: Array<rowsensordatavalues>,
    timeStamp: Date
}

export type page = {
    DatiArray: Array<DataLocation>,
    location: {
        country: string,
        city: string
    }[]
}

export type Result1 = {
    data: Array<DataLocation>,
    promisesLocation: Array<any>
}

export type rowSensor = {
    sensor: {
        pin: string,
        id: number,
        sensor_type: {
            manufacturer: string,
            name: string,
            id: number
        }

    },
    sampling_rate: string | null,
    location: Location,
    timestamp: Date,
    sensordatavalues: Array<rowsensordatavalues>,
    id: number

}

export type rowsensordatavalues = {
    value_type: string,
    value: string,
    id: number
}

export type Location = {
    indoor: number,
    altitude: string,
    latitude: string,
    exact_location: number,
    country: string,
    longitude: string,
    id: number
}






