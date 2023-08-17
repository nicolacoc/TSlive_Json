
export async function getAirQualityData(url: string){

    const response = await fetch(url);
    const status = response.ok;
    if (status){
        return await response.json();
    }
    throw new Error("Data not valid");
}


export async function FetchLocation(lat: number,lng: number): Promise<any>{

    const response = await fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=18&format=jsonv2`);
    const status = response.ok;
    if (status){
        return await response.json();

    }
    throw new Error("Data Location not valid");
}