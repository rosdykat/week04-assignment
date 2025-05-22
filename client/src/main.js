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

// - make sure your event handler fetches the server route that creates new data in the database (same route as severjs?)
// fetch ("url",{
// method: "POST",
// headers:{
// },
// body:
// });

// ! - You will be fetching your local host during development. When your project is finished and deployed, make sure you swap your local host URLS with the server deployment URL.
// Example: https://localhost:8080/staff --> development
// hhps://deployedwebsiteurl.onrender.com/staff --> production

// TODO: Create DOM elements to render user data
// - make sure you use DOM manipulation methods (createElement - .textcontent, i think)
