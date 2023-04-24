const { Router } = require("express");
const Tarefa = require("../models/tarefa");

const router = Router();

//Rotas
//Inserção de Tarefas(POST)
router.post("/tarefas", async (req, res) => {
    try {
        const { titulo, descricao, status} = req.body // coletar os dados do body
        const tarefa = new Tarefa({titulo, descricao, status}); // criando um novo documento e dentro passando as propriedades
        await tarefa.save(); //inserir o documento na coleção tarefas
        res.status(201).json(tarefa);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Um erro aconteceu"})
    }
});

//Listagem de todas as tarefas(GET)
router.get("/tarefas", async (req, res) => {
    const tarefas = await Tarefa.find(); //realiza uma busca de todos os documentos na coleção
    res.json(tarefas);
});

//Listagem de uma tarefa(GET)
router.get("/tarefas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tarefaExistente = await Tarefa.findById(id); //Realiza uma busca especifica de um documento

        if(tarefaExistente){
            res.json(tarefaExistente)//responde com o documento encontrado
        } else {
            res.status(404).json({message: "Tarefa não encontrada."}) //notifica o erro exatamente
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Um erro aconteceu"})
        
    }
});

//Atualização de uma Tarefa(PUT)
router.put("/tarefas/:id", async (req, res) => {
    try {
        const { id } = req. params;
        const { titulo, descricao, status } = req.body;

        const tarefaExistente = await Tarefa.findByIdAndUpdate(id, { titulo, descricao, status }); // caso encontre o id faz a atualização e retorna o objeto encontrado

        if (tarefaExistente) {
            res.json({message: "Tarefa editada"})
        } else {
            res.status(404).json({message: "Tarefa não econtrada"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Um erro aconteceu"})
    }
});

//Remoção de uma tarefa(DELETE)
router.delete("/tarefas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tarefaExistente = await Tarefa.findByIdAndRemove(id)//checa se a tarefa existe, e então remove do banco
        
        if(tarefaExistente){
            res.json({message: "Tarefa removida"});
        } else {
            res.status(404).json({ message: "Tarefa não encontrada"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "um erro aconteceu"});
    }
});

module.exports = router;
