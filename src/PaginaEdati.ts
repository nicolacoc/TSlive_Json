import {FetchLocation} from "./fetch";
import {
    AddressItems,
    DataLocation,
    DataSnapshot,
    Location,
    Location2,
    LocationItem,
    RowSensor,
    Rowsensordatavalues
} from "./type"


export function GetMap(lat: number, lng: number): string {
    const key: string = "";
    return `<div class="map">
            <iframe
                width="450"
                height="250"
                frameBorder="0"
                style="border:0"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/view?key=${key}&center=${lat},${lng}&zoom=18&maptype=satellite"
                allowFullScreen>
            </iframe>
        </div>`

}

export function PromiseToAirQualityData(PromisesResult: Array<Array<RowSensor>>): Promise<DataLocation>[] {

    // const promisesLocation: any[] = [];
    return PromisesResult.map( async (singleResult: Array<RowSensor>): Promise<DataLocation> => {
        if (singleResult instanceof Array) {
            let Location: Location = singleResult[0].location;
            let Long: number = Number.parseFloat(Location.longitude);
            let Lat: number = Number.parseFloat(Location.latitude);
            let PlaceID: number = Location.id;

            if (isNaN(PlaceID)) {
                throw new Error("Place id non è un numero!!")
            }
            if (isNaN(Long) || isNaN(Lat)) {
                throw new Error("Long o Lat non è un numero!!");
            }

            // promisesLocation.push(FetchLocation(lat, long))
            const LocationItem: LocationItem = await FetchLocation(Lat, Long);
            let Address: AddressItems = LocationItem.address;
            let City: string = Address.city;
                if (typeof City === "undefined") {
                    City = Address.town;
                }

            return {
                Location: {
                    City: City,
                    Country: Address.country,
                    Lat: Lat,
                    Long: Long
                },
                DataSnapshot: singleResult.map((Result: RowSensor): DataSnapshot => {
                    const Values: Array<Rowsensordatavalues> = [...Result.sensordatavalues];
                    const TimeStamp: Date = Result.timestamp;
                    return {
                        Values,
                        TimeStamp
                    }
                })
            };


        }
    })

}


export async function getResult(data:Array<Promise<DataLocation>>) : Promise<Array<DataLocation>> {
    return await Promise.all(data);
    // let location: any[] = [];
    // // result2.forEach((result4: any) => {
    //     let address: any = result4.address;
    //     let country: string = address.country;
    //     let city: string = address.city;
    //     if (typeof city === "undefined") {
    //         city = address.town;
    //     }
    //     location.push({country, city})


    // })
}

function GetDataSnapshot(DataSnapshot: Array<DataSnapshot>): string {
    let Tot: string = ``
    DataSnapshot.forEach(({Values, TimeStamp}: DataSnapshot): void => {
        Tot += `<ul class="snapshot-data list-group list-group-flush">`

        Values.forEach(({value_type, value}): void => {
            let Value1: string | null | undefined;
            let type: string | null | undefined;
            if (value_type === "temperature") {
                type = "Temperatura";
                Value1 = `${Math.round(Number.parseFloat(value))}°C`
            } else if (value_type === "humidity") {
                type = "Umidità";
                Value1 = `${Math.round(Number.parseFloat(value))}%`
            } else if (value_type === "pressure") {
                type = "Pressione";
                Value1 = `${value}hPa`
            } else if (value_type === "pressure_at_sealevel") {
                type = "Pressione al livello del mare"
                Value1 = `${value}hPa`
            } else if (value_type === "P1") {
                type = "PM10"
                Value1 = `${value}`
            } else if (value_type === "P2") {
                type = "PM25"
                Value1 = `${value}`
            } else {
                type = value_type;
                Value1 = `${value}`;
            }

            Tot += `<li class="list-group-item d-flex">
                                <div class="row">
                                <div class="col me-5">${type}</div>
                                <div class="col">${Value1}</div>
                            </div>
                            </li>`
        })
        let ts: Date = new Date(TimeStamp);
        Tot += `
                        </ul>
                        <div class="card-body text-end">
                            <strong>${ts.toLocaleDateString('it-IT')} ${ts.toLocaleTimeString('it-IT')}</strong>
                        </div>
                    `
    })
    return Tot;
}


export function getToPage(Data:Array<DataLocation>): void {
    const Cont: HTMLDivElement | null = document.querySelector(".container");

    if (Cont) {
        let Tot: string = ``;


        for (let i: number = 0; i < Data.length; i++) {
            const Row: HTMLDivElement = document.createElement("div");
            Row.setAttribute("class", "row");
            let Location: Location2 = Data[i].Location;
            let Lat: number = Location.Lat;
            let Lng: number = Location.Long;
            let Country: string = Location.Country;
            let City: string = Location.City;
            let DataSnapshot: Array<DataSnapshot> = Data[i].DataSnapshot;

            Tot += `
        <div class="col">
            <h1>Air Quality:</h1>
            <div class="card" style="width: 450px;">
               ${GetMap(Lat, Lng)}
                <div class="card-body">
                    <h5 class="card-title">${City} (${Country})</h5>
                </div>

                    <div class="card-body">

                          <div class="card mt-2">


`
            Tot += GetDataSnapshot(DataSnapshot);

            Tot += `</div>
                </div>
            </div>
        </div>`


            i++;
            if (i < Data.length) {
                Location = Data[i].Location;
                Lat = Location.Lat;
                Lng= Location.Long;
                Country = Location.Country;
                City = Location.City;
                DataSnapshot = Data[i].DataSnapshot;

                Tot += `
        <div class="col">
            <h1>Air Quality:</h1>
            <div class="card" style="width: 450px;">
               ${GetMap(Lat, Lng)}
                <div class="card-body">
                    <h5 class="card-title">${City} (${Country})</h5>
                </div>

                    <div class="card-body">

                          <div class="card mt-2">



                        `
                Tot += GetDataSnapshot(DataSnapshot);

                Tot += `</div>
                    </div>
                </div>
            </div>`
            }
            Row.innerHTML = Tot;
            Cont.append(Row);
        }
    }


}
