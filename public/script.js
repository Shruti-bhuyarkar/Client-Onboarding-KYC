
var formData
function submitForm() {
   formData = {
    "Full Name": document.getElementById('fullName').value,
    "Gender": document.getElementById('gender').value,
    "DOB": document.getElementById('dob').value,
    "MaritalStatus ": document.getElementById('maritalStatus').value,
    "Number of Dependents": document.getElementById('dependents').value,
    "Nationality": document.getElementById('nationality').value,
    "Aadhaar Number": document.getElementById('adhar').value,
    "Pan Number": document.getElementById('pan').value,
    "Passport Number": document.getElementById('passport').value,
    "Voter ID": document.getElementById('voterid').value,
    "Type Of Residence": document.getElementById('residence'),
    "House/Flat/Apartment No. or Name": document.getElementById('house'),
    "Area/Location": document.getElementById('area'),
    "Country": document.getElementById('country'),
    "State": document.getElementById('state'),
    "City": document.getElementById('city'),
    "Pin Code": document.getElementById('pin'),
    "Email": document.getElementById('email'),
    "House/Flat/Apartment No. or Name": document.getElementById('houseNumber'),
    "Area/Location": document.getElementById('areaLocation'),
    "Country": document.getElementById('country'),
    "State": document.getElementById('state'),
    "City": document.getElementById('city'),
    "Pin Code": document.getElementById('pin'),
    "Email": document.getElementById('email'),
    "CountryCode": document.getElementById('CountryCode'),
    "phoneid": document.getElementById('phoneid'),
    "phone": document.getElementById('phone')
  };
  resetForm();
}

function resetForm() {
  document.getElementById('fullName').value = "";
  document.getElementById('gender').value = "";
  document.getElementById('dob').value = "";
  document.getElementById('maritalStatus').value = "";
  document.getElementById('dependents').value = "";
  document.getElementById('nationality').value = "";
  document.getElementById('adhar').value = "";
  document.getElementById('pan').value = "";
  document.getElementById('passport').value = "";
  document.getElementById('voterid').value = "";
  document.getElementById('residence').value = "";
  document.getElementById('house').value = "";
  document.getElementById('area').value = "";
  document.getElementById('country').value = "";
  document.getElementById('state').value = "";
  document.getElementById('city').value = "";
  document.getElementById('pin').value = "";
  document.getElementById('email').value = "";
  document.getElementById('houseNumber').value = "";
  document.getElementById('areaLocation').value = "";
  document.getElementById('country').value = "";
  document.getElementById('state').value = "";
  document.getElementById('city').value = "";
  document.getElementById('pin').value = "";
  document.getElementById('email').value = "";
  document.getElementById('CountryCode').value = "";
  document.getElementById('phoneid').value = "";
  document.getElementById('phone').value = "";
}




function copyPresentAddress() {
  var permanentFields = ["residenceType", "houseNumber", "areaLocation", "country", "state", "city", "pin", "email"];
  var presentFields = ["presentResidenceType", "presentHouseNumber", "presentAreaLocation", "presentLandmark", "presentState", "presentCity", "presentPin", "presentEmail"];

  var yesRadio = document.getElementById("yesRadio");
  console.log(yesRadio);
  yesRadio.addEventListener("change", function () {
    if (this.checked) {
      for (var i = 0; i < permanentFields.length; i++) {
        var permanentValue = document.getElementById(presentFields[i]).value.trim();
        console.log(permanentValue);
        document.getElementById(permanentFields[i]).value = permanentValue;
      }
    }
  });
  console.log(document.getElementById('state').selectedIndex);
}


document.addEventListener("DOMContentLoaded", function () {

  copyPresentAddress();
});


document.addEventListener('DOMContentLoaded', () => {
  const countrySelect = document.getElementById('country');
  const stateSelect = document.getElementById('state');
  const citySelect = document.getElementById('city');

  // Function to populate options in a select element
  function populateOptions(element, options) {
    element.innerHTML = "";
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.text = option;
      element.add(optionElement);
    });
  }

  // Function to update states based on the selected country
  async function updateStates() {
    const selectedCountry = countrySelect.value;
    stateSelect.disabled = true;
    citySelect.disabled = true;

    if (selectedCountry) {
      try {
        const response = await fetch(`/api/states?country=${selectedCountry}`);
        const states = await response.json();
        populateOptions(stateSelect, states);
        stateSelect.disabled = false;
        updateCities();
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    } else {
      // If no country is selected, clear both state and city
      populateOptions(stateSelect, []);
      populateOptions(citySelect, []);
    }
  }

  // Function to update cities based on the selected state
  async function updateCities() {
    const selectedState = stateSelect.value;
    citySelect.disabled = true;

    if (selectedState) {
      try {
        const response = await fetch(`/api/cities?state=${selectedState}`);
        const cities = await response.json();
        populateOptions(citySelect, cities);
        citySelect.disabled = false;
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    } else {
      // If no state is selected, clear the city
      populateOptions(citySelect, []);
    }
  }

  // Initial population of the country dropdown
  fetch('/api/countries')
    .then(response => response.json())
    .then(countries => {
      populateOptions(countrySelect, countries);
    })
    .catch(error => console.error('Error fetching countries:', error));

  // Event listeners for country and state changes
  countrySelect.addEventListener('change', updateStates);
  stateSelect.addEventListener('change', updateCities);
});


// Make a POST request to your server
fetch('/submitFormData/personalDetails', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Optionally, you can handle success in the client-side as well
  })
  .catch((error) => {
    console.error('Error:', error);
    // Optionally, you can handle errors in the client-side as well
  });

  fetch('/submitFormData/address', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Optionally, you can handle success in the client-side as well
    })
    .catch((error) => {
      console.error('Error:', error);
      // Optionally, you can handle errors in the client-side as well
    });


    fetch('/submitFormData/phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Optionally, you can handle success in the client-side as well
      })
      .catch((error) => {
        console.error('Error:', error);
        // Optionally, you can handle errors in the client-side as well
      });
  
     
fetch('/submitFormData/masterTable', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Optionally, you can handle success in the client-side as well
  })
  .catch((error) => {
    console.error('Error:', error);
    // Optionally, you can handle errors in the client-side as well
  });

  
    
      
