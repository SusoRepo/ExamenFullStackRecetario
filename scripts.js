document.addEventListener('DOMContentLoaded', () => {
    const recetaSelect = document.getElementById('receta-select');
    const carouselInner = document.getElementById('carousel-inner');
    const randomButton = document.getElementById('random-button');
    const enviarButton = document.getElementById('enviar-button');
    let selectedMeal = null;
    
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then(response => response.json())
        .then(data => {
            data.meals.forEach(meal => {
                const option = document.createElement('option');
                option.value = meal.strCategory;
                option.textContent = meal.strCategory;
                recetaSelect.appendChild(option);
            });
        });

    recetaSelect.addEventListener('change', async () => {
        const selectedCategory = recetaSelect.value;
        if (!selectedCategory) return;

        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
            .then(response => response.json());

        carouselInner.innerHTML = '';

        data.meals.forEach((meal, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            const img = document.createElement('img');
            img.src = meal.strMealThumb;
            img.alt = meal.strMeal;
            img.classList.add('d-block', 'w-100');

            const name = document.createElement('h5');
            name.textContent = meal.strMeal;
            name.classList.add('carousel-caption', 'd-none', 'd-md-block');

            carouselItem.appendChild(img);
            carouselItem.appendChild(name);

            carouselInner.appendChild(carouselItem);

            carouselItem.addEventListener('click', () => {
                selectedMeal = meal;
            });
        });
    });

    randomButton.addEventListener('click', async () => {
        const data = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(response => response.json());

        carouselInner.innerHTML = '';

        const meal = data.meals[0];
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item', 'active');

        const img = document.createElement('img');
        img.src = meal.strMealThumb;
        img.alt = meal.strMeal;
        img.classList.add('d-block', 'w-100'); // Clases de Bootstrap para centrar y ajustar la imagen

        const name = document.createElement('h5');
        name.textContent = meal.strMeal;
        name.classList.add('carousel-caption', 'd-none', 'd-md-block'); // Clases de Bootstrap para el texto

        carouselItem.appendChild(img);
        carouselItem.appendChild(name);
        carouselInner.appendChild(carouselItem);

        selectedMeal = meal;
    });

    enviarButton.addEventListener('click', () => {
        if (selectedMeal) {
            window.location.href = `receta.html?mealId=${selectedMeal.idMeal}`;
        } else {
            alert('Por favor, selecciona una receta primero.');
        }
    });
});
