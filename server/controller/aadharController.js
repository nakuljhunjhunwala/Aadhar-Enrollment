const userService = require("../model/users");
const aadharService = require("../model/aadhar");
const { make } = require("simple-body-validator");
const rules = require("../helper/rules");

class AadharController {
  async createAadhar(req, res) {
    const body = req.body;
    const validator = make(body, rules.createAadharRule);
    let newAadhar;

    if (!validator.validate()) {
      const error = validator.errors().firstMessage;
      console.log("Error: " + error);
      res.status(422).json({
        error: error,
      });
      return;
    }

    try {
      const user = await userService.exists({ email: body.email });
      if (user) {
        res.status(400).json({ error: "Aadhar for this user already exist" });
        return;
      }
      const aadhar = {
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNo,
        email: body.email,
        homeAddress: body.address,
        state: body.state,
      };
      newAadhar = await aadharService.create(aadhar);
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error Occured",
      });
      return;
    }

    try {
      const newUser = {
        email: newAadhar.email,
        password: body.password,
        aadharLink: newAadhar._id,
      };
      await userService.create(newUser);
      res.status(200).json({
        message: "Aadhar created successfully.",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error Occured",
      });
    }
  }

  async viewAadharDetail(req, res) {
    const id = req.userId;

    try {
      let user = await userService.findById(id)
      if (user?.aadharLink) {
        user = await user.populate("aadharLink");
      }
      if (user) {
        res.status(200).json({
          aadharId: user._id,
          firstName: user?.aadharLink?.firstName,
          lastName: user?.aadharLink?.lastname,
          phoneNumber: user?.aadharLink?.phoneNumber,
          email: user.email,
          homeAddress: user?.aadharLink?.homeAddress,
          state: user?.aadharLink?.state,
        })
      }
    } catch (error) {
      res.status(500).json({
        error: error.message || "error occured"
      })
    }
  }

  async viewAll(req, res) {
    try {
      let aadhars = await aadharService.find({});

      aadhars = aadhars.map(aadhar => {
        return {
          aadharId: aadhar._id,
          firstName: aadhar.firstName,
          lastName: aadhar.lastname,
          phoneNumber: aadhar.phoneNumber,
          email: aadhar.email,
          homeAddress: aadhar.homeAddress,
          state: aadhar.state,
        }
      })

      res.status(200).json({
        count: aadhars.length,
        result: aadhars
      })
    } catch (error) {
      res.status(500).json({
        error: error.message || "error occured"
      })
    }
  }

  async viewAllBasedOnState(req, res) {
    const { state } = req.params;
    console.log(state);
    try {
      let aadhars = await aadharService.find({ state: state });

      aadhars = aadhars.map(aadhar => {
        return {
          aadharId: aadhar._id,
          firstName: aadhar.firstName,
          lastName: aadhar.lastname,
          phoneNumber: aadhar.phoneNumber,
          email: aadhar.email,
          homeAddress: aadhar.homeAddress,
          state: aadhar.state,
        }
      })

      res.status(200).json({
        count: aadhars.length,
        result: aadhars
      })
    } catch (error) {
      res.status(500).json({
        error: error.message || "error occured"
      })
    }
  }

}

module.exports = {
  AadharController,
};
