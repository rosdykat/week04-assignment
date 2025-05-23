console.log("Week 4 assignment");

// Selecting the form from the html form ID
const commentsForm = document.getElementById("commentsForm");

// TODO: Collect users data and send it to the server
// - add interactivity to your data collection element (addEventListener to button)

async function handleSubmitCommentsForm(event) {
  event.preventDefault(); //Preventing defaults
  console.log("Form submitted"); //Testing - confirm function runs
  const formData = new FormData(commentsForm);
  const name = formData.get("name");
  const information = formData.get("information");
  const comments = formData.get("comments"); // getting the value from the form field that matches with the attribute
  const formValues = Object.fromEntries(formData); //Convering form data into plain JS

  fetch("http://localhost:8080/comments", {
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
  const response = await fetch("http://localhost:8080/comments");
  const comments = await response.json();
  console.log(comments);
  return comments;
}

function createCommentsElements(arrayofdata) {
  arrayofdata.forEach((item) => {
    // Create the new elements
    const formName = document.createElement("h2");
    const formInformation = document.createElement("p");
    const formComments = document.createElement("p");
    const deleteButton = document.createElement("button");

    // update content values
    formName.textContent = item.name;
    formInformation.textContent = item.information;
    formComments.textContent = item.comments;
    // I've created a delete button for each item, with this i'm hoping I can create an event listener to remove the select data row from the SQL database
    deleteButton.textContent = "delete";
    deleteButton.id = "delete" + item.id;

    // Now create an event listener for the delete button?

    // deleteButton.addEventListener("click", )

    // append to DOM
    const commentSection = document.getElementById("container");
    commentSection.appendChild(formName);
    commentSection.appendChild(formInformation);
    commentSection.appendChild(formComments);
    commentSection.appendChild(deleteButton);
  });
}

async function renderData() {
  const formData = await getComments();
  console.log(formData);
  createCommentsElements(formData);
}

// const deleteComment = document.getElementById("delete");
// deleteComment.addEventListener("click", function (){
// deleteComment.id

// })

renderData();

// renderData();

// =============================== I current render the data to the page. So I think my next step is managing this, deleting it, ect.

// DELETING =====================================

// ! - You will be fetching your local host during development. When your project is finished and deployed, make sure you swap your local host URLS with the server deployment URL.
// Example: https://localhost:8080/staff --> development
// hhps://deployedwebsiteurl.onrender.com/staff --> production

// TODO: Create DOM elements to render user data
// - make sure you use DOM manipulation methods (createElement - .textcontent, i think)
