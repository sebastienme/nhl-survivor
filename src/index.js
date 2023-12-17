import './style.css';
import _ from 'lodash';
import './dom.js';
import { dataMethods } from './data.js';
import './table.js';
import { buildDom } from './dom.js';

//initialise teams list
dataMethods.initialiseTeamsList();

//---initiation of loader
(() => {
    document.addEventListener("DOMContentLoaded", function () {
        // Hide loader after 1 seconds
        setTimeout(function () {
            buildDom.fadeOutLoader();
        }, 1250); // Adjust the time as needed
    });
})();

//---when animation of loader ends, display none the loader
(() => {
    const logo = document.querySelector('.bounceAndShrink'); // Replace with your actual class or element reference
    logo.addEventListener('animationend', function (event) {
        if (event.animationName === 'bounceAndShrink') {
            logo.style.display = 'none';
        }
    });
})();
