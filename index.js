const express = require('express')
const app = express();
app.use(express.json());
const PORT = 8000


//Local variable data
const rooms = [
  {
    roomID: 0,
    roomName: "100",
    noOfSeatsAvailable: "3",
    amenities: ["AC", "WIFI", "LED TV", "Bright lights"],
    pricePerHr: 100,
    bookedStatus: false,
    customerDetails: {
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  },
  {
    roomID: 1,
    roomName: "101",
    noOfSeatsAvailable: "2",
    amenities: ["Projector", "WIFI", "LED TV", "Clup"],
    pricePerHr: 100,
    bookedStatus: true,
    customerDetails: {
      customerName: "Ajith",
      date: "07/02/2023",
      startTime: "11:00AM",
      endTime: "12:00",
    },
  },
  {
    roomID: 2,
    roomName: "102",
    noOfSeatsAvailable: "2",
    amenities: ["Hot shower", "WIFI", "Bright lights", "HI-FI"],
    pricePerHr: 100,
    bookedStatus: true,
    customerDetails: {
      customerName: "Vasanth",
      date: "10/02/2023",
      startTime: "10:00AM",
      endTime: "12:00PM",
    },
  },
  {
    roomID: 3,
    roomName: "103",
    noOfSeatsAvailable: "2",
    amenities: ["Hot shower", "WIFI", "AC", "Room service"],
    pricePerHr: 100,
    bookedStatus: false, 
    customerDetails: {
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  },
  {
    roomID: 4,
    roomName: "104",
    noOfSeatsAvailable: "2",
    amenities: ["Hot shower", "WIFI", "color lights", "AC"],
    pricePerHr: 100,
    bookedStatus: true,
    customerDetails: {
      customerName: "Dinesh",
      date: "16/02/2023",
      startTime: "12:00PM",
      endTime: "2:00PM",
    },
  },
];

//Home page route
app.get("/", (request, response) => {
  response.send("Hall Booking API");
});

//Create a Room
app.post('/rooms/create',(request, response)=>{

    const newRoom = request.body
    rooms.push(newRoom)
    response.send(newRoom)
})

//Booking a Room
app.post('/rooms', (request, response) => {
    const booking = request.body;
  
      rooms.map((room) => {
          if (room.roomID == booking.roomID) {
            console.log(room);
              if (room.customerDetails.date != booking.date) {
                  room.customerDetails.customerName = booking.customerName;
                  room.customerDetails.date = booking.date;
                  room.customerDetails.startTime = booking.startTime;
                  room.customerDetails.endTime = booking.endTime;
                  room.bookedStatus =! room.bookedStatus;
                  response.send("Room booked successfully")
              } else {
                  response.send("Room already booked for that date")
              }
          }
          return room;
      })
  })


//List all Rooms with booked data 
app.get('/rooms',(request, response)=>{
    response.send(
        rooms.map((room)=>{
            if(room.bookedStatus == true){
                return{
                    "Room name":room.roomName,
                    "Booked Status":"Booked",
                    "Customer Name":room.customerDetails.customerName,
                    "Date":room.customerDetails.date,
                    "StartTime":room.customerDetails.startTime,
                    "EndTime":room.customerDetails.endTime,
                }
            }else{
                return{
                    "Room name":room.roomName,
                    "Booked Status":"Vacant"
                }
            }
        })
    )
})  

//List all customers with booked data
app.get("/customers", (request, response) => {
    response.send(
      rooms.filter((room) => {
          if (room.bookedStatus === true) {
            return room;
          }
        })
        .map((room) => {
          return {
            "Customer name": room.customerDetails.customerName,
            "Room name": room.roomName,
            "Date": room.customerDetails.date,
            "Start Time": room.customerDetails.startTime,
            "End Time": room.customerDetails.endTime,
          };
        })
    );
  });


app.listen(PORT,() => console.log("Server Listening to", PORT));