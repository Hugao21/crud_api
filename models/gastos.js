const mongoose = require ("mongoose");

const gastosSchema = new mongoose.Schema (
    {
        titulo: String,
        descricao: String,
        gastos: Number,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
    
)
module.exports = mongoose.model('Gastos', gastosSchema);