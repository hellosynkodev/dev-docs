---
id: async-await
title: Async/Await
sidebar_position: 1
---

# Async/Await

## O que é?

**Async/Await** é uma forma moderna e elegante de trabalhar com Promises em JavaScript. Torna código assíncrono parecer síncrono, tornando-o mais legível e fácil de manter.

- `async` - declara uma função como assíncrona (sempre retorna uma Promise)
- `await` - pausa a execução até a Promise ser resolvida

## Conceitos Básicos

### Função Async

```javascript
// Uma função async sempre retorna uma Promise
async function obterDados() {
  return 'dados';
}

// Equivalente a:
function obterDados() {
  return Promise.resolve('dados');
}

// Usar como Promise
obterDados().then(dados => console.log(dados)); // 'dados'
```

### Await dentro de Async

```javascript
async function buscarUsuario(id) {
  // await pausa a execução até a Promise resolver
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();
  return user;
}

// Usar a função
buscarUsuario(1).then(user => console.log(user));
```

## Exemplo Prático: Requisição HTTP

```javascript
async function carregarDados() {
  console.log('Iniciando carregamento...');
  
  // await faz o código esperar a resposta
  const response = await fetch('https://api.github.com/users/github');
  
  console.log('Resposta recebida');
  
  // Converter para JSON
  const data = await response.json();
  
  console.log('Dados processados');
  return data;
}

// Chamar a função
carregarDados()
  .then(data => console.log('Usuário:', data.name))
  .catch(error => console.error('Erro:', error));
```

## Fluxo de Execução

```javascript
async function demonstrar() {
  console.log('1 - Iniciando');
  
  const promise1 = Promise.resolve('A');
  const resultado1 = await promise1;
  console.log('2 - Resultado 1:', resultado1);
  
  const promise2 = Promise.resolve('B');
  const resultado2 = await promise2;
  console.log('3 - Resultado 2:', resultado2);
  
  return [resultado1, resultado2];
}

demonstrar().then(resultados => {
  console.log('4 - Final:', resultados); // ['A', 'B']
});

// Ordem de execução:
// 1 - Iniciando
// 2 - Resultado 1: A
// 3 - Resultado 2: B
// 4 - Final: ['A', 'B']
```

## Operações em Paralelo vs Sequencial

### Sequencial (Mais Lento)

```javascript
async function sequencial() {
  console.time('sequencial');
  
  const user = await fetch('/api/user').then(r => r.json());
  const posts = await fetch('/api/posts').then(r => r.json());
  const comments = await fetch('/api/comments').then(r => r.json());
  
  console.timeEnd('sequencial'); // ~3 segundos
  return { user, posts, comments };
}
```

### Paralelo (Mais Rápido)

```javascript
async function paralelo() {
  console.time('paralelo');
  
  // Todas as requisições iniciam ao mesmo tempo
  const [user, posts, comments] = await Promise.all([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  console.timeEnd('paralelo'); // ~1 segundo
  return { user, posts, comments };
}
```

## Tratamento de Erros

Veja a seção [Tratamento de Erros](./tratamento-erros.md) para detalhes sobre try/catch/finally.

```javascript
async function operacaoSegura() {
  try {
    const data = await fetch('/api/unreliable');
    return await data.json();
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return null;
  } finally {
    console.log('Operação concluída');
  }
}
```

## Exemplos Avançados

### Transformar Promises Existentes

```javascript
// Promise tradicional
function delayTradição(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usar com async/await
async function aguardar() {
  console.log('Iniciando...');
  await delay(2000);
  console.log('Depois de 2 segundos');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

aguardar();
```

### Loop com Async

```javascript
async function processarUsuarios(userIds) {
  for (const id of userIds) {
    try {
      const user = await fetch(`/api/users/${id}`).then(r => r.json());
      console.log('Processado:', user.name);
    } catch (error) {
      console.error(`Erro ao processar usuário ${id}:`, error);
    }
  }
}

processarUsuarios([1, 2, 3]);
```

### Map com Async

```javascript
async function buscarTodos(ids) {
  const promises = ids.map(id => 
    fetch(`/api/todos/${id}`).then(r => r.json())
  );
  
  return await Promise.all(promises);
}

buscarTodos([1, 2, 3, 4, 5]).then(todos => console.log(todos));
```

### Retry com Backoff

```javascript
async function fetchComRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      
      const delay = Math.pow(2, i) * 1000; // Exponential backoff
      console.log(`Tentativa ${i + 1} falhou. Aguardando ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

fetchComRetry('https://api.example.com/data')
  .then(data => console.log('Sucesso:', data))
  .catch(error => console.error('Falha final:', error));
```

## ⚠️ Armadilhas Comuns

### Esquecer await

```javascript
// ❌ Retorna uma Promise, não o valor
async function errado() {
  const data = fetch('/api/data').then(r => r.json());
  return data; // Retorna Promise, não os dados
}

// ✅ Correto
async function correto() {
  const data = await fetch('/api/data').then(r => r.json());
  return data; // Retorna os dados
}
```

### Await fora de Async

```javascript
// ❌ SyntaxError - await só funciona em funções async
const data = await fetch('/api/data');

// ✅ Envolver em async
(async () => {
  const data = await fetch('/api/data');
})();
```

### Perder Erro sem Try/Catch

```javascript
// ❌ Erro será silenciosamente ignorado
async function ruim() {
  const data = await fetch('/api/data').then(r => r.json());
}

// ✅ Com tratamento
async function bom() {
  try {
    const data = await fetch('/api/data').then(r => r.json());
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

## Versus Promises Tradicionais

### Com Promises

```javascript
function buscarDados() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(user => fetch(`/api/posts/${user.id}`))
    .then(response => response.json())
    .then(posts => ({ user, posts }))
    .catch(error => console.error('Erro:', error));
}
```

### Com Async/Await

```javascript
async function buscarDados() {
  try {
    const userResponse = await fetch('/api/user');
    const user = await userResponse.json();
    
    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();
    
    return { user, posts };
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

Muito mais legível! ✓

## Resumo

| Aspecto | Descrição |
|--------|-----------|
| **async** | Declara função assíncrona que retorna Promise |
| **await** | Pausa execução até Promise resolver |
| **Legibilidade** | Código parece síncrono, é mais fácil entender |
| **Erros** | Use try/catch/finally |
| **Paralelo** | Use Promise.all() |

## Relacionado

- [Tratamento de Erros](./tratamento-erros.md) - try/catch/finally com async
- [throw new Error](./throw.md) - Lançar erros em funções async
- [Operador Spread](../operadores/spread-rest.md) - Desempacotar resultados de promises
