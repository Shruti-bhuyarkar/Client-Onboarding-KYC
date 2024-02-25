const submitButton = document.getElementById('submitButtton');

submitButton.addEventListener('click', async function submitForm(e) {
  e.preventDefault();
    const full_name = document.getElementById('fullName').value;
    const gender=document.getElementById('gender').value
    const dob=document.getElementById('dob').value
    const marital_status=document.getElementById('maritalStatus').value
    const spouse_name=document.getElementById('Spouse').value
    const dependents=document.getElementById('dependents').value
    const children=document.getElementById('children').value
    const father_name=document.getElementById('father').value
    const religion=document.getElementById('religion').value
    const category=document.getElementById('category').value
    const place_of_birth=document.getElementById('birthplace').value
    const nationality=document.getElementById('nationality').value
    const aadhaar_number=document.getElementById('adhar').value
    const pan_number=document.getElementById('pan').value
    const passport_number=document.getElementById('passport').value
    const voter_id=document.getElementById('voterid').value

      const personalDetailsData = {
      full_name,
      gender,
      dob,
      marital_status,
      spouse_name,
      dependents,
      children,
      father_name,
      nationality,
      religion,
      category,
      place_of_birth,
      aadhaar_number,
      passport_number,
      pan_number,
      voter_id
  };


  const personalJsonData = JSON.stringify(personalDetailsData);
  console.log(personalJsonData);

  const country_code = document.getElementById('CountryCode').value;
  const phone_type = document.getElementById('phonetype').value;
  const phone1_id = document.getElementById('phoneid').value;
  const phone_number = document.getElementById('phone').value;
  const personal_details_id = 1;
    const phoneData = {
      personal_details_id,
      country_code,
      phone_type,
      phone1_id,
      phone_number
  };

  const phoneJsonData = JSON.stringify(phoneData);
  console.log(phoneJsonData);

  const residence = document.getElementById('residence').value;
  const house = document.getElementById('house').value;
  const area = document.getElementById('area').value;
  const country = document.getElementById('country').value;
  const state = document.getElementById('state').value;
  const city = document.getElementById('city').value;
  const pin = document.getElementById('pin').value;
  const email = document.getElementById('email').value;
  const pd_id = 1;
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

  const addressJsonData = JSON.stringify(addressData);
  console.log(addressJsonData);

});