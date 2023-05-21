const backgroundMusic = new Audio("https://vgmsite.com/soundtracks/super-smash-bros.-melee-original-sound-version/jghupxig/1-37%20Pok%C3%A9mon%20Battle%21%20%28GoldSilver%29.mp3")
backgroundMusic.volume = 0.3
backgroundMusic.loop = true // repeat music
backgroundMusic.play()

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


attackBtnJ1.addEventListener("click", function() {
    // console.log(attackBtnJ1)
    const damage = getDamage("mage")
    healthBarJ2.value = healthBarJ2.value - damage
    playDamageSound("mage")
    if(healthBarJ2.value===0){
        gameOver()
    }
    switchPlayer("voleur")

    // healBtnJ2.disabled = false
    // console.log(healthBarJ1.value)
    // console.log(damage)

// desactive les actions de joueur (pas son tour)
   

     
})

attackBtnJ2.addEventListener("click", function() {
    // console.log(attackBtnJ2)
    const damage = getDamage("voleur")
    healthBarJ1.value = healthBarJ1.value - damage
    playDamageSound("voleur")
    if(healthBarJ1.value===0){
        gameOver()
    }
    switchPlayer("mage")
    // healBtnJ1.disabled = false

    // desactive les actions de joueur (pas son tour)
    // attackBtnJ2.disabled = true
    // healBtnJ2.disabled = true

})

healBtnJ1.addEventListener("click", function() {
    // console.log(healBtnJ1)
    const heal = getHeal("mage")
    healthBarJ1.value = healthBarJ1.value + heal
    playHealSound("mage")
    switchPlayer("voleur")
    // if ( healthBarJ1.value === 100 ){
    //     healBtnJ1.disabled = true
    // }

    // desactive les actions de joueur (pas son tour)
    // attackBtnJ1.disabled = true
    // healBtnJ1.disabled = true
})

healBtnJ2.addEventListener("click", function() {
    // console.log(healBtnJ2)
    const heal = getHeal("voleur")
    healthBarJ2.value = healthBarJ2.value + heal
    playHealSound("voleur")
    switchPlayer("mage")
    // if ( healthBarJ2.value === 100 ){
    //     healBtnJ2.disabled = true
    // }


    // desactive les actions de joueur (pas son tour)
    // attackBtnJ2.disabled = true
    // healBtnJ2.disabled = true
})


function getDamage(classe){
    if (classe === "mage"){
        return getRandomValue(2, 12)
    }else{
        return getRandomValue(5, 8)
    }

}

function getHeal(classe){
    if(classe === "mage"){
        return getRandomValue(3, 4)
    }else{
        return getRandomValue(4, 5)
    }

}

function getRandomValue(min, max){
    const difference = max - min +1
    const random = Math.floor(Math.random() * difference)
    return random + min

}

function switchPlayer(classe){
    if(classe === "mage"){
        attackBtnJ1.disabled = false
        console.log(healBtnJ1.value)
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

function gameOver() {
    backgroundMusic.pause()
    gameOverSound.play()
    const gm = document.createElement("div")
    gm.style.width = "100%"
    gm.style.height = "100%"
    gm.style.top = 0
    gm.style.position = "fixed"
    //gm.style.background = "white"

    const contenu = document.createElement("div")
    contenu.innerHTML = "GAME OVER"
    contenu.style.padding = "50px"
    contenu.style.background = "white"
    gm.appendChild(contenu)

    document.body.appendChild(gm)
}