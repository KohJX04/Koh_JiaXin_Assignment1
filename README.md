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
            roomNumber: <int>,
            type: <string> "Single","Double","Suite"
            status: <String> "Available","Occuptied"
            ratingPerNight: <float> $$
            currentGuestID: <null> by default it should be empty  
        },
        {
            roomNumber: <int>,
            type: <string> "Single","Double","Suite"
            status: <String> "Available","Occuptied"
            ratingPerNight: <float> $$
            currentGuestID: <null> by default it should be empty  
        },
        ... nth rooms 
    ]
### staff
    staff = [
        
    ]
### guest
### houseKeepingTask

## Function
    The module will include five functions realted to hotel management:

###  Add Guest


### CheckinGuest

### CheckOutGuest

### AssignHouseKeeping

### PrintHotelSummary



## How to install the assigment 
### Clone the assigment and Local Set up
    1.Go to the the NYP github and choose the file you like and open the file.
    2.Once the site is open, click on the green '<>code' button and download it as a zip file or open it with 'Open with GirHub Desktop'
    3.Once the file has been installed into your own local computer, open the CMD terminal and paste the project's parent folder path. Example : "C:\Users\*********\github\Koh_JiaXin_Assignment1"
    by the way: node.js need to be downloaded before hand. HAHAHHAHAHA
    4.Once the CMD termianl is in the correct file path paste this code "npm install" --> this will install package.json file and all the node dependencies needed 
    5.Paste the code "npm install -g nodemon" this is to install the nodemon --> the auto version
    6.Paste the nodemon KohJIaXin_AventurineHotel.js --> this is the file you need to auto update
    7.The set up is done




# References
Provide the references that you have used to support your assignment. 