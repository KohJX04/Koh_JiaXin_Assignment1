// app.js
// This file imports and uses the hotelManager_yiZhen module

const hotel = require("./KohJIaXin_AventurineHotel.js");

// 1. Add a new guest
hotel.addGuest({
  guestID: 3,
  name: "Furina",
  phone: "9999 9999"
});

// 2. Check in the new guest to room 101 for 2 nights
hotel.checkInGuest({
  guestID: 3,
  roomNumber: 101,
  nights: 2
});

// 3. Print current hotel summary
hotel.printHotelSummary();

// 4. Check out the guest from room 101
hotel.checkOutGuest({ roomNumber: 101 });

// 5. Assign housekeeping to clean room 101 (Kakavasha: staffID 2)
hotel.assignHousekeeping({
  roomNumber: 101,
  staffID: 2
});

// 6. Complete housekeeping task
hotel.completeHousekeeping({
  roomNumber: 101,
  staffID: 2
});

// 7. Final summary
hotel.printHotelSummary();
