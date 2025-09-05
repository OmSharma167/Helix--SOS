import mongoose from 'mongoose'


const emergencySchema = new mongoose.Schema(
  {
    // 1. Who raised the emergency
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },

    // 2. What kind of emergency is it
    emergencyType: {
      type: String,
      required: true,
      enum: ["Urgency", "Car Accident", "Fire", "Medical", "Police", "Other"],
    },

    // 3. Extra details provided by the user
    description: {
      type: String,
      default: "",
    },

    // 4. Location of the emergency (where it happened)
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },

    // 5. Which services are needed (decided by user or system)
    servicesRequired: [
      {
        type: String,
        enum: ["Police", "Ambulance", "Hospital", "Fire"],
      },
    ],

    // 6. Who has been assigned to handle this emergency
    assignedServiceProviders: [
      {
        providerId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "assignedServiceProviders.providerType",
          // 👆 Dynamic reference (changes based on providerType)
        },
        providerType: {
          type: String,
          required: true,
          enum: ["Police", "Ambulance", "Hospital", "Fire"],
          // 👆 This tells mongoose which collection to look into
        },
        status: {
          type: String,
          enum: ["Notified", "Accepted", "On The Way", "Completed"],
          default: "Notified",
        },
      },
    ],

    // 7. Overall status of this emergency
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Emergency", emergencySchema);