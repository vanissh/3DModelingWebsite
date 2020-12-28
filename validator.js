'use strict';

class Validator{
    constructor({selector}){
        this.form =  document.querySelector('#' + selector);
        this.pattern = {};
        this.method = {
            [`${selector}-phone`]: [
                ['notEmpty'],
                ['pattern', 'phone']
            ],
            [`${selector}-name`]: [
                ['notEmpty'],
                ['pattern', 'name']
            ],
            [`${selector}-message`]: [
                ['notEmpty'],
                ['pattern', 'message']
            ],
            [`${selector}-email`]: [
                ['notEmpty'],
                ['pattern', 'email']
            ],
        };
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button';
        });
        this.error = new Set();
    }

    init(){
        this.applyStyle();
        this.setPattern();

        this.elementsForm.forEach(elem => elem.addEventListener('change',
            this.checkIt.bind(this)));
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.checkIt({target: elem}));
            if(this.error.size){
                e.preventDefault();
            }
        });
    }

//     forSubmit(e){
//         this.elementsForm.forEach(elem => this.checkIt({target: elem}));
//             if(this.error.size){
//                 return false;
//     } else {
//         return true;
//     }
// }

    isValid(elem){
        const validatorMethod = {
            notEmpty(elem){
                if (elem.value.trim() === ''){
                    return false;
                }
                return true;
            },
            pattern(elem, pattern){
                return pattern.test(elem.value);
            }
        };
        if(this.method){
            const method = this.method[elem.id];

            if(method){
                return method.every(item =>
                    validatorMethod[item[0]](elem, 
                        this.pattern[item[1]]));
            }
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
        }
        
        return true;
    }

    checkIt(event){
        const target = event.target;
        if(this.isValid(target)){
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }

    showError(elem){
        elem.classList.remove('success'); 
        elem.classList.add('error');
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem){
        elem.classList.remove('error'); 
        elem.classList.add('success');
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            elem.nextElementSibling.remove();
        }
    }

    applyStyle(){
        const style = document.createElement('style');
        style.textContent = `
            input.error {
                box-shadow: 0 0 0 2px rgb(161, 33, 50);
            }
            input.success{
                box-shadow: 0 0 0 2px green;
            }
            .validator-error {
                font-size: 14px;
                color: white;
            }
        `;
        document.head.append(style);
    }

    setPattern(){

        if(!this.pattern.phone){
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }

        if(!this.pattern.name){
            this.pattern.name = /^[А-яё\ ]{2,}$/i;
        }

        if(!this.pattern.message){
            this.pattern.message = /^[\s\а-яё\d?!.,:]+$/i;
        }

        if(!this.pattern.email){
            this.pattern.email = /^\w+@\w+\.\w{2,}$/i;
        }
    }
    

}

