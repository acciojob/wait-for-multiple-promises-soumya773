//your JS code here. If required.
const output = document.getElementById("output");

// Display "Loading..." while promises are pending
output.innerHTML = `
  <tr>
    <td colspan="2" class="text-center">Loading...</td>
  </tr>
`;

// Helper to create a random delay between 1 and 3 seconds
function getRandomDelay() {
  return (Math.random() * 2 + 1).toFixed(3); // returns a string like "2.345"
}

// Create a promise that resolves after a random delay
function createPromise(index) {
  const delay = getRandomDelay(); // in seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: `Promise ${index + 1}`, time: parseFloat(delay) });
    }, delay * 1000); // convert to milliseconds
  });
}

const startTime = performance.now();

// Create 3 promises
const promises = [0, 1, 2].map((i) => createPromise(i));

// Wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Clear loading state
  output.innerHTML = "";

  // Show each promise result
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time}</td>
    `;
    output.appendChild(row);
  });

  // Calculate total time using performance.now()
  const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);

  // Append total time row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime}</strong></td>
  `;
  output.appendChild(totalRow);
});
