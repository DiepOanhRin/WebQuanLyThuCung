"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnImport = $("#import-btn");
const btnExport = $("#export-btn");
let petArr = getFromStorage("petArr");

// Bắt sự kiện nhấn vào nút 'Export'
// --------------------------------
btnExport.addEventListener("click", function () {
  const isExport = confirm("Are you sure Export?");
  if (isExport) {
    saveStaticDataToFile();
  }
});
// Hàm lưu dữ liệu xuống file
// --------------------------
function saveStaticDataToFile() {
  // Tạo dữ liệu để lưu xuống file
  // -----------------------------
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  // File Save
  // ---------
  saveAs(blob, "petData.json");
  //Dùng thư viện FileSaver.js đc tải về theo hướng dẫn.
}

function importFile(e) {
  const file = $("#input-file");
  // e.preventDefault();
  // nếu không có file thì ko làm gì cả
  // ----------------------------------
  if (!file.value.length) return;

  // tạo một reader object để đọc file
  const reader = new FileReader();

  // xử lý khi đọc xong file
  reader.onload = function (i) {
    petArr = i.target.result;
    saveToStorage("petArr", petArr);
    console.log(petArr);
  };
  reader.readAsText(file.files[0]);
}

// Bắt sự kiện nhấn vào nút 'Import'
// --------------------------------
btnImport.addEventListener("click", function () {
  importFile();
});
