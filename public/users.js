const fetchUsers = async () => {
    try {
        const res = await fetch('http://localhost:3000/submitFormData/personalDetails');
        const data = await res.json();
        renderUserList(data);
    } catch (error) {
        console.log(error.message);
    }
}

const renderUserList = (users) => {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear previous user list
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.full_name}</td>
            <td>${user.gender}</td>
            <td>${user.dob}</td>
            <td>${user.marital_status}</td>
            <td><button class="editButton" data-id="${user.id}">Edit</button></td>
        `;
        userList.appendChild(row);
    });
    addEditButtonListeners();
}

const addEditButtonListeners = () => {
    const editButtons = document.querySelectorAll('.editButton');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userId = button.getAttribute('data-id');
            console.log(`Editing user with ID: ${userId}`);
            window.location.href = `/personal/${userId}`; 
        });
    });
}

const searchUser = () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    const userTable = document.getElementById('userTable');
    const rows = userTable.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const userId = row.cells[0].textContent;
        if (searchInput === '' || userId === searchInput) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

fetchUsers();
