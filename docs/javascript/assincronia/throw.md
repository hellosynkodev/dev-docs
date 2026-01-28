---
id: throw
title: throw new Error
sidebar_position: 3
---

# throw new Error

## O que é?

**throw** é uma instrução que lança (dispara) um erro, interrompendo a execução do código e passando o controle para o bloco `catch` mais próximo. É usado para sinalizar situações de erro.

## Sintaxe Básica

```javascript
throw new Error('Mensagem de erro');

// Ou simplesmente:
throw 'Mensagem de erro';
throw 42;
throw true;
throw { custom: 'erro' };
```

:::warning
Embora você possa lançar qualquer valor, é melhor lançar objetos `Error` para ter stack traces úteis.
:::

## Tipos de Error

### Error Básico

```javascript
throw new Error('Algo deu errado');
```

### TypeError - Tipo Incorreto

```javascript
function processar(dados) {
  if (typeof dados !== 'object') {
    throw new TypeError('Esperado um objeto, recebido: ' + typeof dados);
  }
}

try {
  processar('string');
} catch (error) {
  console.error(error.message); // 'Esperado um objeto, recebido: string'
}
```

### RangeError - Valor Fora do Range

```javascript
function validarIdade(idade) {
  if (idade < 0 || idade > 150) {
    throw new RangeError('Idade deve estar entre 0 e 150');
  }
  return true;
}

try {
  validarIdade(200);
} catch (error) {
  console.error(error instanceof RangeError); // true
}
```

### ReferenceError - Referência Inválida

```javascript
function usar_variavel() {
  console.log(variavelInexistente);
  // Automaticamente lança ReferenceError
}

try {
  usar_variavel();
} catch (error) {
  console.error(error instanceof ReferenceError); // true
}
```

### SyntaxError - Sintaxe Inválida

```javascript
try {
  eval('const x = };'); // Código inválido
} catch (error) {
  console.error(error instanceof SyntaxError); // true
}
```

## Exemplos Práticos

### Validação de Entrada

```javascript
function registrarUsuario(email, senha) {
  // Validações com throw
  if (!email) {
    throw new Error('Email é obrigatório');
  }
  
  if (!email.includes('@')) {
    throw new Error('Email deve conter @');
  }
  
  if (senha.length < 8) {
    throw new RangeError('Senha deve ter pelo menos 8 caracteres');
  }
  
  console.log('Usuário registrado com sucesso');
}

try {
  registrarUsuario('alice@example.com', 'senha123');
} catch (error) {
  console.error('Erro ao registrar:', error.message);
}
```

### Divisão Segura

```javascript
function dividir(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida');
  }
  return a / b;
}

try {
  const resultado = dividir(10, 0);
} catch (error) {
  console.error('Operação inválida:', error.message);
}
```

### API com Validação

```javascript
async function buscarUsuario(id) {
  if (!id) {
    throw new Error('ID é obrigatório');
  }
  
  if (typeof id !== 'number') {
    throw new TypeError('ID deve ser um número');
  }
  
  const response = await fetch(`/api/users/${id}`);
  
  if (!response.ok) {
    throw new Error(`Usuário não encontrado (HTTP ${response.status})`);
  }
  
  return await response.json();
}

// Usar
buscarUsuario(42)
  .then(user => console.log('Usuário:', user))
  .catch(error => console.error('Erro:', error.message));
```

## Erros Customizados

Criar suas próprias classes de erro:

```javascript
// Classe Error customizada
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(resource) {
    super(`${resource} não encontrado`);
    this.name = 'NotFoundError';
  }
}

// Usar
function buscar(id) {
  if (!id) {
    throw new ValidationError('ID é obrigatório');
  }
  
  if (id === -1) {
    throw new NotFoundError('Recurso');
  }
  
  return { id, nome: 'Item' };
}

try {
  buscar(-1);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validação falhou:', error.message);
  } else if (error instanceof NotFoundError) {
    console.error('Recurso ausente:', error.message);
  }
}
```

## Re-lançar Erros

Capturar um erro e lançá-lo novamente:

```javascript
async function operacaoComRetry() {
  try {
    return await fetch('/api/dados').then(r => r.json());
  } catch (error) {
    console.error('Erro capturado, re-lançando...');
    throw error; // Re-lançar para quem chama tratar
  }
}

// Quem chama trata o erro
operacaoComRetry()
  .catch(error => {
    console.error('Erro final:', error);
  });
```

### Re-lançar com Contexto Adicional

```javascript
function processarPagamento(pedido) {
  try {
    return validarEProcessar(pedido);
  } catch (error) {
    // Adicionar contexto antes de re-lançar
    const erroEnriquecido = new Error(
      `Erro ao processar pedido #${pedido.id}: ${error.message}`
    );
    erroEnriquecido.pedidoId = pedido.id;
    erroEnriquecido.original = error;
    
    throw erroEnriquecido;
  }
}
```

## Propriedades do Error

```javascript
const error = new Error('Algo deu errado');

console.log(error.message); // 'Algo deu errado'
console.log(error.name);    // 'Error'
console.log(error.stack);   // Stack trace completo

// Error.stack é muito útil para debugging
console.log(error.stack);
// Error: Algo deu errado
//     at Object.<anonymous> (/caminho/arquivo.js:1:15)
//     at Module._load (internal/modules/esm/loader.js:...)
//     ...
```

## Padrão: Validar ou Lançar

```javascript
function garantirTipo(valor, tipo) {
  if (typeof valor !== tipo) {
    throw new TypeError(
      `Esperado ${tipo}, recebido ${typeof valor}`
    );
  }
}

function calcularMedia(...notas) {
  notas.forEach(nota => garantirTipo(nota, 'number'));
  
  const soma = notas.reduce((a, b) => a + b, 0);
  return soma / notas.length;
}

try {
  console.log(calcularMedia(7, 8, 9));        // 8
  console.log(calcularMedia(7, '8', 9));      // Erro
} catch (error) {
  console.error(error.message);
}
```

## ⚠️ Cuidados

### Não Usar para Controle de Fluxo

```javascript
// ❌ Ruim - usar error para lógica normal
function validar(email) {
  try {
    throw new Error('Vazio');
  } catch (e) {
    return false;
  }
}

// ✅ Melhor - usar condicionais
function validar(email) {
  return email && email.includes('@');
}
```

### Sempre Usar try/catch

```javascript
// ❌ Risco - erro não tratado
function arriscado() {
  throw new Error('Erro');
}

arriscado(); // Erro não capturado

// ✅ Seguro - envolver em try/catch
try {
  arriscado();
} catch (error) {
  console.error('Tratado:', error.message);
}
```

### Fornecer Mensagens Claras

```javascript
// ❌ Não útil
throw new Error('erro');

// ✅ Melhor
throw new Error('Falha ao conectar ao banco de dados: timeout após 5s');
```

## Resumo

| Aspecto | Descrição |
|--------|-----------|
| **throw** | Lança um erro |
| **Error** | Tipo de erro genérico |
| **TypeError** | Tipo de dado incorreto |
| **RangeError** | Valor fora do range |
| **ReferenceError** | Variável não existe |
| **stack** | Rastreamento do erro |

## Padrão Completo

```javascript
// Validação
if (condicao_invalida) {
  throw new Error('Mensagem clara do erro');
}

// Tratamento
try {
  // código
} catch (error) {
  console.error('Erro:', error.message);
}
```

## Relacionado

- [Tratamento de Erros](./tratamento-erros.md) - try/catch/finally
- [Async/Await](./async-await.md) - Lançar erros em funções async
- [console.error](../console/console-basico.md) - Logar erros
