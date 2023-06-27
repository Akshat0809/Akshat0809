module.exports = function makeCreateUserController({
  Joi,
  createUser,
  defaultFolders,
  findId,
  Emailexist,
}) {
  return async function createUserController(req, res) {
    try {
      validInput({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const email = req.body.email;
      const ans = await Emailexist({ email });
      if (ans !== 0) {
        res.status(201).json({
          status: "Exist",
          messege: "Email Already Exist",
        });
      } else {
        console.log("now we are creating");
        await createUser({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        const id = await findId({ email: req.body.email });
        console.log("controller id is", id);
        await defaultFolders({ id });
        console.log("ID inside default folders ", id);
        res.status(201).json({
          status: "Success",
          messege: "User Succesfully Created",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Error",
        messege: "Error: " + err,
      });
    }
  };
  function validInput({ name, email, password }) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    const { error } = schema.validate({ name, email, password });
    if (error) {
      console.log(error);
      throw error;
    }
  }
};
