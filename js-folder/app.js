const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.textContent = "";
  // ?  Display show 20 phones only.
  const showAll = document.getElementById('show-All')
  if(dataLimit && phones.length > 9){
    phones = phones.slice(0, 12);
    showAll.classList.remove('d-none');
  }
  else{
    showAll.classList.add('d-none');

  }

  // ?  Display No phone Found.
  const noPhones = document.getElementById("no-phone-message");
  if (phones.length === 0) {
    noPhones.classList.remove("d-none");
  } else {
    noPhones.classList.add("d-none");
  }
  // ?  Display All Phones.
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
     <div class="card h-100 p-4">    
      <img src="${phone.image}" class="card-img-top h-75 w-75" alt="...">
      <div class="card-body">
         <h5 class="card-title">${phone.phone_name}</h5>
         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.    
         </p>
         <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Sho Details</button>
         
      </div>
     </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
//   toggle Spinner Loader
toggleSpinner(false)

};

// function
const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // searchField.value = "";
  loadPhones(searchText, dataLimit);
}
// handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
  // start loader

  processSearch(10)
});

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
  if(e.key === 'Enter'){
    // code for enter
    processSearch(10)
  }
})

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  }
  else{
     loaderSection.classList.add("d-none");
  }
};

// not the bast way to show all data
document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch()
})

const loadPhoneDetails = async id =>{
  const url =`https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url)
  const data = await res.json()
  displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
  console.log(phone)
  const modalTitle = document.getElementById('phoneDetailModalLabel')
  modalTitle.innerText = phone.name
  const phoneDetails = document.getElementById('phone-details')
  phoneDetails.innerHTML =`
  <img src="${phone.image}" alt="" class="mb-4">
  <p> Release Date : ${phone.releaseDate ? phone.releaseDate : 'No Release Date found'}</p>
  <p> Features : ${phone.mainFeatures.memory}</p>
  <p> Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage found'}
  `
}


loadPhones('apple');
