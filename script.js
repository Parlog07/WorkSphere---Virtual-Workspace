const affichage = document.getElementById("formulaire");
const affbtn = document.getElementById("addEmployer");

affbtn.addEventListener('click', () =>{
    affichage.classList.toggle("hidden");
})
document.addEventListener('keydown', (e)=> {
    if(e.key === "Escape"){
    affichage.classList.add("hidden");
    }
})
affichage.addEventListener('click', (e)=>{
    if(e.target.id === "formulaire") affichage.classList.add("hidden");
})
// diplay the pisct on review zone
 const photoInput = document.querySelector("#employeePhotoInput");
  const photoPreview = document.querySelector("#photoPreview");
  const previewPlaceholder = document.querySelector("#previewPlaceholder");

  photoInput.addEventListener("input", () => {
    const url = photoInput.value.trim();

    if (url.length > 5) {
      photoPreview.src = url;
      photoPreview.classList.remove("hidden");
      previewPlaceholder.classList.add("hidden");
    } else {
      photoPreview.src = "";
      photoPreview.classList.add("hidden");
      previewPlaceholder.classList.remove("hidden");
    }
  });
// add experience and remove it logic
  const experienceContainer = document.querySelector("#experienceContainer");
  const addExperienceBtn = document.querySelector("#addExperienceBtn");

    addExperienceBtn.addEventListener("click", () => {
    const newBlock = createExperienceBlock();
    experienceContainer.appendChild(newBlock);
  });

  function createExperienceBlock() {
    const div = document.createElement("div");
    div.className = "p-3 border rounded-lg bg-gray-50 space-y-2";

    div.innerHTML = `
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-600">Job Title</label>
        <input type="text" class="w-full border rounded-lg p-2">

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-sm font-medium text-gray-600">Start Date</label>
            <input type="date" class="w-full border rounded-lg p-2">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600">End Date</label>
            <input type="date" class="w-full border rounded-lg p-2">
          </div>
        </div>
      </div>

      <button type="button" class="removeExpBtn mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded-lg">
        Remove Experience
      </button>
    `;

    div.querySelector(".removeExpBtn").addEventListener("click", () => {
      div.remove();
    });
    return div;
  }

  //submit for the form
const submit = document.getElementById('submitbtn');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const role = document.getElementById("role");
    const img = document.getElementById("employeePhotoInput");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");

    
    const rgxname = /[a-zA-Z\s]{8,}/ ;
    const rgxemail = /[a-zA-Z\.-_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}/
    const rgxphone = /(0|\+212)(6|7|5)[0-9]{8}/

    if(!rgxname.test(name.value)){
      name.classList.add("border-red-600")
      return;
    }else{
      name.classList.remove("border-red-600")
    }
    
    if(!rgxemail.test(email.value)){
      email.classList.add("border-red-600")
      return;
    }else{
      email.classList.remove("border-red-600")
    }

    if(!rgxphone.test(phone.value)){
      phone.classList.add("border-red-600")
      return;
    }else{
      phone.classList.remove("border-red-600")
    }
  const expBlocks = document.querySelectorAll("#experienceContainer > div");
  const experiences = [];
  
  expBlocks.forEach(block => {
      const jobTitle = block.querySelector("input[type='text']").value.trim();
      const startDate = block.querySelector("input#start-date").value;
      const endDate = block.querySelector("input#end-date").value;
       experiences.push({
          jobTitle,
          startDate,
          endDate
      });
  });
      const employee = {
      name : name.value,
      role : role.value,
      img : img.value,
      email : email.value,
      phone : phone.value,
      experiences,
  };
   const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
   storedEmployees.push(employee);
    localStorage.setItem("employees", JSON.stringify(storedEmployees));

    const dataform = document.getElementById("employeeForm");
    dataform.reset();
    affichage.classList.add("hidden");

    
});
function DisplayTheEmplyers(){
    const EmpLister = document.getElementById("displayerOfEmployers");
    let html = "";
    employees.forEach(employ =>{
        html += `
        <div class="flex w-[80%] h-16 bg-white gap-2 rounded-xl">
        <img src="${employees.img}"class ="flex justify-center items-center h-16 w-16 bg-black rounded-xl" >
        <div >
          <h6 class="font-bold">${employees.name}</h6>
          <p>${employees.role}</p>
        </div>
        </div>`
    });
    EmpLister.innerHTML = html;
}


//RGX
