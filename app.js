

const hotel = require("./KohJIaXin_AventurineHotel.js");
console.log("\n================ TEST 1: BASIC CHECK-IN / CHECK-OUT / CLEANING ==============");

hotel.addGuest({
  guestID: 3,
  name: "Wanderer",
  phone: "9999 0000"
});

hotel.checkInGuest({
  guestID: 3,
  roomNumber: 101,
  nights: 2
});

hotel.printHotelSummary();

hotel.checkOutGuest({ roomNumber: 101 });

hotel.assignHousekeeping({
  roomNumber: 101,
  staffID: 2 
});

hotel.completeHousekeeping({
  roomNumber: 101,
  staffID: 2
});

hotel.printHotelSummary();


// =============== TEST 2: Check-out edge cases ===============
console.log("\n================ TEST 2: CHECK-OUT EDGE CASES ==============");

// 2A: Try to check out a room that doesn't exist
hotel.checkOutGuest({ roomNumber: 999 });

// 2B: Try to check out a room that is not occupied (already available/clean)
hotel.checkOutGuest({ roomNumber: 101 }); // should say cannot check out


// =============== TEST 3: Housekeeping edge cases ===============
console.log("\n=============== TEST 3: HOUSEKEEPING EDGE CASES ===============");

// 3A: Try to complete housekeeping without assigning task first
hotel.completeHousekeeping({
  roomNumber: 102,
  staffID: 2
});

// 3B: Try to assign housekeeping with staff that is NOT housekeeping
hotel.assignHousekeeping({
  roomNumber: 102,
  staffID: 1 
});



console.log("\n================ TEST 4: REUSE ROOM AFTER CLEANING ===============");


hotel.checkInGuest({
  guestID: 2,
  roomNumber: 101,
  nights: 1
});

hotel.printHotelSummary();
hotel.checkOutGuest({ roomNumber: 101 });

hotel.assignHousekeeping({
  roomNumber: 101,
  staffID: 2
});
hotel.completeHousekeeping({
  roomNumber: 101,
  staffID: 2
});


hotel.checkInGuest({
  guestID: 1,
  roomNumber: 101,
  nights: 3
});

hotel.printHotelSummary();


// =============== TEST 5: Remove a guest record ===============
console.log("\n================ TEST 5: REMOVE GUEST RECORD ===============");

// Remove Goofy (guestID 3) from the system
hotel.removeGuest({ guestID: 3 });

// Final hotel snapshot
hotel.printHotelSummary();
