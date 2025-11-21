const rooms = [
  {
    roomNumber: 101,
    type: "Single",
    status: "available", // 'available', 'occupied', 'cleaning'
    ratePerNight: 120,
    currentGuestID: null
  },
  {
    roomNumber: 102,
    type: "Double",
    status: "available",
    ratePerNight: 160,
    currentGuestID: null
  },
  {
    roomNumber: 201,
    type: "Suite",
    status: "available",
    ratePerNight: 11250,
    currentGuestID: null
  }
];

const staff = [
  { staffID: 1, name: "Aven", role: "Housekeeping" },
  { staffID: 2, name: "Kakavasha", role: "Housekeeping" },
  { staffID: 3, name: "Jade", role: "Housekeeping"},
  { staffID: 4, name: "Topaz", role: "Housekeeping" }
];

const guests = [
  { guestID: 1, name: "Khaslana", phone: "3355 0336" },
  { guestID: 2, name: "Bladie", phone: "5252 6660" }
];

const housekeepingTasks = [
 { roomNumber: 101, staffID: 2, status: 'pending' }
 ]; 


// Find a room by roomNumber
function findRoom(roomNumber) {
  return rooms.find(r => r.roomNumber === roomNumber);
}

// Find a guest by guestID
function findGuest(guestID) {
  return guests.find(g => g.guestID === guestID);
}



module.exports = {

  addGuest(newGuest) {
    const existingGuest = guests.find(g => g.guestID === newGuest.guestID);

    if (!existingGuest) {
      guests.push(newGuest);
      console.log(`Guest ${newGuest.name} has been successfully added.`);
    } else {
      console.log(`Guest with ID ${newGuest.guestID} already exists.`);
    }

    console.log("Current guest list:");
    guests.forEach(g => {
      console.log(`Guest: ${g.name}, ID: ${g.guestID}, Phone: ${g.phone}`);
    });
  },

  /**
   * Remove a guest from the guest list (e.g. blacklist / delete profile).
   * guestParam: { guestID: number }
   */
  removeGuest(guestParam) {
    const guestEntry = guests.find(g => g.guestID === guestParam.guestID);

    if (guestEntry) {
      const updatedGuestList = guests.filter(
        g => g.guestID !== guestParam.guestID
      );
      guests.length = 0; // clear original array
      guests.push(...updatedGuestList); // replace with filtered list

      console.log(
        `Guest with ID ${guestParam.guestID} has been removed from records.`
      );
      console.log("Updated guest list:");
      guests.forEach(g => {
        console.log(`Guest: ${g.name}, ID: ${g.guestID}`);
      });
    } else {
      console.log(`Guest with ID ${guestParam.guestID} cannot be found.`);
    }
  },

  /**
   * Check in a guest to a room.
   * booking: { guestID, roomNumber, nights }
   * - Only allows check-in if room is 'available'.
   */
  checkInGuest(booking) {
    const guest = findGuest(booking.guestID);
    const room = findRoom(booking.roomNumber);

    if (!guest) {
      console.log(`Guest with ID ${booking.guestID} not found.`);
      return;
    }

    if (!room) {
      console.log(`Room ${booking.roomNumber} does not exist.`);
      return;
    }

    if (room.status !== "available") {
      console.log(
        `Room ${room.roomNumber} is not available. Current status: ${room.status}`
      );
      return;
    }

    room.status = "occupied";
    room.currentGuestID = guest.guestID;
    room.nightsBooked = booking.nights;

    console.log(
      `Check-in successful: ${guest.name} to Room ${room.roomNumber} for ${booking.nights} night(s).`
    );
  },

  /**
   * Check out a guest from a room.
   * checkOutInfo: { roomNumber }
   * - Calculates total bill based on nightsBooked * ratePerNight.
   * - Sets room back to 'cleaning' status (waiting for housekeeping).
   */
  checkOutGuest(checkOutInfo) {
    const room = findRoom(checkOutInfo.roomNumber);

    if (!room) {
      console.log(`Room ${checkOutInfo.roomNumber} does not exist.`);
      return;
    }

    if (room.status !== "occupied" || room.currentGuestID === null) {
      console.log(
        `Room ${room.roomNumber} is not currently occupied, cannot check out.`
      );
      return;
    }

    const guest = findGuest(room.currentGuestID);
    const nights = room.nightsBooked || 1;
    const totalBill = nights * room.ratePerNight;

    console.log(
      `Check-out successful for ${guest ? guest.name : "Unknown Guest"} from Room ${room.roomNumber}.`
    );
    console.log(
      `Stay: ${nights} night(s) x $${room.ratePerNight} = $${totalBill}`
    );

    // After check-out: mark room for cleaning
    room.status = "cleaning";
    room.currentGuestID = null;
    delete room.nightsBooked;

    console.log(`Room ${room.roomNumber} set to 'cleaning' status.`);
  },

  /**
   * Assign a housekeeping staff to clean a room.
   * taskInfo: { roomNumber, staffID }
   */
  assignHousekeeping(taskInfo) {
    const room = findRoom(taskInfo.roomNumber);
    const staffMember = staff.find(s => s.staffID === taskInfo.staffID);

    if (!room) {
      console.log(`Room ${taskInfo.roomNumber} does not exist.`);
      return;
    }

    if (!staffMember || staffMember.role !== "Housekeeping") {
      console.log(
        `Staff with ID ${taskInfo.staffID} is not a housekeeping staff or does not exist.`
      );
      return;
    }

    housekeepingTasks.push({
      roomNumber: room.roomNumber,
      staffID: staffMember.staffID,
      status: "pending"
    });

    console.log(
      `Assigned ${staffMember.name} to clean Room ${room.roomNumber}.`
    );
  },

  /**
   * Mark a housekeeping task as completed and set room to 'available'.
   * completeInfo: { roomNumber, staffID }
   */
  completeHousekeeping(completeInfo) {
    const task = housekeepingTasks.find(
      t =>
        t.roomNumber === completeInfo.roomNumber &&
        t.staffID === completeInfo.staffID &&
        t.status === "pending"
    );
    const room = findRoom(completeInfo.roomNumber);

    if (!task) {
      console.log(
        `No pending housekeeping task found for Room ${completeInfo.roomNumber} and Staff ${completeInfo.staffID}.`
      );
      return;
    }

    task.status = "completed";
    if (room && room.status === "cleaning") {
      room.status = "available";
      console.log(
        `Housekeeping completed for Room ${room.roomNumber}. Room is now available.`
      );
    } else {
      console.log(
        `Task completed, but Room ${completeInfo.roomNumber} is not in 'cleaning' status.`
      );
    }
  },

  /**
   * Simple function to print current hotel summary:
   * - Rooms and status
   * - Guests
   * - Housekeeping tasks
   */
  printHotelSummary() {
    console.log("===== HOTEL SUMMARY =====");
    console.log("Rooms:");
    rooms.forEach(r => {
      console.log(
        `Room ${r.roomNumber} (${r.type}) - Status: ${r.status}, Rate: $${r.ratePerNight}, GuestID: ${r.currentGuestID}`
      );
    });

    console.log("\nGuests:");
    guests.forEach(g => {
      console.log(`Guest: ${g.name}, ID: ${g.guestID}, Phone: ${g.phone}`);
    });

    console.log("\nHousekeeping Tasks:");
    if (housekeepingTasks.length === 0) {
      console.log("No housekeeping tasks at the moment.");
    } else {
      housekeepingTasks.forEach(t => {
        console.log(
          `Room ${t.roomNumber}, StaffID: ${t.staffID}, Status: ${t.status}`
        );
      });
    }
    console.log("=========================\n");
  }
};
