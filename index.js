document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const dateNow = {
        weekDay : ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayPart : ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Доброй ночи'],
    };
    let idInterval;

    function getDate (){

        const date = new Date();
        let deadline = new Date (2021, 0, 1).getTime();
        

        let weekDay = date.getDay();
        dateNow.weekDay.forEach((item, index) => {
            if(index === weekDay){
                weekDay = item;
            }
        });

        let dayPart;
        let hours = date.getHours();
        let localTime = date.toLocaleTimeString('en');

        for(let i = 0; i < dateNow.dayPart.length; i++){
            if(hours > 4 && hours <= 12){
                dayPart = dateNow.dayPart[0];
            } else if (hours > 12 && hours <= 16){
                dayPart = dateNow.dayPart[1];
            } else if (hours > 16 && hours <= 23){
                dayPart = dateNow.dayPart[2];
            } else {
                dayPart = dateNow.dayPart[3];
            }
        }

        let timeRemain =  Math.floor((deadline - date.getTime()) / 86400000);
        if(timeRemain <= 0){
            clearInterval(idInterval);
        }

        function dayDecline (a){

            if (a % 10 === 1 && a !== 11){
                return `остался ${timeRemain} день`;
            } else if (a % 10 >= 2 && a % 10 <= 4 && (a < 5 || a > 20)){
                return `осталось ${timeRemain} дня`;
            } else {
                return `осталось ${timeRemain} дней`;
            }
        }

        document.body.innerHTML = `<h1>${dayPart}</h1>
        <h1> Сегодня: ${weekDay} </h1>
        <h1> Текущее время: ${localTime} </h1>
        <h1> До нового года ${dayDecline(timeRemain)} </h1>`;

    }
    idInterval = setInterval(getDate, 1000);
});