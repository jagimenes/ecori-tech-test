import app from "./app";
import TaskModel from "./model/tasks";

const PORT = process.env.PORT || 3500;

app.listen(PORT, async () => {
  try {
    //checks
    const tableExists = await TaskModel.tableExists();
    const functionExists = await TaskModel.functionExists();
    const triggerExists = await TaskModel.triggerExists();

    if (!tableExists) {
      await TaskModel.createNewTable();
      console.log("CREATE TABLE");
    }

    if (!functionExists) {
      await TaskModel.createNewFunction();
      console.log("CREATE FUNCTION");
    }
    if (!triggerExists) {
      await TaskModel.createNewTrigger();
      console.log("CREATE TRIGGER");
    }

    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});
