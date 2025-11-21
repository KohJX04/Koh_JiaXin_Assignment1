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

### CheckinGuest
    Checks in a guest to a chosen room (if available).

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
    room.currentGuestID = null;
    delete room.nightsBooked;

    console.log(`Room ${room.roomNumber} set to 'cleaning' status.`);
  },
  

### AssignHouseKeeping
    Assigns a housekeeping staff to clean a room.

### PrintHotelSummary
    Displays a hotel dashboard:
        All rooms
        All guests
        All housekeeping tasks


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