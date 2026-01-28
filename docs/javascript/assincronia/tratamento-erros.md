---
id: tratamento-erros
title: Tratamento de Erros - Try/Catch/Finally
sidebar_position: 2
---

# Tratamento de Erros - Try/Catch/Finally

## O que é?

**Try/Catch/Finally** é a estrutura fundamental para lidar com erros em JavaScript. Permite capturar exceções, tratá-las graciosamente e executar limpeza quando necessário.

## Estrutura Básica

```javascript
try {
  // Código que pode gerar erro
  riskyOperation();
} catch (error) {
  // Executado se houver erro em try
  console.error('Erro capturado:', error);
} finally {
  // SEMPRE executado, com ou sem erro
  console.log('Limpeza executada');
}
```

## Try: Executar Código

O bloco `try` contém código que pode lançar um erro:

```javascript
try {
  const resultado = JSON.parse('JSON inválido {');
  console.log(resultado); // Nunca executa
} catch (error) {
  console.error('Erro ao fazer parse:', error.message);
}
```

## Catch: Tratar Erro

O bloco `catch` é executado se um erro ocorrer:

```javascript
try {
  throw new Error('Erro customizado');
} catch (error) {
  // 'error' contém informações sobre o erro
  console.log('Tipo:', error.name);           // 'Error'
  console.log('Mensagem:', error.message);    // 'Erro customizado'
  console.log('Stack:', error.stack);         // Rastreamento completo
}
```

### Propriedades do Objeto Error

```javascript
try {
  // Forçar um erro
  undefined.propriedade;
} catch (error) {
  console.log(error.name);      // 'TypeError'
  console.log(error.message);   // "Cannot read property 'propriedade' of undefined"
  console.log(error.stack);     // Stack trace completo
  
  // Acessar mais informações
  console.log(Object.keys(error)); // Chaves disponíveis
}
```

## Finally: Limpeza Garantida

O bloco `finally` **sempre** executa, independente de erro:

```javascript
function demonstrar() {
  try {
    console.log('1 - Try executado');
    return 'sucesso';
  } catch (error) {
    console.log('2 - Catch executado');
  } finally {
    console.log('3 - Finally sempre executa');
  }
}

demonstrar();
// 1 - Try executado
// 3 - Finally sempre executa
// Retorna: 'sucesso'
```

## Exemplos Práticos

### Validação de Entrada

```javascript
function dividir(a, b) {
  try {
    if (b === 0) {
      throw new Error('Divisão por zero não permitida');
    }
    return a / b;
  } catch (error) {
    console.error('Erro na divisão:', error.message);
    return null;
  }
}

console.log(dividir(10, 2));   // 5
console.log(dividir(10, 0));   // null (erro capturado)
```

### Parsing de JSON

```javascript
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON inválido:', error.message);
    return {};
  }
}

console.log(parseJSON('{"nome": "Alice"}')); // { nome: 'Alice' }
console.log(parseJSON('inválido'));          // {} (erro capturado)
```

### Operações com Arquivo (Node.js)

```javascript
const fs = require('fs');

function lerArquivo(caminho) {
  try {
    const conteudo = fs.readFileSync(caminho, 'utf-8');
    return conteudo;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Arquivo não encontrado:', caminho);
    } else {
      console.error('Erro ao ler arquivo:', error.message);
    }
    return null;
  }
}

const dados = lerArquivo('/caminho/arquivo.txt');
```

### Requisição HTTP com Tratamento

```javascript
async function buscarDados(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Erro na requisição:', error.message);
    
    // Re-lançar o erro se necessário
    throw error;
    
  } finally {
    console.log('Requisição finalizada');
  }
}

buscarDados('/api/dados')
  .then(dados => console.log('Sucesso:', dados))
  .catch(error => console.error('Falha:', error));
```

### Limpeza de Recursos

