const output = document.getElementById("output");

// Add loading row with id="loading"
output.innerHTML = `
  <tr id="loading">
    <td colspan="2" class="text-center">Loading...</td>
  </tr>
`;

// Random delay between 1 and 3 seconds
function getRandomDelay() {
  return (Math.random() * 2 + 1).toFixed(3); // "1.234"
}

function createPromise(index) {
  const delay = getRandomDelay();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: `Promise ${index + 1}`, time: parseFloat(delay) });
    }, delay * 1000);
  });
}

const startTime = performance.now();

const promises = [0, 1, 2].map((i) => createPromise(i));

Promise.all(promises).then((results) => {
  // Remove loading row
  document.getElementById("loading").remove();

  // Add promise rows
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time}</td>
    `;
    output.appendChild(row);
  });

  // Add total row
  const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime}</strong></td>
  `;
  output.appendChild(totalRow);
});
