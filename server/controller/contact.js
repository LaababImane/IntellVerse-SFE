const contactModel = require("../models/contact");
const { toTitleCase, validateEmail } = require("../config/function");


class Contact{
    async contacter(req, res) {
        let { fullName, email, message} = req.body;
        let error = {};
        if (!fullName || !email || !message) {
          error = {
            ...error,
            fullName: "Filed must not be empty",
            email: "Filed must not be empty",
            message: "Filed must not be empty",
          };
          return res.json({ error });
        } else {
              try {
                  let newContact = new contactModel({
                    fullName,
                    email,
                    message,
                  });
                  newContact
                    .save()
                    .then((data) => {
                      return res.json({
                        success: "You message is send successfully. Thank you ",
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
              } catch (err) {
                console.log(err);
              }
          }
        }
}
const contactController = new Contact();
module.exports = contactController;