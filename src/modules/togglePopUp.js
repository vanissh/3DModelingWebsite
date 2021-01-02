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

    export default togglePopUp;