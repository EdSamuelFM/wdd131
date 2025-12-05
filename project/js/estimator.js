function calculatePrintTime(event) {
    event.preventDefault(); 

    const form = event.target;
    const volume = parseFloat(form.volume.value);
    const costKg = parseFloat(form.cost.value);
    const quality = form.quality.value;
    const infill = parseInt(form.infill.value);
    const outputDiv = document.getElementById('result-output');

    const FILAMENT_DENSITY = 1.24; 
    const FILAMENT_COST_G = costKg / 1000; 

    let speedFactor; 
    if (quality === 'Draft') {
        speedFactor = 0.8; 
    } else if (quality === 'High') {
        speedFactor = 1.8; 
    } else {
        speedFactor = 1.0; 
    }

    const materialGrams = volume * FILAMENT_DENSITY * (infill / 100 + 0.5);
    const estimatedCost = materialGrams * FILAMENT_COST_G;

    const basePrintHours = volume * 0.015; 
    const estimatedTimeHours = basePrintHours * speedFactor;

    localStorage.setItem('lastCostEstimate', estimatedCost.toFixed(2));
    localStorage.setItem('lastTimeEstimate', estimatedTimeHours.toFixed(1));

    const resultHTML = `
        <h2>Calculation Complete!</h2>
        <p>Using a **${quality}** setting with **${infill}%** infill:</p>
        <ul>
            <li>Estimated Time: <strong>${estimatedTimeHours.toFixed(1)} hours</strong></li>
            <li>Estimated Material Used: <strong>${materialGrams.toFixed(1)} grams</strong></li>
            <li>Estimated Cost: <strong>$${estimatedCost.toFixed(2)}</strong></li>
        </ul>
        <p class="small-note">Note: This is an approximation. Actual results may vary based on printer and model complexity.</p>
    `;
    
    outputDiv.innerHTML = resultHTML;
}

function initializeEstimator() {
    const form = document.getElementById('estimator-form');
    const infillSlider = document.getElementById('infill');
    const infillValueSpan = document.getElementById('infill-value');
    const outputDiv = document.getElementById('result-output');

    const lastCost = localStorage.getItem('lastCostEstimate');
    const lastTime = localStorage.getItem('lastTimeEstimate');

    if (lastCost && lastTime) {
        outputDiv.innerHTML = `
            <p>Your last successful estimate was <strong>${lastTime} hours</strong> at a cost of <strong>$${lastCost}</strong>.</p>
            <p>Enter new details and press 'Calculate Estimate' to try again.</p>
        `;
    }
    
    form.addEventListener('submit', calculatePrintTime);

    infillSlider.addEventListener('input', () => {
        infillValueSpan.textContent = `${infillSlider.value}%`;
    });
}

document.addEventListener('DOMContentLoaded', initializeEstimator);