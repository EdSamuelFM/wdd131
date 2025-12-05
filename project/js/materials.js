const filamentMaterials = [
    { material: "PLA", strength: "Medium", ease: "Easy", nozzleTemp: 200, bedTemp: 60, cost: 20 },
    { material: "ABS", strength: "High", ease: "Difficult", nozzleTemp: 240, bedTemp: 100, cost: 25 },
    { material: "PETG", strength: "High", ease: "Moderate", nozzleTemp: 230, bedTemp: 70, cost: 28 },
    { material: "TPU", strength: "Low", ease: "Moderate", nozzleTemp: 220, bedTemp: 50, cost: 35 },
    { material: "Nylon", strength: "Very High", ease: "Difficult", nozzleTemp: 255, bedTemp: 90, cost: 45 }
];

function renderFilamentTable(data) {
    const tbody = document.querySelector('#material-table tbody');
    let htmlContent = '';
    
    data.forEach(material => {
        htmlContent += `
            <tr>
                <td>${material.material}</td>
                <td>${material.strength}</td>
                <td>${material.ease}</td>
                <td>${material.nozzleTemp}°C</td>
                <td>${material.bedTemp}°C</td>
                <td>$${material.cost.toFixed(2)}</td>
            </tr>
        `;
    });

    tbody.innerHTML = htmlContent;
}

function filterMaterials() {
    const strengthFilter = document.getElementById('strength').value;
    const easeFilter = document.getElementById('ease').value;

    let filteredData = filamentMaterials;

    if (strengthFilter !== 'All') {
        filteredData = filteredData.filter(material => material.strength === strengthFilter);
    }
    
    if (easeFilter !== 'All') {
        filteredData = filteredData.filter(material => material.ease === easeFilter);
    }

    renderFilamentTable(filteredData);
    
    localStorage.setItem('lastStrengthFilter', strengthFilter);
}

function initializeMaterialPage() {
    const strengthSelect = document.getElementById('strength');
    const easeSelect = document.getElementById('ease');
    const message = document.getElementById('local-storage-message');
    
    const savedStrength = localStorage.getItem('lastStrengthFilter');
    
    if (savedStrength) {
        strengthSelect.value = savedStrength;
        message.innerHTML = `Welcome back! Your last filter choice (${savedStrength}) has been loaded.`;
    } else {
        message.textContent = 'Use the filters to find your perfect filament!';
    }
    
    strengthSelect.addEventListener('change', filterMaterials);
    easeSelect.addEventListener('change', filterMaterials);

    filterMaterials(); 
}

document.addEventListener('DOMContentLoaded', initializeMaterialPage);