let latitude=43.3223241
let longitude=-1.975910415
let enlace="'https://api.open-meteo.com/v1/forecast?latitude=43.3223241&longitude=-1.975910415&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&timezone=Europe%2FBerlin'"
let donosti= false
let madrid= false
let barcelona= false
let valencia= false
let bilbao= false
let sevilla= false
document.getElementById("identificarZona").innerHTML= "Zona actual: Donosti"
Añadircoordenadas()
setInterval(Añadircoordenadas, 10000)
function Añadircoordenadas(){ // función para realizar todo

fetch('https://api.open-meteo.com/v1/forecast?latitude='+ latitude +'&longitude='+ longitude +'3&current=temperature_2m,is_day,precipitation,weather_code&hourly=temperature_2m,precipitation_probability,weather_code&timezone=Europe%2FBerlin')
    .then(response=>response.json()) //Cuando se conecte lo anterior y da una respuesta ok el servidor, que haga lo siguiente
    .then(data =>{ //nombre del archivo descargado
        let code=data.current.weather_code//weather_code de hora actual
        let imagen
        let horaAct 
        //Variables para calcular las prómas horas
        let hora1
        let hora2
        let hora3
        const ahora = new Date() //obtener hora actual
        horaAct=ahora.getHours()
        hora1= horaAct + 2
        hora2 = horaAct + 5
        hora3= horaAct + 8
        //Variables para las próximas horas
        let proxHora1 = "Hora: " + data.hourly.time[hora1] 
        document.getElementById("hora1").innerHTML= proxHora1 
        let proxHora2 = "Hora: " + data.hourly.time[hora2] 
        document.getElementById("hora2").innerHTML= proxHora2
        let proxHora3 = "Hora: " + data.hourly.time[hora3]
        document.getElementById("hora3").innerHTML= proxHora3 
        let proxTemp1="Temperatura: " + Math.floor(data.hourly.temperature_2m[hora1]) + "ºC"
        document.getElementById("temp1").innerHTML= proxTemp1
        let proxTemp2="Temperatura: " + Math.floor(data.hourly.temperature_2m[hora2]) + "ºC"
        document.getElementById("temp2").innerHTML= proxTemp2
        let proxTemp3=" Temperatura: " + Math.floor(data.hourly.temperature_2m[hora3]) + "ºC"
        document.getElementById("temp3").innerHTML= proxTemp3
        //Variables de precipitaciín
        let proxpreci1 = "Precipitación: " + data.hourly.precipitation_probability[hora1] + "%"
        document.getElementById("preci1").innerHTML= proxpreci1 
        let proxpreci2 = "Precipitación: " + data.hourly.precipitation_probability[hora2] + "%"
        document.getElementById("preci2").innerHTML= proxpreci2
        let proxpreci3 = "Precipitación: " + data.hourly.precipitation_probability[hora3] + "%"
        document.getElementById("preci3").innerHTML= proxpreci3 
        //códigos de las proximas horas
        let weathercode1= data.hourly.weather_code[hora1]
        let weathercode2= data.hourly.weather_code[hora2]
        let weathercode3= data.hourly.weather_code[hora3]
        //variables max, min
        let max=Math.floor(data.hourly.temperature_2m[0])
        let min=Math.floor(data.hourly.temperature_2m[0])
        let weathercodeMax=0
        let weatherCodeMin=data.hourly.weather_code[0]
        for(i=0;i<24;i++){ //bucle para obtener la temperatura mayor y la menor
            if(Math.floor(data.hourly.temperature_2m[i])>max){
                max=Math.floor(data.hourly.temperature_2m[i])
                weathercodeMax=data.hourly.weather_code[i]
            }
            if(Math.floor(data.hourly.temperature_2m[i])<min){
                min=Math.floor(data.hourly.temperature_2m[i])
                weatherCodeMin=data.hourly.weather_code[i]
            }
        }
        document.getElementById("tempMax").innerHTML= max
        document.getElementById("tempMin").innerHTML= min
        
        document.getElementById("temperatura").innerHTML= Math.floor(data.current.temperature_2m) + data.current_units.temperature_2m
        document.getElementById("Sitio").innerHTML= "Latitud: "  + data.latitude + "<br> Longitud: " + data.longitude + "<br> Precipitación: " + data.current.precipitation + "%" 
        
        let Arrayweathercode= [weathercode1, weathercode2, weathercode3, weathercodeMax, weatherCodeMin, code] //Lista para meter todos los weatherCodes

        for(let i=0;i<Arrayweathercode.length;i++){ //bucle para asicnar la imagen a las proximas horas
            if(Arrayweathercode[i]==0){
                    imagen = "<img src= 'sol.png' alt='Sol'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
                if(Arrayweathercode[i]==1 || Arrayweathercode[i]==2 || Arrayweathercode[i]==3){
                    imagen = "<img src= 'sol-nube.png' alt='sol y nubes'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
        
                if(Arrayweathercode[i]==45 || Arrayweathercode[i]==48){
                    imagen = "<img src= 'nublado.png' alt='nublado'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
                
                if(Arrayweathercode[i]==51 || Arrayweathercode[i]==53 || Arrayweathercode[i]==55){
                    imagen = "<img src= 'brisa.png' alt='brisa'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
        
                if(Arrayweathercode[i]==56 || Arrayweathercode[i]==57){
                    imagen = "<img src= 'brisa.png' alt='brisa'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
        
                if(Arrayweathercode[i]==61 || Arrayweathercode[i]==63 || Arrayweathercode[i]==65){
                    imagen = "<img src= 'lluvia.png' alt='lluvia'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
        
                if(Arrayweathercode[i]==66 || Arrayweathercode[i]==67){
                    imagen = "<img src= 'lluvia.png' alt='lluvia'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
        
                if(Arrayweathercode[i]==71 || Arrayweathercode[i]==73 || Arrayweathercode[i]==75){
                    imagen = "<img src= 'nieve.png' alt='nieve'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
        
                if(Arrayweathercode[i]==77){
                    imagen = "<img src= 'nieve.png' alt='nieve'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
        
                if(Arrayweathercode[i]==80 || Arrayweathercode[i]==81 || Arrayweathercode[i]==82){
                    imagen = "<img src= 'lluvia.png' alt='lluvia'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
        
                if(Arrayweathercode[i]==85 || Arrayweathercode[i]==86){
                    imagen = "<img src= 'nieve.png' alt='nieve'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
        
                if(Arrayweathercode[i]==95){
                    imagen = "<img src= 'tormenta.png' alt='tormenta'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
        
                if(Arrayweathercode[i]==96 || Arrayweathercode[i]==99){
                    imagen = "<img src= 'tormenta.png' alt='tormenta'>"
                    document.getElementById("imagenTemp" + i).innerHTML= imagen
                }
        }
    })
    donosti= false
    madrid= false
    barcelona= false
    valencia= false
    bilbao= false
    sevilla= false
}
setInterval(verificar, 1000)
function verificar(){
if(donosti==true){
    latitude=43.3223241
    longitude=-1.975910415
    document.getElementById("identificarZona").innerHTML= "Zona actual: Donosti"
    madrid= false
    barcelona= false
    valencia= false
    bilbao= false
    sevilla= false
    Añadircoordenadas()
}

if(madrid==true){
    latitude=40.4378373
    longitude=-3.84434411
    document.getElementById("identificarZona").innerHTML= "Zona actual: Madrid"
    donosti= false
    barcelona= false
    valencia= false
    bilbao= false
    sevilla= false
    Añadircoordenadas()
}

if(barcelona==true){
    latitude=41.3926386
    longitude=2.057788612
    document.getElementById("identificarZona").innerHTML= "Zona actual: Barcelona"
    donosti= false
    madrid= false
    valencia= false
    bilbao= false
    sevilla= false
    Añadircoordenadas()
}

if(bilbao==true){
    latitude=39.4077562
    longitude=-0.443911912
    document.getElementById("identificarZona").innerHTML= "Zona actual: Bilbao"
    donosti= false
    madrid= false
    barcelona= false
    valencia= false
    sevilla= false
    Añadircoordenadas()
}

if(valencia==true){
    latitude=43.2633161
    longitude=-2.974763913
    document.getElementById("identificarZona").innerHTML= "Zona actual: Valencia"
    donosti= false
    madrid= false
    barcelona= false
    bilbao= false
    sevilla= false
    Añadircoordenadas()
}

if(sevilla==true){
    latitude=43.2633161
    longitude=-2.974763913
    document.getElementById("identificarZona").innerHTML= "Zona actual: Sevilla"
    donosti= false
    madrid= false
    barcelona= false
    valencia= false
    bilbao= false
    Añadircoordenadas()
}
}