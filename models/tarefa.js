const { model, Schema } = require("mongoose");

//titulo, descrição status(finalizada/pendente)
const Tarefa = model("tarefa", // nome do modelo(base p/ coleção)
    new Schema ({ // validação do documento
    titulo: {
        type:String, //String, Number, Boolean
        required: true,
    },
    descricao: {
        type:String,
        required: true,
    },
    status: {
        type: String,
        default: "pendente", // pode ter outros status ex finanlizado
    }
})
);
module.exports = Tarefa;