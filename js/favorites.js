/**
 * VehicleHub - Favorites Module (favorites.js)
 * Manages saving and removing favorite vehicles in Supabase Database
 * with fallback storage for academic offline demo mode.
 */

const FavoritesService = {
  /**
   * Fetch all favorites for the given authenticated user
   */
  async getFavorites(userId) {
    if (!userId) return [];

    if (isSupabaseConfigured() && supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("favorites")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error("Error fetching favorites from Supabase:", err);
      }
    }

    // Local Storage Fallback Mode
    const local = localStorage.getItem(`vehiclehub_favs_${userId}`) || localStorage.getItem(`autofinder_favs_${userId}`);
    return local ? JSON.parse(local) : [];
  },

  /**
   * Check if a specific vehicle is favorited by the user
   */
  async isFavorite(userId, vehicleId) {
    if (!userId || !vehicleId) return false;
    const favs = await this.getFavorites(userId);
    return favs.some(f => f.vehicle_id === vehicleId);
  },

  /**
   * Add a vehicle to user favorites
   */
  async addFavorite(userId, vehicle) {
    if (!userId || !vehicle) return false;

    const favoriteRecord = {
      user_id: userId,
      vehicle_id: vehicle.id,
      vehicle_type: vehicle.type || (vehicle.id.startsWith("bike") ? "bike" : "car"),
      brand: vehicle.brand,
      model: vehicle.model,
      price: vehicle.price,
      image_url: vehicle.imageUrl,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from("favorites")
          .insert([favoriteRecord]);

        if (error) throw error;
        showToast(`Added ${vehicle.brand} ${vehicle.model} to Favorites!`, "success");
        return true;
      } catch (err) {
        console.error("Supabase insert favorite error:", err);
        showToast("Failed to save to cloud favorites.", "error");
        return false;
      }
    }

    // Local Storage Fallback
    const favs = await this.getFavorites(userId);
    if (!favs.some(f => f.vehicle_id === vehicle.id)) {
      favoriteRecord.id = "local-fav-" + Date.now();
      favs.unshift(favoriteRecord);
      localStorage.setItem(`vehiclehub_favs_${userId}`, JSON.stringify(favs));
    }
    showToast(`Added ${vehicle.brand} ${vehicle.model} to Favorites!`, "success");
    return true;
  },

  /**
   * Remove a vehicle from user favorites
   */
  async removeFavorite(userId, vehicleId) {
    if (!userId || !vehicleId) return false;

    if (isSupabaseConfigured() && supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("vehicle_id", vehicleId);

        if (error) throw error;
        showToast("Removed from Favorites.", "info");
        return true;
      } catch (err) {
        console.error("Supabase delete favorite error:", err);
        showToast("Failed to remove favorite from cloud.", "error");
        return false;
      }
    }

    // Local Storage Fallback
    let favs = await this.getFavorites(userId);
    favs = favs.filter(f => f.vehicle_id !== vehicleId);
    localStorage.setItem(`vehiclehub_favs_${userId}`, JSON.stringify(favs));
    showToast("Removed from Favorites.", "info");
    return true;
  },

  /**
   * Toggle favorite state for a vehicle
   */
  async toggleFavorite(userId, vehicle, buttonEl = null) {
    const isFav = await this.isFavorite(userId, vehicle.id);
    if (isFav) {
      await this.removeFavorite(userId, vehicle.id);
      if (buttonEl) {
        buttonEl.classList.remove("active");
        buttonEl.innerHTML = "🤍";
      }
      return false;
    } else {
      await this.addFavorite(userId, vehicle);
      if (buttonEl) {
        buttonEl.classList.add("active");
        buttonEl.innerHTML = "❤️";
      }
      return true;
    }
  }
};
