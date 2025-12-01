require('dotenv').config();
const { zodTextFormat } = require("openai/helpers/zod");
const { z } = require("zod");

module.exports = {

    async gerarMetas(req, res, next, ChatGptClient) {
        try {
            // Agora pega o prompt correto enviado pelo front
            const { userInput } = req.body;

            if (!userInput) {
                return res.status(400).json({ error: "Você precisa enviar 'userInput' no corpo da requisição." });
            }

            // Schema de uma meta
            const metaSchema = z.object({
                titulo: z.string(),
                descricao: z.string(),
                dataConclusao: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Formato inválido. Use DD-MM-YYYY"),
            });

            // Agora o schema valida UM ARRAY de metas
            const metaArray = z.object({
            meta: z.array(metaSchema),
            userResponse: z.string(),
        });

            // Chamada para o ChatGPT
            const response = await ChatGptClient.responses.create({
                model: "gpt-4o",
                instructions:
                    "Você é um assistente especializado em ajudar os usuários a definir e alcançar metas pessoais. " +
                    "Identifique o objetivo do usuário e sugira metas específicas, mensuráveis, alcançáveis e relevantes. " +
                    "As metas devem seguir ordem lógica e cronológica. " +
                    "Retorne SOMENTE um JSON ARRAY válido contendo objetos com: titulo, descricao e dataConclusao. " +
                    "Não inclua explicações. Apenas JSON puro.",
                input: userInput,
                text: {
                    format: zodTextFormat(metaArray, "meta"),
                },
                tools: [{ type: "web_search_preview" }],
            });

            const parsedMetas = JSON.parse(response.output_text);
            return res.status(201).json(parsedMetas);

        } catch (err) {
            console.error("Erro ao analisar a resposta da IA: ", err);
            return res.status(500).json({ error: "Erro ao gerar metas com IA." });
        }
    },

};

