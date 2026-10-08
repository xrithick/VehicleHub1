/**
 * VehicleHub - Comparison Module (compare.js)
 * Enables side-by-side specification comparison between two selected vehicles.
 */

const CompareService = {
  // Retrieve all vehicles (both cars and bikes) for comparison options
  async getAllVehicles() {
    const { vehicles: cars } = await VehicleService.getVehicles("car");
    const { vehicles: bikes } = await VehicleService.getVehicles("bike");
    return [...cars, ...bikes];
  },

  // Render comparison table comparing vehicle 1 and vehicle 2
  renderComparisonTable(v1, v2) {
    const container = document.getElementById("comparison-results");
    if (!container) return;

    if (!v1 && !v2) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚖️</div>
          <h3>Select Vehicles to Compare</h3>
          <p>Choose two vehicles from the dropdowns above to see their specifications side by side.</p>
        </div>
      `;
      return;
    }

    const placeholderCol = (label) => `
      <div class="compare-card-preview">
        <div style="height: 160px; background: #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #64748b;">
          Select ${label}
        </div>
        <div class="compare-preview-title" style="margin-top: 0.75rem;">None Selected</div>
      </div>
    `;

    const vehicleCol = (v) => `
      <div class="compare-card-preview">
        <img src="${v.imageUrl}" alt="${v.brand} ${v.model}" class="compare-preview-img" onerror="this.src='https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'" />
        <div class="compare-preview-title">${v.brand} ${v.model}</div>
        <div class="compare-preview-price">${v.price}</div>
        <a href="vehicle.html?id=${v.id}" class="btn btn-secondary btn-sm" style="margin-top: 0.5rem;">View Full Details</a>
      </div>
    `;

    const getVal = (v, key, fallback = "N/A") => (v && v[key]) ? v[key] : fallback;

    const specsToCompare = [
      { key: "type", label: "Category", format: (v) => v ? (v.type === "car" ? "🚗 Car" : "🏍️ Bike") : "-" },
      { key: "price", label: "Price", format: (v) => v ? v.price : "-" },
      { key: "engine", label: "Engine Capacity", format: (v) => v ? v.engine : "-" },
      { key: "fuel", label: "Fuel Type", format: (v) => v ? v.fuel : "-" },
      { key: "mileage", label: "Mileage", format: (v) => v ? v.mileage : "-" },
      { key: "transmission", label: "Transmission", format: (v) => v ? v.transmission : "-" },
      { key: "power", label: "Max Power", format: (v) => getVal(v, "power") },
      { key: "torque", label: "Max Torque", format: (v) => getVal(v, "torque") },
      { key: "seating", label: "Seating Capacity", format: (v) => getVal(v, "seating") },
      { key: "bodyType", label: "Body Type / Style", format: (v) => getVal(v, "bodyType") },
      { key: "fuelTank", label: "Fuel Tank", format: (v) => getVal(v, "fuelTank") },
      { key: "groundClearance", label: "Ground Clearance", format: (v) => getVal(v, "groundClearance") }
    ];

    let rowsHtml = specsToCompare.map(item => `
      <tr>
        <th>${item.label}</th>
        <td>${item.format(v1)}</td>
        <td>${item.format(v2)}</td>
      </tr>
    `).join("");

    container.innerHTML = `
      <div class="compare-table-wrapper">
        <table class="compare-table">
          <thead>
            <tr>
              <th style="width: 25%;">Vehicle</th>
              <td style="width: 37.5%;">${v1 ? vehicleCol(v1) : placeholderCol("Vehicle 1")}</td>
              <td style="width: 37.5%;">${v2 ? vehicleCol(v2) : placeholderCol("Vehicle 2")}</td>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }
};
