function ehUmCPF(cpf) {
  const cpfFornecido = cpf.replace(/\.|-/g, '');

  if (cpfFornecido.length !== 11) return false;

  if (validaNumerosRepetidos(cpfFornecido) || validaPrimeiroDigito(cpfFornecido) || validaSegundoDigito(cpfFornecido)) {
    return false;
  }
  return true;
}

function validaNumerosRepetidos(cpfFornecido) {
  const numerosRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ];

  return numerosRepetidos.includes(cpfFornecido);
}

function validaPrimeiroDigito(cpfFornecido) {
  let soma = 0;
  let multiplicador = 10;

  for (let tamanho = 0; tamanho < 9; tamanho++) {
    soma += cpfFornecido[tamanho] * multiplicador;
    multiplicador--;
  }

  soma = (soma * 10) % 11;

  if (soma == 10 || soma == 11) {
    soma = 0;
  }

  return soma != cpfFornecido[9];
}

function validaSegundoDigito(cpfFornecido) {
  let soma = 0;
  let multiplicador = 11;

  for (let tamanho = 0; tamanho < 10; tamanho++) {
    soma += cpfFornecido[tamanho] * multiplicador;
    multiplicador--;
  }

  soma = (soma * 10) % 11;

  if (soma == 10 || soma == 11) {
    soma = 0;
  }

  return soma != cpfFornecido[10];
}

module.exports = (cpf) => {
  if (!ehUmCPF(cpf)) return false;
  return true;
};
