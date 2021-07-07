import './sass/main.scss';
const debounce = require('lodash.debounce');
import { error, alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import API from './fetchCountries.js';
import coutriesNameList from './partials/countryName.hbs';
import markupCountryCard from './partials/countryCard.hbs';

const refs = {
    inputCountry: document.querySelector('.inputCountry'),
    cardContainer: document.querySelector('.cardContainer')
};

refs.inputCountry.addEventListener('input', debounce(onInputCountryName, 500));

function onInputCountryName(event) {
    const searchQuery = event.target.value;

    API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(error => console.log(error));
};

function renderCountryCard(countries) {

    if (countries.length === 1) {
        const countryCardHTML = markupCountryCard(countries[0]);
        addMarkup(countryCardHTML);
    } else if (countries.length >= 2 && countries.length <= 10) {
        const nameList = coutriesNameList(countries);
        addMarkup(nameList);
    } else if (countries.length > 10) {
        alert({
            text: 'Too many matches found. Please enter a more specific query',
            delay: 5000,
        });
    } else {
        error({
            text: 'Invalid name',
            delay: 5000,
        });
    }
}

function addMarkup(element) {
    refs.cardContainer.innerHTML = element;
};



