import mongoose from "mongoose";
import bycrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "name is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters"],
    },
    cartItems: {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
    role: {
      type: String,
      enum: ["coustomer", "admin"],
      default: "coustomer",
    },
  },
  {
    timestamps: true,
  }
);
// PREVEN RE HASHING PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bycrypt.genSalt(10);
    const hash = await bycrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (password) {
  return await bycrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
