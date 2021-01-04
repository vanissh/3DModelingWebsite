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
        }
        
    };
    outNum();
        
    };

    calcBlock.addEventListener('change', (e) => {
        const target = e.target;
        clearInterval(interval);
        if(target.matches('select').value !== null|| target.matches('input')){
            countSum();  
        } 
        
        if(calcSquare.value === '' && target.matches('input.calc-square') || 
                calcType.value === '' && target.matches('select')){

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

export default calc;