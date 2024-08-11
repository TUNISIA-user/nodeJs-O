const root = document.getElementById("root");
const searchBar = document.getElementById("searchBar");

window.addEventListener("input", async (e) => {
  const query = e.target.value.trim(); 
  
  if (!query) {
    // Clear the display if the input is empty
    root.innerHTML = "";
    return;
  }

  try {
    // Fetch the data from the API
    const response = await fetch(`http://localhost:5000/api/authors/${query}`);
    const data = await response.json();

    // Store the data in local storage
    localStorage.setItem('authorsData', JSON.stringify(data));

    // Update the display
    updateDisplay(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Function to update the display
const updateDisplay = (data) => {
  root.innerHTML = data.map((item) => `
    <h1>${item._id}</h1>
    <h1>${item.lastName}</h1>
  `).join('');
};

// Function to retrieve and display data from local storage
const displayStoredData = () => {
  const storedData = localStorage.getItem('authorsData');
  if (storedData) {
    const data = JSON.parse(storedData);
    updateDisplay(data);
  }
};

// Call this function to display stored data on page load or as needed
displayStoredData();
