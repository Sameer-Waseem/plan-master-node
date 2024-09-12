const mongoose = require("mongoose");
const Joi = require("joi");

const PlanSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    maxLength: 255,
    required: true,
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 1024,
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "time to do", "late"],
    default: "upcoming",
  },
  schedule_date: {
    type: Date,
    min: Date,
    required: true,
  },
});

const Plan = mongoose.model("Plan", PlanSchema);

function validate(obj) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required("Title is required."),
    description: Joi.string()
      .min(3)
      .max(255)
      .required("Description is required."),
    status: Joi.string()
      .valid("upcoming", "time to do", "late")
      .default("upcoming"),
    schedule_date: Joi.date().min("now").required("Plan date is required."),
  });

  return schema.validate(obj);
}

module.exports.Plan = Plan;
module.exports.validate = validate;
