import mongoose from "mongoose";

const validateEmail = (value) => {
  return String(value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const serviceRequestSchema = new mongoose.Schema(
  {
    no: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validateEmail,
        message: (props) => `${props.value} is Invalid Email`,
      },
    },
    mobile: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Open",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    assignedTo: {
      type: String,
      default: null,
    },
    assignedById: {
      type: String,
      default: null,
    },
    assignedAt: {
      type: Date,
      default: null,
    },
    resolution: {
      type: String,
      default: null,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    collection: "service-requests",
  }
);

const SRModel = mongoose.model("service-requests", serviceRequestSchema);

export default SRModel;
