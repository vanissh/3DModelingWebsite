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
    

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    };

    const validator = (e, id) => {

        const valid = new Validator({
            selector: id,
        });
    
        valid.init();
        return valid.forSubmit(e);
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


        postData(body)
            .then((response) => {
                if(response.status !== 200){
                    throw new Error('status network is not 200');
                }
                preloader.remove();
                form.append(statusMessage);
                statusMessage.textContent = successMessage;
                setTimeout(() => {
                    statusMessage.remove();
                    if(form.closest('div.popup')){
                        form.closest('div.popup').style.display = 'none';
                    }
                }, 3000);
            })
            .catch((error) => {
                preloader.remove();
                form.append(statusMessage);
                statusMessage.textContent = errorMessage;
                setTimeout(() => {
                    statusMessage.remove();
                    if(statusMessage.closest('#form3')){
                        form.closest('div.popup').style.display = 'none';
                    }
                }, 3000);
            });
    });

};

export default sendForm;