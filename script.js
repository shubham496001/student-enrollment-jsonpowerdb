
const connToken = "YOUR_JPDB_TOKEN_HERE";
const dbName = "SCHOOL-DB";
const relName = "STUDENT-TABLE";
const jpdbBaseURL = "https://api.login2explore.com:5577";
let recordNo = null;

function disableAll() {
    document.getElementById("fullName").disabled = true;
    document.getElementById("studentClass").disabled = true;
    document.getElementById("birthDate").disabled = true;
    document.getElementById("address").disabled = true;
    document.getElementById("enrollmentDate").disabled = true;
    document.getElementById("btnSave").disabled = true;
    document.getElementById("btnUpdate").disabled = true;
}

function enableFormFields() {
    document.getElementById("fullName").disabled = false;
    document.getElementById("studentClass").disabled = false;
    document.getElementById("birthDate").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("enrollmentDate").disabled = false;
}

function resetForm() {
    document.getElementById("enrollmentForm").reset();
    document.getElementById("rollNo").disabled = false;
    disableAll();
    document.getElementById("rollNo").focus();
}

function isNotEmpty() {
    return ["rollNo", "fullName", "studentClass", "birthDate", "address", "enrollmentDate"]
        .every(id => document.getElementById(id).value.trim() !== "");
}

function getStudent() {
    const rollNo = document.getElementById("rollNo").value.trim();
    if (!rollNo) return;

    const getReqStr = {
        token: connToken,
        dbName: dbName,
        rel: relName,
        cmd: "GET_BY_KEY",
        key: { Roll_No: rollNo }
    };

    fetch(`${jpdbBaseURL}/api/irl`, {
        method: "POST",
        body: JSON.stringify(getReqStr),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 400) {
            enableFormFields();
            document.getElementById("btnSave").disabled = false;
        } else if (data.status === 200) {
            const record = data.data.record;
            recordNo = data.data.rec_no;
            document.getElementById("fullName").value = record.Full_Name;
            document.getElementById("studentClass").value = record.Class;
            document.getElementById("birthDate").value = record.Birth_Date;
            document.getElementById("address").value = record.Address;
            document.getElementById("enrollmentDate").value = record.Enrollment_Date;
            enableFormFields();
            document.getElementById("btnUpdate").disabled = false;
            document.getElementById("rollNo").disabled = true;
        }
    });
}

function saveData() {
    if (!isNotEmpty()) {
        alert("All fields must be filled out.");
        return;
    }

    const jsonData = {
        Roll_No: document.getElementById("rollNo").value.trim(),
        Full_Name: document.getElementById("fullName").value.trim(),
        Class: document.getElementById("studentClass").value.trim(),
        Birth_Date: document.getElementById("birthDate").value.trim(),
        Address: document.getElementById("address").value.trim(),
        Enrollment_Date: document.getElementById("enrollmentDate").value.trim()
    };

    const putReqStr = {
        token: connToken,
        dbName: dbName,
        rel: relName,
        cmd: "PUT",
        jsonStr: jsonData
    };

    fetch(`${jpdbBaseURL}/api/iml`, {
        method: "POST",
        body: JSON.stringify(putReqStr),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(() => {
        alert("Record saved successfully.");
        resetForm();
    });
}

function updateData() {
    if (!isNotEmpty()) {
        alert("All fields must be filled out.");
        return;
    }

    const jsonData = {
        Roll_No: document.getElementById("rollNo").value.trim(),
        Full_Name: document.getElementById("fullName").value.trim(),
        Class: document.getElementById("studentClass").value.trim(),
        Birth_Date: document.getElementById("birthDate").value.trim(),
        Address: document.getElementById("address").value.trim(),
        Enrollment_Date: document.getElementById("enrollmentDate").value.trim()
    };

    const updateReqStr = {
        token: connToken,
        dbName: dbName,
        rel: relName,
        cmd: "UPDATE",
        rec_no: recordNo,
        jsonStr: jsonData
    };

    fetch(`${jpdbBaseURL}/api/iml`, {
        method: "POST",
        body: JSON.stringify(updateReqStr),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(() => {
        alert("Record updated successfully.");
        resetForm();
    });
}
