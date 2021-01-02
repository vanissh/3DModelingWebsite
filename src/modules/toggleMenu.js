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

export default menu;