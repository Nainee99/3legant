import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      default: "",
    }, // Bio for the user
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    }, // Cloudinary URL for profile picture
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    }, // Role of the user (admin or user)
    // Add any other fields relevant to your e-commerce application
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ], // Cart for the user
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ], // Orders made by the user
  },
  {
    timestamps: true,
  } // Adds 'createdAt' and 'updatedAt' timestamps
);

// Create an index on the 'email' field to optimize search queries on email
userSchema.index({
  email: 1,
});

export default mongoose.model("User", userSchema);
