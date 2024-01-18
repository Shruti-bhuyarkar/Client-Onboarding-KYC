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



