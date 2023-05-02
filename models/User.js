import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
},
fullName: {
    type: String,
    required: [true, "Full name is required"],
    minLength: [4, "Full name should be atleast 4 characters long"],
    maxLength: [30, "Full name should be less than 30 characters"]
},
password: {
    type: String,
    required: [true, "Password is required"],
    select: false
},
  image: String,
  cover: String,
  bio: String,
  username: String,
  about:String,
});

const User = models?.User || model('User', UserSchema);

export default User;