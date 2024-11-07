const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');
const User =  collection.findOne({ name: collection.name  });

const app = express();

// convert data into json format
// Static file
app.use(express.static("public/"));
app.use(express.static("picture"));
app.use(express.static("view/"));


//use EJS as the view engine



// view engine setup


app.get('/', function(req, res){
    res.sendFile(process.cwd() + '/views/index.html');
  });

  app.get('/login', function(req, res){
    res.sendFile(process.cwd() + '/views/login.html');
  });

app.get("/signup", (req,res) => {
    return res.render("signup");
});
// Register User
app.post("/signup", async (req,res) => {

    const data = {
        name: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        return res.send('User already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.sendFile(process.cwd() + '/views/index.html');
    }

});

// Login user 
app.post("/login", async (req, res) => {
        const check = await collection.findOne({ email: req.body.email  });
        const Name = await collection.findOne({ name: req.body.name  });
        const Namevalue = Name.value;
        localStorage.setItem('Name', Namevalue);
        if (!check) {
            return res.send("Email or Name cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(!isPasswordMatch) {
            return res.send("wrong Password");
        }
        
        else {
            
            window.location.href = res.sendFile(process.cwd() + '/index.html');
        }
    });


// Define Port for Application
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});