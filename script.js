

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
            }
            
        }

        updateClock();
        idInterval = setInterval(updateClock, 1000);

    }

    countTimer('17 december 2020');

    //menu

    function menu (){

        const btnMenu = document.querySelector('.menu'),
                menu = document.querySelector('menu'),
                closeBtn = document.querySelector('.close-btn'),
                menuItems = menu.querySelectorAll('ul>li'),
                scrollBtn = document.querySelector('img[src="images/scroll.svg"]');

        const toggleMenu = () => {

            function handlerMenu () {
                menu.classList.toggle('active-menu');
            }
    
            btnMenu.addEventListener('click', handlerMenu); //1 

            menu.addEventListener('click', (event) => {
                let target = event.target;
                console.log(target);

                if(target.closest('a')){
                    handlerMenu();
                }
            });
    
        };
    
        //scrollMenu
        const scrollMenu = () => {
            const scrolling = (id) => {
                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            };
    
            for(let anchor of menuItems){
                anchor.querySelector('a').addEventListener('click', (e) => {
                    e.preventDefault();
                    const blockID = anchor.querySelector('a').getAttribute('href');
                
                    scrolling(blockID);
                });
            }
        
            scrollBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const blockID = menuItems[0].querySelector('a').getAttribute('href');
            
                scrolling(blockID);
            });
        };
    
        toggleMenu();
        scrollMenu();
    }

    menu();
    
    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

        let downInterval, count = 0,
            clientWidth = document.documentElement.clientWidth;

        window.addEventListener('resize', () => {
            clientWidth = document.documentElement.clientWidth;
        });

        //popup-animation

        const popupDown = () => {
            downInterval = requestAnimationFrame(popupDown);
            count++;
            if(count < 15){
                popupContent.style.top = 15*count + 'px';
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

            popup.addEventListener('click', (event) => {
                count = 0;
                let target = event.target;
                if (target !== popupClose){
                    target = target.closest('.popup-content');
                }

                if(!target || target === popupClose){
                    popup.style.display = 'none';
                }
            });

        });  

    };
    togglePopUp();

    //tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

                if (target.classList.contains('service-header-tab')){

                    tab.forEach((item, i) => {

                        if(item === target){
                            toggleTabContent(i);  
                        }

                    });

                }

            }
            
        );
    };

    tabs();
});
