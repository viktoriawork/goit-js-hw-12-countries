function fetchCountries(searchQuery) {
    const BASE_URL = 'https://restcountries.eu/rest/v2';
    return fetch(`${BASE_URL}/name/${searchQuery}`)
        .then(response => {
            return response.json();
        })
};

export default { fetchCountries };