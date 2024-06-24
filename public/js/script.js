const newInterests = [];

function addNewInterest() {
    const newInterest = document.getElementById('newInterest');
    const newInterestVal = newInterest.value;

    if (newInterest && !newInterests.includes(newInterest)) {
        newInterests.push(newInterestVal);
        newInterest.selectedIndex = 0; 
        renderSelectedInterest();
    }
    // TODO: I think there is a bug in this method
}

function renderSelectedInterest() {
    const selectedInterests = document.getElementById('selectedInterests');
    selectedInterests.innerHTML = '';
    newInterests.forEach((interest) => {
        const listItem = document.createElement('li');
        listItem.textContent = interest;
        selectedInterests.appendChild(listItem);
    });

    document.getElementById('updatedInterests').value = JSON.stringify(newInterests);
}

function saveAbout() {
    document.getElementById('updatedAbout').value = document.getElementById('about').value;
}