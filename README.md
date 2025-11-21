# Assignment 1
## Overview 
    This project is a Node.js module that simulates a small hotel management system. It allows staff to manage rooms, guests, check-ins, check-outs, and housekeeping tasks.

    The purpose of this assignment is to design a backend module inspired by an existing web application — in this case, a hotel booking / hotel management system.

    This module is built without a real database; instead, arrays are used to store dummy data, as required by the assignment.

## Modules
 This will contain all the map (key and value pair) of the the necessary data needed for the functions to work.
### rooms
    room =[
        {
            roomNumber: <Int>,
            type: <string> "Single","Double","Suite"
            status: <String> "Available","Occuptied"
            ratingPerNight: <float> $$
            currentGuestID: <null> by default it should be empty  
        },
        {},
        ... nth rooms 
    ]
### staff
    staff = [
        {
            staffID: <Int>
            name: <String>
            role: <String> "Housekeeping" it is the only relevant role
        },
        {},
        ....nth employee
    ]
### guest
    guest = [
        {
            guestID: <Int>, 
            name: <String>, 
            phone: <Int>
        },
        {},
        ....nth customer
    ]

### houseKeepingTask
    housekeepingTasks = [
        { 
            roomNumber: <Int>, 
            staffID: <Int>, 
            status: <String> 
        },
        {},
        ....nth task
    ]



## Function
    The module will include five functions realted to hotel management:

###  Add Guest
    Adds a new guest into the hotel’s guest database. 

    addGuest(newGuest) {
    const existingGuest = guests.find(g => g.guestID === newGuest.guestID); --> check if guest is already inside the database 

    if (!existingGuest) { --> if guest does not exsit
      guests.push(newGuest);
      console.log(`Guest ${newGuest.name} has been successfully added.`); --> add guest 
    } else {
      console.log(`Guest with ID ${newGuest.guestID} already exists.`);
    }

    console.log("Current guest list:"); 
    guests.forEach(g => {
      console.log(`Guest: ${g.name}, ID: ${g.guestID}, Phone: ${g.phone}`); --> print guest
    });
  },

### RemoveGuest
      removeGuest(guestParam) {
    const guestEntry = guests.find(g => g.guestID === guestParam.guestID);  --> check if guest is already inside the database 

    if (guestEntry) {       --> if the guest is found insinde 
      const updatedGuestList = guests.filter(
        g => g.guestID !== guestParam.guestID
      ); --> create a new guestlist without the the guest
      guests.length = 0; --> clear original array
      guests.push(...updatedGuestList); --> replace with filtered list 

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


### CheckinGuest
    Checks in a guest to a chosen room (if available).

    checkInGuest(booking) {
    const guest = findGuest(booking.guestID);
    const room = findRoom(booking.roomNumber);

    if (!guest) {
      console.log(`Guest with ID ${booking.guestID} not found.`);   --> check guest is valid 
      return;
    }

    if (!room) {
      console.log(`Room ${booking.roomNumber} does not exist.`); --> check if room is valid
      return;
    }

    if (room.status !== "available") {
      console.log(
        `Room ${room.roomNumber} is not available. Current status: ${room.status}` --> check status
      );
      return;
    }

    room.status = "occupied";
    room.currentGuestID = guest.guestID; --> this will update the Null fields
    room.nightsBooked = booking.nights;  --> this is temporarily so in the room field actually i dont need to add iniside 



    console.log(
      `Check-in successful: ${guest.name} to Room ${room.roomNumber} for ${booking.nights} night(s).`
    );
  },


### CheckOutGuest
    Checks out a guest, calculates the bill, and sets the room to cleaning status.

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
    room.currentGuestID = null; --> return the number of customers back to Null
    delete room.nightsBooked; --> remove this field because it is temporarily only

    console.log(`Room ${room.roomNumber} set to 'cleaning' status.`);
  },


### AssignHouseKeeping
    Assigns a housekeeping staff to clean a room.

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

### CompleteHouseKeeping
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



### PrintHotelSummary
    Displays a hotel dashboard:
        All rooms
        All guests
        All housekeeping tasks

        
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




## How to install the assigment 
### Clone the assigment and Local Set up
    1.Go to the the NYP github and choose the file you like and open the file.
    2.Once the site is open, click on the green '<>code' button and download it as a zip file or open it with 'Open with GirHub Desktop'
    3.Once the file has been installed into your own local computer, open the CMD terminal and paste the project's parent folder path. Example : "C:\Users\*********\github\Koh_JiaXin_Assignment1"
    by the way: node.js need to be downloaded before hand. HAHAHHAHAHA
    4.Once the CMD termianl is in the correct file path paste this code "npm install" --> this will install package.json file and all the node dependencies needed 
    5.Paste the code "npm install -g nodemon" this is to install the nodemon --> the auto version
    6.Paste the nodemon app.js --> this is the file you need to auto update
    7.The set up is done




# References
Provide the references that you have used to support your assignment. 