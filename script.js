

window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //timer
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

                console.log(timerHours.innerHTML);
            }
            
        }

        idInterval = setInterval(updateClock, 1000);

    }

    countTimer('17 december 2020');

    //menu

    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        function handlerMenu () {
            menu.classList.toggle('active-menu');
        }

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((item) => item.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelectorAll('.popup-close'),
            popupContent = document.querySelector('.popup-content'),
            clientWidth = document.documentElement.clientWidth;

        let downInterval, count = 0;

        //popup-animation

        const popupDown = () => {
            downInterval = requestAnimationFrame(popupDown);
            count++;
            if(count < 20){
                popupContent.style.top = 12*count + 'px';
            } else {
                cancelAnimationFrame(downInterval);
            }
        };

        popupBtn.forEach((item) => {
            item.addEventListener('click', () => {
            popup.style.display = 'block';

            if(clientWidth >= 768){
                downInterval = requestAnimationFrame(popupDown);
            }   
        });

        popup.addEventListener('click', () => {
            count = 0;
            popup.style.display = 'none';            
        });

    });
    };

    togglePopUp();
});
