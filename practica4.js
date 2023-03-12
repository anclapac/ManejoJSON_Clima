const fs = require('fs')

//Leer un fichero de forma asíncrona
exports.load=(citiesFilename) => {

    let cities = JSON.parse(fs.readFileSync(citiesFilename));
    return cities;
}

//Obtener información sobre temperaturas
exports.max_temp = (cities) => {
    let max=cities[0].main.temp;

    for (let i=1; i<cities.length; i++){
        const element = cities[i].main.temp;
        if(element>max){
            max=element;
        }
    } return max;
}

exports.min_temp = (cities) => {
    let min=cities[0].main.temp;

    for (let i=1; i<cities.length; i++){
        const element = cities[i].main.temp;
        if(element<min){
            min=element;
        }
    } return min;
}

exports.max_temp_min = (cities) => {
    let max=cities[0].main.temp_min;

    for (let i=1; i<cities.length; i++){
        const element = cities[i].main.temp_min;
        if(element>max){
            max=element;
        }
    } return max;
}

exports.min_temp_max = (cities) => {
    let min=cities[0].main.temp_min;

    for (let i=1; i<cities.length; i++){
        const element = cities[i].main.temp_max;
        if(element<min){
            min=element;
        }
    } return min;
}

exports.average_temp = (cities) => {
    let temperature=cities[0].main.temp;

    for (let i=1; i<cities.length; i++){
        const element = cities[i].main.temp;
        temperature=temperature+element;
    } return temperature/(cities.length);
}

exports.warmer_average_temp = (cities) => {
    let temperature=cities[0].main.temp;

    for (let i=1; i<cities.length; i++){
        const element = cities[i].main.temp;
        temperature=temperature+element;
    
    } 
    let media=temperature/(cities.length);

    let mayores =[];
    for(let i=0; i<cities.length; i++){
        if(cities[i].main.temp>media){
            mayores.push(cities[i].name);
        }
    } return mayores;
}

//Filtrar por posición geográfica
exports.max_north = (cities) => {
    let ciudad= cities[0];
    for (let i=0; i<cities.length; i++){
        if(ciudad.coord.lat<cities[i].coord.lat){
            ciudad=cities[i];
        }
    }return ciudad.name;
}

exports.max_south = (cities) => {
    let ciudad= cities[0];
    for (let i=0; i<cities.length; i++){
        if(ciudad.coord.lat>cities[i].coord.lat){
            ciudad=cities[i];
        }
    }return ciudad.name;
}

exports.gravity_center = (cities) => {
   let totalLon=cities[0].coord.lon;
   let totalLat=cities[0].coord.lat;
   
   for(let i=1; i<cities.length; i++){
    const lon=cities[i].coord.lon;
    totalLon=totalLon+lon;
    const lat=cities[i].coord.lat;
    totalLat=totalLat+lat;
   }
   let mediaLon=totalLon/cities.length;
   let mediaLat=totalLat/cities.length;

   return {lon:mediaLon, lat:mediaLat};
}

exports.closest_GC = (cities) => {
    let totalLon=cities[0].coord.lon;
    let totalLat=cities[0].coord.lat;  

    for(let i=1; i<cities.length; i++){
        const lon=cities[i].coord.lon;
        totalLon=totalLon+lon;
        const lat=cities[i].coord.lat;
        totalLat=totalLat+lat;

    }
    let mediaLon=totalLon/cities.length;
    let mediaLat=totalLat/cities.length;

    let distMin=0;
    let miCiudad;
    for (let i=0; i<cities.length; i++){
        const restaLon=cities[i].coord.lon-mediaLon;
        const restaLat=cities[i].coord.lat-mediaLat;
        const distancia=Math.sqrt((restaLon*restaLon)+(restaLat*restaLat));

        if(i==0 || distancia<distMin){
            distMin=distancia;
            miCiudad=cities[i].name;
        }
    } return miCiudad;
}

