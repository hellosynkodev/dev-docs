---
id: symbol
title: Symbol
sidebar_position: 1
---

# Symbol

## O que é?

**Symbol** é um tipo primitivo especial do JavaScript que representa um identificador único e imutável. Cada Symbol criado é completamente único, mesmo que compartilhe a mesma descrição.

## Por que usar?

- Criar propriedades verdadeiramente privadas em objetos
- Evitar conflitos de nomes em bibliotecas e frameworks
- Implementar chaves internas que não aparecem em iterações normais
- Trabalhar com iteradores e símbolos bem conhecidos do JavaScript

## Características Principais

### Unicidade Garantida

```javascript
const sym1 = Symbol('id');
const sym2 = Symbol('id');

console.log(sym1 === sym2); // false - cada Symbol é único
```

Mesmo com a mesma descrição, dois Symbols nunca são iguais.

### Não Enumerável

```javascript
const obj = {
  name: 'Alice',
  [Symbol('internal')]: 'hidden'
};

// Iterações normais não incluem Symbols
for (let key in obj) {
  console.log(key); // apenas "name"
}

// Para acessar Symbols, use Object.getOwnPropertySymbols()
const symbols = Object.getOwnPropertySymbols(obj);
console.log(symbols); // [Symbol(internal)]
```

## Exemplos Práticos

### Identificador Único em Objetos

```javascript
const userId = Symbol('user_id');

const users = [];

users.push({
  name: 'Alice',
  [userId]: 123
});

users.push({
  name: 'Bob',
  [userId]: 456
});

// Acesso à propriedade Symbol
console.log(users[0][userId]); // 123

// Não aparece em Object.keys()
console.log(Object.keys(users[0])); // ['name']
```

### Evitar Conflitos em Bibliotecas

```javascript
// Dentro de sua biblioteca
const privateData = Symbol('library_private');

class MyLibrary {
  constructor(data) {
    this[privateData] = data;
  }

  getData() {
    return this[privateData];
  }
}

const lib = new MyLibrary('secret');
console.log(lib.getData()); // 'secret'
console.log(lib.privateData); // undefined - não é acessível assim
```

### Implementar Iteradores

```javascript
const MyIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;
    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

// Agora funciona com for...of
for (let value of MyIterable) {
  console.log(value); // 1, 2, 3
}
```

## Símbolos Bem Conhecidos

O JavaScript fornece símbolos pré-definidos para comportamentos especiais:

```javascript
// Symbol.iterator - permite usar for...of
// Symbol.hasInstance - afeta instanceof
// Symbol.toStringTag - customiza Object.prototype.toString()

class MyClass {
  static get [Symbol.hasInstance]() {
    return (obj) => obj.type === 'MyClass';
  }

  get [Symbol.toStringTag]() {
    return 'MyClass';
  }
}

const obj = { type: 'MyClass' };
console.log(obj instanceof MyClass); // true
console.log(Object.prototype.toString.call(obj)); // [object MyClass]
```

## Symbol.for() - Símbolos Globais

Para compartilhar Symbols entre contextos, use `Symbol.for()`:

```javascript
// Em um arquivo
const sharedKey = Symbol.for('shared_id');

// Em outro arquivo/contexto
const sameKey = Symbol.for('shared_id');

console.log(sharedKey === sameKey); // true - são os mesmos!
```

## Resumo

| Aspecto | Descrição |
|--------|-----------|
| **Tipo** | Primitivo |
| **Unicidade** | Cada Symbol é único |
| **Iteração** | Não aparece em for...in ou Object.keys() |
| **Uso** | Propriedades privadas, evitar conflitos |
| **Acesso** | Object.getOwnPropertySymbols() |

## Relacionado

- [typeof](./typeof.md) - Verificar tipo de um valor
- [Classes](../poo/classes.md) - Usar Symbols em classes
- [Operador Spread](../operadores/spread-rest.md) - Trabalhar com coleções
