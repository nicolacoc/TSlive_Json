
export async function getAirQualityData(url: string): Promise<any>{

    const response : Response = await fetch(url);
    const status : boolean = response.ok;
    if (status){
        return await response.json();
    }
    throw new Error("Data not valid");
}


export async function FetchLocation(lat: number,lng: number): Promise<any>{

    const response : Response = await fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=18&format=jsonv2`);
    const status : boolean = response.ok;
    if (status){
        return await response.json();

    }
    throw new Error("Data Location not valid");
}