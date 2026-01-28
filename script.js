// Data storage using localStorage
let doctors = JSON.parse(localStorage.getItem('doctors')) || [];
let patients = JSON.parse(localStorage.getItem('patients')) || [];
let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
let records = JSON.parse(localStorage.getItem('records')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

// Initialize default admin if no users
if (users.length === 0) {
    users.push({ username: 'admin', password: 'admin123', role: 'admin' });
    saveData();
}

function saveData() {
    localStorage.setItem('doctors', JSON.stringify(doctors));
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('medicines', JSON.stringify(medicines));
    localStorage.setItem('records', JSON.stringify(records));
    localStorage.setItem('users', JSON.stringify(users));
}

// Authentication functions
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Username dan password harus diisi!');
        return;
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));

        if (user.role === 'admin') {
            window.location.href = 'pages/dashboard.html';
        } else if (user.role === 'doctor') {
            window.location.href = 'pages/doctor-dashboard.html';
        }
    } else {
        alert('Username atau password salah!');
    }
}

function register() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (!username || !password || !confirmPassword) {
        alert('Semua field harus diisi!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak cocok!');
        return;
    }

    // Check if username already exists
    if (users.find(u => u.username === username)) {
        alert('Username sudah digunakan!');
        return;
    }

    const newUser = {
        username: username,
        password: password,
        role: 'doctor'
    };

    users.push(newUser);
    saveData();

    alert('Akun berhasil dibuat! Silakan login.');
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = '../login.html';
    }
    return currentUser;
}

