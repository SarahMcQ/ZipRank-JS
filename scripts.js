
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
        return toggleVisibility(zipcode, name); 
    }
})

$('.name-input').on('keypress', (e) => {
  if (e.key === 'Enter') {
      e.preventDefault();
      const userName = $('.name-input').val()
      currentUser.push(userName);
        return toggleVisibility(name, income); 
    }
});

$('.income-input').on('keypress', (e) => {
  const userIncome = $('.income-input').val()
  if (e.key === 'Enter') {
      e.preventDefault();
      currentUser.push(userIncome);
        return toggleVisibility(income, home); 
    }
});

$('.home-input').on('keypress', (e) => {
  const userHome = $('.home-input').val()
  if (e.key === 'Enter') {
      e.preventDefault();
      currentUser.push(userHome);
      const client = {
        zipcode:currentUser[0],
        name:currentUser[1],
        salary:currentUser[2],
        homeValue:currentUser[3]
      };

      fetch('https://api.census.gov/data/2016/acs/acs5/subject?get=NAME,S2414_C04_001E,S2419_C02_001E,S2419_C03_001E&for=state:*')
      .then(function(response) {
      return response.json();
      })
      .then(function(myJson) {
      console.log(JSON.stringify(myJson));
      });


      console.log(client);
      return toggleVisibility(home, processing); 
  }

    fetch('http://production.shippingapis.com/ShippingAPITest.dll?API=CityStateLookup%20&XML=%3CCityStateLookupRequest%20USERID=%22118NA0001121%22%3E%3CZipCode%20ID=%20%220%22%3E%20%3CZip5%3E03870%3C/Zip5%3E%3C/ZipCode%3E%3C/CityStateLookupRequest%3E') 
    .then(res => res.text())
    .then(text => console.log([text]))

  });
    



//NEXT STEPS:

//const stateAbbreviation = ((document.getElementsByClassName("text")[2].innerText)); to select state abreviation
//pull out state abbreviation from returned USPS API data
//make fetch url for zipcode dynamic
//convert stateabbreviation to full state name
// on click of "see my results" return user vs. average data
// display graphs
// add toggle to change your info and adjust results
//make mobile friendly
