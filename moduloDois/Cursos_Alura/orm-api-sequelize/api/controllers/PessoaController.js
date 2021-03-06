const database = require('../models');

class PessoaController {
  static async pegaTodasAsPessoas(_req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaPessoaPorId(req, res) {
    try {
      const { id } = req.params;
      const pessoaPorId = await database.Pessoas.findOne({
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json(pessoaPorId);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  static async criarPessoa(req, res) {
    try {
      const novaPessoa = req.body;
      const criaPessoa = await database.Pessoas.create(novaPessoa);
      return res.status(201).json(criaPessoa);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  static async atualizaPessoa(req, res) {
    try {
      const { id } = req.params;
      const novasInfos = req.body;
      await database.Pessoas.update(novasInfos, { where: { id: Number(id) } });
      const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } });
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(409).json(error.message);
    }
  }

  static async apagaPessoa(req, res) {
    try {
      const { id } = req.params;
      await database.Pessoas.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ message: `O registro de id ${id} foi deletado com sucesso!` });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  static async pegaUmaMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      });
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  static async criarMatricula(req, res) {
    try {
      const { estudanteId } = req.params;
      const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
      const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
      return res.status(201).json(novaMatriculaCriada);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  static async atualizaMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const novasInfos = req.body;
      await database.Matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      });
      const matriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId) } });
      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      return res.status(409).json(error.message);
    }
  }

  static async apagaMatricula(req, res) {
    try {
      const { matriculaId } = req.params;
      await database.Matriculas.destroy({
        where: {
          id: Number(matriculaId)
        }
      });
      return res.status(200).json({ message: `O registro de id ${matriculaId} foi deletado com sucesso!` });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = PessoaController;