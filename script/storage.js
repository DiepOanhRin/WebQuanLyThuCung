"use strict";
// 1. Bổ sung Animation cho Sidebar
// Thêm Animation khi click vào Sidebar
// ------------------------------------
const navEl = document.getElementById("sidebar");
// Bắt sự kiện click vào
// ---------------------
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

// Dữ liệu data cho sẵn để test mà không cần nhập
// ----------------------------------------------
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "#000",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "#000",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(),
};
const data3 = {
  id: "P003",
  name: "MiuMiu",
  age: 2,
  type: "Cat",
  weight: 3,
  length: 45,
  color: "Brown",
  breed: "Terrier",
  vaccinated: true,
  sterilized: true,
  dewormed: true,
  date: new Date(),
};

const data4 = {
  id: "P004",
  name: "Lulu",
  age: 4,
  type: "Dog",
  weight: 6,
  length: 70,
  color: "black",
  breed: "Persian",
  vaccinated: true,
  sterilized: true,
  dewormed: true,
  date: new Date(),
};

// Dữ liệu breed cho sẵn để test mà không cần nhập
// -----------------------------------------------
const breed1 = {
  breed: "Mixed Breed",
  type: "Dog",
};
const breed2 = {
  breed: "Tabby",
  type: "Cat",
};
const breed3 = {
  breed: "Chó Ngao",
  type: "Dog",
};
const breed4 = {
  breed: "Mèo Đen",
  type: "Cat",
};
// Lấy dữ liệu petArr
// ------------------
if (!getFromStorage("petArr")) {
  // Gán dữ liệu để test
  // -------------------
  saveToStorage("petArr", [data1, data2, data3, data4]);
}
const petArr = getFromStorage("petArr");

// Lấy dữ liệu breedArr
// --------------------
if (!getFromStorage("breedArr")) {
  //Gán dữ liệu để test
  // ------------------
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
}
const breedArr = getFromStorage("breedArr");
// 2. Lưu dữ liệu dưới LocalStorage
// Hàm lấy dữ liệu
// ---------------
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dữ liệu
// ---------------
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
