🏢 WorkSphere — Interactive Employee Zone Management

WorkSphere is a dynamic web application designed to manage employees inside an interactive floor plan.
It allows assigning employees to specific rooms based on role restrictions, managing profiles, storing data in localStorage, and providing a clean, intuitive UI.

🚀 Features
✅ Employee Management

Add employees via modal form

Full validation using REGEX

Dynamic work experience blocks (add/remove)

Live photo preview

Stores all data in localStorage

✅ Zone Assignment System

Floor plan with 6 zones:

Conference Room

Reception

Server Room

Security Room

Staff Room

Archives Room

Each zone has role-based access rules

Employees can be assigned to zones via the (+) buttons

Assigned employees are removed from the main list

Removing someone from a zone returns them to the unassigned list

✅ Employee Profile

Click any employee to open a detailed profile

Shows:

Photo

Full contact info

Experiences

Assigned zone (if any)

✅ LocalStorage Persistence

All employees

All assignments

All experiences
→ stay saved even after page refresh

🏗️ Technologies Used

HTML5

TailwindCSS

JavaScript (Vanilla)

LocalStorage API

📁 Project Structure
/
├── index.html
├── script.js
├── style.css (optional)
├── img/
│   └── icon.jpg
└── Floor-Plan.jpg

📌 How It Works
1. Add an Employee

Fill the form → validated → saved in localStorage → appears in “Unassigned Employees”.

2. Assign to a Zone

Click + on any zone → choose an employee → employee gets moved to the zone.

3. Remove From Zone

Click Remove button inside the zone → employee returns to the unassigned list.

4. View Full Profile

Click employee card → modal shows full details.

🧪 Role Restrictions
Zone	Allowed Roles
Conference Room	All roles
Reception	Receptionist
Server Room	IT Technician
Security Room	Security Officer
Staff Room	All roles
Archives Room	All except Cleaning
🔄 LocalStorage Structure

Each employee is stored like this:

{
  "name": "John Doe",
  "role": "Manager",
  "img": "https://...",
  "email": "john@example.com",
  "phone": "+212 600000000",
  "experiences": [
    {
      "jobTitle": "Developer",
      "Company": "Tech Corp",
      "startDate": "2020-01-01",
      "endDate": "2022-01-01"
    }
  ],
  "currentZone": "Conference Room"
}

🎯 Current State

This project includes all required functional features of the brief:

✔ Add employee
✔ Validate form
✔ Tailwind UI
✔ Zone system
✔ Role restrictions
✔ Assign + remove employees
✔ Display inside floor map
✔ Profile modal
✔ Persistent data storage
