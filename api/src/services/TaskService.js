const pool = require("../../database");
const fs = require("fs");
const csvParser = require("csv-parser");
const csv = require("csv")

const AppError = require("../utils/AppError");


class TaskService {
  async taskUpload(filePath, user_id) {
    const client = await pool.connect();
    const result = [];

    fs.createReadStream(filePath)
      .pipe(csv.parse({ columns: false, delimiter: ";" }))
      .on("data", (data) => result.push(data))
      .on("end", () => {
        const query = `INSERT INTO tasks (title, description, user_id, completed_at, created_at) VALUES ($1, $2, ${user_id}, false, NOW()) RETURNING *`
        result.forEach(async (row) => {
          const [title, description] = row

          try {
            await pool.query(query, [title, description]);
          } catch (error) {
            // throw new AppError("Internal server error", 500);
            console.error(error)
          }
        })

        fs.unlinkSync(filePath);
      })
  }
}

module.exports = TaskService;