// Doctor management functions
function loadDoctorsTable() {
    console.log('loadDoctorsTable called');
    const tableBody = document.getElementById('doctorsTable');
    console.log('tableBody element:', tableBody);
    if (!tableBody) {
        console.warn('doctorsTable element not found!');
        return;
    }

    tableBody.innerHTML = '';
    console.log('Current doctors:', doctors);
    doctors.forEach((doctor, index) => {
        const row = `
            <tr>
                <td>${doctor.name}</td>
                <td>${doctor.specialty}</td>
                <td>${doctor.phone || '-'}</td>
                <td>${doctor.email || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editDoctor(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteDoctor(${index})">Hapus</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
    console.log('Table loaded with', doctors.length, 'doctors');
}

function addDoctor() {
    const name = document.getElementById('doctorName').value.trim();
    const specialty = document.getElementById('doctorSpecialty').value.trim();
    const phone = document.getElementById('doctorPhone').value.trim();
    const email = document.getElementById('doctorEmail').value.trim();

    console.log('addDoctor called with:', {name, specialty, phone, email});

    if (!name || !specialty) {
        console.warn('Missing required fields');
        return false;
    }

    doctors.push({
        name: name,
        specialty: specialty,
        phone: phone,
        email: email
    });

    console.log('Doctors after push:', doctors);
    saveData();
    
    return true;
}

function editDoctor(index) {
    const doctor = doctors[index];
    document.getElementById('editDoctorId').value = index;
    document.getElementById('editDoctorName').value = doctor.name;
    document.getElementById('editDoctorSpecialty').value = doctor.specialty;
    document.getElementById('editDoctorPhone').value = doctor.phone || '';
    document.getElementById('editDoctorEmail').value = doctor.email || '';

    new bootstrap.Modal(document.getElementById('editDoctorModal')).show();
}

function updateDoctor(index) {
    const name = document.getElementById('editDoctorName').value;
    const specialty = document.getElementById('editDoctorSpecialty').value;
    const phone = document.getElementById('editDoctorPhone').value;
    const email = document.getElementById('editDoctorEmail').value;

    if (!name || !specialty) {
        alert('Nama dan spesialisasi harus diisi!');
        return;
    }

    doctors[index] = {
        name: name,
        specialty: specialty,
        phone: phone,
        email: email
    };

    saveData();
    loadDoctorsTable();
    bootstrap.Modal.getInstance(document.getElementById('editDoctorModal')).hide();
    alert('Dokter berhasil diupdate!');
}

function deleteDoctor(index) {
    if (confirm('Apakah Anda yakin ingin menghapus dokter ini?')) {
        doctors.splice(index, 1);
        saveData();
        loadDoctorsTable();
        alert('Dokter berhasil dihapus!');
    }
}

// Patient management functions
function loadPatientsTable() {
    const tableBody = document.getElementById('patientsTable');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    patients.forEach((patient, index) => {
        const row = `
            <tr>
                <td>${patient.name}</td>
                <td>${patient.age || '-'}</td>
                <td>${patient.gender}</td>
                <td>${patient.phone || '-'}</td>
                <td>${patient.address || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editPatient(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePatient(${index})">Hapus</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function addPatient() {
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const gender = document.getElementById('patientGender').value;
    const phone = document.getElementById('patientPhone').value;
    const address = document.getElementById('patientAddress').value;

    if (!name || !gender) {
        alert('Nama dan jenis kelamin harus diisi!');
        return;
    }

    patients.push({
        name: name,
        age: parseInt(age) || 0,
        gender: gender,
        phone: phone,
        address: address
    });

    saveData();
    loadPatientsTable();
    document.getElementById('addPatientForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('addPatientModal')).hide();
    alert('Pasien berhasil ditambahkan!');
}

function editPatient(index) {
    const patient = patients[index];
    document.getElementById('editPatientName').value = patient.name;
    document.getElementById('editPatientAge').value = patient.age || '';
    document.getElementById('editPatientGender').value = patient.gender;
    document.getElementById('editPatientPhone').value = patient.phone || '';
    document.getElementById('editPatientAddress').value = patient.address || '';

    document.getElementById('editPatientBtn').onclick = function() {
        updatePatient(index);
    };

    new bootstrap.Modal(document.getElementById('editPatientModal')).show();
}

function updatePatient(index) {
    const name = document.getElementById('editPatientName').value;
    const age = document.getElementById('editPatientAge').value;
    const gender = document.getElementById('editPatientGender').value;
    const phone = document.getElementById('editPatientPhone').value;
    const address = document.getElementById('editPatientAddress').value;

    if (!name || !gender) {
        alert('Nama dan jenis kelamin harus diisi!');
        return;
    }

    patients[index] = {
        name: name,
        age: parseInt(age) || 0,
        gender: gender,
        phone: phone,
        address: address
    };

    saveData();
    loadPatientsTable();
    bootstrap.Modal.getInstance(document.getElementById('editPatientModal')).hide();
    alert('Pasien berhasil diupdate!');
}

function deletePatient(index) {
    if (confirm('Apakah Anda yakin ingin menghapus pasien ini?')) {
        patients.splice(index, 1);
        saveData();
        loadPatientsTable();
        alert('Pasien berhasil dihapus!');
    }
}

// Medicine management functions
function loadMedicinesTable() {
    const tableBody = document.getElementById('medicinesTable');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    medicines.forEach((medicine, index) => {
        const row = `
            <tr>
                <td>${medicine.name}</td>
                <td>${medicine.type}</td>
                <td>${medicine.stock}</td>
                <td>Rp ${medicine.price.toLocaleString()}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editMedicine(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteMedicine(${index})">Hapus</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function addMedicine() {
    const name = document.getElementById('medicineName').value;
    const type = document.getElementById('medicineType').value;
    const stock = document.getElementById('medicineStock').value;
    const price = document.getElementById('medicinePrice').value;

    if (!name || !type) {
        alert('Nama dan tipe obat harus diisi!');
        return;
    }

    medicines.push({
        name: name,
        type: type,
        stock: parseInt(stock) || 0,
        price: parseFloat(price) || 0
    });

    saveData();
    loadMedicinesTable();
    document.getElementById('addMedicineForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('addMedicineModal')).hide();
    alert('Obat berhasil ditambahkan!');
}

function editMedicine(index) {
    const medicine = medicines[index];
    document.getElementById('editMedicineName').value = medicine.name;
    document.getElementById('editMedicineType').value = medicine.type;
    document.getElementById('editMedicineStock').value = medicine.stock;
    document.getElementById('editMedicinePrice').value = medicine.price;

    document.getElementById('editMedicineBtn').onclick = function() {
        updateMedicine(index);
    };

    new bootstrap.Modal(document.getElementById('editMedicineModal')).show();
}

function updateMedicine(index) {
    const name = document.getElementById('editMedicineName').value;
    const type = document.getElementById('editMedicineType').value;
    const stock = document.getElementById('editMedicineStock').value;
    const price = document.getElementById('editMedicinePrice').value;

    if (!name || !type) {
        alert('Nama dan tipe obat harus diisi!');
        return;
    }

    medicines[index] = {
        name: name,
        type: type,
        stock: parseInt(stock) || 0,
        price: parseFloat(price) || 0
    };

    saveData();
    loadMedicinesTable();
    bootstrap.Modal.getInstance(document.getElementById('editMedicineModal')).hide();
    alert('Obat berhasil diupdate!');
}

function deleteMedicine(index) {
    if (confirm('Apakah Anda yakin ingin menghapus obat ini?')) {
        medicines.splice(index, 1);
        saveData();
        loadMedicinesTable();
        alert('Obat berhasil dihapus!');
    }
}

// Records management functions
function loadRecordsTable() {
    const tableBody = document.getElementById('recordsTable');
    if (!tableBody) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let filteredRecords = records;

    // If doctor, only show their records
    if (currentUser && currentUser.role === 'doctor') {
        filteredRecords = records.filter(r => r.doctor_id === currentUser.id);
    }

    tableBody.innerHTML = '';
    filteredRecords.forEach((record, index) => {
        const row = `
            <tr>
                <td>${record.record_date}</td>
                <td>${record.patient_name || 'Unknown'}</td>
                <td>${record.doctor_name || 'Unknown'}</td>
                <td>${record.diagnosis}</td>
                <td>${record.treatment}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewRecord(${index})">Lihat</button>
                    <button class="btn btn-sm btn-warning" onclick="editRecord(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord(${index})">Hapus</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function addRecord() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const patientId = document.getElementById('recordPatient').value;
    const diagnosis = document.getElementById('recordDiagnosis').value;
    const treatment = document.getElementById('recordTreatment').value;
    const prescription = document.getElementById('recordPrescription').value;
    const notes = document.getElementById('recordNotes').value;

    if (!patientId || !diagnosis || !treatment) {
        alert('Pasien, diagnosis, dan treatment harus diisi!');
        return;
    }

    const patient = patients[parseInt(patientId)];
    const doctor = doctors.find(d => d.name === currentUser.username) || { name: currentUser.username };

    records.push({
        record_date: new Date().toISOString().split('T')[0],
        patient_id: parseInt(patientId),
        patient_name: patient ? patient.name : 'Unknown',
        doctor_id: currentUser.id || 1,
        doctor_name: doctor.name,
        diagnosis: diagnosis,
        treatment: treatment,
        prescription: prescription,
        notes: notes
    });

    saveData();
    loadRecordsTable();
    document.getElementById('addRecordForm').reset();
    alert('Rekam medis berhasil ditambahkan!');
    window.location.href = 'view-records.html';
}

// Helper function untuk tambah rekam medis dari add-record.html
function addRecordSimple() {
    console.log('addRecordSimple called');
    const patientSelect = document.getElementById('patientSelect');
    const doctorSelect = document.getElementById('doctorSelect');
    const diagnosis = document.getElementById('diagnosis');
    const treatment = document.getElementById('treatment');
    const medicines = document.getElementById('medicines');
    
    if (!patientSelect || !doctorSelect) {
        console.error('Form elements not found');
        return false;
    }
    
    const patientIndex = parseInt(patientSelect.value);
    const doctorIndex = parseInt(doctorSelect.value);
    
    if (isNaN(patientIndex) || isNaN(doctorIndex)) {
        alert('Pilih pasien dan dokter!');
        return false;
    }
    
    const patient = patients[patientIndex];
    const doctor = doctors[doctorIndex];
    
    if (!patient || !doctor) {
        alert('Pasien atau dokter tidak ditemukan');
        return false;
    }
    
    const newRecord = {
        date: new Date().toISOString().split('T')[0],
        patient_name: patient.name,
        doctor_name: doctor.name,
        diagnosis: diagnosis.value.trim(),
        treatment: treatment.value.trim(),
        medicines: medicines.value.trim()
    };
    
    console.log('Adding record:', newRecord);
    records.push(newRecord);
    saveData();
    
    console.log('Record added. Total records:', records.length);
    return true;
}

function editRecord(index) {
    const record = records[index];
    document.getElementById('editRecordPatient').value = record.patient_id;
    document.getElementById('editRecordDiagnosis').value = record.diagnosis;
    document.getElementById('editRecordTreatment').value = record.treatment;
    document.getElementById('editRecordPrescription').value = record.prescription || '';
    document.getElementById('editRecordNotes').value = record.notes || '';

    document.getElementById('editRecordBtn').onclick = function() {
        updateRecord(index);
    };

    new bootstrap.Modal(document.getElementById('editRecordModal')).show();
}

function updateRecord(index) {
    const patientId = document.getElementById('editRecordPatient').value;
    const diagnosis = document.getElementById('editRecordDiagnosis').value;
    const treatment = document.getElementById('editRecordTreatment').value;
    const prescription = document.getElementById('editRecordPrescription').value;
    const notes = document.getElementById('editRecordNotes').value;

    if (!patientId || !diagnosis || !treatment) {
        alert('Pasien, diagnosis, dan treatment harus diisi!');
        return;
    }

    const patient = patients[parseInt(patientId)];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const doctor = doctors.find(d => d.name === currentUser.username) || { name: currentUser.username };

    records[index] = {
        record_date: records[index].record_date,
        patient_id: parseInt(patientId),
        patient_name: patient ? patient.name : 'Unknown',
        doctor_id: currentUser.id || 1,
        doctor_name: doctor.name,
        diagnosis: diagnosis,
        treatment: treatment,
        prescription: prescription,
        notes: notes
    };

    saveData();
    loadRecordsTable();
    bootstrap.Modal.getInstance(document.getElementById('editRecordModal')).hide();
    alert('Rekam medis berhasil diupdate!');
}

function deleteRecord(index) {
    if (confirm('Apakah Anda yakin ingin menghapus rekam medis ini?')) {
        records.splice(index, 1);
        saveData();
        loadRecordsTable();
        alert('Rekam medis berhasil dihapus!');
    }
}

function viewRecord(index) {
    const record = records[index];
    document.getElementById('viewRecordDate').textContent = record.record_date;
    document.getElementById('viewRecordPatient').textContent = record.patient_name || 'Unknown';
    document.getElementById('viewRecordDoctor').textContent = record.doctor_name || 'Unknown';
    document.getElementById('viewRecordDiagnosis').textContent = record.diagnosis;
    document.getElementById('viewRecordTreatment').textContent = record.treatment;
    document.getElementById('viewRecordPrescription').textContent = record.prescription || '-';
    document.getElementById('viewRecordNotes').textContent = record.notes || '-';

    new bootstrap.Modal(document.getElementById('viewRecordModal')).show();
}

// Dashboard functions
function updateDashboardStats() {
    const doctorCountEl = document.getElementById('doctorCount');
    const patientCountEl = document.getElementById('patientCount');
    const medicineCountEl = document.getElementById('medicineCount');
    const recordCountEl = document.getElementById('recordCount');
    const todayRecordsEl = document.getElementById('todayRecords');

    if (doctorCountEl) doctorCountEl.textContent = doctors.length;
    if (patientCountEl) patientCountEl.textContent = patients.length;
    if (medicineCountEl) medicineCountEl.textContent = medicines.length;
    if (recordCountEl) recordCountEl.textContent = records.length;

    if (todayRecordsEl) {
        const today = new Date().toISOString().split('T')[0];
        const todayRecords = records.filter(r => r.record_date === today).length;
        todayRecordsEl.textContent = todayRecords;
    }
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load specific data based on current page
    if (window.location.pathname.includes('manage-doctors.html')) {
        loadDoctorsTable();
    }

    if (window.location.pathname.includes('manage-patients.html')) {
        loadPatientsTable();
    }

    if (window.location.pathname.includes('manage-medicines.html')) {
        loadMedicinesTable();
    }

    if (window.location.pathname.includes('view-records.html') || window.location.pathname.includes('add-record.html')) {
        loadRecordsTable();
    }

    // Update dashboard stats
    updateDashboardStats();
});

// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                if (user.role === 'admin') {
                    window.location.href = 'pages/dashboard.html';
                } else if (user.role === 'doctor') {
                    window.location.href = 'pages/doctor-dashboard.html';
                }
            } else {
                alert('Username atau password salah!');
            }
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;

            if (password !== confirmPassword) {
                alert('Password dan konfirmasi password tidak cocok!');
                return;
            }

            if (users.find(u => u.username === username)) {
                alert('Username sudah digunakan!');
                return;
            }

            const newUser = { username, password, role: 'doctor' };
            users.push(newUser);
            saveData();

            alert('Akun berhasil dibuat! Silakan login.');
            window.location.href = 'login.html';
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Check authentication status
    checkAuthStatus();

    // Load appropriate data based on current page
    loadPageData();
});

function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // User is logged in
        if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
            // Redirect logged-in users away from login/register pages
            if (currentUser.role === 'admin') {
                window.location.href = 'pages/dashboard.html';
            } else {
                window.location.href = 'pages/doctor-dashboard.html';
            }
        }
    } else {
        // User not logged in
        if (window.location.pathname.includes('pages/')) {
            // Redirect to login if trying to access protected pages
            window.location.href = '../index.html';
        }
    }
}

