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
function winnerForLap(velMax, velMin, skid){
    speedMax = attRandom(velMax.min, velMax.max);
    speedMin = attRandom(velMin.min, velMin.max);
    skid  = attRandom(skid.min, skid.max);
    return (Math.random() * (speedMax - speedMin) + speedMin) * skid;
}
function attRandom(min, max){
    return Math.random() * (max - min) + min;
}

function runLaps(){
    const nLaps = document.querySelector("input[name='race']:checked").value;

    createCarsPilots();
    for(let i = 0; i < nLaps; i++){
        let winnerLapId = 0;
        let speed = 0;
        arrPilots.forEach(
            (element, index) => {
                const {velMax, velMin, skid} = element; 
                const randSpeed = winnerForLap(velMax, velMin, skid);
                if(randSpeed > speed){
                    speed = randSpeed;
                    winnerLapId = index;
                }
            }   
        );
        arrPilots[winnerLapId].winnersLap++;
    }
    console.log(arrPilots);
}

