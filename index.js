const backgroundMusic = new Audio("./mp3/ThoseWhoFight-remake.ogg")
backgroundMusic.volume = 0.1
backgroundMusic.loop = true // repeat music
backgroundMusic.play() // play music

const attackSoundMage = new Audio("https://www.myinstants.com/media/sounds/magic-fairy.mp3")
const attackSoundVoleur = new Audio("https://www.myinstants.com/media/sounds/tf2-critical-hit.mp3")
const healSoundMage = new Audio("https://www.myinstants.com/media/sounds/111-pokemon-recovery.mp3")
const healSoundVoleur = new Audio("https://www.myinstants.com/media/sounds/halo-shield-recharge-sound.mp3")
const gameOverSound = new Audio("https://vgmsite.com/soundtracks/super-smash-bros.-melee-original-sound-version/ukzbqkro/2-26%20Pokemon%20Victory.mp3")


const healthBarJ1 = document.querySelector("#joueur1 progress")
const healthBarJ2 = document.querySelector("#joueur2 progress")

const attackBtnJ1 = document.querySelector("#joueur1 .attack")
const attackBtnJ2 = document.querySelector("#joueur2 .attack")

const healBtnJ1 = document.querySelector("#joueur1 .heal")
const healBtnJ2 = document.querySelector("#joueur2 .heal")


/*ACTIONS BUTTONS*/

/*ATTACK*/

attackBtnJ1.addEventListener("click", function() {
    const damage = getDamage("mage")
    healthBarJ2.value = healthBarJ2.value - damage
    playDamageSound("mage")

    if(healthBarJ2.value===0){
        gameOver()
    }
    switchPlayer("voleur")
})

attackBtnJ2.addEventListener("click", function() {
    const damage = getDamage("voleur")
    healthBarJ1.value = healthBarJ1.value - damage
    playDamageSound("voleur")

    if(healthBarJ1.value===0){
        gameOver()
    }
    switchPlayer("mage")
})

/*HEAL*/

healBtnJ1.addEventListener("click", function() {
    const heal = getHeal("mage")
    healthBarJ1.value = healthBarJ1.value + heal
    playHealSound("mage")
    switchPlayer("voleur")
})


healBtnJ2.addEventListener("click", function() {
    const heal = getHeal("voleur")
    healthBarJ2.value = healthBarJ2.value + heal
    playHealSound("voleur")
    switchPlayer("mage")
})

// Ajout d'un écouteur d'événements pour healthBarJ1
// healthBarJ1.addEventListener('input', function() {
//     let value = healthBarJ1.value;
//     if (value <= 25) {
//       healthBarJ1.style.backgroundColor = 'red';  // Couleur pour 25% ou moins
//     } else if (value <= 50) {
//       healthBarJ1.style.backgroundColor = 'orange';  // Couleur pour 50% ou moins
//     } else {
//       healthBarJ1.style.backgroundColor = 'green';  // Couleur pour plus de 50%
//     }
// });

// // Ajout d'un écouteur d'événements pour healthBarJ2
// healthBarJ2.addEventListener('input', function() {
//     let value = healthBarJ2.value;
//     if (value <= 25) {
//       healthBarJ2.style.backgroundColor = 'red';  // Couleur pour 25% ou moins
//     } else if (value <= 50) {
//       healthBarJ2.style.backgroundColor = 'orange';  // Couleur pour 50% ou moins
//     } else {
//       healthBarJ2.style.backgroundColor = 'green';  // Couleur pour plus de 50%
//     }
// });


/*FONCTION DOMMAGES*/


function getDamage(classe){
    if (classe === "mage"){
        return getRandomValue(10, 30)
    }else{
        return getRandomValue(5, 13)
    }
}

function getDamage(classe){
    if (classe === "voleur"){
        return getRandomValue(10, 30)
    }else{
        return getRandomValue(5, 13)
    }
}

/*FONCTION HEAL*/

function getHeal(classe){
    if(classe === "mage"){
        return getRandomValue(10, 30)
    }else{
        return getRandomValue(5, 13)
    }
}

function getHeal(classe){
    if(classe === "voleur"){
        return getRandomValue(10, 30)
    }else{
        return getRandomValue(5, 13)
    }
}

/* FONCTION RANDOM*/

function getRandomValue(min, max){
    const difference = max - min +1
    const random = Math.floor(Math.random() * difference)
    return random + min

}

/*FONCTION SWITCH PLAYER*/


function switchPlayer(classe){
    if(classe === "mage"){

        attackBtnJ1.disabled = false

        if ( healthBarJ1.value < 100 ){
            healBtnJ1.disabled = false
        }

        attackBtnJ2.disabled = true
        healBtnJ2.disabled = true
    }else{

        attackBtnJ2.disabled = false
        if ( healthBarJ2.value < 100 ){
            healBtnJ2.disabled = false
        }

        attackBtnJ1.disabled = true
        healBtnJ1.disabled = true
    }
}

/*FONCTION SONS*/

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