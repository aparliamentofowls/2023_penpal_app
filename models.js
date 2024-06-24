import mongoose, { mongo } from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"
import findOrCreate from "mongoose-findorcreate"

// username must be unique
const letterSchema = new mongoose.Schema({
    senderName: String,
    recieverName: String,
    sentTime: String,
    title: String,
    content: String
});
const penpalSchema = new mongoose.Schema({
    penpalName: String,
    penpalAbout: String,
    letterList: [letterSchema]
});
const userProfileInfoSchema = new mongoose.Schema({
    username: String,
    about: String,
    age: Number,
    interests: [String],
    languages: [String], 
    from: String,
});
const userSchema = new mongoose.Schema({
    username: {
        String,
        type: String,
        required: [true, "username required"],
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: [true, "email already registered"],
    },
    source: {
        type: String,
        required: [true, "source not specified"],
    },
    password: String,
    userProfileInfo: userProfileInfoSchema,
    penpalList: [penpalSchema]
});


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

export const Letter = mongoose.model("letters", letterSchema);
export const Penpal = mongoose.model("penpal", penpalSchema);
export const User = mongoose.model("user", userSchema);
export const UserProfileInfo = mongoose.model("userProfile", userProfileInfoSchema);

