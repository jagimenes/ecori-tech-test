const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const pool = require("../../database");

const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (!user.rows[0]) {
      throw new AppError("E-mail or password incorrect", 401);
    }

    const passwordMatched = await compare(password, user.rows[0].password);

    if (!passwordMatched) {
      throw new AppError("E-mail or password incorrect", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.rows[0].id),
      expiresIn
    });

    const userRow = user.rows[0];

    return response.json({
      user: userRow,
      token
    });
  }
}


module.exports = SessionController;