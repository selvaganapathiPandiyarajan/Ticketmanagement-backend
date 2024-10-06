const express = require("express");
const mongoose = require("mongoose"); 
const cors = require('cors');
const employeeData = require("./employeeSchema.js"); 
const ticketData=require("./ticketSchema.js");
const { connectToDatabase } = require("./dbconnection.js");
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

 
  app.post("/employeeDetails", async (req, res) => {
    await connectToDatabase();
    const { firstname, lastname, email, password, conpassword, designation,otpValue,category } = req.body;
    const getemployeedata = new employeeData({
      firstname: firstname,
      lastname:lastname,
      email: email,
      password: password,
      conpassword:conpassword,
      designation: designation, 
      otpValue: otpValue,
      category:category
    });
    try {
      const saveEmployeedata = await getemployeedata.save(); 
      console.log(getemployeedata);
      if (saveEmployeedata) {
        res.json(saveEmployeedata);
      } else {
        res.send("not stored data ");
      }
    } catch (err) {
      res.send("Error", err);
    } 
  }); 
  app.get("/getemployee/:email/:password", async (req, res) => {

  try {
    await connectToDatabase();
    const { email, password } = req.params;

    const employeeDetail = await employeeData.findOne({
      email: email,
      password: password,
    });
    console.log("employeeDetail ", employeeDetail);

    if (!employeeDetail) {
      return res.status(401).send("Invalid email or password");
    }

    if (employeeDetail) {
      res.json(employeeDetail);
      console.log("User found:", employeeDetail);
    } 
  } catch (err) {
    res.status(500).send(err.message);
  }
});  
app.get("/getemployeebyemail/:email", async (req, res) => {

  try {
    await connectToDatabase();
    const { email} = req.params;

    const employeeDetail = await employeeData.findOne({
      email: email,
      
    });


    if (employeeDetail) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});   
app.get("/employeebyEmail/:email", async (req, res) => {

  try {
    await connectToDatabase();
    const { email} = req.params;

    const employeeDetail = await employeeData.findOne({
      email: email,
      
    });


    if (employeeDetail) {
      res.json(employeeDetail);
    } else {
      res.json(employeeDetail);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}); 
app.post("/ticketDetails", async (req, res) => {
  await connectToDatabase();
  const { firstname, lastname, email,  type, service, subject,text, Priority,attach,status,adminallocater,ticketDescription} = req.body;
  const getticketdata = new  ticketData({
    firstname: firstname,
    lastname:lastname,
    email: email,
    type:  type,
    service:service,
    subject: subject, 
    text: text,
    Priority: Priority, 
    attach:attach, 
    status:status, 
    adminallocater:adminallocater,
    ticketDescription:ticketDescription
  });
  try {
    const saveticketdata = await getticketdata.save(); 
    
    if (saveticketdata) {
      res.json(saveticketdata);
    } else {
      res.send("not stored data ");
    }
  } catch (err) {
    res.send("Error", err);
  } 
});  
app.get("/ticketbyemail/:email", async (req, res) => {

  try {
    await connectToDatabase();
    const { email} = req.params;

    const ticketDetail = await ticketData.find({
      email: email,
    });
    
    if (ticketDetail) {
      res.json(ticketDetail);
     
    } else {
      res.status(404).send("ticket not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}); 
app.put("/updateEmployee/:email", async (req, res) => {
  const { firstname, lastname, designation } = req.body;
  const { email } = req.params;

  if (!firstname || !lastname || !designation || !email) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const updatedEmployee = await employeeData.findOneAndUpdate(
      { email },
      { $set: { firstname, lastname, designation } },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send("Employee not found");
    }

    console.log(updatedEmployee, "updatedEmployee");
    res.send(updatedEmployee);
  } catch (err) {
    console.error(`Failed to update employee: ${err.message}`);
    res.status(500).send(`Error: ${err.message}`);
  }
});
app.put("/updatePassword/:email", async (req, res) => {
  const {  password, conpassword } = req.body;
  const { email } = req.params;

  if (!password || !conpassword || !email) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const updatedpasswordEmployee = await employeeData.findOneAndUpdate(
      { email },
      { $set: { password, conpassword } },
      { new: true }
    );

    if (!updatedpasswordEmployee) {
      return res.status(404).send("Employee not found");
    }

    console.log(updatedpasswordEmployee, "updatedEmployee");
    res.send(updatedpasswordEmployee);
  } catch (err) {
    console.error(`Failed to update employee: ${err.message}`);
    res.status(500).send(`Error: ${err.message}`);
  }
});
app.get("/teamAllTeam/:category", async (req, res) => {

  try {
    await connectToDatabase();
    const { category} = req.params;

    const TeamDetail = await employeeData.find({
      category: category,
    });
    
    if (TeamDetail) {
      res.json(TeamDetail);
     
    } else {
      res.status(404).send("TeamDetail not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.get("/getAllticket", async (req, res) => {
  try {
    const ticketDetail = await ticketData.find({});
    res.json(ticketDetail);
  } catch (err) {
    console.error("Error fetching ticketDetail:", err);
    res.status(500).send(err.message);
  }
});
app.delete("/deleteemployee/:email", async (req, res) => {
  try {
    await connectToDatabase();
    const { email } = req.params;

  

    const deletedEmployee = await employeeData.findOneAndDelete({ email });

    if (!deletedEmployee) {
      return res.status(404).send("Employee not found");
    }

    res.send("Employee deleted successfully");
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).send(err.message);
  }
});
app.put("/updateadminAllocator/:id", async (req, res) => {
  await connectToDatabase();
  const { adminallocater,status } = req.body;
  const { id } = req.params;

  if (!adminallocater || !status) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const updatedAllocator = await ticketData.findByIdAndUpdate(
      id ,
      { $set: { adminallocater, status} },
      { new: true }
    );

    if (!updatedAllocator) {
      return res.status(404).send("Employee not found");
    }

    console.log(updatedAllocator, "updatedAllocator");
    res.send(updatedAllocator);
  } catch (err) {
    console.error(`Failed to update updatedAllocator: ${err.message}`);
    res.status(500).send(`Error: ${err.message}`);
  }
});
app.get("/ticketbyallocatorname/:adminallocater", async (req, res) => {

  try {
    await connectToDatabase();
    const { adminallocater} = req.params;

    const ticketadminallocaterDetail = await ticketData.find({
      adminallocater: adminallocater,
    });
    
    if (ticketadminallocaterDetail) {
      res.json(ticketadminallocaterDetail);
     
    } else {
      res.status(404).send("ticket not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}); 
app.put("/closingTicket/:id", async (req, res) => {
  await connectToDatabase();
  const {ticketDescription,status} = req.body;
  const { id } = req.params;

  if (!ticketDescription) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const ClosedticketData = await ticketData.findByIdAndUpdate(
      id ,
      { $set: { ticketDescription,status} },
      { new: true }
    );

    if (!ClosedticketData) {
      return res.status(404).send("ClosedticketData not found");
    }

    console.log(ClosedticketData, "ClosedticketData");
    res.send(ClosedticketData);
  } catch (err) {
    console.error(`Failed to update ClosedticketData: ${err.message}`);
    res.status(500).send(`Error: ${err.message}`);
  }
});
  app.listen(5000, () => {
    console.log("I am listening port 5000");
  }); 
  