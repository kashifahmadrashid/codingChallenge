const creatRecipeHTML = (id, recipeName, ingredientsList, course) => {
    const html = `
                <li class="card col-3" data-task-id="${id}" style="min-width: 30vw ">
                    <div class="card-body">
                        <h5 class="card-title"><b>${recipeName}</b></h5>
                        <p class="card-text">${ingredientsList}</p>
                        <div class="card-footer row">
                            <div class="col-6">
                                <p class="card-text"><b>Status: </b>${course}</p>
                            </div>
                            <div class="col-3">
                                <button class="btn btn-outline-danger deleteBtn">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </li>`;
              return html;
};
//create RecipeCard class
class RecipeCard {
    constructor(currentId = 0){
        this.recipes = [];
        this.currentId = currentId;
    }

    //create a addRecipe method 
    addRecipe (recipeName, ingredientsList, course){
        //recipeObject that will be pushed to list of recipes
        
        const recipeObject = {
            //increment the current id for each new recipe
            id: this.currentId++,
            recipeName: recipeName,
            ingredientsList: ingredientsList,
            course: course,
        };

        this.recipes.push(recipeObject);
        
        return this.recipes;
    }

    getrecipeById(recipeId){
        
        //create a variable to store the recipe found
        let foundrecipe;
        //looping over the recipes and find the recipe with the id passed as a parameter
        for (let i=0; i<this.recipes.length; i++){
            //get the current recipe in the loop
            const recipe = this.recipes[i];
            //check if it is the correct recipe by comparing the recipe id to the id passed as a parameter
            if (recipe.id === recipeId){
                //store the recipe in the foundrecipe variable
                foundrecipe = recipe;
            }
        }
        //return the foundrecipe
        return foundrecipe;
    }
    render (){
        const recipeList = [];

        // Loop over our recipes and create the html, storing it in the array
        for (let i=0; i<this.recipes.length; i++){
             // Get the current recipe in the loop
            const recipe = this.recipes[i];
            
            //create recipe html
            const recipeHtml = creatRecipeHTML(
                recipe.id,
                recipe.recipeName,
                recipe.ingredientsList,
                recipe.course
            );
            //push it to the recipeList array
            recipeList.push(recipeHtml);
        }

        // Create the recipeHtml by joining each item in the recipeList
        // with a new line in between each item.
        const recipesHtml = recipeList.join("\n");
        
        // Set the inner html of the recipeList on the page
        const recipesList = document.querySelector("#recipe-list");
        recipesList.innerHTML = recipesHtml;
    }

    save(){
        //create a JSON string of the tasks
        const recipesJson = JSON.stringify(this.recipes);

        //store the JSON string in the localstorage
        localStorage.setItem("recipes", recipesJson);
        
        //convert the currentId to a string
        const currentId = string(this.currentId);

        //store the currentId in localstorage
        localStorage.setItem("currentId", currentId);
    }

    load() {
        //check if any recipes are saved in the localstorage
        if (localStorage.getItem("recipes")){

            //get the JSON string of recipes in localStorage
            const recipesJson = localStorage.getItem("recipes");

            //convert it to an array and store it in our recipeCard
            this.recipes = JSON.parse(recipesJson)
        }

        //check if the currentId is saved in localStorage
        if (localStorage.getItem("currentId")) {
            //get the currentId string in localstorage
            const currentId = localStorage.getItem("currentId");

            //convert the currentId to a number and stoer it in our recipeCard
            this.currentId = Number(currentId);

        }
    }

    deleteRecipe(recipeId){
        //create an empty array and store it in a new variable, newRecipes

        const newRecipes = [];

        //loop over the recipes
        for(let i=0; i<this.length; i++){
            
            //Get the current recipe in the loop
            const recipe = this.recipes[i];

            //check if the recipe id is not the recipe id passed as a parameter
            if (recipe.id !== recipeId){

                //push the recipeid to the newRecipes array
                newRecipes.push(recipe);
            }
        }
        //set this.recipes to newRecipes
        this.recipes = newRecipes;
    }
}