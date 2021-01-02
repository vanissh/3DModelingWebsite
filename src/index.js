'use strict';

import countTimer from './modules/countTimer';
import menu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import changePhoto from './modules/commandPhotos';
import sendForm from './modules/sendForm';

//timer
countTimer('7 january 2021');


//menu
menu();


//popup
togglePopUp();


//tabs
tabs();


//slider
slider();


//calculator
calc(100);


//command
changePhoto();


//send-ajax-form
sendForm();