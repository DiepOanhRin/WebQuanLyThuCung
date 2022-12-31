"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const findBtn = document.getElementById("find-btn");
const formEl = document.getElementById("container-form");
// Hiển thị  toàn  bộ  thú  cưng
// ------------------------------
renderTableData(petArr);

// Bắt sự kiện vào nút 'Find'. Tìm kiếm các thú cưng theo các đkien và hiển thị thông tin các thú cưng
// ---------------------------------------------------------------------------------------------------
findBtn.addEventListener("click", function () {
  // Nếu người dùng k nhập điều kiện mà bấm Find thì hiển thị toàn bộ thú cưng theo măc định.coi như k có đk ràng buộc.
  // Nếu người dùng nhập nhiều trường dữ liệu để tìm kiếm thì toán tử AND đc sử dụng để đưa ra kết quả
  // -------------------------------------------------------------------------------------------------
  let petArrFind = petArr;
  // Nếu nhập vào ID thì tìm theo ID
  // -------------------------------
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }
  // Nếu nhâp vào name thì tìm theo name
  // -----------------------------------
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  //   Nếu chọn'type' thì tìm kiếm theo 'type'
  // ----------------------------------------
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }
  // Nếu chọn 'Breed' thì tìm kiếm theo 'Breed'
  // -----------------------------------------
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }
  //   Nếu tích chọn 'vaccinated' thì ràng buộc thêm điều kiện 'vaccinated'
  // ---------------------------------------------------------------------
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  // Nếu tích chọn 'dewormed' thì ràng buộc thêm điều kiện 'dewormed'
  // ---------------------------------------------------------------
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  // Nếu tích chọn 'Sterilized' thì ràng buộc thêm điều kiện 'Sterilized'
  // -------------------------------------------------------------------
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }
  // Hiển thị thú cưng thoả mãn điều kiện
  // ------------------------------------
  renderTableData(petArrFind);
  deleteForm(); //Gọi hàm xoá dữ liệu xoá form
});

// Hàm xóa các dữ liệu vừa nhập trên Form
// --------------------------------------
function deleteForm() {
  idInput.value = "";
  nameInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Hàm hiển thị danh sách thú cưng
// -------------------------------
function renderTableData(petArr) {
  // Xoá nội dung hiện có của bảng
  // -----------------------------
  tableBodyEl.innerHTML = "";
  // Với mỗi thú cưng có trong danh sách petArr--> tạo ra 1 hàng chứa dữ liệu
  // ------------------------------------------------------------------------
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope = "row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight} kg</td>
    <td>${pet.length} cm</td>
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
    </td>`;
    tableBodyEl.appendChild(row);
  });
}
// Hàm hiển thị thời gian
// ----------------------
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}
// Hiển thị các giống trong 'Breed'
// -------------------------------
renderBreed();
// Hàm hiển thị các giống trong 'Breed' (Không phân biệt là Dog hay Cat)
// ---------------------------------------------------------------------
function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
