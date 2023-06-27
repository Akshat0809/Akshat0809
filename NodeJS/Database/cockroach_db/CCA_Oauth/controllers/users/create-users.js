const { name } = require('ejs');
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'create-default-folders',
    brokers: ['localhost:9092']
  });

  const producer = kafka.producer()
module.exports = function makeCreateUserController({
  Joi,
  createUser,
  defaultFolders,
  findId,
  Emailexist,
  producer
}) {
  return async function createUserController(req, res) {
    try {
      const database_name  = req.headers['database_name'];
      console.log("Hi there")
      let access_token = req.body.access_Token;
      let refresh_token = req.body.refresh_Token;
      let expiry_date = req.body.expiry_date;
      validInput({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        access_token: req.body.access_Token,
        refresh_token: req.body.refresh_Token,
        expiry_date: req.body.expiry_date
      });
      console.log("in controller",typeof(name));
      const email = req.body.email;
      const ans = await Emailexist({ email });
      console.log(email,'in controller');
      if (ans !== 0) {
        res.status(201).json({
          status: "Exist",
          messege: "Email Already Exist",
        });
      } else {
        console.log("now we are creating");
        const userDetails = await createUser({database_name,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          access_token,refresh_token,expiry_date
        });
      console.log("To find id");
      const user_id = await findId(email);
      console.log("user id in controlller",user_id);
      const folder = await defaultFolders({user_id}, database_name);
      console.log("undefined",folder);
      //   const data = {
      //     userId:id,
      //     accessToken:access_token,
      // }
      //   await producer.connect();
      //     console.log("producer connected successfully");
      //     await producer.send({
      //       topic: 'folders',
      //       messages: [
      //         {
      //           value: JSON.stringify({
      //           result: data,
      //           }),
      //         },
      //       ],
      //     });
      //     console.info("message send successfully");
      //   console.info("ID inside default folders ", id);
  
      //   console.log("controller id is", id);
      //   console.log(typeof(id));
      //   await defaultFolders({ id });
      // await producer.connect()
      // await producer.send({
      //   topic: 'test-topic',
      //   messages: [{ value: `${id}` },],
      // })
        res.status(201).json({
          status: "Success",
          messege: "User Succesfully Created",
        });
        return userDetails;
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
      access_Token: Joi.string(),
      refresh_Token: Joi.string(),
      // expiry_date: Joi.int()
    });
    const { error } = schema.validate({ name, email, password });
    if (error) {
      console.log(error);
      throw error;
    }
  }
};
