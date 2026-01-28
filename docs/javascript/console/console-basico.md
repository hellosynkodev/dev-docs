---
id: console-basico
title: console.log e Debugging
sidebar_position: 1
---

# console.log e Debugging

## O que é?

O **console** é um objeto global que fornece ferramentas para debugging e logging. `console.log()` é o método mais comum para exibir valores e informações durante o desenvolvimento.

## console.log() Básico

### Múltiplos Valores

```javascript
const name = 'Alice';
const age = 28;
const active = true;

// Múltiplos argumentos separados por vírgula
console.log('Name:', name, 'Age:', age, 'Active:', active);
// Name: Alice Age: 28 Active: true

// Sem rótulos
console.log(name, age, active);
// Alice 28 true
```

### Com Template Strings

```javascript
const user = 'Bob';
const score = 42;

console.log(`Player ${user} scored ${score} points`);
// Player Bob scored 42 points
```

### Estruturas Complexas

```javascript
const user = {
  id: 1,
  name: 'Charlie',
  email: 'charlie@email.com',
  profile: {
    age: 30,
    city: 'São Paulo'
  }
};

console.log(user);
// Object
// ├─ id: 1
// ├─ name: "Charlie"
// ├─ email: "charlie@email.com"
// └─ profile: Object
//    ├─ age: 30
//    └─ city: "São Paulo"

// Array
const numbers = [1, 2, 3, 4, 5];
console.log(numbers);
// (5) [1, 2, 3, 4, 5]
```

## Outros Métodos do Console

### console.error() - Erros

```javascript
console.error('Algo deu errado!');
console.error('Erro:', new Error('Mensagem de erro'));

// Exibido em vermelho no DevTools
```

### console.warn() - Avisos

```javascript
console.warn('Atenção: este recurso está deprecado');
console.warn('Valor inválido:', valor);

// Exibido em amarelo no DevTools
```

### console.info() - Informação

```javascript
console.info('Operação concluída com sucesso');
console.info('Usuários carregados:', 25);
```

### console.debug() - Debug

```javascript
console.debug('Estado atual:', state);
console.debug('Entrando na função processar()');
```

### console.table() - Tabela

Perfeito para exibir arrays ou objetos estruturados:

```javascript
const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'user' }
];

console.table(users);

// Exibição tabulada:
// ┌───┬────┬─────────┬──────┐
// │ # │ id │ name    │ role │
// ├───┼────┼─────────┼──────┤
// │ 0 │ 1  │ "Alice" │ admin│
// │ 1 │ 2  │ "Bob"   │ user │
// │ 2 │ 3  │ Charlie │ user │
// └───┴────┴─────────┴──────┘
```

### console.group() - Agrupar Mensagens

```javascript
console.group('Carregando dados');
console.log('Conectando ao servidor...');
console.log('Autenticando...');
console.log('Buscando dados...');
console.groupEnd();

console.group('Erro');
console.error('Falha na conexão');
console.groupEnd();

// Saída:
// ▼ Carregando dados
//   Conectando ao servidor...
//   Autenticando...
//   Buscando dados...
// ▼ Erro
//   Falha na conexão
```

### console.time() e console.timeEnd() - Medir Performance

```javascript
console.time('processamento');

// Simular operação
for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}

console.timeEnd('processamento');
// processamento: 15.5ms

// Com múltiplos timers
console.time('api');
// ... fazer requisição
console.timeEnd('api');
// api: 245ms
```

### console.assert() - Asserção

```javascript
const user = { name: 'Alice', age: 28 };

console.assert(user.age > 18, 'Usuário deve ser maior de idade');
// Sem output se verdadeiro

console.assert(user.age > 40, 'Usuário deve ser maior de 40 anos');
// Assertion failed: Usuário deve ser maior de 40 anos (se falso)
```

### console.clear() - Limpar Console

```javascript
// Remove todas as mensagens do console
console.clear();
```

## Práticas e Padrões

### Debugging Estruturado

```javascript
function processarPagamento(pedido) {
  console.group(`Processando pedido #${pedido.id}`);
  
  console.log('Dados do pedido:', pedido);
  console.log('Total:', pedido.total);
  
  try {
    const resultado = validarPagamento(pedido);
    console.log('✓ Validação bem-sucedida');
    return resultado;
  } catch (error) {
    console.error('✗ Erro na validação:', error.message);
    throw error;
  } finally {
    console.groupEnd();
  }
}
```

### Usar Prefixos para Organizar

```javascript
function fetch_data(url) {
  console.log(`[FETCH] Buscando: ${url}`);
}

function processar_resultado(data) {
  console.log(`[PROCESS] Processando ${data.length} itens`);
}

function salvar_cache(key, value) {
  console.log(`[CACHE] Salvando: ${key}`);
}

// Saída organizada e fácil de filtrar
// [FETCH] Buscando: /api/users
// [PROCESS] Processando 10 itens
// [CACHE] Salvando: user_list
```

### Badges de Status

```javascript
console.log('%c✓ Sucesso', 'color: green; font-weight: bold');
console.log('%c⚠ Aviso', 'color: orange; font-weight: bold');
console.log('%c✗ Erro', 'color: red; font-weight: bold');
console.log('%cℹ Info', 'color: blue; font-weight: bold');
```

### Objetos com Context

```javascript
const apiResponse = {
  status: 200,
  data: { users: 42 }
};

// Melhor forma para estruturas complexas
console.log({ apiResponse });  // {apiResponse: {...}}

// Ou usar object shorthand
console.table(apiResponse);
```

## ⚠️ Cuidados

### Não deixar console.log em Produção

```javascript
// ❌ Ruim - deixa logs em produção
console.log('Debug:', sensitiveData);

// ✅ Bom - condicionado ao ambiente
if (process.env.NODE_ENV === 'development') {
  console.log('Debug:', sensitiveData);
}

// ✅ Bom - usar logger adequado
logger.debug('Debug:', sensitiveData);
```

### Performance em Loops

```javascript
// ❌ Lento - muitos logs
for (let i = 0; i < 10000; i++) {
  console.log(i);
}

// ✅ Melhor - resumir informações
console.log(`Loop: 0-10000`);

// ✅ Ou usar console.time
console.time('loop');
for (let i = 0; i < 10000; i++) {
  // processar
}
console.timeEnd('loop');
```

### Cuidado com Objetos Mutáveis

```javascript
const obj = { value: 1 };

console.log(obj);  // { value: 1 }

obj.value = 2;

// ⚠️ Pode mostrar o valor atual, não o que foi logado!
// Solução: clonar ou usar JSON.stringify
console.log(JSON.stringify(obj));  // {"value":2}
```

## Resumo de Métodos

| Método | Uso | Cor |
|--------|-----|-----|
| `log()` | Informação geral | Branco |
| `error()` | Erros | Vermelho |
| `warn()` | Avisos | Amarelo |
| `info()` | Informações | Azul |
| `debug()` | Debug detalhado | Padrão |
| `table()` | Dados tabulares | - |
| `group()` | Agrupar logs | - |
| `time()` | Medir performance | - |
| `assert()` | Validar condições | - |

## Relacionado

- [Tratamento de Erros](../assincronia/tratamento-erros.md) - Usar console com try/catch
- [Async/Await](../assincronia/async-await.md) - Logar operações assíncronas
