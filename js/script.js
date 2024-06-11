document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    
    localStorage.setItem('pendingCertificate', JSON.stringify({ firstName, lastName }));
    alert("SUCCESS! Awaiting your professor approval.");
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
});

function loadData() {
    const userData = JSON.parse(localStorage.getItem('pendingCertificate'));
    if (userData) {
        const displayDiv = document.getElementById('userDataDisplay');
        displayDiv.innerHTML = `Pending Certificate for: ${userData.firstName} ${userData.lastName}`;
        const generateButton = document.createElement('button');
        generateButton.innerText = 'Generate Certificate';
        generateButton.onclick = function() { generatePDF(userData.firstName, userData.lastName); };
        displayDiv.appendChild(generateButton);
    } else {
        alert("No submissions pending.");
    }
}


function generatePDF(firstName, lastName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const text = `Certificate of Completion\n\nAwarded to\n${firstName} ${lastName}\nfor completing.`;
    doc.text(text, 10, 10);
    doc.save('Certificate.pdf');
    localStorage.removeItem('pendingCertificate');
}
