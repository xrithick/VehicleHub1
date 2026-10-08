/**
 * VehicleHub - Vehicle Data & API Service Layer (vehicles.js)
 * 
 * Demonstrates a clean API Service Layer with automatic fallback to curated
 * academic demo datasets for cars and bikes.
 */

// ===================================================================
// 1. FALLBACK / DEMO DATASETS (Separated from API code)
// Realistic specifications for Indian market vehicles with Unsplash vehicle photography
// ===================================================================

const fallbackCars = [
  {
    id: "car-1",
    type: "car",
    brand: "Toyota",
    model: "Fortuner",
    price: "₹33.43 - 51.44 Lakh",
    priceValue: 33.43,
    fuel: "Diesel",
    engine: "2755 cc",
    transmission: "Automatic",
    mileage: "14.6 km/l",
    seating: "7 Seater",
    bodyType: "SUV",
    power: "201 bhp @ 3400 rpm",
    torque: "500 Nm @ 1600-2800 rpm",
    fuelTank: "80 Litres",
    groundClearance: "225 mm",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    description: "The Toyota Fortuner is an iconic premium SUV renowned for robust off-road capability, imposing road presence, and dependable reliability."
  },
  {
    id: "car-2",
    type: "car",
    brand: "Hyundai",
    model: "Creta",
    price: "₹11.00 - 20.15 Lakh",
    priceValue: 11.00,
    fuel: "Petrol",
    engine: "1497 cc",
    transmission: "Manual / IVT",
    mileage: "17.4 km/l",
    seating: "5 Seater",
    bodyType: "Compact SUV",
    power: "113 bhp @ 6300 rpm",
    torque: "143.8 Nm @ 4500 rpm",
    fuelTank: "50 Litres",
    groundClearance: "190 mm",
    imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    description: "India's highest selling mid-size SUV featuring panoramic sunroof, ADAS safety suite, connected car technology, and premium cabin comfort."
  },
  {
    id: "car-3",
    type: "car",
    brand: "Mahindra",
    model: "Thar",
    price: "₹11.35 - 17.60 Lakh",
    priceValue: 11.35,
    fuel: "Diesel",
    engine: "2184 cc",
    transmission: "Manual / 4x4",
    mileage: "15.2 km/l",
    seating: "4 Seater",
    bodyType: "Off-Road SUV",
    power: "130 bhp @ 3750 rpm",
    torque: "300 Nm @ 1600 rpm",
    fuelTank: "57 Litres",
    groundClearance: "226 mm",
    imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    description: "True adventure vehicle with 4x4 mechanical locking differential, convertible hardtop options, and legendary road presence."
  },
  {
    id: "car-4",
    type: "car",
    brand: "Tata",
    model: "Nexon",
    price: "₹8.15 - 15.80 Lakh",
    priceValue: 8.15,
    fuel: "Petrol",
    engine: "1199 cc Turbo",
    transmission: "Manual / DCA",
    mileage: "17.44 km/l",
    seating: "5 Seater",
    bodyType: "Compact SUV",
    power: "118 bhp @ 5500 rpm",
    torque: "170 Nm @ 1750 rpm",
    fuelTank: "44 Litres",
    groundClearance: "208 mm",
    imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    description: "5-Star Global NCAP safety champion with futuristic digital cockpit, expressive bi-LED headlights, and high fuel economy."
  },
  {
    id: "car-5",
    type: "car",
    brand: "Honda",
    model: "City",
    price: "₹12.08 - 16.35 Lakh",
    priceValue: 12.08,
    fuel: "Petrol",
    engine: "1498 cc i-VTEC",
    transmission: "CVT / Manual",
    mileage: "18.4 km/l",
    seating: "5 Seater",
    bodyType: "Sedan",
    power: "119 bhp @ 6600 rpm",
    torque: "145 Nm @ 4300 rpm",
    fuelTank: "40 Litres",
    groundClearance: "165 mm",
    imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    description: "The benchmark midsize sedan with legendary refined i-VTEC revving engine, plush rear sofa seats, and Honda SENSING safety."
  },
  {
    id: "car-6",
    type: "car",
    brand: "Maruti Suzuki",
    model: "Swift",
    price: "₹6.49 - 9.60 Lakh",
    priceValue: 6.49,
    fuel: "Petrol",
    engine: "1197 cc Z-Series",
    transmission: "Manual / AGS",
    mileage: "24.8 km/l",
    seating: "5 Seater",
    bodyType: "Hatchback",
    power: "80.4 bhp @ 5700 rpm",
    torque: "111.7 Nm @ 4300 rpm",
    fuelTank: "37 Litres",
    groundClearance: "163 mm",
    imageUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
    description: "India's beloved peppy hatchback with outstanding mileage, six standard airbags, agile cornering, and effortless city driveability."
  },
  {
    id: "car-7",
    type: "car",
    brand: "BMW",
    model: "3 Series Gran Limousine",
    price: "₹60.60 - 62.00 Lakh",
    priceValue: 60.60,
    fuel: "Petrol",
    engine: "1998 cc TwinPower Turbo",
    transmission: "8-Speed Automatic",
    mileage: "15.3 km/l",
    seating: "5 Seater",
    bodyType: "Luxury Sedan",
    power: "255 bhp @ 5000 rpm",
    torque: "400 Nm @ 1550 rpm",
    fuelTank: "59 Litres",
    groundClearance: "135 mm",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    description: "Ultimate driving machine delivering sheer driving pleasure with long wheelbase, curved display, and panoramic sunroof."
  },
  {
    id: "car-8",
    type: "car",
    brand: "Kia",
    model: "Seltos",
    price: "₹10.90 - 20.35 Lakh",
    priceValue: 10.90,
    fuel: "Diesel",
    engine: "1493 cc CRDi",
    transmission: "6-Speed Automatic",
    mileage: "19.1 km/l",
    seating: "5 Seater",
    bodyType: "Compact SUV",
    power: "114 bhp @ 4000 rpm",
    torque: "250 Nm @ 1500 rpm",
    fuelTank: "50 Litres",
    groundClearance: "190 mm",
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    description: "Bold styling, dual-pane panoramic sunroof, ventilated front seats, and responsive diesel powertrain."
  }
];

