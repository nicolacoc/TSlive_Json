export type DataLocation = {
    Location: {
        long: number,
        lat: number,
        placeID: number,
    },
    DataSnapshot: Array<DataSnapshot>
}

export type DataSnapshot = {
    Values: Array<any>,
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
    data: DataLocation[],
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
    sampling_rate?: string,
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

type Location = {
    indoor: number,
    altitude: string,
    latitude: string,
    exact_location: number,
    country: string,
    longitude: string,
    id: number
}




