const affichage = document.getElementById("formulaire");
const affbtn = document.getElementById("addEmployer");

const zoneRules = {
    "Conference Room": ["Manager", "Receptionist", "IT Technician", "Security Officer", "Cleaning", "Other"],
    "Reception": ["Receptionist"],
    "Server Room": ["IT Technician"],
    "Security Room": ["Security Officer"],
    "Staff Room": ["Manager", "Receptionist", "IT Technician", "Security Officer", "Cleaning", "Other"],
    "Archives Room": ["Manager", "Receptionist", "IT Technician", "Security Officer", "Other"]
};


DisplayTheEmplyers();
displayEmployeesInZones();


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
        <input type="text" class="jobTitle w-full border rounded-lg p-2">
                <label class="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
                <input type="text" class="companyName w-full border rounded-lg p-2 mb-2">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-sm font-medium text-gray-600">Start Date</label>
            <input type="date" class="start-date w-full border rounded-lg p-2">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600">End Date</label>
            <input type="date" class="end-date w-full border rounded-lg p-2">
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

    for (const block of expBlocks) {
        const jobTitle = block.querySelector(".jobTitle").value.trim();
        const Company = block.querySelector(".companyName").value.trim();
        const startDate = block.querySelector(".start-date").value;
        const endDate = block.querySelector(".end-date").value;

        if (!startDate || !endDate) {
            alert("Please fill both start and end dates.");
            return;
        }

        if (new Date(startDate) >= new Date(endDate)) {
            alert("Start date must be earlier than end date.");
            return;
        }

        experiences.push({ jobTitle, Company, startDate, endDate });
    }
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
    DisplayTheEmplyers();
    
});

// here is the part to diplay the employerws on the list zone
function DisplayTheEmplyers() {
    const EmpLister = document.getElementById("displayerOfEmployers");
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    // Update counter
    const counter = document.querySelector("h2 span");
    counter.textContent = employees.length;

    let html = "";

    employees.forEach((employ, index) => {
        html += `
        <div onclick="openProfile(${index})"
        class="cursor-pointer flex w-[80%] h-16 bg-white gap-2 rounded-xl items-center p-2 hover:bg-gray-200 duration-200">
          <img src="${employ.img || 'https://imgs.search.brave.com/mx4FHmRkf-poBv6wFCvrny2b1Dptn5BeKBwcUjdtcds/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjQv/NTE0LzU0MS9zbWFs/bC8zZC1pY29uLW9m/LW1lbi1wcm9maWxl/LXBlb3BsZS1mcmVl/LXBuZy5wbmc'}"
               class="h-14 w-14 bg-gray-300 rounded-xl object-cover">
          <div>
            <h6 class="font-bold">${employ.name}</h6>
            <p class="text-sm text-gray-600">${employ.role}</p>
          </div>
        </div>
        `;
    });

    EmpLister.innerHTML = html;
}
//HEre is the part of showing the profile
function openProfile(index) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const emp = employees[index];

    // Set profile info
    document.getElementById("profilePhoto").src = emp.img;
    document.getElementById("profileName").textContent = emp.name;
    document.getElementById("profileRole").textContent = emp.role;
    document.getElementById("profileEmail").textContent = emp.email;
    document.getElementById("profilePhone").textContent = emp.phone;

    // Experience list
    const expContainer = document.getElementById("profileExperience");
    expContainer.innerHTML = "";

    emp.experiences.forEach(exp => {
        expContainer.innerHTML += `
          <div class="border p-2 rounded-lg bg-gray-50">
            <p><strong>${exp.jobTitle}</strong></p>
            <p>Company : ${exp.Company}</p>
            <p>${exp.startDate} → ${exp.endDate}</p>
          </div>
        `;
    });
// Show modal
    document.getElementById("profileModal").classList.remove("hidden");
}
document.getElementById("closeProfile").addEventListener("click", () => {
    document.getElementById("profileModal").classList.add("hidden");
});

document.getElementById("profileModal").addEventListener("click", (e) => {
    if (e.target.id === "profileModal") {
        document.getElementById("profileModal").classList.add("hidden");
    }
});
document.getElementById("profileModal").addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.getElementById("profileModal").classList.add("hidden");
    }
});

//here is the zone logic

document.addEventListener('click', (x) =>{
  if(x.target.classList.contains("floorzoonbtn")){
     document.querySelector(".pickerZone").classList.remove("hidden");
     const zone = x.target.dataset.zone;
      openZonePicker(zone); 
  }
})
document.querySelector(".pickerZone").addEventListener('click', (e) =>{
  document.querySelector(".pickerZone").classList.add("hidden");
})
function openZonePicker(zone) {
    const picker = document.querySelector(".pickerZone");
    const showZone = document.querySelector(".showZone");

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const validRoles = zoneRules[zone];

    // Filter employees by allowed role
    const eligible = employees.filter(emp => validRoles.includes(emp.role));

    showZone.innerHTML = `<h2 class="text-center font-bold">${zone}</h2>`;

    if (eligible.length === 0) {
        showZone.innerHTML += `<p class="text-red-600 mt-4">No employees eligible for this zone.</p>`;
        picker.classList.remove("hidden");
        return;
    }

    eligible.forEach((emp, index) => {
        showZone.innerHTML += `
            <div onclick="assignEmployeeToZone('${emp.name}', '${zone}')"
                 class="cursor-pointer w-[90%] bg-white p-2 rounded-lg flex gap-2 items-center hover:bg-gray-200 duration-200">

                <img src="${emp.img || 'https://imgs.search.brave.com/mx4FHmRkf-poBv6wFCvrny2b1Dptn5BeKBwcUjdtcds/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjQv/NTE0LzU0MS9zbWFs/bC8zZC1pY29uLW9m/LW1lbi1wcm9maWxl/LXBlb3BsZS1mcmVl/LXBuZy5wbmc'}" class="h-12 w-12 rounded-lg object-cover bg-gray-300">
                <div>
                    <h4 class="font-bold">${emp.name}</h4>
                    <p class="text-sm text-gray-600">${emp.role}</p>
                </div>
            </div>
        `;
    });

    picker.classList.remove("hidden");
}
function assignEmployeeToZone(name, zone) {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    employees = employees.map(emp => {
        if (emp.name === name) {
            emp.currentZone = zone; // save zone
        }
        return emp;
    });

    localStorage.setItem("employees", JSON.stringify(employees));

    document.querySelector(".pickerZone").classList.add("hidden");

    displayEmployeesInZones();

    alert(`${name} assigned to ${zone}`);

    DisplayTheEmplyers();
}

function displayEmployeesInZones() {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];


    document.querySelectorAll(".zone-display").forEach(z => z.innerHTML = "");

    employees.forEach(emp => {
        if (!emp.currentZone) return;

        const zoneDiv = document.querySelector(
            `[data-zone='${emp.currentZone}']`
        ).parentElement.querySelector(".zone-display");

        zoneDiv.innerHTML = `
            <img src="${emp.img || 'https://imgs.search.brave.com/mx4FHmRkf-poBv6wFCvrny2b1Dptn5BeKBwcUjdtcds/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjQv/NTE0LzU0MS9zbWFs/bC8zZC1pY29uLW9m/LW1lbi1wcm9maWxl/LXBlb3BsZS1mcmVl/LXBuZy5wbmc'}" class="h-10 w-10 rounded-full object-cover border mb-1">
            <p>${emp.name}</p>
        `;
    });
}
