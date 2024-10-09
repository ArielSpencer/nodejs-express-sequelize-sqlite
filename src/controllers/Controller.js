const converteIds = require('../utils/conversorDeStringHelper.js');

class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeServiços = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeServiços);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
      return res.status(200).json(umRegistro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async pegaUm(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistro(Number(where));
      return res.status(200).json(umRegistro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async atualiza(req, res) {
    const { ...params } = req.params;
    const dadosAtualizados = req.body;

    const where = converteIds(params);
    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, where);
      if (!foiAtualizado) {
        return res.status(400).json({ mensagem: 'registro não foi atualizado' });
      }
      return res.status(200).json({ mensagem: 'Atualizado com sucesso' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });


    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

}

module.exports = Controller;