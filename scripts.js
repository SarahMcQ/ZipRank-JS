
const zipcode = document.getElementById("zipcode");
const name = document.getElementById("name");
const income = document.getElementById("income");
const processing = document.getElementById("processing");

const currentUser = [];

const toggleVisibility = (elementToHide, elementToShow) => {
  (elementToHide.style.visibility = "hidden");      (elementToShow.style.visibility = "visible");

}

$('#zipcode').css('visibility','visible');

$('.zipcode-input').on('keyup', () => {
    const userZipcode = $('.zipcode-input').val()
    if (userZipcode.length === 5) {
      currentUser.push(userZipcode);
        return toggleVisibility(zipcode, name); //zipcode is hidden, name is visible  
    }
})

$('.name-input').on('keypress', (e) => {
  if (e.key === 'Enter') {
      e.preventDefault();
      const userName = $('.name-input').val()
      currentUser.push(userName);
        return toggleVisibility(name, income); //name is hidden, income is visible
    }
});

$('.income-input').on('keypress', (e) => {
  const userIncome = $('.income-input').val()
  if (e.key === 'Enter') {
      e.preventDefault();
      currentUser.push(userIncome);
        return toggleVisibility(income, home); //name is hidden, income is visible
    }
});

$('.home-input').on('keypress', (e) => {
  const userHome = $('.home-input').val()
  if (e.key === 'Enter') {
      e.preventDefault();
      currentUser.push(userHome);
      console.log(currentUser);
      // document.getElementById("TextOutput").innerText = currentUser; //link to html to output user info 
        return toggleVisibility(home, processing); //name is hidden, income is visible
    }
});


//NEXT STEPS:
// fix toggle button
// make API request based on current user zip
// on click of "see my results" return user vs. average data
// display graphs
// add toggle to change your info and adjust results
