---
id: concatenacao
title: Concatenação de Strings
sidebar_position: 1
---

# Concatenação de Strings

## O que é?

Concatenação é o processo de juntar várias strings em uma única string. Existem múltiplas formas de fazer isso em JavaScript, cada uma com seus usos e vantagens.

## Métodos de Concatenação

### 1. Operador `+`

A forma mais simples e comum.

```javascript
const firstName = 'João';
const lastName = 'Silva';

const fullName = firstName + ' ' + lastName;
console.log(fullName); // 'João Silva'

// Funciona com diferentes tipos (com conversão)
console.log('Idade: ' + 25);        // 'Idade: 25'
console.log('Total: ' + (10 + 5));  // 'Total: 15'
```

:::warning
O operador `+` faz conversão de tipo. Se uma das partes for string, a outra é convertida:

```javascript
console.log('5' + 3);    // '53' (string + number = concatenação)
console.log(5 + 3);      // 8 (number + number = soma)
console.log('5' + '3');  // '53' (string + string = concatenação)
```
:::

### 2. Template Strings (Recomendado)

Forma moderna, legível e poderosa usando crase (`` ` ``):

```javascript
const name = 'Maria';
const age = 28;

const message = `Olá, meu nome é ${name} e tenho ${age} anos.`;
console.log(message); // 'Olá, meu nome é Maria e tenho 28 anos.'

// Suporta expressões
const result = `Resultado: ${10 + 5}`;
console.log(result); // 'Resultado: 15'

// Múltiplas linhas
const bio = `
  Nome: ${name}
  Idade: ${age}
  Ativo: ${'sim'}
`;
console.log(bio);
```

:::tip
Template strings também avaliam expressões JavaScript dentro de `${}`, facilitando lógica complexa.
:::

### 3. Método `concat()`

Menos usado, mas funcional:

```javascript
const str1 = 'Hello';
const str2 = 'World';

const result = str1.concat(' ', str2);
console.log(result); // 'Hello World'

// Múltiplos argumentos
const full = ''.concat('A', 'B', 'C', 'D');
console.log(full); // 'ABCD'

// Com strings e números
const mixed = 'Total: '.concat(100, ' reais');
console.log(mixed); // 'Total: 100 reais'
```

### 4. Array `join()`

Útil para juntar múltiplas strings:

```javascript
const words = ['JavaScript', 'é', 'poderoso'];
const sentence = words.join(' ');
console.log(sentence); // 'JavaScript é poderoso'

// Separador personalizado
const path = ['home', 'user', 'documents', 'file.txt'];
console.log(path.join('/'));  // 'home/user/documents/file.txt'

const list = ['A', 'B', 'C'];
console.log(list.join(', ')); // 'A, B, C'
```

## Qual Usar?

| Método | Quando usar | Vantagem |
|--------|-----------|---------|
| **`+`** | Poucas strings | Simples e rápido |
| **Template strings** | Lógica ou múltiplas variáveis | Legível, expressões diretas |
| **`concat()`** | Padrão funcional | Seguro, nunca modifica original |
| **`join()`** | Arrays de strings | Ideal para listas dinâmicas |

## Exemplos Práticos

### Criar URLs Dinamicamente

```javascript
const baseUrl = 'https://api.exemplo.com';
const endpoint = 'users';
const userId = 123;

// ❌ Difícil de ler
const urlConcat = baseUrl + '/' + endpoint + '/' + userId;

// ✅ Muito melhor
const urlTemplate = `${baseUrl}/${endpoint}/${userId}`;

console.log(urlTemplate); // 'https://api.exemplo.com/users/123'
```

### Formatação de Mensagens

```javascript
function formatarPedido(numero, cliente, valor) {
  return `
    ========== PEDIDO ==========
    Número: ${numero}
    Cliente: ${cliente}
    Valor: R$ ${valor.toFixed(2)}
    ===========================
  `.trim();
}

console.log(formatarPedido(1001, 'João Silva', 299.90));
```

### Montar HTML

```javascript
function criarUserCard(name, email, avatar) {
  return `
    <div class="card">
      <img src="${avatar}" alt="${name}">
      <h3>${name}</h3>
      <p>${email}</p>
    </div>
  `;
}

const html = criarUserCard('Alice', 'alice@email.com', '/img/alice.jpg');
console.log(html);
```

### Construir Filtros Dinâmicos

```javascript
const filters = {
  categoria: 'eletrônicos',
  preco_minimo: 100,
  preco_maximo: 500,
  ordenacao: 'preco'
};

const queryString = Object.entries(filters)
  .map(([key, value]) => `${key}=${value}`)
  .join('&');

console.log(queryString);
// 'categoria=eletrônicos&preco_minimo=100&preco_maximo=500&ordenacao=preco'
```

## Performance

Para concatenações em loop, `Array.join()` é mais eficiente:

```javascript
// ❌ Menos eficiente - cria nova string a cada iteração
let result = '';
for (let i = 0; i < 1000; i++) {
  result += i + ', ';
}

// ✅ Mais eficiente - uma única operação
const parts = [];
for (let i = 0; i < 1000; i++) {
  parts.push(i);
}
const result = parts.join(', ');
```

## Resumo

```javascript
// Simples
'Hello ' + 'World'

// Moderno e recomendado
`Hello ${name}`

// Múltiplas strings
[str1, str2, str3].join(' ')

// Método direto
str1.concat(str2, str3)
```

## Relacionado

- [console.log](../console/console-basico.md) - Exibir strings
- [Template Strings Avançadas](./template-strings.md) - Tagged templates e casos avançados
- [Spread Operator](../operadores/spread-rest.md) - Desempacotar arrays em argumentos
