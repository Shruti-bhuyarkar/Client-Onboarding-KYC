function submitForm() {
    var formData = {
        "Full Name": document.getElementById('fullName').value,
        "Gender": document.getElementById('gender').value,
        "DOB": document.getElementById('dob').value,
        "Marital Status": document.getElementById('maritalStatus').value,
        "Number of Dependents": document.getElementById('dependents').value,
        "Nationality": document.getElementById('nationality').value,
        "Aadhaar Number": document.getElementById('aadhaarNumber').value,
        "Pan Number": document.getElementById('panNumber').value,
        "Passport Number": document.getElementById('passportNumber').value,
        "Voter ID": document.getElementById('voterID').value
    };

    addToTable(formData);
    resetForm();  // Optionally reset the form after submission
}

function addToTable(formData) {
    var tableBody = document.getElementById('table-body');
    var newRow = document.createElement('tr');

    for (var key in formData) {
        var cell = document.createElement('td');
        cell.textContent = formData[key];
        newRow.appendChild(cell);
    }

    tableBody.appendChild(newRow);
}

function resetForm() {
    // Reset each form field as needed
    document.getElementById('fullName').value = '';
    document.getElementById('gender').value = 'male';
    document.getElementById('dob').value = '';
    document.getElementById('maritalStatus').value = 'single';
    document.getElementById('dependents').value = '';
    document.getElementById('nationality').value = 'us';
    document.getElementById('aadhaarNumber').value = '';
    document.getElementById('passportNumber').value = '';
    document.getElementById('panNumber').value = '';
    document.getElementById('voterID').value = '';
}



function copyPresentAddress() {
    var permanentFields = ["residenceType", "houseNumber", "areaLocation", "country", "state", "city", "pin", "email"];
    var presentFields = ["presentResidenceType", "presentHouseNumber", "presentAreaLocation", "presentLandmark", "presentState", "presentCity", "presentPin", "presentEmail"];

    var yesRadio = document.getElementById("yesRadio");
    console.log(yesRadio);
    yesRadio.addEventListener("change", function () {
        if (this.checked) {
            for (var i = 0; i < permanentFields.length; i++) {
                var permanentValue = document.getElementById(presentFields[i]).value.trim( );
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
  