function loadPageData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (window.location.pathname.includes('dashboard.html')) {
        if (currentUser && currentUser.role === 'admin') {
            loadDashboardData();
        }
    } else if (window.location.pathname.includes('doctor-dashboard.html')) {
        if (currentUser && currentUser.role === 'doctor') {
            loadDoctorDashboardData();
        }
    } else if (window.location.pathname.includes('manage-doctors.html')) {
        loadDoctorsTable();
    } else if (window.location.pathname.includes('manage-patients.html')) {
        displayPatients();
    } else if (window.location.pathname.includes('manage-medicines.html')) {
        displayMedicines();
    } else if (window.location.pathname.includes('view-records.html') || window.location.pathname.includes('add-record.html')) {
        displayRecords();
    }
}

function loadDashboardData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    // Update user info
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        userInfo.textContent = `Selamat datang, ${currentUser.username} (${currentUser.role})`;
    }

    // Update statistics
    updateStats();

    // Load admin data
    loadDoctorsTable();
    displayPatients();
    displayMedicines();
    displayRecords();
}

function loadDoctorDashboardData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    // Update user info
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        userInfo.textContent = `Selamat datang, ${currentUser.username} (${currentUser.role})`;
    }

    // Update statistics
    updateStats();

    // Load doctor data
    displayPatients();
    displayRecords();
}

