document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('reviewCounter');

    let reviewCount = Number(localStorage.getItem('reviewCount')) || 0;

    reviewCount++;

    localStorage.setItem('reviewCount', reviewCount);

    if (counterElement) {
        counterElement.textContent = reviewCount;
    }
});

const currentYearElement = document.getElementById("currentyear");
if (currentYearElement) {
    const today = new Date();
    currentYearElement.textContent = today.getFullYear();
}

const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}