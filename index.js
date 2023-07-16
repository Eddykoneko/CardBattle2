const backgroundMusic = new Audio("h")
backgroundMusic.volume = 0.1
backgroundMusic.loop = true // repeat music
backgroundMusic.play()

const attackSoundMage = new Audio("https://www.myinstants.com/media/sounds/magic-fairy.mp3")
const attackSoundVoleur = new Audio("https://www.myinstants.com/media/sounds/tf2-critical-hit.mp3")
const healSoundMage = new Audio("https://www.myinstants.com/media/sounds/111-pokemon-recovery.mp3")
const healSoundVoleur = new Audio("https://www.myinstants.com/media/sounds/halo-shield-recharge-sound.mp3")
const gameOverSound = new Audio("https://vgmsite.com/soundtracks/super-smash-bros.-melee-original-sound-version/ukzbqkro/2-26%20Pokemon%20Victory.mp3")

const playerCards = document.querySelectorAll(".player-card")

const healthBars = document.querySelectorAll(".progress-bar")

const pointVies = document.querySelectorAll(".point-vie span")

const attackBtns = document.querySelectorAll(".attack")
const healBtns = document.querySelectorAll(".heal")

const listActiosn = document.querySelector(".actions")

const actions = []

const classes = [
    {
        name: "mage",
        health: 100
    }, 
    {
        name: "voleur",
        health: 100
    }
]

/*ACTIONS BUTTONS*/

attackBtns[0].addEventListener("click", () => clickAttackButton(0)) 
attackBtns[1].addEventListener("click", () =>  clickAttackButton(1))

healBtns[0].addEventListener("click", () => clickHealButton(0))
healBtns[1].addEventListener("click", () => clickHealButton(1))

console.log(pointVies)
function clickAttackButton(indexJoueur) {
    // recupere l'index inverse (ennemy)
    const indexEnemy = indexJoueur === 1 ? 0 : 1
    const classeJoueur = classes[indexJoueur]
    const classeEnemy = classes[indexEnemy]
    //console.log(classeEnemy)
    const healthBarEnemy = healthBars[indexEnemy]
    const playerCard = playerCards[indexJoueur]
    const damage = getDamage(classeJoueur.name)
    console.log(`${classeJoueur.name} attack ${damage}`)
    classeEnemy.health -= damage
    healthBarEnemy.style.width = `${classeEnemy.health}%`
    pointVies[indexEnemy].textContent = classeEnemy.health
    

    //console.log(classeEnemy.health)

    playDamageSound(classeJoueur.name)
    attackAnimation(playerCard)
    const actionMessage = `${classeJoueur.name} a infligé ${damage} points à ${classeEnemy.name}`
    afficherActions(actionMessage)
    if(classeEnemy.health === 0){
        gameOver()
    }

    switchPlayer(indexJoueur, indexEnemy)
}   

function clickHealButton(indexJoueur) {
    const indexEnemy = indexJoueur === 1 ? 0 : 1
    const classeJoueur = classes[indexJoueur]
    const heal = getHeal(classeJoueur.name)
    if (classeJoueur.health + heal > 100) {
        classeJoueur.health = 100
    } else {
        classeJoueur.health += heal
    }
    healthBars[indexJoueur].style.width = `${classeJoueur.health}%`
    pointVies[indexJoueur].textContent = classeJoueur.health
    console.log(classeJoueur.health)
    const actionMessage = `${classeJoueur.name} c'est soigné ${heal} points`
    afficherActions(actionMessage)
    playHealSound(classeJoueur.name)
    switchPlayer(indexJoueur, indexEnemy)
}

/*fireBall.addEventListener("click", function() {
    console.log(fireBall)
    const damage = getFireball("mage")
    healthBarJ2.value = healthBarJ2.value - damage
    playHealSound("mage")
    if(healthBarJ2.value===0){
        gameOver()
    }
    switchPlayer("voleur")
})
*/

function afficherActions(message) {
    listActiosn.innerHTML = ""
    actions.push(message)
    actions.forEach(action => {
        const actionLi = document.createElement("li")
        actionLi.textContent = action
        listActiosn.appendChild(actionLi)
    })
}

/*FONCTION DOMMAGES*/

function attackAnimation(element)
{
    element.classList.add('active-attack');
    setTimeout(() => {
        element.classList.remove('active-attack');
    }, 400)
}

function getDamage(classe){
    if (classe === "mage"){
        return getRandomValue(15, 26)
    }else{
        return getRandomValue(20, 28)
    }

}

function getHeal(classe){
    if(classe === "mage"){
        return getRandomValue(14, 27)
    }else{
        return getRandomValue(11, 22)
    }

}


function getRandomValue(min, max){
    const difference = max - min +1
    const random = Math.floor(Math.random() * difference)
    return random + min

}

/*FONCTION SWITCH PLAYER*/


function switchPlayer(indexJoueur, indexEnemy) {
    // desactive boutons joeur
    attackBtns[indexJoueur].disabled = true
    healBtns[indexJoueur].disabled = true
    playerCards[indexJoueur].classList.remove("on")

    // active boutons enemy
    const classEnemy = classes[indexEnemy]
    attackBtns[indexEnemy].disabled = false
    if (classEnemy.health < 100) {
        healBtns[indexEnemy].disabled = false
        playerCards[indexEnemy].classList.add("on")
    }
}

/*FONCTION SONGS*/

function playDamageSound(classe){
    if(classe === "mage"){
        attackSoundMage.play()
    }else{
        attackSoundVoleur.play()
    }
}

function playHealSound(classe){
    if(classe === "mage"){
        healSoundMage.play()
    }else{
        healSoundVoleur.play()
    }
}



/*FONCTION GAME OVER*/


function gameOver() {
    backgroundMusic.pause()
    gameOverSound.play()
    const gm = document.createElement("div")
    gm.style.width = "100%"
    gm.style.height = "100%"
    gm.style.top = 0
    gm.style.position = "fixed"
    gm.style.textAlign = "center"


    //gm.style.background = "white"

    const contenu = document.createElement("div")
    contenu.innerHTML = "GAME OVER"
    contenu.style.padding = "50px"
    contenu.style.background = "white"
    gm.appendChild(contenu)

    document.body.appendChild(gm)
}