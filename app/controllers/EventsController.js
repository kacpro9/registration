const EventModel = require("../models/EventModel.js");

module.exports = {
  index: async (req, res, next) => {
    try {
      const result = await EventModel.find({});
      res.json(result);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching events",
        error: err,
      });
    }
  },

  create: async (req, res, next) => {
    try {
      const event = new EventModel({
        name: req.body.name,
        event: req.body.event,
        city: req.body.city,
      });

      const savedEvent = await event.save();

      res.status(201).json({
        message: "Event created successfully",
        event: savedEvent,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating event",
        error: error.message,
      });
    }
  },

  delete: async (req, res, next) => {
    const id = req.params.id;
    try {
      const event = await EventModel.findByIdAndDelete(id);

      if (!event) {
        return res.status(404).json({
          message: "Event not found",
        });
      }
      res.status(200).json({
        id: id,
        deleted: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting event",
        error: error.message,
      });
    }
  },
};
