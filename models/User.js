import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  gifs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gif" }],
});



userSchema.pre("save", function (next) {
  const user = this;
 
  if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
          if (saltError) {
              return next(saltError);
          } else {
              bcrypt.hash(user.password, salt, function (hashError, hash) {
                  if (hashError) {
                      
                      return next(hashError);
                  }

                  user.password = hash;
                  next();
              });
          };
      })
  } else {
      return next();
  }
});

userSchema.methods.comparePassword =  function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
