console.log("Week 4 assignment");

// Selecting the form from the html form ID
const commentsForm = document.getElementById("commentsForm");

// TODO: Collect users data and send it to the server
// - add interactivity to your data collection element (addEventListener to button)

async function handleSubmitCommentsForm(event) {
  // event.preventDefault(); //Preventing defaults, I removed this as the page needs to refresh to show the new posts. I know there is a way to make it apply without refreshing but this seemed like an easier solution for now.
  console.log("Form submitted"); //Testing - confirm function runs
  const formData = new FormData(commentsForm); // ! FormData still confuses me. Is this just grabbing all of the data in the form from the parameters (commentsForm)?
  const name = formData.get("name");
  const information = formData.get("information");
  const comments = formData.get("comments"); // getting the value from the form field that matches with the attribute
  const formValues = Object.fromEntries(formData); //Convering form data into plain JS

  fetch("https://week04-assignment-2.onrender.com/comments", {
    //Sending a request to the /comments section of my server
    method: "POST", //Sending a post request
    headers: {
      "Content-Type": "application/json", // This tells the server we're sending stringified JSON data
    },
    body: JSON.stringify(formValues), //Sending the data as a string
  });

  console.log(formValues); //testing
}

commentsForm.addEventListener("submit", handleSubmitCommentsForm); //Calling the function when the comments form is submitted.

// ========= Get comments data and display it on the page

async function getComments() {
  //fetching data
  const response = await fetch(
    "https://week04-assignment-2.onrender.com/comments"
  );
  const comments = await response.json(); //convering to json
  console.log(comments); //testing
  return comments; //returning the data to be used outside the function
}

//converting the data into elements
function createCommentsElements(arrayofdata) {
  arrayofdata.forEach((item) => {
    // ! the arrow => confuses me still, but this is creating an array for each of my the elements in my data ?? So is it an array for each formName, information, comments?
    // Create the new elements
    const formName = document.createElement("h2");
    const formInformation = document.createElement("p");
    const formComments = document.createElement("p");
    const deleteButton = document.createElement("button");
    const commentDivision = document.createElement("div");

    // update content values
    // linking the dom elements with what the stringified data says
    formName.textContent = item.name;
    formName.id = "formName";
    formInformation.textContent = item.information;
    formInformation.id = "formInformation";
    formComments.textContent = item.comments;
    formComments.id = "formComments";
    // I've created a delete button for each item, with this i'm hoping I can create an event listener to remove the select data row from the SQL database
    deleteButton.textContent = "delete";
    deleteButton.id = "delete" + item.id;
    deleteButton.classList.add("deleteButtons");
    commentDivision.id = "commentDivision";

    // ! Now create an event listener for the delete button?
    // ! deleteButton.addEventListener("click", )

    // append elements to DOM to appear on the page
    const commentSection = document.getElementById("container");
    commentDivision.appendChild(formName);
    commentDivision.appendChild(formInformation);
    commentDivision.appendChild(formComments);
    commentDivision.appendChild(deleteButton);
    commentSection.appendChild(commentDivision);
    return deleteButton;
  });
}

// ! function deleteDatabase(deleteData) {
//   deleteData.forEach((item) => {
//     const formName = document.getElementById(item.name);
//     const formInformation = document.getElementById(item.information);
//     const formComments = document.getElementById(item.comments);
//     // const deleteButton = document.getElementById(item.);
//     const commentDivision = document.getElementById(item.name);
//   });
// }

// deleteButton.addEventListener("click", deleteDatabase);

// async function to combine the use the two functions?
async function renderData() {
  const formData = await getComments();
  console.log(formData);
  createCommentsElements(formData);
}

renderData();

// const deleteComment = document.getElementById("delete");
// deleteComment.addEventListener("click", function (){
// deleteComment.id

// })

// =============================== I current render the data to the page. So I think my next step is managing this, deleting it, ect.

// DELETING =====================================

// ! - You will be fetching your local host during development. When your project is finished and deployed, make sure you swap your local host URLS with the server deployment URL.
// Example: https://localhost:8080/staff --> development
// hhps://deployedwebsiteurl.onrender.com/staff --> production

// TODO: Create DOM elements to render user data
// - make sure you use DOM manipulation methods (createElement - .textcontent, i think)
