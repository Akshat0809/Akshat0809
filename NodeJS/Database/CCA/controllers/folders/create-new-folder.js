module.exports = function makeCreateFolderController({
  Joi,
  createFolder,
  folderExists,
}) {
  return async function createFolderController(req, res) {
    console.info(`In create folder controller`, req.body);
    try {
      validInput({
        id: req.body.id,
        name: req.body.name,
      });
      const body = {
        name: req.body.name,
        id: req.body.id,
      };
      const name = req.body.name;
      const id = req.body.id;
      const ans = await folderExists({ id, name });
      console.log(ans);
      if (ans !== 0) {
        console.log("Folder Exists");
        res.send("Folder Already Exists");
      } else {
        await createFolder(body);
        res.status(201).json({
          status: "Success",
          messege: "Folder Created",
        });
      }
    } catch (err) {
      console.log("ff", err);
      res.status(500).json({
        status: "Error",
        messege: err,
      });
    }
    return;
  };

  function validInput({ id, name }) {
    const schema = Joi.object({
      id: Joi.number().integer().required(),
      name: Joi.string().required(),
    });
    const { error } = schema.validate({ id, name });
    if (error) {
      console.log(error);
      throw error.details[0].message;
    }
  }
};
