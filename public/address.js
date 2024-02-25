const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clear-button');
const isUpdate = localStorage.getItem('update');
const pd_id = localStorage.getItem('id');
clearButton.addEventListener('click', function(e) {
  e.preventDefault();
  const flag=confirm('Are you sure you want to clear the form?');
  if(flag){
    document.getElementById('residence').value = '';
  document.getElementById('house').value = '';
  document.getElementById('area').value = '';
  document.getElementById('country').value = '';
  document.getElementById('state').value = '';
  document.getElementById('city').value = '';
  document.getElementById('pin').value = '';
  document.getElementById('email').value = '';
  }
  
});
const helper=async ()=>{
  
  if(isUpdate==='true'){
    saveButton.textContent="Save Changes";
    // make fetch call to get data
    const id = localStorage.getItem('id');

    try {
    const res=await fetch(`http://localhost:3000/submitFormData/address/${id}`);
    const data=await res.json();
    console.log(data);
    const addressData = data[0];
    document.getElementById('residence').value = addressData.residence_type;
    document.getElementById('house').value = addressData.house_number;
    document.getElementById('area').value = addressData.area_location;
    document.getElementById('country').value = addressData.country;
    document.getElementById('state').value = addressData.state;
    document.getElementById('city').value = addressData.city;
    document.getElementById('pin').value = addressData.pincode;
    document.getElementById('email').value = addressData.email;

    } catch (error) {
      console.log(error.message);
    }
  }
}
helper();
saveButton.addEventListener('click', async function(e) {
  e.preventDefault(); 

  // Check the text content of the button
  const buttonText = saveButton.textContent.trim();

  if (buttonText ==='Save&Next' || isUpdate==='false') {
    // Run the current code
    const residence = document.getElementById('residence').value;
    const house = document.getElementById('house').value;
    const area = document.getElementById('area').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const pin = document.getElementById('pin').value;
    const email = document.getElementById('email').value;
    
    
    const addressData = {
      pd_id,
      residence,
      house,
      area,
      country,
      state,
      city,
      pin,
      email
    };

    const jsonData = JSON.stringify(addressData);

    try {
      const res = await fetch('http://localhost:3000/submitFormData/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      });

      const data = await res.json();
      alert(`Data Submitted Successfully for userId : ${pd_id}`);
      window.location.href = "http://localhost:3000/phone";
    } catch (error) {
      console.log(error.message);
    }
  } else if (buttonText === 'Save Changes' || isUpdate==='true') {
    // Make a PUT request

    // Extract ID from localStorage or wherever you stored it
    const id = localStorage.getItem('id');

    const residence = document.getElementById('residence').value;
    const house = document.getElementById('house').value;
    const area = document.getElementById('area').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const pin = document.getElementById('pin').value;
    const email = document.getElementById('email').value;
    
    const addressData = {
      pd_id,
      residence,
      house,
      area,
      country,
      state,
      city,
      pin,
      email
    };

    const jsonData = JSON.stringify(addressData);

    try {
      const res = await fetch(`http://localhost:3000/submitFormData/address/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      });

      const data = await res.json();
      console.log(data);
      alert(`Data Updated Successfully for userId : ${pd_id}`);
      window.location.href = "http://localhost:3000/phone";
    } catch (error) {
      console.log(error.message);
    }
  }
});



const API_KEY = 'MkdXNmxNSGNlb1FVT2NyMDlvc3VGeHVjV1JHVnlXWXBKRXZybkZHMw==';

function fetchData(url, callback) {
  fetch(url, {
    method: 'GET',
    headers: {
      'X-CSCAPI-KEY': API_KEY
    }
  })
  .then(response => response.json())
  .then(data => callback(data))
  .catch(error => console.log('Error fetching data:', error));
}

function updateStates() {
  const country = document.getElementById("country").value;
  const url = `https://api.countrystatecity.in/v1/countries/${country}/states`;
  fetchData(url, function(data) {
    const stateDropdown = document.getElementById("state");
    stateDropdown.innerHTML = "";
    data.forEach(state => {
      const option = document.createElement("option");
      option.text = state.name;
      option.value = state.iso2;
      stateDropdown.add(option);
    });
    updateCities();
  });
}

function updateCities() {
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const url = `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`;
  fetchData(url, function(data) {
    const cityDropdown = document.getElementById("city");
    cityDropdown.innerHTML = "";
    data.forEach(city => {
      const option = document.createElement("option");
      option.text = city.name;
      option.value = city.name;
      cityDropdown.add(option);
    });
  });
}

// Fetch countries data initially
fetchData('https://api.countrystatecity.in/v1/countries', function(data) {
  const countryDropdown = document.getElementById("country");
  data.forEach(country => {
    const option = document.createElement("option");
    option.text = country.name;
    option.value = country.iso2;
    countryDropdown.add(option);
  });
  updateStates(); // Initialize the state dropdown based on default country
});