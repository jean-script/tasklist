import Jwt from "jsonwebtoken";
import User from "../models/user";

import authConfig from "../../config/auth";

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        // verifica se o email existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Usuário não existe!" });
        }

        // verificar se as senhas não são iguais
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: "Senha incorreta!" });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: Jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
