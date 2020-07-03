import mongoose from 'mongoose';

const EmpresaSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  ultimaAlteracao: {
    type: Date,
    default: Date.now,
  },
});

const Empresa = mongoose.model('empresas', EmpresaSchema);

export { Empresa };
