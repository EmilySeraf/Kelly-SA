const express = require('express');
const app = express();
const port = 3000;
const pool = require('./db')
const bcrypt = require('bcrypt')

app.use(express.json())
app.use(express.static('public'))

app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const emailExiste = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
        if (emailExiste.row.length > 0) {
            return res.status(400).send('E-mail já cadastrado')
        }

        const hashSenha = await bcrypt.hash(senha, 10)

        await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, hashSenha]
        )
        res.status(201).send('Usuario cadastrado com sucesso')
    } catch (err) {
        console.log(err.menssage)
        res.status(500).send('Erro de servidor')
    }
})

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try { 
        const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        const usuario = resultado.rows[0];
        if (!usuario) {
            return res.status(400).send('Usuário não encontrado');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha); 
        if (!senhaValida) {
            return res.status(400).send('Senha incorreta');
        }

        res.send('Login efetuado');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro de servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

