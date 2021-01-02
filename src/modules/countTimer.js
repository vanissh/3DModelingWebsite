function countTimer(deadline){
    let timerHours = document.querySelector('#timer-hours'), 
        timerMinutes = document.querySelector('#timer-minutes'), 
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor((timeRemaining / 3600));

            return {timeRemaining, hours, minutes, seconds};
    }

    let idInterval;
    
    function updateClock(){
        let timer = getTimeRemaining();

        for(let key in timer){
            if(key !== 'timeRemaining' && timer[key] < 10){
                timer[key] = '0' + timer[key];
            }
        }

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

        if(timer.timeRemaining < 0){
            clearInterval(idInterval);
            
            timerHours.textContent = '00';
            timerMinutes.textContent  = '00';
            timerSeconds.textContent = '00';
        }
        
    }

    updateClock();
    idInterval = setInterval(updateClock, 1000);

}

export default countTimer;