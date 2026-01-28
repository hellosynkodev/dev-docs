---
id: spread-rest
title: Spread (...) e Rest
sidebar_position: 1
---

# Spread (...) e Rest - Operador de Expansão

## O que é?

O operador `...` tem dois usos principais em JavaScript, dependendo do contexto:

- **Spread** - Espalha elementos de um array/objeto em múltiplos argumentos
- **Rest** - Captura múltiplos argumentos em um array/objeto

## Spread: Espalhar Valores

### Spread em Arrays

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Sem spread - array aninhado
const ruim = [arr1, arr2];
console.log(ruim); // [[1, 2, 3], [4, 5, 6]]

// Com spread - elementos espalhados
const bom = [...arr1, ...arr2];
console.log(bom); // [1, 2, 3, 4, 5, 6]

// Combinar com outros elementos
const novo = [0, ...arr1, 3.5, ...arr2, 7];
console.log(novo); // [0, 1, 2, 3, 3.5, 4, 5, 6, 7]
```

### Copiar Array

```javascript
const original = [1, 2, 3];

// ❌ Sem spread - referência ao mesmo array
const copia1 = original;
copia1[0] = 999;
console.log(original[0]); // 999 - afetou original!

// ✅ Com spread - cópia real
const copia2 = [...original];
copia2[0] = 999;
console.log(original[0]); // 1 - original intacto
```

### Spread em Objetos

```javascript
const user = { nome: 'Alice', email: 'alice@example.com' };
const perfil = { avatar: '/img/avatar.jpg', ativo: true };

// Espalhar objetos
const completo = { ...user, ...perfil };
console.log(completo);
// { nome: 'Alice', email: 'alice@example.com', avatar: '/img/avatar.jpg', ativo: true }

// Sobrescrever propriedades
const atualizado = { ...user, email: 'newemail@example.com' };
console.log(atualizado);
// { nome: 'Alice', email: 'newemail@example.com' }

// Adicionar propriedades
const comSenha = { ...user, senha: 'hash123' };
console.log(comSenha);
// { nome: 'Alice', email: 'alice@example.com', senha: 'hash123' }
```

### Spread em Argumentos de Função

```javascript
const numeros = [5, 3, 8, 1, 9];

// ❌ Sem spread - passa array como um argumento
console.log(Math.max(numeros)); // NaN

// ✅ Com spread - espalha elementos como argumentos
console.log(Math.max(...numeros)); // 9

// Equivalente a:
console.log(Math.max(5, 3, 8, 1, 9)); // 9
```

### Spread Prático: Merge de Arrays

```javascript
const produtosJaneiro = ['Notebook', 'Mouse'];
const produtosFevereiro = ['Teclado', 'Monitor'];
const produtosMarco = ['Webcam'];

// Combinar listas
const todosProdutos = [
  ...produtosJaneiro,
  ...produtosFevereiro,
  ...produtosMarco
];

console.log(todosProdutos);
// ['Notebook', 'Mouse', 'Teclado', 'Monitor', 'Webcam']
```

## Rest: Capturar Valores

### Rest em Parâmetros de Função

```javascript
// Sem rest - limitado a poucos parâmetros
function soma(a, b, c) {
  return a + b + c;
}

// Com rest - aceita quantos argumentos quiser
function somaFlexivel(...numeros) {
  return numeros.reduce((total, num) => total + num, 0);
}

console.log(somaFlexivel(1, 2, 3));           // 6
console.log(somaFlexivel(1, 2, 3, 4, 5));    // 15
console.log(somaFlexivel(10, 20));            // 30
```

### Rest com Outros Parâmetros

```javascript
// Primeiro parâmetro normal, resto em rest
function descrever(nome, ...hobbies) {
  console.log(`${nome} gosta de: ${hobbies.join(', ')}`);
}

descrever('Alice', 'ler', 'programar', 'jogar');
// Alice gosta de: ler, programar, jogar

// Rest deve ser o último parâmetro
function falso(...rest, nome) {} // ❌ SyntaxError
```

### Rest com Desestruturação

```javascript
// Capturar primeiro e resto
const [primeiro, ...resto] = [1, 2, 3, 4, 5];
console.log(primeiro); // 1
console.log(resto);    // [2, 3, 4, 5]

// Com objetos
const { nome, ...outrosPropriedades } = {
  nome: 'Bob',
  email: 'bob@example.com',
  telefone: '123456789'
};

console.log(nome);                  // 'Bob'
console.log(outrosPropriedades);    // { email: 'bob@example.com', telefone: '123456789' }
```

## Exemplos Práticos

### Função Flexível com Rest

```javascript
function criarMensagem(titulo, ...argumentos) {
  const conteudo = argumentos.join(' ');
  return `${titulo}: ${conteudo}`;
}

console.log(criarMensagem('Aviso', 'Erro', 'crítico'));
// 'Aviso: Erro crítico'

console.log(criarMensagem('Info', 'Sistema', 'iniciado', 'com', 'sucesso'));
// 'Info: Sistema iniciado com sucesso'
```

### Atualizar Objeto sem Mutar

```javascript
const usuario = {
  id: 1,
  nome: 'Alice',
  email: 'alice@example.com'
};

function atualizarUsuario(usuario, atualizacoes) {
  return { ...usuario, ...atualizacoes };
}

const usuarioAtualizado = atualizarUsuario(usuario, {
  email: 'newemail@example.com',
  ativo: true
});

