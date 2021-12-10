//Constante com as raridades dos carros

const cars = {
    pop: {
        name: "Popular",
        speedMax: { max: 200, min: 180 },
        speedMin: { max: 130, min: 110 },
        skid: { max: 0.96, min: 0.97 }
    },
    sport: {
        name: "Sport",
        speedMax: { max: 215, min: 195 },
        speedMin: { max: 145, min: 125 },
        skid: { max: 0.97, min: 0.98 }
    },
    superSport: {
        name: "Super Sport",
        speedMax: { max: 230, min: 210 },
        speedMin: { max: 160, min: 140 },
        skid: { max: 0.9825, min: 0.99 }
    }    
}

//Função para sortear a raridade do carro para cara "piloto"
function randomCar(){
    let x = Math.random();
    return (x < 0.6 ? cars.pop : x < 0.95 ? cars.sport : cars.superSport)
}

/***********************New code************************************/

//Aray que contém os nomes dos "pilotos" e os "pilotos" com seu carros
const arrNamePilots = ["Pedro", "Juca", "Edna"];
const arrPilots = [];

//Cria os carros de acordo com a variável arrNamePilots


arrNamePilots.forEach(
    function (element, index){
        let obj = new Object();
        obj.namePilot = arrNamePilots[index];
        obj.winnersLap = 0;
        obj.winnersRace = 0;
        obj.xp = 0;
        obj.level = 1;
        arrPilots[index] = obj;
    }
);

function createCarsPilots(){
    arrPilots.forEach(
        function(element){
            let random = randomCar();
            element.winnersLap = 0;
            element.carName = random.name;
            element.velMax = random.speedMax;
            element.velMin = random.speedMin;
            element.skid = random.skid;
        }
    );
}

//Função que gera o random para cada volta
function winnerForLap(velMax, velMin, skid, lvl){
    speedMax = attRandom(velMax.min + velMax.min * lvl, velMax.max + velMax.max * lvl);
    speedMin = attRandom(velMin.min + velMin.min * lvl, velMin.max + velMin.max * lvl);
    skid  = attRandom(skid.min, skid.max);
    return (Math.random() * (speedMax - speedMin) + speedMin) * skid;
}
function attRandom(min, max){
    return Math.random() * (max - min) + min;
}

function winLap(nLaps){
    for(let i = 0; i < nLaps; i++){
        let winnerLapId = 0;
        let speed = 0;
        arrPilots.forEach(
            (element, index) => {
                const {velMax, velMin, skid} = element; 
                element.level = (element.level >= 10 ? 10 : element.level);
                const randSpeed = winnerForLap(velMax, velMin, skid, element.level / 100);
                if(randSpeed > speed){
                    speed = randSpeed;
                    winnerLapId = index;
                }
            }   
        );
        arrPilots[winnerLapId].winnersLap++;
    }
}

function winForRace(){
    const arrWinnerPilots = [];
    arrPilots.forEach(
        (element) =>{
            arrWinnerPilots.push(element.winnersLap);
        });
    let contPosition = 0;
    let contPrint = 0;
    do{
        let maior = 0
        let id;
        contPrint++;
        arrWinnerPilots.forEach(
            (element, index) => {
                if(element > maior){
                    maior = element;
                    id = index;
                }
            }
        );
        arrWinnerPilots[id] = 0;
        addXp(contPosition, id);
        print(arrPilots[id], contPrint);
        contPosition++;
    }while(arrWinnerPilots.length > contPosition);
}

function addXp(cont, id){
    let whatRace = (nLaps == 10 ? "rapida" : nLaps == 60 ? "granPrix" : "enduro");
    arrPilots[id].winnersRace = (cont == 0 ? arrPilots[id].winnersRace + 1 : arrPilots[id].winnersRace);
    if(arrPilots[id].level == 10)
        return null;
    arrPilots[id].xp += xpForRace[whatRace][cont];
    arrPilots[id]
}

const xpForRace = {
    "rapida": [ 200, 120, 50 ],
    "granPrix": [ 220, 130, 75 ],
    "enduro": [ 250, 150, 90 ]   
};

let nLaps;
function runLaps(){
    nLaps = document.querySelector("input[name='race']:checked").value;
    document.getElementById("volta").innerHTML = "";
    createCarsPilots();
    winLap(nLaps);
    winForRace();
    atualizaLvl();
    console.log(arrPilots);
}

function atualizaLvl(){
    arrPilots.forEach(
        (element) => {
            element.level = parseInt(element.xp/450) + 1;
        });    
}

function print(arr, id){
    let tagsP = document.getElementById("volta");
    let newP = document.createElement("p");
    newP.innerText = id + "--" + arr.namePilot + " | " + arr.carName + " | " + arr.winnersLap + " Voltas ganhas";
    tagsP.appendChild(newP);
    printAll();
}

const printRace = document.querySelectorAll("#race > p");

function printAll(){
    const ordPilots = [];
    arrPilots.forEach((element, index) => { ordPilots.push(element.winnersRace + " " + index); } );
    ordPilots.sort(function(a,b) {
        a = parseInt(a.split(" ")[0]);
        b = parseInt(b.split(" ")[0]);
        return a < b ? 1 : a > b ? -1 : 0;
    })
    console.log(ordPilots)
    ordPilots.forEach(
        (element, index) => {
            const pilot = arrPilots[element.split(" ")[1]];
            printRace[index].innerText = index+1 + "-- " + pilot.namePilot + " | " + element.split(" ")[0] + " Vitórias | Nível " + pilot.level;
        })
}