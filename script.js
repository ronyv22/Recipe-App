/*Build a recipe app*/


/*
Step 1: Greate an html document with a button to allow user to randomly generate a new recipe and update content on page.
Step 2: Style html page and contents with css.
Step 3: In JavaScript, define a function that allows user to generate new recipe content from an API endpoint when clicking on button.
*/

/*

JavaScript

First, on lines 40 and 41, I declared variables that the selected html elements from the DOM will be assigned by their Id. One displaying the recipe
details from the API endpoint that the user will see and the other that lets the user to trigger the button generate a new random recipe.

Next, on line 43, I add an Eventlistener to call the fetchRandomRecipe function when the DOM content loads.

After that, I added another EventListener to the newRecipeButton that will call the fetchRandomRecipe function when clicked on line 47. 

On line 50, I defined a function that will use Axios to make a request from the TheMealDB API to display the random recipe on the UI
for the user to see.

I defined another function with the recipe object as a parameter. To generate the recipe content as HTML content on the UI, I assigned an HTML template
to the recipeHTML variable to generate the HTML content to display on the page. I also used string interpolation for the values of the random recipe's name, an image of the meal, 
instuctions, list of ingredients and a button to watch the youtube video on line 60. 

To get the ingredients and measurements from the object, I defined a function with the recipe object as the parameter. Declared a variable and assigned an empty array to put ingredients in.
I then used a for loop to interate over the properties of the recipe object, checking for property names with conditional statements and returns the ingredients array if met on line 80.

Finally, on line 90, I defined another function that will open a YouTube video link of the recipe in a new browser window when called.



*/




const recipeContainer = document.getElementById('recipeContainer');
const newRecipeButton = document.getElementById('newRecipeButton');

document.addEventListener('DOMContentLoaded', () => {
    fetchRandomRecipe(); 
});

newRecipeButton.addEventListener('click', fetchRandomRecipe);


function fetchRandomRecipe() {
	axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
		.then (response => {
			const randomRecipe = response.data.meals[0];
			displayRecipe(randomRecipe);
		})
	
}


function displayRecipe(recipe) {
	const recipeHTML = `
		<div class="recipe">
			<h2>${recipe.strMeal}</h2>
			<img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
			<h3>Ingredients</h3>
			<ul>
				${getIngredients(recipe).map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<h3>Instuctions</h3>
			<p>${recipe.strInstructions}</p>
			<button onclick="watchVideo('${recipe.strYoutube}')">Watch Video</button>
		</div>
	`;

recipeContainer.innerHTML = recipeHTML;
}



function getIngredients(recipe) {
	const ingredients = [];
	for(let i = 1; i <= 20; i++) {
		const ingredient = recipe[`strIngredient${i}`];
		const measure = recipe[`strMeasure${i}`];
		if (ingredient && measure) {
			ingredients.push(`${ingredient} - ${measure}`);
		} else if (ingredient) {
			ingredients.push(ingredient);
		}
	}
	return ingredients;
}


function watchVideo(youtubeLink) {
	window.open(youtubeLink, '_blank');
}