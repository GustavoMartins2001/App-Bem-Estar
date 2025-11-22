require('dotenv').config();
const { zodTextFormat } = require("openai/helpers/zod");
const { z } = require("zod");

//TODO: gerar ao iniciar a aplicação

module.exports = {
    async gerarMetas(req, res, next, ChatGptClient) {
        const { userInput } = req.params 
        const userInputTest = "Quero aprender a tocar violão em 6 meses.";
        // Formata o esquema Zod para validação da resposta da IA
        const meta = z.object({
            titulo: z.string(),
            descricao: z.string(),
            dataConclusao: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Invalid date format DD-MM-YYYY"),
        });
        const metas = z.object({
            meta: z.array(meta),
            userResponse: z.string(),
        });
        const response = await ChatGptClient.responses.create({
            model: "gpt-4o",
            instructions:
                "Você é um assistente especializado em ajudar os usuários a definir e alcançar metas pessoais. " +
                "Identifique o objetivo do usuário e sugira metas específicas, mensuráveis, alcançáveis e relevantes. " + 
                "Também indique a data de conclusão esperada para cada meta, considerando a data de inicio a data atual " + 
                "e que as metas serão realizadas sequencialmente." +
                "As metas criadas devem ser frases curtas, objetivas e diretas. " +
                "RETORNE UM JSON ARRAY VÁLIDO: um array de objetos com as chaves 'titulo', 'descricao' e 'dataConclusao'" +
                "DataConclusao deve ser maior que " + new Date().toLocaleDateString("pt-BR") + ". " +
                "Não inclua texto explicativo, apenas o JSON.",
            input: userInputTest,
            text: {
                format: zodTextFormat(metas, "meta"),
            },
            tools: [{ type: "web_search_preview" }], // permite a IA pesquisar na internet
        });

        try {
            const parsedMetas = JSON.parse(response.output_text);
            console.log(parsedMetas);
            // const metasArray = Array.isArray(parsed) ? parsed : null;
            // console.log(response.outputText);
            // console.log(metasArray)
            return res.status(201).json(parsedMetas);;
        } catch (err) {
            console.error("Erro ao analisar a resposta da IA: ", err);
            return res.status(500).json({ error: 'Erro ao processar a resposta da IA' });
        }
    },

}
