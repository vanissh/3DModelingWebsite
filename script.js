

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

        const menu = document.querySelector('menu'),
                menuItems = menu.querySelectorAll('ul>li'),
                scrollBtn = document.querySelector('img[src="images/scroll.svg"]');

        const toggleMenu = () => {

            function handlerMenu () {
                menu.classList.toggle('active-menu');
            }

            document.addEventListener('click', (event) => {
                let target = event.target;

                if(target.closest('menu') && target.closest('a') || target.closest('.menu')){
                    handlerMenu();
                } else if(menu.classList.contains('active-menu') && target !== menu){
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

    //slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
        btn = document.querySelectorAll('.portfolio-btn'),
        dots = document.querySelector('.portfolio-dots'),
        slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval,
            dot = [];

        for(let i = 0; i <= slide.length - 1; i++){
            let element = document.createElement('li');
            element.classList.add('dot');
            dot.push(element);
            dot[0].classList.add('dot-active');
            dots.append(element);
        }

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlay = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        const startSlide = (time) => {
            interval = setInterval(autoPlay, time = 3000);

        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (e) => {
            e.preventDefault();

            let target = e.target;

            if(!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            } else if (target.matches('#arrow-left')){
                currentSlide--;
            } else if(target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if (elem === target){
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length){
                currentSlide = 0;
            } else if (currentSlide < 0){
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (e) => {
            if(e.target.matches('.portfolio-btn') ||
            e.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (e) => {
            if(e.target.matches('.portfolio-btn') ||
            e.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(3000);

    };

    slider();

    //calculator

    const calculator = () => {

        const calcBlock = document.querySelector('.calc-block');
        
        calcBlock.addEventListener('input', (e) => {
            let target = e.target;

            if(target.matches('.calc-item') && !target.matches('.calc-type')){
                target.value = target.value.replace(/[^\d]/g, '');
            }

        });
    };

    calculator();

    //command

    const changePhoto = () => {

        const command = document.getElementById('command');
        let temp;

        command.addEventListener('mouseover', (e) => {
        let target = e.target;
        
        if(target.matches('img')){
            temp = target.src;
            target.src = target.dataset.img;
        }
        });

        command.addEventListener('mouseout', (e) => {
            let target = e.target;
            
            if(target.matches('img')){
                target.src = temp;
            }
        });
        
    };

    changePhoto();
});
