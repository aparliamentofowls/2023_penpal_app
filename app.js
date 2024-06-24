import express from "express"
import bodyParser from "body-parser"
import mongoose, { mongo } from "mongoose"
import * as fakeData from './fake_data.js'
import * as model from "./models.js"
import dotenv from "dotenv"
import path from 'path';
import { fileURLToPath } from 'url';
import passport from "passport"
import session from "express-session";
import GoogleStrategy from "passport-google-oauth20";
dotenv.config();


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let currentUser;

// setting up express related things
// use ejs templates
app.set("view engine", "ejs");
// make sure data posted from forms can be decoded
app.use(bodyParser.urlencoded({extended: true}));
// make sure the files from the public folder (like the css stylesheet) can be accessed
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: "SECRET!!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// setting up mongoose related things
try {
    await mongoose.connect(
        "mongodb://localhost:27017/penpalDB",
    );
} catch (error) {
    console.log(error);
}


passport.use(model.User.createStrategy());

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
        });
    });
});
 
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// GET ROUTES 

app.get("/register", async function(req, res) {
    res.render("register");
});

app.get("/login", async function(req, res) {
    res.render("login");
});

app.get("/", async function(req, res) {
    if (req.isAuthenticated()) {
        // find users, if no user found, then call default 
        let usersList;
        let currentUser;
        try {
            usersList = await model.User.find({});
            currentUser = await model.User.findById(req.user.id);
        } catch (err) {
            console.log(err);
        }
        if (usersList.length === 1) {
            await fakeData.saveDefaultData();
            res.redirect("/");
        } else {
            res.render("home", {userProfileInfo: currentUser.userProfileInfo, username: currentUser.username, me: true});
        }
    } else {
       res.redirect("/login");
    }
});

app.get("/edit_profile", async function(req, res) {
    if (req.isAuthenticated()) {
        try {
            currentUser = await model.User.findById(req.user.id);
        } catch (err) {
            console.log(err);
        }
        res.render("edit_profile", {userProfileInfo: currentUser.userProfileInfo, username: currentUser.username});
    } else {
        res.redirect("/login");
    }
});

app.get("/profile/:userName", async function(req, res) {
    if (req.isAuthenticated()) {
        let profileOwner;
        let currentUser;
        let me;
        try {
            profileOwner = await model.User.findOne({username: req.params.userName});
            currentUser = await model.User.findById(req.user.id);
            me = currentUser.username === profileOwner.username;
        } catch (err) {
            console.log(err);
        }
        res.render("home", {userProfileInfo: profileOwner.userProfileInfo, username: req.params.userName, me: me});
    } else {
        res.redirect("/login");
    }
});

app.get("/my_penpals", async function(req, res) {
    if (req.isAuthenticated()) {
        try {
            currentUser = await model.User.findById(req.user.id);
        } catch (err) {
            console.log(err);
        }
        res.render("penpal", {penpalList: currentUser.penpalList});
    } else {
        res.redirect("/login");
    }
});

app.get("/browse", async function(req, res) {
    if (req.isAuthenticated()) {    
        let userProfileList;
        let currentUser;
        try {
            userProfileList = await model.UserProfileInfo.find({});
            currentUser = await model.User.findById(req.user.id);
        } catch (err) {
            console.log(err);
        }
        res.render("browse", {userProfileList: userProfileList, me: currentUser.username});
    } else {
        res.redirect("/login");
    }
});

app.get("/write_letter/:userName", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("write_letter", {penpalName: req.params.userName});
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});
 
// POST ROUTES
 
app.post("/delete_penpal", async function(req, res) {
    if (req.isAuthenticated()) {
        try {
            await model.User.findOneAndUpdate({_id: req.user.id}, {$pull: {"penpalList":  {penpalName: req.body.penpalName}}});
            await model.User.findOneAndUpdate({username: req.body.penpalName}, {$pull: {"penpalList":  {_id: req.user.id}}}); 
            res.redirect("/my_penpals");
        } catch (err) {
            console.log(err);
        }
    } else {
        res.redirect("/login");
    }
});

app.post("/write_letter", async function(req, res) {
    if (req.isAuthenticated()) {
        let currentUser;
        let currentUserPenpal;
        let letterRecipent;
        let letterRecipentPenpal;
    
        try {
            currentUser = await model.User.findById(req.user.id);
            letterRecipent = await model.User.findOne({username: req.body.sent_to});
            console.log("current user" + currentUser);
            console.log("letter recipent " + req.body.sent_to + " " + letterRecipent);

            const newLetter = new model.Letter({
                senderName: currentUser.username,
                recieverName: req.body.sent_to,
                sentTime: "sent time: I don't know",
                title: "title? I don't know",
                content: req.body.letter_content
            });

            currentUserPenpal = currentUser.penpalList.find(x => x.penpalName === req.body.sent_to);
            letterRecipentPenpal = letterRecipent.penpalList.find(x => x.penpalName === currentUser.username);
            if (currentUserPenpal) {
                console.log("Found matching penpal:", currentUserPenpal);
                currentUserPenpal.letterList.push(newLetter);
                letterRecipentPenpal.letterList.push(newLetter);
                await currentUser.save();
                await letterRecipent.save();
            } else {
                console.log("No matching penpal found. Create a new penpal.");
    
                const myNewPenpal = new model.Penpal({
                    penpalName: req.body.sent_to,
                    penpalAbout: letterRecipent.userProfileInfo.about,
                    letterList: [newLetter],
                });
                const yourNewPenpal = new model.Penpal({
                    penpalName: currentUser.username,
                    penpalAbout: currentUser.userProfileInfo.about,
                    letterList: [newLetter],
                });
    
                currentUser.penpalList.push(myNewPenpal);
                letterRecipent.penpalList.push(yourNewPenpal);
                await currentUser.save();
                await letterRecipent.save();
            }
            res.redirect("/my_penpals");
        } catch (err) {
            console.log(err);
        }
    } else {
        res.redirect("/login");
    }
});


app.post("/register", async function (req, res) {
    let userProfileInfo = new model.UserProfileInfo({
        username: req.body.username,
        about: null,
        age: null,
        interests: [],
        languages: [],
        from: null,
    });
    await userProfileInfo.save();
    
    model.User.register({ 
        username: req.body.username, 
        email: req.body.email,
        source: "Local",  
        userProfileInfo: userProfileInfo,
        penpalList: []
    }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect("/");
            });
        }
    });
});
 
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),  function(req, res) {
	res.redirect('/');
});

app.post("/edit_profile", async function(req, res) {
    const newAbout = req.body.updatedAbout;
    let newInterests;
    if (req.body.updatedInterests !== "") {
        newInterests = JSON.parse(req.body.updatedInterests);
    }

    try {
        await model.User.findOneAndUpdate({_id: req.user.id}, {"userProfileInfo.about": newAbout});
        if (newInterests) {
            await model.User.findOneAndUpdate({_id: req.user.id}, {"userProfileInfo.interests": newInterests});
        }
    } catch (err) {
        console.log(err);
    }
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server started on local host 3000");
});
