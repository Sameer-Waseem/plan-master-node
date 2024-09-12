const express = require("express");
const { Plan, validate } = require("../models/plan");
const validateId = require("../models/utils/validateId");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find();
    return res.status(200).send({ plans });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const isValidId = validateId(req.params.id);
    if (!isValidId) {
      return res.status(400).send("Please provide valid id!");
    }

    const plan = await Plan.findById(req.params.id).select(
      "_id title description schedule_date"
    );
    if (!plan) {
      return res.status(404).send("Record not found!");
    }

    return res.status(200).send({ plan });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const plan = new Plan(req.body);
    await plan.save();

    return res.status(200).send({ plan });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const isValidId = validateId(req.params.id);
    if (!isValidId) {
      return res.status(400).send("Please provide valid id!");
    }

    const plan = await Plan.findById(req.params.id).select("_id");
    if (!plan) {
      return res.status(404).send("Record not found!");
    }

    await plan.deleteOne();
    res.status(200).send("Deleted successfully.");
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
