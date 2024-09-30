class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeServiços = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeServiços);
    } catch (error) {
      // error
    }
  }
}

module.exports = Controller;