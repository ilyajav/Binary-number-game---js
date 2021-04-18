// variables //
let machineGussed = document.getElementById('machineChoseN') // What machine chose
let answerBT = document.getElementById('answerBT') // Answer to user input
let inputHN = document.getElementById('inputField') // User input
let errorAns = document.getElementById('errorAns') // Wrong answer
let resultAns = document.getElementById('resultAns') // program answers
let restart = document.getElementById('res') // restart
let counterT = document.getElementById('counter') // Turns
let minN = document.getElementById('minN') // from number
let maxN = document.getElementById('maxN') // to number
let stFields = document.getElementById('stFields')
let contBT = document.getElementById('contBT') // continue for first mod
let MachineSt = document.getElementById('MachineSt') // button for first mod
let HumanSt = document.getElementById('HumanSt') // button for twice mod
let MachineDiv = document.getElementById('MachineDiv') // Machine fields
let contBT1 = document.getElementById('contBT1') // continue for twice mod
let ple = document.getElementById('ple') // please text
let alert = document.getElementById('alert') // text if max less then min (1 mod)
let machineAnswer = document.getElementById('machineAnswer') // Machine text
let answerButtons = document.getElementById('answerButtons') // Buttons fot twice mod
let less = document.getElementById('less') // button less
let higher = document.getElementById('higher') // button higher
let guessed = document.getElementById("guessed") // Machine win
let startFields = document.getElementById('firstFields') //first text
let attempts = document.getElementById("attempts") // human attempts
let machine
let min1
let max1
let borderMin
let borderMax
let numToAsk
let maxTrials

// START FIRST GAME MOD //
function startGameMachine() {
    stFields.style.display = 'block'
    startFields.style.display = 'none'
    ple.innerHTML = "Please, enter min and max numbers"
    contBT.style.display = "block"
}

// Random function for machine //
function getRan(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

// Continue for first mod //
function cont() {
    min1 = minN.value
    max1 = maxN.value
    maxTrials = Math.ceil(Math.log2(+max1 - +min1 + 1))
    machine = getRan(min1, max1)
    machineGussed.innerHTML = "Machine chose the number from " + minN.value + " " + "to " + maxN.value
    machineGussed.style.display = "block"
    answerBT.style.display = "block"
    inputHN.style.display = "block"
    restart.style.display = "block"
}

// if minimum higher then maximum
maxN.addEventListener('input', function () {
    if (maxN.value <= minN.value) {
        alert.innerHTML = "Maximum have to higher then minimum"
        contBT.disabled = true
        contBT1.disabled = true
    } else {
        contBT.disabled = false
        contBT1.disabled = false
    }
})

// User input //
function inputH() {
    let humanNum = parseInt(inputHN.value)
    if (humanNum < min1 || humanNum > max1) {
        counterT.style.display = 'block'
        errorAns.style.display = "block"
        errorAns.innerHTML = "Wrong number, please enter from " + minN.value + " " + "to " + maxN.value
        answerBT.disabled = true
    } else {
        answerBT.disabled = false
    }
}

// program answers //
function answer() {
    counterT.style.display = "block"
    resultAns.style.display = "block"
    if (maxTrials > 0) {
        if (inputHN.value.length === 0) {
            resultAns.innerHTML = "Field is empty"
        } else if (inputHN.value < machine) {
            resultAns.innerHTML = "Wrong answer, your number less then machine number"
            maxTrials -= 1
            attempts.style.display = "block"
            attempts.innerHTML += "<li>" + inputHN.value + " your chose </li>"
        } else if (inputHN.value > machine) {
            maxTrials -= 1
            resultAns.innerHTML = "Wrong answer, your number higher then machine number"
            attempts.style.display = "block"
            attempts.innerHTML += "<li>" + inputHN.value + " your chose </li>"
        } else {
            resultAns.innerHTML = "Congratulation! You win"
            resultAns.style.color = "#04D642"
        }
    } else {
        resultAns.innerHTML = "Sorry, you lose"
    }
    counterT.innerHTML = "Moves left " + maxTrials
}

// START TWICE MOD //
function startGameHuman() {
    stFields.style.display = 'block'
    startFields.style.display = 'none'
    MachineDiv.style.display = "block"
    contBT.style.display = "none"
    contBT1.style.display = "block"
    ple.innerHTML = "Please, enter min and max numbers"
    less.disabled = false
    higher.disabled = false
    guessed.disabled = false
    alert.style.display = "block"
}

// finding the middle //
function findMiddle(min, max) {
    return Math.ceil((max - min + 1) / 2) + min - 1
}

// continue for twice mod //
function cont1() {
    borderMin = parseInt(minN.value)
    borderMax = parseInt(maxN.value)
    numToAsk = findMiddle(parseInt(minN.value), parseInt(maxN.value))
    machineAnswer.innerHTML = "Machine chose " + numToAsk + ". This number less, higher or equals your number?"
    answerButtons.style.display = "block"
    machineAnswer.style.display = "block"
    restart.style.display = "block"
}

// if the user clicked the less button //
function minus() {
    borderMax = numToAsk - 1
    numToAsk = findMiddle(borderMin, borderMax)
    machineAnswer.innerHTML = "Machine chose " + numToAsk
}

// if the user clicked the higher button //
function plus() {
    borderMin = numToAsk + 1
    numToAsk = findMiddle(borderMin, borderMax)
    machineAnswer.innerHTML = "Machine chose " + numToAsk
}

// if the user clicked guessed button //
function guess() {
    machineAnswer.innerHTML = "Machine win!"
    machineAnswer.style.color = "#04D642"
    less.disabled = true
    higher.disabled = true
    guessed.disabled = true
}

// general function restart //
function restartGame() {
    machine = null
    inputHN.value = null
    machineGussed.style.display = "none"
    answerBT.style.display = "none"
    inputHN.style.display = "none"
    errorAns.style.display = "none"
    resultAns.style.display = "none"
    restart.style.display = 'none'
    counterT.style.display = 'none'
    stFields.style.display = 'none'
    startFields.style.display = 'block'
    contBT1.style.display = "none"
    answerButtons.style.display = "none"
    numToAsk = null;
    machineAnswer.style.display = "none"
    alert.style.display = "none"
    attempts.style.display = "none"
    attempts.innerHTML = "Attempts: "
}

// Events //
MachineSt.addEventListener('click', startGameMachine) //start first mod
HumanSt.addEventListener('click', startGameHuman) //start twice mod
less.addEventListener('click', minus) //button less
higher.addEventListener('click', plus) // button higher
answerBT.addEventListener('click', answer) // program answers to user input
inputHN.addEventListener('input', inputH) // user input
contBT.addEventListener('click', cont) // continue for first mod
contBT1.addEventListener('click', cont1) // continue for twice mod
guessed.addEventListener('click', guess) // button guessed
restart.addEventListener('click', restartGame) // restart for first and twice mods