import {FetchLocation} from "./fetch";
import {DataLocation, DataSnapshot, page, Result1, rowSensor, rowsensordatavalues, Location} from "./type"



export function GetMap(lat : number, lng: number){
    const key : string = "";
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

export function PromiseToAirQualityData(promisesResult : Array<Array<rowSensor>> ) : Result1 {
    const data: Array<DataLocation> = [];
    const promisesLocation: any[] = [];
    promisesResult.forEach((singleResult: Array<rowSensor>) : void => {
        if (singleResult instanceof Array && singleResult.length > 0){
            let location: Location = singleResult[0].location;
            let long : number = Number.parseFloat(location.longitude);
            let lat : number = Number.parseFloat(location.latitude);
            let placeID : number = location.id;

            if (isNaN(placeID)){
                throw new Error("Place id non è un numero!!")
            }
            if (isNaN(long)||isNaN(lat)){
                throw new Error("Long o Lat non è un numero!!");
            }

            promisesLocation.push(FetchLocation(lat, long))


            data.push({
                Location: {
                    long: long,
                    lat: lat,
                    placeID: placeID,
                },
                DataSnapshot: singleResult.map(result => {
                    const Values: Array<rowsensordatavalues> = [...result.sensordatavalues];
                    const timeStamp: Date = result.timestamp;
                    return {
                        Values,
                        timeStamp
                    }
                })
            })




        }
    })
    return {data, promisesLocation};
}


export async function getResult({data, promisesLocation}: Result1): Promise<page>  {
    let DatiArray : any = [... data];
    let result2 : any = await Promise.all(promisesLocation);
    let location : any[] = [];
    result2.forEach((result4 : any)=>{
        let address : any = result4.address;
        let country : string =  address.country;
        let city: string =  address.city;
        if (typeof city === "undefined"){
            city = address.town;
        }
        location.push({country, city})



    })
    return {DatiArray, location}
}

function GetDataSnapshot(DataSnapshot: Array<DataSnapshot>):string {
    let tot : string =``
    DataSnapshot.forEach(({Values, timeStamp}:DataSnapshot) :void => {
        tot+=`<ul class="snapshot-data list-group list-group-flush">`

        Values.forEach(({value_type, value}) :void => {
            let Value1 : string|null|undefined;
            let type : string|null|undefined;
            if (value_type === "temperature") {
                type = "Temperatura";
                Value1 = `${Math.round(Number.parseFloat(value))}°C`
            }
            else if(value_type === "humidity") {
                type = "Umidità";
                Value1 = `${Math.round(Number.parseFloat(value))}%`
            }
            else if(value_type === "pressure") {
                type= "Pressione";
                Value1 = `${value}hPa`
            }
            else if(value_type === "pressure_at_sealevel") {
                type="Pressione al livello del mare"
                Value1 = `${value}hPa`
            }
            else if(value_type === "P1") {
                type="PM10"
                Value1 = `${value}`
            }
            else if(value_type === "P2") {
                type="PM25"
                Value1 = `${value}`
            }
            else {
                type = value_type;
                Value1 = `${value}`;
            }

            tot += `<li class="list-group-item d-flex">
                                <div class="row">
                                <div class="col me-5">${type}</div>
                                <div class="col">${Value1}</div>
                            </div>
                            </li>`
        })
        let ts: Date = new Date(timeStamp);
        tot += `
                        </ul>
                        <div class="card-body text-end">
                            <strong>${ts.toLocaleDateString('it-IT')} ${ts.toLocaleTimeString('it-IT')}</strong>
                        </div>
                    `
    })
    return tot;
}


export function getToPage({DatiArray, location}: page): void{
    const cont: Element = document.querySelector(".container");

    let tot : string = ``;



    for (let i= 0; i < DatiArray.length; i++) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        let Location2 = DatiArray[i].Location;
        let lat = Location2.lat;
        let lng = Location2.long;
        let country= location[i].country;
        let city = location[i].city;
        let DataSnapshot = DatiArray[i].DataSnapshot;

        tot += `
        <div class="col">
            <h1>Air Quality:</h1>
            <div class="card" style="width: 450px;">
               ${GetMap(lat, lng)}
                <div class="card-body">
                    <h5 class="card-title">${city} (${country})</h5>
                </div>

                    <div class="card-body">

                          <div class="card mt-2">


`
        tot+= GetDataSnapshot(DataSnapshot);

        tot+=`</div>
                </div>
            </div>
        </div>`


        i++;
        if (i < DatiArray.length) {
            Location2 = DatiArray[i].Location;
            lat = Location2.lat;
            lng = Location2.long;


            country= location[i].country;
            city = location[i].city;
            DataSnapshot = DatiArray[i].DataSnapshot;
            tot += `
        <div class="col">
            <h1>Air Quality:</h1>
            <div class="card" style="width: 450px;">
               ${GetMap(lat, lng)}
                <div class="card-body">
                    <h5 class="card-title">${city} (${country})</h5>
                </div>

                    <div class="card-body">

                          <div class="card mt-2">



                        `
            tot+= GetDataSnapshot(DataSnapshot);

            tot+=`</div>
                    </div>
                </div>
            </div>`
        }
        row.innerHTML= tot;
        cont.append(row);

    }






}
