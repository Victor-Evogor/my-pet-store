
function ping() {
    const pingSound = new Audio();
    pingSound.src = "/audio/notification.mp3";
    console.log(pingSound)
    pingSound.load()
    pingSound.onloadstart = ()=>{
        console.log("Sound loaded, playing now")
        pingSound.play()
    }
}

export default ping;