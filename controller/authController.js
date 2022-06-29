const userService = require("../model/users");
const { make } = require("simple-body-validator");
const rules = require("../helper/rules");
const { createToken } = require("../helper/tokenmanager");

class AuthController {
  async createAdminUser(req, res) {
    let message = "";
    const adminUser = {
      email: "admin@admin.com",
      password: "12345678",
      role: "admin",
    };
    try {
      const userExist = await userService.exists({ email: adminUser.email });
      if (!userExist) {
        await userService.create(adminUser);
        message = "User created Successfully";
      } else {
        message = "User Already Exist";
      }
    } catch (error) {
      console.log(error);
      message = error.message || "Error Occured";
    }
    res.status(200).json({
      message: message,
    });
  }

  async login(req, res) {
    const body = req.body;
    const validator = make(body, rules.loginRule);

    if (!validator.validate()) {
      const error = validator.errors().firstMessage;
      console.log("Error: " + error);
      res.status(422).json({
        error: error,
      });
      return;
    }

    try {
      let user = await userService.find({ email: body.email });

      if (user.length === 0) {
        res.status(400).json({ error: "Incorrect email password combination" });
        return;
      }

      if (user[0].email === body.email && user[0].password === body.password) {
        let token = createToken(user[0]);
        res.status(200).json({
          token: token,
        });
      } else {
        res.status(400).json({ error: "Incorrect email password combination" });
        return;
      }
    } catch (error) { }
  }
}

module.exports = {
  AuthController,
};
