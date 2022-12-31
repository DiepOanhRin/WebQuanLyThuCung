"use strict";

//các DOM Element cần sử dụng
// --------------------------
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

// Hiển thị dữ liệu các thú cưng
// -----------------------------
renderTableData(petArr);

// Hàm hiển thị danh sách thú cưng
// -------------------------------
function renderTableData(petArr) {
  // Xóa nội dung hiện có của bảng
  // -----------------------------
  tableBodyEl.innerHTML = "";

  // Tạo hàng (row) chứa dữ liệu mỗi thú cưng trên bảng
  // --------------------------------------------------
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope = "row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight}</td>
    <td>${pet.length}</td>
    <td>${pet.breed}</td>
    <td>
    <i class = "bi bi-square-fill" style = "color: ${pet.color}"></i>
    </td>
    <td><i class = "bi
    ${pet.vaccinated ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
    <td><i class = "bi
    ${pet.dewormed ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
    <td><i class = "bi
    ${pet.sterilized ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
    <td>
    ${displayTime(pet.date).slice(8, 10)}
    /${displayTime(pet.date).slice(5, 7)}
    /${displayTime(pet.date).slice(0, 4)}
    </td>

    <td><button onclick = "editPet('${pet.id}')"
     type = "button" style="background-color: #ffc107; color:#000;" class = "btn btn-danger">Edit</button></td>`;

    tableBodyEl.appendChild(row);
  });
}
// Hàm hiển thị thời gian
// ----------------------
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}
// Hàm chỉnh sửa dữ liệu thú cưng
// ------------------------------
function editPet(id) {
  // Hiện form nhập dữ liệu khi nhấn vào Edit
  // ----------------------------------------
  formEl.classList.remove("hide");
  // Tìm đến dữ liệu thú cưng cần Edit
  // Chức năng:
  // ------------
  const pet = petArr.find((petItem) => petItem.id === id);

  // Hiển thị thông tin thú cưng lên form nhập
  // -----------------------------------------
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  // Để hiển thị đúng giống Dog-Cat khi người dùng tiến hành Edit
  // ------------------------------------------------------------
  renderBreed();
  // Hiển thị giống thú cưng( Dữ liệu trước lúc Edit)
  // ------------------------------------------------
  breedInput.value = `${pet.breed}`;
}
// Bắt sự kiện nhấn vào typeInput =>Sau dó hiển thị giống đúng loại Dog-Cat
// ------------------------------------------------------------------------
typeInput.addEventListener("click", renderBreed);

// Hàm hiển thị loại giống Dog-Cat
// -------------------------------
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  // Nếu type là Dog
  // ---------------
  if (typeInput.value === "Dog") {
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });

    // Nếu type là Cat
    // ---------------
  } else if (typeInput.value === "Cat") {
    const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}
// Bắt sự kiện nhấn vào nút submit
// -------------------------------
submitBtn.addEventListener("click", function () {
  // Lấy dữ liệu từ form
  // -------------------
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  // Kiểm tra dữ liệu nhập vào
  // -------------------------
  const isValidate = validate(data);

  if (isValidate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    // Vẫn giữ nguyên ngày nhập dữ liệu
    // --------------------------------
    data.date = petArr[index].date;

    // Cập nhật lại dữ liệu của thú cưng đó
    // ------------------------------------
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    // Ẩn form và hiện lại bảng dữ liệu thú cưng
    // -----------------------------------------
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});
// Validate Dữ liệu hợp lệ
// Hàm này trả về true nếu dữ liệu hợp lệ,false nếu không hợp lệ
// -------------------------------------------------------------
function validate(data) {
  let isValidate = true;
  // Nếu chuỗi là rỗng hoặc toàn khoảng trắng thì hiện thông báo alert!
  // ------------------------------------------------------------------
  if (nameInput.value.trim().length === 0) {
    alert("Please input for name!");
    isValidate = false;
  }
  // Kiểm tra trường age
  // -------------------
  if (isNaN(data.age)) {
    alert("Please input for age");
    isValidate = false;
  }

  // Kiểm tra trường weight
  // ----------------------
  if (isNaN(data.weight)) {
    alert("Please input for weight");
    isValidate = false;
  }

  // Kiểm tra trường length
  // ----------------------
  if (isNaN(data.length)) {
    alert("Please input for length");
    isValidate = false;
  }

  // Trường age chỉ nhập từ 1 đến 15
  // -------------------------------
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = fasle;
  }

  // Trường weight chỉ nhập từ 1 đến 15
  // ----------------------------------
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = fasle;
  }

  // Trường length chỉ nhập từ 1 đến 100
  // -----------------------------------
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = fasle;
  }

  // Bắt buộc phải chọn giá trị cho Breed
  // ------------------------------------
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = fasle;
  }
  return isValidate;
}
