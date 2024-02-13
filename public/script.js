var pdData
var addressData
var phoneData

function pd() {
  pdData = {
    "Full Name": document.getElementById('fullName').value,
    "Gender": document.getElementById('gender').value,
    "DOB": document.getElementById('dob').value,
    "MaritalStatus ": document.getElementById('maritalStatus').value,
    "Number of Dependents": document.getElementById('dependents').value,
    "Nationality": document.getElementById('nationality').value,
    "Aadhaar Number": document.getElementById('adhar').value,
    "Pan Number": document.getElementById('pan').value,
    "Passport Number": document.getElementById('passport').value,
    "Voter ID": document.getElementById('voterid').value
  }
};

function address() {
  addressData = {
    "Type Of Residence": document.getElementById('residence').value,
    "House/Flat/Apartment No. or Name": document.getElementById('house').value,
    "Area/Location": document.getElementById('area').value,
    "Country": document.getElementById('country').value,
    "State": document.getElementById('state').value,
    "City": document.getElementById('city').value,
    "Pin Code": document.getElementById('pin').value,
    "Email": document.getElementById('email').value
  }
};

function phone() {
  phoneData = {
    "CountryCode": document.getElementById('CountryCode').value,
    "phonetype": document.getElementById('phonetype').value,
    "phone1id": document.getElementById('phone1id').value,
    "phone": document.getElementById('phone').value
  }
};
function formData() {
  pd();
  address();
  phone();
};

function submitForm() {
  resetForm();
  sendData('/submitFormData/personalDetails', pdData);
  sendData('/submitFormData/address', addressData);
  sendData('/submitFormData/phone', phoneData);
  sendData('/submitFormData/masterTable', formData);
};




// function resetForm() {
// document.getElementById('fullName').value = "";
// document.getElementById('gender').value = "";
// document.getElementById('dob').value = "";
// document.getElementById('maritalStatus').value = "";
// document.getElementById('dependents').value = "";
// document.getElementById('nationality').value = "";
// document.getElementById('adhar').value = "";
// document.getElementById('pan').value = "";
// document.getElementById('passport').value = "";
// document.getElementById('voterid').value = "";
// document.getElementById('residence').value = "";
// document.getElementById('house').value = "";
// document.getElementById('area').value = "";
// document.getElementById('country').value = "";
// document.getElementById('state').value = "";
// document.getElementById('city').value = "";
// document.getElementById('pin').value = "";
// document.getElementById('email').value = "";
// document.getElementById('houseNumber').value = "";
// document.getElementById('areaLocation').value = "";
// document.getElementById('country').value = "";
// document.getElementById('state').value = "";
// document.getElementById('city').value = "";
// document.getElementById('pin').value = "";
// document.getElementById('email').value = "";
// document.getElementById('CountryCode').value = "";
// document.getElementById('phoneid').value = "";
// document.getElementById('phone').value = "";
// }
function resetForm() {
  var formElements = document.querySelectorAll('input, select');
  formElements.forEach(function (element) {
    element.value = "";
  });
}

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
  })
  .catch((error) => {
    console.error('Error:', error);
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
  })
  .catch((error) => {
    console.error('Error:', error);
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
  })
  .catch((error) => {
    console.error('Error:', error);
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
  })
  .catch((error) => {
    console.error('Error:', error);
  });




