import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const PessoaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  senha: { type: String, required: true, select: false },
  ultimaAlteracao: { type: Date, default: Date.now },
});

PessoaSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;
  next();
});

const Pessoa = mongoose.model('pessoas', PessoaSchema);

export { Pessoa };
