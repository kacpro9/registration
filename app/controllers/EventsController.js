const EventModel = require("../models/EventModel.js");

module.exports = {
  index: (req, res, next) => {
    res.json({
      events: [
        {
          name: "Kacper Sterkowicz",
          event: { key: "front-end", value: "Front End" },
          city: { key: "warsaw", value: "Warszawa" },
        },
        {
          name: "Łukasz Badocha",
          event: { key: "back-end", value: "Back End" },
          city: { key: "cracow", value: "Kraków" },
        },
      ],
    });
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

  delete: (req, res, next) => {
    res.send("Delete");
  },
};
