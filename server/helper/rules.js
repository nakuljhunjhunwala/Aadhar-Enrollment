const rules = {
  loginRule: {
    email: "required|email",
    password: "required|min:8"
  },
  createAadharRule: {
    firstName: "required|string",
    lastName: "required|string",
    phoneNo: "required|strict|integer|digits:10",
    email: "required|email",
    password: "required|string|min:8",
    address: "required|string",
    state: "required|string",
  }
}

module.exports = rules;
