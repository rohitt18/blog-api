const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minLength: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // this will create the updatedAt & createdAt times for us
);

// // Save user using mongoose midddleware [refer mongoose docs] bina next() ke bhi chalta hai
// UserSchema.pre("save", async function () {
//   // suggestion - use good old function() instead of arrow function
//   // generate the salt & get the password

//   const salt = await bcrypt.genSalt(10);
//   // as far as the password, well this is where the callback func comes into play
//   // here this will point to the document
//   this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model("User", UserSchema);
