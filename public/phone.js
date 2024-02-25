
const submitButton = document.getElementById('submit-button');
console.log(submitButton);
const isUpdate = localStorage.getItem('update');
const personal_details_id = localStorage.getItem('id');
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', function(e) {
  e.preventDefault();
  const flag=confirm('Are you sure you want to clear the form?');
  if(flag){
    document.getElementById('CountryCode').value = '';
    document.getElementById('phonetype').value = '';
    document.getElementById('phoneid').value = '';
    document.getElementById('phone').value = '';
  }
 
});



window.addEventListener('DOMContentLoaded', async () => {
  const helper = async () => {
    if (isUpdate === 'true') {
      submitButton.textContent = "Save Changes";
      
      try {
        const res = await fetch(`http://localhost:3000/submitFormData/phone/${personal_details_id}`);
        const data = await res.json();
        console.log(data);
        const phoneData = data[0];
        document.getElementById('CountryCode').value = phoneData.country_code;
        document.getElementById('phonetype').value = phoneData.phone_type;
        document.getElementById('phoneid').value = phoneData.phone1_id;
        document.getElementById('phone').value = phoneData.phone_number;
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  await helper();
});
submitButton.addEventListener('click', async function submitForm(e) {
  e.preventDefault();

  // Check the text content of the button
  const buttonText = submitButton.textContent.trim();

  if (buttonText === 'Submit' || isUpdate === 'false') {
    // Run the current code for POST request
    const country_code = document.getElementById('CountryCode').value;
    const phone_type = document.getElementById('phonetype').value;
    const phone1_id = document.getElementById('phoneid').value;
    const phone_number = document.getElementById('phone').value;
  
    const phoneData = {
      personal_details_id,
      country_code,
      phone_type,
      phone1_id,
      phone_number
    };

    const phoneJsonData = JSON.stringify(phoneData);
    console.log(phoneJsonData);

    try {
      const res = await fetch('http://localhost:3000/submitFormData/phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: phoneJsonData
      });

      const data = await res.json();
      console.log(data);
      alert(`Data Submitted Successfully for userId : ${personal_details_id}`);
      localStorage.removeItem('id');
      localStorage.removeItem('update');
      window.location.href = "http://localhost:3000/personal";
    } catch (error) {
      console.log(error.message);
    }
  } else if (buttonText === 'Save Changes' || isUpdate === 'true') {
    // Make a PUT request
    // Extract ID from localStorage or wherever you stored it
    

    // Extract updated phone details
    const country_code = document.getElementById('CountryCode').value;
    const phone_type = document.getElementById('phonetype').value;
    const phone1_id = document.getElementById('phoneid').value;
    const phone_number = document.getElementById('phone').value;

    const phoneData = {
      personal_details_id,
      country_code,
      phone_type,
      phone1_id,
      phone_number
    };

    const phoneJsonData = JSON.stringify(phoneData);
    console.log(phoneJsonData);

    try {
      const res = await fetch(`http://localhost:3000/submitFormData/phone/${personal_details_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: phoneJsonData
      });

      const data = await res.json();
      console.log(data);
      alert(`Data Updated Successfully for userId : ${personal_details_id}`);
      localStorage.removeItem('id');
      localStorage.removeItem('update');
      window.location.href = "http://localhost:3000/personal";
    } catch (error) {
      console.log(error.message);
    }
  }
});
