require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10; 

class AuthController {
  /**
   * Registra um novo usuário.
   * @param {object} req - Requisição
   * @param {object} res - Resposta
   */

    //TODO: se der tempo, passar a logica de autenticacao para um middleware.

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(409).json({ error: 'E-mail já cadastrado.' });
      }

      const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await User.create({
        name,
        email,
        password_hash,
      });

      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: '7d', 
      });

      return res.status(201).json({
        user: { id: user.id, name: user.name, email: user.email },
        token,
        message: 'Registro realizado com sucesso!',
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  /**
   * Realiza o login de um usuário.
   * @param {object} req - Requisição
   * @param {object} res - Resposta
   */
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.json({
        user: { id: user.id, name: user.name, email: user.email },
        token,
        message: 'Login realizado com sucesso!',
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

module.exports = new AuthController();