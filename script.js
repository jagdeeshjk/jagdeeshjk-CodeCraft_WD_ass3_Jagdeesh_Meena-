document.addEventListener('DOMContentLoaded', () => {
    const token = '95cf17d43d21a4ba48aeb4af627d146d';
    const apiUrl = 'https://cors-proxy-superhero-api.onrender.com';
    const searchForm = document.getElementById('searchForm');
    const heroNameInput = document.getElementById('heroNameInput');
    const heroDetails = document.getElementById('heroDetails');
    const randomButton = document.getElementById('randomButton');
    const heroInfo = document.getElementById('heroInfo');

    // Function to fetch all superhero names
    async function fetchSuperheroNames() {
        try {
            let heroNames = [];

            // Assuming superheroes are numbered sequentially starting from 1
            for (let id = 1; id <= 731; id++) {
                const response = await axios.get(`${apiUrl}/${token}/getById/${id}?timestamp=${new Date().getTime()}`);
                const heroData = response.data;

                // Extract and store the hero's name
                heroNames.push(heroData.name);
            }

            console.log(heroNames); // Display all superhero names in console
            return heroNames;
        } catch (error) {
            console.error('Error fetching superhero names:', error);
            throw new Error('Failed to fetch superhero names.');
        }
    }

    // Event listener for the search form submission
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const heroId = heroNameInput.value.trim();

        if (heroId === '') {
            heroInfo.textContent = 'Please enter a hero Id! {1-732}';
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/${token}/getById/${heroId}?timestamp=${new Date().getTime()}`);
            const heroData = response.data;

            renderHero(heroData); // Render hero details
        } catch (error) {
            console.error('Error fetching data:', error);
            heroInfo.textContent = `Error: Plz Enter bw 1 -732 ${error.message}`;
        }
    });

    // Event listener for the randomButton click
    randomButton.addEventListener('click', async () => {
        const randomId = Math.floor(Math.random() * 731) + 1;

        try {
            const response = await axios.get(`${apiUrl}/${token}/getById/${randomId}?timestamp=${new Date().getTime()}`);
            const heroData = response.data;

            renderHero(heroData); // Render random hero details
        } catch (error) {
            console.error('Error fetching random data:', error);
            heroInfo.textContent = `Error fetching random data: ${error.message}`;
        }
    });

    // Function to render hero details
    function renderHero(heroData) {
        const { image, powerstats } = heroData;

        heroDetails.innerHTML = `
            <div class="image-container">
                <img src="${image.url}" alt="${heroData.name}">
            </div>
            <div class="stats-container">
                <h2>${heroData.name}</h2>
                <ul>
                    <li><strong>Intelligence:</strong> ${powerstats.intelligence}</li>
                    <li><strong>Strength:</strong> ${powerstats.strength}</li>
                    <li><strong>Speed:</strong> ${powerstats.speed}</li>
                    <li><strong>Durability:</strong> ${powerstats.durability}</li>
                    <li><strong>Power:</strong> ${powerstats.power}</li>
                    <li><strong>Combat:</strong> ${powerstats.combat}</li>
                </ul>
            </div>
        `;
    }
});
