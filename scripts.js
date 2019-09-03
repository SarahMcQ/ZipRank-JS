const zipcode = document.getElementById("zipcode");
const name = document.getElementById("name");
const income = document.getElementById("income");
const processing = document.getElementById("processing");

const currentUser = [];
const medianIncome = [];


const toggleVisibility = (elementToHide, elementToShow) => {
  (elementToHide.style.visibility = "hidden");
  (elementToShow.style.visibility = "visible");

}

$('#zipcode').css('visibility', 'visible');

function validateZipcode(zip){
$('.zipcode-input').on('keyup', () => {
  const userZipcode = $('.zipcode-input').val()
  if (userZipcode.length === 5) {
    const USPSdata = [];
    fetch(`http://production.shippingapis.com/ShippingAPITest.dll?API=CityStateLookup%20&XML=%3CCityStateLookupRequest%20USERID=%22118NA0001121%22%3E%3CZipCode%20ID=%20%220%22%3E%20%3CZip5%3E${userZipcode}%3C/Zip5%3E%3C/ZipCode%3E%3C/CityStateLookupRequest%3E`)
      .then(res => res.text())
      .then(text => USPSdata.push(((text))))
      .then(text => USPSdata.push(USPSdata.toString().includes('Error'))) //see if zipcode is valid
      .then(text => {
        if (USPSdata[1] == true) {
          console.log('Invalid zipcode try again!');
          $(".zipcode-input").addClass('invalid');
          $(".zipcode-input").on('keypress', () => {
            window.location.reload()});
          // $("#try-again").css('visibility', 'visible');
          validateZipcode();
        } else {
          console.log('Your zipcode is valid!')
          currentUser.push(userZipcode);
          return toggleVisibility(zipcode, name);
        }
      });

  }

})};

validateZipcode();

//Button to try again
// $('#try-again').on('click', () => {
//   window.location.reload();
// });

// $('.zipcode-input').on('keyup', () => {
//   const userZipcode = $('.zipcode-input').val()
//   if (userZipcode.length === 5) {
//     currentUser.push(userZipcode);
//       return toggleVisibility(zipcode, name); //zipcode is hidden, name is visible  
//   }
// })


// console.log((USPSdata.toString()).includes('Error'));


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

    //reset to play again
    $('#play-again').on('click', () => {
      window.location.reload()});
   

    console.log(currentUser);
    const client = {
      zipcode: currentUser[0],
      name: currentUser[1],
      salary: currentUser[2],
      homeValue: currentUser[3]
    };

    const zip = (client.zipcode);



    // const alertUser = (name) => {
    //   alert(`Hey ${name} want to see where you rank in your zipcode?`)
    // } //popup
    // alertUser(client.name);

    // fetch('https://api.census.gov/data/2016/acs/acs5/subject?get=NAME,S2414_C04_001E,S2419_C02_001E,S2419_C03_001E&for=state:*')
    $('#results').on('click', () => {
      document.getElementById("clientName").innerHTML = client.name;
      fetch('https://api.census.gov/data/2017/acs/acs5/profile?get=DP03_0062E,NAME&for=zip%20code%20tabulation%20area:*')
      .then(function (response) {
        return response.json();
      })
      .then(function (parsedResponse) {
        const censusIncome = (parsedResponse); 
        console.log('zip', zip);
        // console.log('typeof CI', typeof censusIncome) 
        console.log(censusIncome);
      
      
      function numberWithCommas(x) {   //add commas to result
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };

      function isItemInArray(array, zip) {
          for (let i = 0; i < array.length; i++) {
              // This if statement depends on the format of your array
              if (array[i][2] === zip) {
                
                  document.getElementById("showResults").innerHTML = ("$" + numberWithCommas(array[i][0]));   // Found it
                  document.getElementById("percentile").innerHTML = (Math.floor(((client.salary)/(array[i][0]))*100) + "%");
                  // document.getElementById("percentile").innerHTML = ((client.salary)/ (array[i][0])) * 100;
                  console.log(array[i]);
              }else {
                    
              }
          }   
      };
      isItemInArray(censusIncome, zip);
      });
     
  });


    console.log(client); //console log client specific data
    return toggleVisibility(home, results);

  }

  fetch('http://production.shippingapis.com/ShippingAPITest.dll?API=CityStateLookup%20&XML=%3CCityStateLookupRequest%20USERID=%22118NA0001121%22%3E%3CZipCode%20ID=%20%220%22%3E%20%3CZip5%3E03870%3C/Zip5%3E%3C/ZipCode%3E%3C/CityStateLookupRequest%3E')
    .then(res => res.text())
    .then(text => console.log([text])) //console log zipcode to state lookup

    

});








//NEXT STEPS & NOTES:

//const stateAbbreviation = ((document.getElementsByClassName("text")[2].innerText)); to select state abreviation from USPS API page
//pull out state abbreviation from returned USPS API data
//make fetch url for zipcode dynamic
//convert stateabbreviation to full state name
// on click of "see my results" return user vs. average data
// display graphs
// add toggle to change your info and adjust results
//make mobile friendly