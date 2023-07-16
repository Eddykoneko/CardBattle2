const backgroundMusic = new Audio("h")
backgroundMusic.volume = 0.1
backgroundMusic.loop = true // repeat music
backgroundMusic.play()

const attackSoundMage = new Audio("https://www.myinstants.com/media/sounds/magic-fairy.mp3")
const attackSoundVoleur = new Audio("https://www.myinstants.com/media/sounds/tf2-critical-hit.mp3")
const healSoundMage = new Audio("https://www.myinstants.com/media/sounds/111-pokemon-recovery.mp3")
const healSoundVoleur = new Audio("https://www.myinstants.com/media/sounds/halo-shield-recharge-sound.mp3")
const gameOverSound = new Audio("https://vgmsite.com/soundtracks/super-smash-bros.-melee-original-sound-version/ukzbqkro/2-26%20Pokemon%20Victory.mp3")

const divJ1 = document.querySelector("#joueur1");
const divJ2 = document.querySelector("#joueur2");

let healthBarJ1 = document.querySelector("#joueur1 .progress-bar")
let healthBarJ2 = document.querySelector("#joueur2 .progress-bar")

let pointVieJ1 = document.querySelector("#joueur1.point-vie>span")
let pointVieJ2 = document.querySelector("#joueur2.point-vie>span")

const attackBtnJ1 = document.querySelector("#joueur1 .attack")
const attackBtnJ2 = document.querySelector("#joueur2 .attack")

const healBtnJ1 = document.querySelector("#joueur1 .heal")
const healBtnJ2 = document.querySelector("#joueur2 .heal")

let healthJ1 = 100;
let healthJ2 = 100;

/*ACTIONS BUTTONS*/

attackBtnJ1.addEventListener("click", clickAttackButtonJ1) 
attackBtnJ2.addEventListener("click", clickAttackButtonJ2)

healBtnJ1.addEventListener("click", clickHealButtonJ1)
healBtnJ2.addEventListener("click", clickHealButtonJ2)

function clickAttackButtonJ1() {
    healthJ2 = clickAttackButton("mage", "voleur", healthJ2, healthBarJ2, divJ1, healBtnJ1, healBtnJ2)
}

function clickAttackButtonJ2() {
    healthJ1 = clickAttackButton("voleur", "mage", healthJ1, healthBarJ1, divJ2, healBtnJ2, healBtnJ1)
}

function clickHealButtonJ1() {
    healthJ1 = clickHealButton("mage", "voleur", healthJ1, healthJ2, healthBarJ1, divJ1, healBtnJ1, healBtnJ2)
}

function clickHealButtonJ2() {
    healthJ2 = clickHealButton("voleur", "mage", healthJ2, healthJ1, healthBarJ2, divJ2, healBtnJ2, healBtnJ1)
}

function clickAttackButton(classe, classeEnemy, healthEnemy, healthBarEnemy, card, healBtn, healBtnEnemy) {
    const damage = getDamage(classe)
    console.log(`${classe} attack ${damage}`)
    healthEnemy -= damage
    healthBarEnemy.style.width = `${healthEnemy}%`
    console.log(healthEnemy)

    playDamageSound(classe)
    attackAnimation(card)
    if(healthEnemy === 0){
        gameOver()
    }

    healBtn.disabled = true
    healBtnEnemy.disabled = false

    switchPlayer(classeEnemy)

    return healthEnemy
}   

function clickHealButton(classe, classeEnemy, health, healthEnemy, healthBar, card, healBtn, healBtnEnemy) {
    const heal = getHeal(classe)
    health += heal
    healthBar.style.width = `${health}%`
    console.log(health)
    playHealSound(classe)
    switchPlayer(classeEnemy)

    healBtn.disabled = true
    if (healthEnemy < 100) {
        healBtnEnemy.disabled = false
    }

    return health
}
//     // healBtnJ2.disabled = false
//     // console.log(healthJ1)
//     // console.log(damage)

// // desactive les actions de joueur (pas son tour)
//     // console.log(attackBtnJ2)
//     const damage = getDamage("voleur")
//     console.log(`voleur attack ${damage}`)
//     healthJ1 -= damage
//     playDamageSound("voleur")
//     attackAnimation(divJ2)
//     if(healthJ1 === 0){
//         gameOver()
//     }

//     switchPlayer("mage")
//     // healBtnJ1.disabled = false

//     // desactive les actions de joueur (pas son tour)
//     // attackBtnJ2.disabled = true
//     // healBtnJ2.disabled = true

//     // console.log(healBtnJ1)
//     const heal = getHeal("mage")
//     healthBarJ1.value = healthBarJ1.value + heal
//     playHealSound("mage")
//     switchPlayer("voleur")
//     // if ( healthBarJ1.value === 100 ){
//     //     healBtnJ1.disabled = true
//     // }

//     // desactive les actions de joueur (pas son tour)
//     // attackBtnJ1.disabled = true
//     // healBtnJ1.disabled = true


//healBtnJ2.addEventListener("click", function() {
    // console.log(healBtnJ2)
   // const heal = getHeal("voleur")
   // healthBarJ2.value = healthBarJ2.value + heal
   // playHealSound("voleur")
    //switchPlayer("mage")
    // if ( healthBarJ2.value === 100 ){
    //     healBtnJ2.disabled = true
    // }


    // desactive les actions de joueur (pas son tour)
    // attackBtnJ2.disabled = true
    // healBtnJ2.disabled = true

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


function switchPlayer(classe){
    if(classe === "mage"){
        attackBtnJ1.disabled = false
        //console.log(healBtnJ1.value)
        if ( healthJ1 < 100 ){
            healBtnJ1.disabled = false
        }

        attackBtnJ2.disabled = true
        healBtnJ2.disabled = true
        //fireBall.disabled = true
    }else{
        attackBtnJ2.disabled = false
        if ( healthJ2 < 100 ){
            healBtnJ2.disabled = false
        }

        attackBtnJ1.disabled = true
        healBtnJ1.disabled = true
        //fireBall.disabled = true
        
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