console.log(usuario);            // Original intacto
console.log(usuarioAtualizado);  // Com mudanças
```

### Filtrar Propriedades com Rest

```javascript
const usuario = {
  nome: 'Charlie',
  email: 'charlie@example.com',
  senha: 'hash123',
  documento: 'CPF123'
};

function removerSensiveis(obj) {
  const { senha, documento, ...publico } = obj;
  return publico;
}

const publico = removerSensiveis(usuario);
console.log(publico);
// { nome: 'Charlie', email: 'charlie@example.com' }
```

### Combinar Arrays com Deduplicação

```javascript
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4, 5];

// Spread + Set para remover duplicatas
const unico = [...new Set([...arr1, ...arr2])];
console.log(unico); // [1, 2, 3, 4, 5]
```

### Construir Configurações

```javascript
const configPadrao = {
  timeout: 5000,
  retry: 3,
  cache: true
};

function criarRequisicao(url, opcoes = {}) {
  // Mesclar com padrão, permitindo sobrescrita
  const config = { ...configPadrao, ...opcoes };
  return { url, ...config };
}

const req1 = criarRequisicao('/api/users');
// { url: '/api/users', timeout: 5000, retry: 3, cache: true }

const req2 = criarRequisicao('/api/users', { timeout: 10000 });
// { url: '/api/users', timeout: 10000, retry: 3, cache: true }
```

### Transformar Array com Spread

```javascript
function mapearComInicial(valor, ...array) {
  return [valor, ...array.map(x => x * 2)];
}

console.log(mapearComInicial(0, 1, 2, 3));
// [0, 2, 4, 6]
```

## Spread vs Rest - Comparação

```javascript
// SPREAD - espalhar valores
const arr = [1, 2, 3];
const novo = [...arr, 4, 5];  // Array espalhado

const obj = { a: 1 };
const novo2 = { ...obj, b: 2 }; // Objeto espalhado

Math.max(...[5, 3, 8]);         // Argumentos espalhados

// REST - capturar valores
function funcao(...valores) {   // Parâmetros capturados
  console.log(valores);
}

const [primeiro, ...resto] = [1, 2, 3]; // Elementos capturados
const { a, ...outros } = { a: 1, b: 2 }; // Propriedades capturadas
```

## Casos de Uso Comuns

### Spread em Array de Funções

```javascript
const getUsers = () => [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const getAdmins = () => [
  { id: 3, name: 'Charlie', role: 'admin' }
];

const todosUsuarios = [...getUsers(), ...getAdmins()];
console.log(todosUsuarios.length); // 3
```

### Rest em Métodos

```javascript
class Logger {
  constructor(nivel) {
    this.nivel = nivel;
  }
  
  log(...mensagens) {
    const texto = mensagens.join(' ');
    console.log(`[${this.nivel}] ${texto}`);
  }
}

const logger = new Logger('INFO');
logger.log('Sistema', 'iniciado'); // [INFO] Sistema iniciado
logger.log('Usuário', 'logado', 'com', 'sucesso');
// [INFO] Usuário logado com sucesso
```

### Desestruturação Avançada

```javascript
const dados = {
  usuario: { nome: 'Diana', email: 'diana@example.com' },
  config: { tema: 'dark', idioma: 'pt-br' },
  meta: { criado: '2024-01-01', modificado: '2024-01-28' }
};

// Rest captura o resto
const { usuario, ...resto } = dados;
console.log(usuario);  // { nome: 'Diana', email: 'diana@example.com' }
console.log(resto);    // { config: {...}, meta: {...} }
```

## ⚠️ Armadilhas

### Spread Shallow (Cópia Superficial)

```javascript
const obj1 = {
  nome: 'Alice',
  endereco: { cidade: 'São Paulo' }
};

const obj2 = { ...obj1 };

// ❌ Propriedades aninhadas são referências
obj2.endereco.cidade = 'Rio';
console.log(obj1.endereco.cidade); // 'Rio' - afetou original!

// ✅ Para cópia profunda, usar JSON ou estruturada
const obj3 = JSON.parse(JSON.stringify(obj1));
obj3.endereco.cidade = 'Belo Horizonte';
console.log(obj1.endereco.cidade); // 'São Paulo' - intacto
```

### Rest Deve Ser Último

```javascript
// ❌ SyntaxError
function errado(...rest, nome) {}

// ✅ Correto
function certo(nome, ...rest) {}
```

### Performance em Arrays Grandes

```javascript
// ⚠️ Criar novo array a cada vez pode ser custoso
const grande = new Array(1000000).fill(0);
const novo = [...grande]; // Aloca nova memória

// Para casos críticos, considerar alternativas
```

## Resumo

| Operação | Sintaxe | Uso |
|----------|---------|-----|
| **Spread Array** | `[...arr]` | Espalhar elementos |
| **Spread Objeto** | `{ ...obj }` | Espalhar propriedades |
| **Spread Args** | `func(...arr)` | Espalhar como argumentos |
| **Rest Parâmetro** | `function(...args)` | Capturar múltiplos argumentos |
| **Rest Desestruturação** | `[primeiro, ...resto]` | Capturar restante |

## Padrões Úteis

```javascript
// Clonar
const copia = [...original];

// Mesclar
const mesclado = { ...obj1, ...obj2 };

// Remover elemento
const [_, ...semPrimeiro] = array;

// Defaults
const config = { ...padrao, ...opcoes };

// Parâmetros variáveis
function func(...args) { }
```

## Relacionado

- [Concatenação de Strings](../strings/concatenacao.md) - Alternativa com `+`
- [Async/Await](../assincronia/async-await.md) - Com Promise.all(...promises)
- [Classes](../poo/classes.md) - Usar em construtores