```javascript
function processarComConexao(dados) {
  let conexao = null;
  
  try {
    conexao = abrirConexao();
    const resultado = conexao.executar(dados);
    return resultado;
    
  } catch (error) {
    console.error('Erro durante processamento:', error);
    return null;
    
  } finally {
    // Garantido: fechar conexão mesmo com erro
    if (conexao) {
      conexao.fechar();
      console.log('Conexão fechada');
    }
  }
}
```

## Tratamento em Cascata

Capturar diferentes tipos de erro:

```javascript
try {
  // Alguma operação arriscada
  const resultado = operacaoComplexe();
  
} catch (error) {
  // Verificar tipo de erro
  if (error instanceof TypeError) {
    console.error('Erro de tipo:', error.message);
  } else if (error instanceof SyntaxError) {
    console.error('Erro de sintaxe:', error.message);
  } else if (error instanceof RangeError) {
    console.error('Erro de range:', error.message);
  } else {
    console.error('Erro genérico:', error.message);
  }
}
```

## Com Async/Await

Try/catch é perfeito com async/await:

```javascript
async function buscarMultiplosDados() {
  try {
    const user = await fetch('/api/user').then(r => r.json());
    const posts = await fetch(`/api/posts/${user.id}`).then(r => r.json());
    
    return { user, posts };
    
  } catch (error) {
    console.error('Falha ao buscar dados:', error);
    return { user: null, posts: null };
    
  } finally {
    console.log('Operação de carregamento finalizada');
  }
}
```

## Nested Try/Catch

Tratamentos específicos em diferentes níveis:

```javascript
async function operacaoCompleta() {
  try {
    // Operação 1
    try {
      const dados = await fetch('/api/critica').then(r => r.json());
      return dados;
    } catch (error) {
      console.warn('API crítica falhou, tentando fallback...');
      // Tentar alternativa
      return await fetch('/api/fallback').then(r => r.json());
    }
    
  } catch (error) {
    // Captura final
    console.error('Falha completa:', error);
    return null;
  }
}
```

## Tipos de Erro Nativos

```javascript
// ReferenceError - variável não definida
try {
  console.log(variavelNaoExiste);
} catch (error) {
  console.log(error instanceof ReferenceError); // true
}

// TypeError - tipo incorreto
try {
  const obj = null;
  obj.metodo();
} catch (error) {
  console.log(error instanceof TypeError); // true
}

// SyntaxError - código inválido
try {
  eval('const x = };'); // código ruim
} catch (error) {
  console.log(error instanceof SyntaxError); // true
}

// RangeError - valor fora do range
try {
  new Array(-1);
} catch (error) {
  console.log(error instanceof RangeError); // true
}
```

## ⚠️ Armadilhas

### Catch sem Especificidade

```javascript
// ❌ Ruim - captura todos os erros igual
try {
  const result = JSON.parse(data);
} catch {
  // Pode mascarar bugs reais
  return null;
}

// ✅ Melhor - ser específico
try {
  const result = JSON.parse(data);
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error('JSON inválido:', data);
  } else {
    throw error; // Re-lançar erros inesperados
  }
}
```

### Não Lançar Erro em Finally

```javascript
// ❌ Evitar - lançar erro em finally pode mascarar erro original
try {
  throw new Error('Erro original');
} finally {
  throw new Error('Erro em finally'); // Substitui o original!
}

// ✅ Melhor - fazer limpeza sem lançar
try {
  throw new Error('Erro original');
} finally {
  recurso.limpar(); // Sem throw
}
```

## Resumo

| Bloco | Quando | Obrigatório |
|-------|--------|-----------|
| **try** | Código que pode gerar erro | Sim |
| **catch** | Tratar o erro | Não (if finally present) |
| **finally** | Limpeza garantida | Não |

```javascript
// Padrão completo
try {
  // Operação
} catch (error) {
  // Tratar
} finally {
  // Limpar
}
```

## Relacionado

- [Async/Await](./async-await.md) - Usar try/catch com promises
- [throw new Error](./throw.md) - Lançar erros customizados
- [console.log](../console/console-basico.md) - Logar erros
