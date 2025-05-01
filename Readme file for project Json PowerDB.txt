# Student Enrollment Form using JSON PowerDB

This project is a micro project submission for B.Tech CSE (2024-2025) to demonstrate form handling with backend database integration using JSON PowerDB.

## Project Objective
To create a dynamic web-based Student Enrollment Form with the ability to:
- Save new student data
- Update existing records
- Reset the form interface

## Technologies Used
- HTML, CSS, JavaScript
- JSON PowerDB (JPDB API)

## Form Fields
- Roll No (Primary Key)
- Full Name
- Class
- Birth Date
- Address
- Enrollment Date

## Features
- Checks for existing Roll No in the database
- If not found, allows new entry and enables the "Save" button
- If found, displays data and enables the "Update" button
- All fields are validated (no empty submissions)
- "Reset" button clears the form and resets to default state

## How to Run
1. Replace `connToken` in `script.js` with your own token from login2explore.com
2. Open `index.html` in a browser
3. Use the form to add or update student records

## Report
See `Student_Enrollment_JSONPowerDB_Project_Report.pdf` for a full technical write-up.

## Developed by
Shubham  
Bachelor of Technology in Computer Science and Engineering  
Academic Year: 2024–2025