const fallbackBikes = [
  {
    id: "bike-1",
    type: "bike",
    brand: "Yamaha",
    model: "YZF R15 V4",
    price: "₹1.83 - 1.98 Lakh",
    priceValue: 1.83,
    fuel: "Petrol",
    engine: "155 cc Liquid Cooled",
    transmission: "6-Speed with Quick Shifter",
    mileage: "45 km/l",
    seating: "2 Seater",
    bodyType: "Sports Bike",
    power: "18.4 PS @ 10000 rpm",
    torque: "14.2 Nm @ 7500 rpm",
    fuelTank: "11 Litres",
    groundClearance: "170 mm",
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    description: "Supersport racing DNA with Variable Valve Actuation (VVA), upside down USD forks, traction control, and Bluetooth Y-Connect."
  },
  {
    id: "bike-2",
    type: "bike",
    brand: "Royal Enfield",
    model: "Classic 350",
    price: "₹1.93 - 2.30 Lakh",
    priceValue: 1.93,
    fuel: "Petrol",
    engine: "349 cc J-Series",
    transmission: "5-Speed Manual",
    mileage: "36 km/l",
    seating: "2 Seater",
    bodyType: "Cruiser / Retro",
    power: "20.2 bhp @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    fuelTank: "13 Litres",
    groundClearance: "170 mm",
    imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    description: "Timeless vintage charm combined with a smooth counter-balanced engine, relaxed highway ergonomics, and signature thump."
  },
  {
    id: "bike-3",
    type: "bike",
    brand: "KTM",
    model: "390 Duke",
    price: "₹3.11 Lakh",
    priceValue: 3.11,
    fuel: "Petrol",
    engine: "399 cc Liquid Cooled",
    transmission: "6-Speed with Slipper Clutch",
    mileage: "29 km/l",
    seating: "2 Seater",
    bodyType: "Naked Street",
    power: "46 PS @ 8500 rpm",
    torque: "39 Nm @ 6500 rpm",
    fuelTank: "15 Litres",
    groundClearance: "183 mm",
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    description: "The 'Corner Rocket' packing thrilling power-to-weight ratio, launch control, TFT display with turn navigation, and WP APEX adjustable suspension."
  },
  {
    id: "bike-4",
    type: "bike",
    brand: "Honda",
    model: "Activa 6G",
    price: "₹76,684 - 82,684",
    priceValue: 0.77,
    fuel: "Petrol",
    engine: "109.51 cc eSP",
    transmission: "Automatic (CVT)",
    mileage: "50 km/l",
    seating: "2 Seater",
    bodyType: "Scooter",
    power: "7.84 PS @ 8000 rpm",
    torque: "8.90 Nm @ 5500 rpm",
    fuelTank: "5.3 Litres",
    groundClearance: "162 mm",
    imageUrl: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80",
    description: "India's undisputed family scooter with silent start ACG system, external fuel filler, durable metal body, and effortless commute."
  },
  {
    id: "bike-5",
    type: "bike",
    brand: "Bajaj",
    model: "Pulsar NS200",
    price: "₹1.49 - 1.58 Lakh",
    priceValue: 1.49,
    fuel: "Petrol",
    engine: "199.5 cc Triple Spark DTS-i",
    transmission: "6-Speed Manual",
    mileage: "37 km/l",
    seating: "2 Seater",
    bodyType: "Naked Sport",
    power: "24.5 PS @ 9750 rpm",
    torque: "18.74 Nm @ 8000 rpm",
    fuelTank: "12 Litres",
    groundClearance: "168 mm",
    imageUrl: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80",
    description: "Aggressive streetfighter with perimeter frame, inverted USD forks, dual-channel ABS, and explosive high-rev power."
  },
  {
    id: "bike-6",
    type: "bike",
    brand: "Kawasaki",
    model: "Ninja 400",
    price: "₹5.24 Lakh",
    priceValue: 5.24,
    fuel: "Petrol",
    engine: "399 cc Parallel Twin",
    transmission: "6-Speed Manual",
    mileage: "24 km/l",
    seating: "2 Seater",
    bodyType: "Supersport",
    power: "45 PS @ 10000 rpm",
    torque: "37 Nm @ 8000 rpm",
    fuelTank: "14 Litres",
    groundClearance: "140 mm",
    imageUrl: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80",
    description: "Twin-cylinder sports bike with lightweight trellis chassis, iconic Kawasaki Racing Team styling, and smooth linear torque."
  },
  {
    id: "bike-7",
    type: "bike",
    brand: "TVS",
    model: "Apache RTR 160 4V",
    price: "₹1.24 - 1.38 Lakh",
    priceValue: 1.24,
    fuel: "Petrol",
    engine: "159.7 cc Oil Cooled",
    transmission: "5-Speed Manual",
    mileage: "47 km/l",
    seating: "2 Seater",
    bodyType: "Commuter / Sport",
    power: "17.55 PS @ 9250 rpm",
    torque: "14.73 Nm @ 7250 rpm",
    fuelTank: "12 Litres",
    groundClearance: "180 mm",
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    description: "Track-tuned sports commuter with riding modes (Sport, Urban, Rain), Glide Through Technology (GTT), and dual-channel ABS."
  },
  {
    id: "bike-8",
    type: "bike",
    brand: "Suzuki",
    model: "Hayabusa",
    price: "₹16.90 Lakh",
    priceValue: 16.90,
    fuel: "Petrol",
    engine: "1340 cc In-line 4",
    transmission: "6-Speed Bi-directional Quickshifter",
    mileage: "18 km/l",
    seating: "2 Seater",
    bodyType: "Hyper Sport Tourer",
    power: "190 PS @ 9700 rpm",
    torque: "150 Nm @ 7000 rpm",
    fuelTank: "20 Litres",
    groundClearance: "125 mm",
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    description: "The legendary hyperbike aerodynamic masterclass equipped with Suzuki Intelligent Ride System (S.I.R.S.), launch control, and cruise control."
  }
];

