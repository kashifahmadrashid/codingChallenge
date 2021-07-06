//initialize a new recipeCard with currentId set to 0
const recipeCard = new RecipeCard(0);

//load the recipe card from localstorage
recipeCard.load();
//render the loaded card to the page
recipeCard.render();


let recipeName = document.querySelector("#recipeName");
let ingredientsList = document.querySelector("#ingredientsList");
let course = document.querySelector("#course");
let errMsg1 = document.querySelector("errMsg1");
let errMsg2 = document.querySelector("#errMsg2");
let errMsg3 = document.querySelector("#errMsg3");
let saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", formValidation);

function formValidation(event) {
    
    var allPassed = true;
    if (recipeName.value.trim() == "") {
        errMsg1.innerHTML = "Please add a Recipe Name";
        errMsg1.style.color = 'red';
        recipeName.style.borderColor = 'red';
        recipeName.focus();
        allPassed = false;
        
    }else {
        errMsg1.innerHTML = "OK";
        errMsg1.style.color = "green";
        recipeName.style.borderColor = "green";
    }
    if (ingredientsList.value.trim() == ""){
        errMsg2.innerHTML = "Please add ingredients";
        errMsg2.style.color = "red";
        ingredientsList.style.borderColor="red";
        ingredientsList.focus();
        allPassed = false;
    }else{
        errMsg2.innerHTML = "OK";
        errMsg2.style.color = "green";
        ingredientsList.style.borderColor = "green";
    }
    if (course.value.trim() == "" || course.value == "Choose"){
        errMsg3.innerHTML = "Please select a course";
        errMsg3.style.color = "red";
        errMsg3.style.borderColor = "red";
        course.foucs();
        allPassed = false;
      
    }else{
        errMsg3.innerHTML = "OK";
        errMsg3.style.color = "green";
        course.style.borderColor = "green";
    }

    if (allPassed){
        recipeCard.addRecipe(
					recipeName.value,
					ingredientsList.value,
					course.value
				);
        recipeName.value = "";
        ingredientsList.value = "";
        course.value = "";
        errMsg1.innerHTML = "";
        errMsg2.innerHTML = "";
        errMsg3.innerHTML = "";
        recipeName.style.borderColor = "grey";
        ingredientsList.style.borderColor = "grey";
        course.value.borderColor = "grey";
    }

    const recipeHtml = createRecipeHTML(
        recipeName.value,
        ingredientsList.value,
        course.value
    );
    console.log(recipeHtml);

    recipeCard.save();
    recipeCard.render();
       
event.preventDefault(); 
}

const recipeList = document.querySelector("#recipe-List");
//Add onclick event listener to the recipe list

recipeList.addEventListener("click", (event) =>{
    if(event.target.classList.contains("deleteBtn")){
        //get the parent recipe
        const parentRecipe = event.target.parentElement.parentElement.parentElement;

        //get the recipeid of the parent recipe

        const recipeId = Number(parentRecipe.dataset.recipeId);

        //delete recipe card
       
        recipeCard.deleteRecipe(recipeId);

        //save the recipes to local storage

        recipeCard.save();

        //render the tasks
        recipeCard.render();
    }
});
