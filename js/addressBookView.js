let addressBookDataList;

window.addEventListener('DOMContentLoaded', (event) => {
    addressBookDataList = getAddressBookDataFromStorage();
  document.querySelector('.emp-count').textContent = addressBookDataList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
});

const getAddressBookDataFromStorage = () => {
  return localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
};

const createInnerHtml = () => {
    const headerHtml = 
      ` <th>FullName</th>
        <th>Phone</th>
        <th>Address</th>
        <th>City</th>
        <th>State</th>
        <th>zipCode</th>
        <th>Actions</th>`;
  
    let innerHtml = `${headerHtml}`;
    for (const addressBookData of addressBookDataList) {
      innerHtml = `${innerHtml}
        <tr>
          <td>${addressBookData._firstname}</td>
          <td>${addressBookData._phonenumber}</td>
          <td>${addressBookData._address}</td>
          <td>${addressBookData._city}</td>
          <td>${addressBookData._state}</td>
          <td>${addressBookData._zipcode}</td>
          <td>
          <img id="${addressBookData.id}" src="../assets/icons/delete-black-18dp.svg" alt="delete" onclick="remove(this)">
          <img id="${addressBookData.id}" src="../assets/icons/create-black-18dp.svg" alt="edit" onclick="update(this)">
        </td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
  };


  const getCityHtml = (cityList) => {
    let cityHtml = '';
    for (const city of cityList) {
        cityHtml = `${cityHtml} <div class='dept-label'>${city}</div>`
    }
    return cityHtml
  };

  const getStateHtml = (stateList) => {
    let stateHtml = '';
    for (const state of stateList) {
        stateHtml = `${stateHtml} <div class='dept-label'>${state}</div>`
    }
    return stateHtml
  };

  const remove = (node) => {
    let addressBookData = addressBookDataList.find(i => i.id == node.id);
    if (!addressBookData)
      return;
  
    const index = addressBookDataList.map(i => i.id).indexOf(addressBookData.id);
    addressBookDataList.splice(index, 1);
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookDataList));
    document.querySelector(".emp-count").textContent = addressBookDataList.length;
    createInnerHtml();
  };

  const update = (node) => {
    let addressBookData = addressBookDataList.find(i => i.id == node.id);
    if (!addressBookData)
      return;
      localStorage.setItem('editEmp', JSON.stringify(addressBookData));	
      window.location.replace(site_properties.add_address_book_page);
  };