// ===================================================================
// 2. VEHICLE API SERVICE LAYER
// Designed to attempt live API fetch with graceful fallback to curated datasets.
// Easily swap EXTERNAL_API_ENDPOINT when an active paid or public key is added.
// ===================================================================

const VehicleService = {
  // Configurable external API endpoint (leave null or add API URL)
  EXTERNAL_API_BASE: null, // e.g. "https://api.example.com/vehicles"

  /**
   * Fetches vehicles by type ('car' | 'bike')
   * Returns: { vehicles: Array, isLiveApi: boolean, sourceLabel: string }
   */
  async getVehicles(type = "car") {
    // Check if live API endpoint is configured
    if (this.EXTERNAL_API_BASE) {
      try {
        console.log(`[VehicleService] Attempting to fetch ${type}s from external API...`);
        const response = await fetch(`${this.EXTERNAL_API_BASE}?type=${type}`, {
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          const apiData = await response.json();
          if (Array.isArray(apiData) && apiData.length > 0) {
            return {
              vehicles: apiData,
              isLiveApi: true,
              sourceLabel: "Live Vehicle API"
            };
          }
        }
      } catch (apiError) {
        console.warn(`[VehicleService] External API failed or unreachable:`, apiError);
        console.info(`[VehicleService] Switching to curated fallback dataset for ${type}s.`);
      }
    }

    // Curated Academic Demo Dataset Fallback
    const fallbackList = type === "bike" ? fallbackBikes : fallbackCars;
    return {
      vehicles: fallbackList,
      isLiveApi: false,
      sourceLabel: "Curated Demo Dataset (API Fallback)"
    };
  },

  /**
   * Retrieves single vehicle by combined ID (e.g., 'car-1', 'bike-2' or '1' with type)
   */
  async getVehicleById(vehicleId, typeHint = null) {
    if (!vehicleId) return null;
    const strId = String(vehicleId);

    // If explicit type hint or car prefix
    if (typeHint === "car" || strId.startsWith("car")) {
      const { vehicles: cars } = await this.getVehicles("car");
      return cars.find(v => v.id === strId || v.id === `car-${strId}`) || null;
    }

    if (typeHint === "bike" || strId.startsWith("bike")) {
      const { vehicles: bikes } = await this.getVehicles("bike");
      return bikes.find(v => v.id === strId || v.id === `bike-${strId}`) || null;
    }

    // Search both if type is unspecified
    const { vehicles: cars } = await this.getVehicles("car");
    const foundCar = cars.find(v => v.id === strId || v.id === `car-${strId}`);
    if (foundCar) return foundCar;

    const { vehicles: bikes } = await this.getVehicles("bike");
    return bikes.find(v => v.id === strId || v.id === `bike-${strId}`) || null;
  },

  /**
   * Filter and search vehicles based on user input
   */
  filterVehicles(vehicles, { query = "", brand = "all", fuel = "all", transmission = "all" }) {
    const q = query.toLowerCase().trim();

    return vehicles.filter(v => {
      // Query filter
      const matchesQuery = !q ||
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        (v.bodyType && v.bodyType.toLowerCase().includes(q));

      // Brand filter
      const matchesBrand = brand === "all" || v.brand.toLowerCase() === brand.toLowerCase();

      // Fuel filter
      const matchesFuel = fuel === "all" || v.fuel.toLowerCase().includes(fuel.toLowerCase());

      // Transmission filter
      const matchesTrans = transmission === "all" ||
        (v.transmission && v.transmission.toLowerCase().includes(transmission.toLowerCase()));

      return matchesQuery && matchesBrand && matchesFuel && matchesTrans;
    });
  },

  /**
   * Get distinct brands from vehicle list for dropdown filter
   */
  getDistinctBrands(vehicles) {
    const brands = new Set(vehicles.map(v => v.brand));
    return Array.from(brands).sort();
  }
};
