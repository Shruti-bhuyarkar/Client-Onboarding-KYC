const saveButton = document.getElementById('saveButton');
const searchInput=document.getElementById('search-input');
const searchButton=document.getElementById('search-button');
const clearButton=document.getElementById('clear-button');
clearButton.addEventListener('click',function(e){
  e.preventDefault();
  const flag=confirm('Are you sure you want to clear the form?');
  if(flag){
  document.getElementById('fullName').value = '';
  document.getElementById('gender').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('maritalStatus').value = '';
  document.getElementById('Spouse').value = '';
  document.getElementById('dependents').value = '';
  document.getElementById('children').value = '';
  document.getElementById('father').value = '';
  document.getElementById('religion').value = '';
  document.getElementById('category').value = '';
  document.getElementById('birthplace').value = '';
  document.getElementById('nationality').value = '';
  document.getElementById('adhar').value = '';
  document.getElementById('pan').value = '';
  document.getElementById('passport').value = '';
  document.getElementById('voterid').value = '';
  }
  
});
searchButton.addEventListener('click', async function(e) {
  e.preventDefault();
  const input = searchInput.value.trim();
  
  // Check if input is an integer or a string
  const isInteger = /^\d+$/.test(input);
  console.log(isInteger);

  try {
    let res;
    if (isInteger) {
      res = await fetch(`http://localhost:3000/submitFormData/personalDetails/${input}`);
    } else {
      res = await fetch(`http://localhost:3000/submitFormData/personalDetails/byName/${input}`);
    }

    const data1 = await res.json();
    console.log(data1);

    if (data1.length === 0) {
      alert(isInteger ? `No data found for userId : ${input}` : `No data found for name : ${input}`);
    } else {
      const data = data1[0];
      saveButton.textContent = 'Save Changes';
      document.getElementById('fullName').value = data.full_name || '';
      console.log(data.full_name);
      const user_section = document.getElementById('user-section');
      user_section.style.display = "block";
      const user_id = document.getElementById('user-id');
      user_id.textContent = `${data.id}`;
      const user_name = document.getElementById('user-name');
      user_name.textContent = `${data.full_name}`;
      document.getElementById('gender').value = data.gender || '';

      // Format date if it exists
      if (data.dob) {
        const dob = new Date(data.dob);
        const formattedDOB = dob.toISOString().split('T')[0];
        document.getElementById('dob').value = formattedDOB;
      } else {
        document.getElementById('dob').value = '';
      }

      document.getElementById('maritalStatus').value = data.marital_status || '';
      document.getElementById('Spouse').value = data.spouse_name || '';
      document.getElementById('dependents').value = data.dependents || '';
      document.getElementById('children').value = data.children || '';
      document.getElementById('father').value = data.father_name || '';
      document.getElementById('religion').value = data.religion || '';
      document.getElementById('category').value = data.category || '';
      document.getElementById('birthplace').value = data.place_of_birth || '';
      document.getElementById('nationality').value = data.nationality || '';
      document.getElementById('adhar').value = data.aadhaar_number || '';
      document.getElementById('pan').value = data.pan_number || '';
      document.getElementById('passport').value = data.passport_number || '';
      document.getElementById('voterid').value = data.voter_id || '';
    }
  } catch (error) {
    console.log(error.message);
  }
});



saveButton.addEventListener('click', async function(e) {
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

  console.log(saveButton.textContent);
  if(saveButton.textContent==="Save&Next"){
    console.log("inside save and next")
    try {
      const res=await fetch('http://localhost:3000/submitFormData/personalDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
        body: personalJsonData
    });
    const data=await res.json();
    console.log(data);
    const id=data.id;
    localStorage.setItem('id', id);
    localStorage.setItem('update','false');
    alert(`Data Submitted Successfully for userId : ${id}`);
    window.location.href = "http://localhost:3000/address";
    } catch (error) {
    
      console.log(error.message);
      
    }
  }

  else if (saveButton.textContent==="Save Changes"){
    try {
      let user=searchInput.value.trim();
  
  // Check if input is an integer or a string
      const isInteger = /^\d+$/.test(user);
      
      if(!isInteger){
      const user_id = document.getElementById('user-id');
      user=user_id.textContent;
      } 
      console.log("inside upadte ",user)
      const res=await fetch(`http://localhost:3000/submitFormData/personalDetails/${user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
    },
        body: personalJsonData
    });
    const data=await res.json();
    console.log(data);
    const id=data.id;
    localStorage.setItem('id', id);
    localStorage.setItem('update', 'true');
    alert(`Data Updated Successfully for userId : ${id}`);
    
    window.location.href = "http://localhost:3000/address";
    } catch (error) {
      console.log(error.message);
      
    }
  }



});


