export type DataLocation = {
    Location: Location2,
    DataSnapshot: Array<DataSnapshot>
}

export type Location2 = {
    City: string,
    Country: string,
    Lat: number,
    Long: number
}

export type DataSnapshot = {
    Values: Array<RowSensorDataValues>,
    TimeStamp: Date
}


export type RowSensor = {
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
    sensordatavalues: Array<RowSensorDataValues>,
    id: number

}

export type RowSensorDataValues = {
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

export type LocationItem = {
    place_id: number,
    licence: string,
    osm_type: string,
    osm_id: number,
    lat: string| number,
    lon: string| number,
    category: string,
    type: string,
    place_rank: number,
    importance: number,
    addresstype: string,
    name: string,
    display_name: string
    address: AddressItems,

    boundingbox:Array<number>
}

export type AddressItems = {
        amenity:string,
        house_number:string,
        road:string,
        neighbourhood: string,
        suburb:string,
        city_district:string,
        city?:string,
        town?:string,
        state:string,
        "ISO3166-2-lvl4":string,
        postcode: string,
        country:string,
        country_code:string
}