function updateStats() {
    const doctorCount = document.getElementById('doctorCount');
    const patientCount = document.getElementById('patientCount');
    const medicineCount = document.getElementById('medicineCount');
    const recordCount = document.getElementById('recordCount');

    if (doctorCount) doctorCount.textContent = doctors.length;
    if (patientCount) patientCount.textContent = patients.length;
    if (medicineCount) medicineCount.textContent = medicines.length;
    if (recordCount) recordCount.textContent = records.length;
}

// Doctor management functions

// Patient management functions
function displayPatients() {
    const tableBody = document.getElementById('patientsTable');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    patients.forEach((patient, index) => {
        const row = `
            <tr>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.phone}</td>
                <td>${patient.address}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editPatient(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePatient(${index})">Hapus</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function addPatient() {
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const gender = document.getElementById('patientGender').value;
    const phone = document.getElementById('patientPhone').value;
    const address = document.getElementById('patientAddress').value;

    if (!name || !age) {
        alert('Nama dan umur harus diisi!');
        return;
    }

    patients.push({ name, age: parseInt(age), gender, phone, address });
    saveData();
    displayPatients();
    document.getElementById('addPatientForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('addPatientModal')).hide();
}

function editPatient(index) {
    const patient = patients[index];
    document.getElementById('editPatientName').value = patient.name;
    document.getElementById('editPatientAge').value = patient.age;
    document.getElementById('editPatientGender').value = patient.gender;
    document.getElementById('editPatientPhone').value = patient.phone;
    document.getElementById('editPatientAddress').value = patient.address;

    document.getElementById('editPatientForm').onsubmit = function(e) {
        e.preventDefault();
        updatePatient(index);
    };

    new bootstrap.Modal(document.getElementById('editPatientModal')).show();
}

function updatePatient(index) {
    const name = document.getElementById('editPatientName').value;
    const age = document.getElementById('editPatientAge').value;
    const gender = document.getElementById('editPatientGender').value;
    const phone = document.getElementById('editPatientPhone').value;
    const address = document.getElementById('editPatientAddress').value;

    if (!name || !age) {
        alert('Nama dan umur harus diisi!');
        return;
    }

    patients[index] = { name, age: parseInt(age), gender, phone, address };
    saveData();
    displayPatients();
    bootstrap.Modal.getInstance(document.getElementById('editPatientModal')).hide();
}

function deletePatient(index) {
    if (confirm('Apakah Anda yakin ingin menghapus pasien ini?')) {
        patients.splice(index, 1);
        saveData();
        displayPatients();
    }
}

// Medicine management functions
function displayMedicines() {
    const tableBody = document.getElementById('medicinesTable');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    medicines.forEach((medicine, index) => {
        const row = `
            <tr>
                <td>${medicine.name}</td>
                <td>${medicine.type}</td>
                <td>${medicine.stock}</td>
                <td>${medicine.price}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editMedicine(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteMedicine(${index})">Hapus</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function addMedicine() {
    const name = document.getElementById('medicineName').value;
    const type = document.getElementById('medicineType').value;
    const stock = document.getElementById('medicineStock').value;
    const price = document.getElementById('medicinePrice').value;

    if (!name || !type) {
        alert('Nama dan jenis obat harus diisi!');
        return;
    }

    medicines.push({ name, type, stock: parseInt(stock) || 0, price: parseFloat(price) || 0 });
    saveData();
    displayMedicines();
    document.getElementById('addMedicineForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('addMedicineModal')).hide();
}

function editMedicine(index) {
    const medicine = medicines[index];
    document.getElementById('editMedicineName').value = medicine.name;
    document.getElementById('editMedicineType').value = medicine.type;
    document.getElementById('editMedicineStock').value = medicine.stock;
    document.getElementById('editMedicinePrice').value = medicine.price;

    document.getElementById('editMedicineForm').onsubmit = function(e) {
        e.preventDefault();
        updateMedicine(index);
    };

    new bootstrap.Modal(document.getElementById('editMedicineModal')).show();
}

function updateMedicine(index) {
    const name = document.getElementById('editMedicineName').value;
    const type = document.getElementById('editMedicineType').value;
    const stock = document.getElementById('editMedicineStock').value;
    const price = document.getElementById('editMedicinePrice').value;

    if (!name || !type) {
        alert('Nama dan jenis obat harus diisi!');
        return;
    }

    medicines[index] = { name, type, stock: parseInt(stock) || 0, price: parseFloat(price) || 0 };
    saveData();
    displayMedicines();
    bootstrap.Modal.getInstance(document.getElementById('editMedicineModal')).hide();
}

function deleteMedicine(index) {
    if (confirm('Apakah Anda yakin ingin menghapus obat ini?')) {
        medicines.splice(index, 1);
        saveData();
        displayMedicines();
    }
}

// Record management functions
function displayRecords() {
    const tableBody = document.getElementById('recordsTable');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    records.forEach((record, index) => {
        const row = `
            <tr>
                <td>${record.patientName}</td>
                <td>${record.doctorName}</td>
                <td>${record.diagnosis}</td>
                <td>${record.treatment}</td>
                <td>${record.date}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editRecord(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord(${index})">Hapus</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function editRecord(index) {
    const record = records[index];
    document.getElementById('editRecordPatient').value = record.patientName;
    document.getElementById('editRecordDoctor').value = record.doctorName;
    document.getElementById('editRecordDiagnosis').value = record.diagnosis;
    document.getElementById('editRecordTreatment').value = record.treatment;
    document.getElementById('editRecordDate').value = record.date;

    document.getElementById('editRecordForm').onsubmit = function(e) {
        e.preventDefault();
        updateRecord(index);
    };

    new bootstrap.Modal(document.getElementById('editRecordModal')).show();
}

function updateRecord(index) {
    const patientName = document.getElementById('editRecordPatient').value;
    const doctorName = document.getElementById('editRecordDoctor').value;
    const diagnosis = document.getElementById('editRecordDiagnosis').value;
    const treatment = document.getElementById('editRecordTreatment').value;
    const date = document.getElementById('editRecordDate').value;

    if (!patientName || !doctorName || !diagnosis) {
        alert('Pasien, dokter, dan diagnosis harus diisi!');
        return;
    }

    records[index] = { patientName, doctorName, diagnosis, treatment, date };
    saveData();
    displayRecords();
    bootstrap.Modal.getInstance(document.getElementById('editRecordModal')).hide();
}

function deleteRecord(index) {
    if (confirm('Apakah Anda yakin ingin menghapus rekam medis ini?')) {
        records.splice(index, 1);
        saveData();
        displayRecords();
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}