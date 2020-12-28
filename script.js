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


    const calc = (price = 100) => {
    
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');
        let interval;

        if(window.performance){
            calcSquare.value = null;
            calcDay.value = null;
            calcCount.value = null;
        }
        
        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1,
                num = 0;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if(calcCount.value > 1){
                countValue += (calcCount.value - 1) / 10;
            }

            if(calcDay.value && calcDay.value < 5){
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10){
                dayValue *= 1.5;
            }

            if(typeValue && squareValue){
                total = price * typeValue * squareValue * countValue * dayValue;
                num = Math.ceil(total);
            }

        const outNum = () => {
        
            let n = 0,
                time = 100,
                step = 250;
            if(num > 25000 && num < 50000){
                step = 2000;
            } else if(num > 50000){
                step = 5000;
            }
            let t = Math.round(time/(num/step));
            if(num !== 0){
                
                interval = setInterval(()=>{
                n += step;
                if(n >= num){
                    clearInterval(interval);
                    n = num;
                }
                totalValue.innerText = n;
            }, t);
            } else {
                totalValue.textContent = 0;
                calcSquare.value = null;
                calcDay.value = null;
                calcCount.value = null;

            }
            
        };
        outNum();
            
        };

        calcBlock.addEventListener('change', (e) => {
            const target = e.target;
            clearInterval(interval);
            if(target.matches('select') || target.matches('input')){
                countSum(); 
                
            }
            if(calcType.value === ''){
                calcSquare.value = null;
                calcDay.value = null;
                calcCount.value = null;
                totalValue.innerText = 0;
            }
        });

        const verifyData = () => {

            calcBlock.addEventListener('input', (e) => {
                let target = e.target;

                if(target.matches('.calc-item') && !target.matches('.calc-type')){
                    target.value = target.value.replace(/[^\d]/g, '');
                }
            });
        };

        verifyData();
    
    };

    calc(100);

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

    //validator

    const validator = (e, id) => {

        const valid = new Validator({
            selector: id,
        });

        valid.init();
        return valid.forSubmit(e);
	};

    //send-ajax-form

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся';
        
        let form;

        const statusMessage = document.createElement('div'),
            preloader = document.createElement('section');
            preloader.innerHTML = `
                <div class='sk-three-bounce'>
                <div class='sk-bounce-1 sk-child'></div>
                <div class='sk-bounce-2 sk-child'></div>
                <div class='sk-bounce-3 sk-child'></div>
                </div>`;

        statusMessage.style.cssText = 'font-size: 2rem';
        statusMessage.style.cssText = 'color: #fff';
        

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {

                if(request.readyState !==4){
                    return;
                }

                if(request.status === 200){
                    outputData();
                } else {
                    errorData(request.status);
                }
                
            });

            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };

        document.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let target = e.target;

            if(target.matches('#form1') || target.matches('#form2') || target.matches('#form3')){
                form = target;  
            }

            if(!validator(e, form.id)){
                return;
            }

            const inputs = form.querySelectorAll('input');
            form.append(preloader);
            const formData = new FormData(form);
            let body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });

            inputs.forEach(item => {
                item.value = '';
            });
            
            postData(body, 
                () => {
                    preloader.remove();
                    form.append(statusMessage);
                    statusMessage.textContent = successMessage;
                }, 
                (error) => {
                    preloader.remove();
                    form.append(statusMessage);
                    statusMessage.textContent = errorMessage;
                    console.log(error);
            });
        });

    };

    sendForm();
});