function save(event) {
    var id = document.getElementById('inputId').value;
    var lastname = document.getElementById('inputLastName').value;
    var firstname = document.getElementById('inputFirstName').value;
    var middlename = document.getElementById('inputMiddleName').value;
    var birthdate = document.getElementById('inputBirthdate').value;
    var gender = document.getElementById('inputGender').value;
    var nationality = document.getElementById('inputNationality').value;
    var civilstatus = document.getElementById('inputCivilStatus').value;
  
    var userList = JSON.parse(localStorage.getItem('userList')) || [];
    if (lastname === "" || firstname === "" || middlename === "" || birthdate === "" || gender === "" || nationality === "" || civilstatus === "") {
        alert("Please fill out the form");
        return;
      }
    if (id) {
      // Update existing user
      userList.forEach((user) => {
        if (user.id == id) {
          user.lastname = lastname;
          user.firstname = firstname;
          user.middlename = middlename;
          user.birthdate = birthdate;
          user.gender = gender;
          user.nationality = nationality;
          user.civilstatus = civilstatus;
        }
      });
      document.getElementById('inputId').value = '';
    } else {
      // Add new user
      var user = {
        id: userList.length > 0 ? userList[userList.length - 1].id + 1 : 1,
        lastname: lastname,
        firstname: firstname,
        middlename: middlename,
        birthdate: birthdate,
        gender: gender,
        nationality: nationality,
        civilstatus: civilstatus,
      };
      userList.push(user);
    }
  
    localStorage.setItem('userList', JSON.stringify(userList));
    allData();
    document.getElementById('form').reset();
  }
  
  function allData() {
    var table = document.getElementById('table');
    table.innerHTML = '';
  
    var userList = JSON.parse(localStorage.getItem('userList')) || [];
  
    userList.forEach(function (user, index) {
      table.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${user.lastname}</td>
          <td>${user.firstname}</td>
          <td>${user.middlename}</td>
          <td>${user.birthdate}</td>
          <td>${user.gender}</td>
          <td>${user.nationality}</td>
          <td>${user.civilstatus}</td>
          <td>
            <button class="btn btn-sm btn-success" onclick="find(${user.id})">
              <i class="fa fa-edit"></i>
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="removeData(${user.id})">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>`;
    });
  }
  
  function removeData(id) {
    var userList = JSON.parse(localStorage.getItem('userList')) || [];
    userList = userList.filter(function (user) {
      return user.id != id;
    });
    localStorage.setItem('userList', JSON.stringify(userList));
    allData();
  }
  
  function find(id) {
    var userList = JSON.parse(localStorage.getItem('userList')) || [];
    userList.forEach(function (user) {
      if (user.id == id) {
        document.getElementById('inputId').value = user.id;
        document.getElementById('inputLastName').value = user.lastname;
        document.getElementById('inputFirstName').value = user.firstname;
        document.getElementById('inputMiddleName').value = user.middlename;
        document.getElementById('inputBirthdate').value = user.birthdate;
        document.getElementById('inputGender').value = user.gender;
        document.getElementById('inputNationality').value = user.nationality;
        document.getElementById('inputCivilStatus').value = user.civilstatus;
      }
    });
  }
  
  allData();
  