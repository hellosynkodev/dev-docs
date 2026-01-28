---
id: typeof
title: typeof - Verificar Tipos
sidebar_position: 3
---

# typeof

## O que é?

**typeof** é um operador unário que retorna uma string indicando o tipo de um valor. É essencial para verificações de tipo em tempo de execução.

## Sintaxe

```javascript
typeof operand
typeof (operand)
```

## Tipos Retornados

| Valor | Retorno |
|-------|---------|
| `undefined` | `'undefined'` |
| Booleano | `'boolean'` |
| Número | `'number'` |
| BigInt | `'bigint'` |
| String | `'string'` |
| Symbol | `'symbol'` |
| Função | `'function'` |
| Objeto | `'object'` |
| null | `'object'` ⚠️ |

:::warning
`typeof null` retorna `'object'`. É uma inconsistência histórica do JavaScript! Para verificar null, use `value === null`.
:::

## Exemplos por Tipo

### Primitivos

```javascript
typeof undefined;    // 'undefined'
typeof true;         // 'boolean'
typeof 42;           // 'number'
typeof 10n;          // 'bigint'
typeof 'hello';      // 'string'
typeof Symbol('id'); // 'symbol'
```

### Objetos

```javascript
typeof {};           // 'object'
typeof [];           // 'object' - arrays são objetos!
typeof {};           // 'object'
typeof null;         // 'object' - inconsistência histórica
typeof new Date();   // 'object'
typeof /regex/;      // 'object'
```

### Funções

```javascript
typeof function() {} // 'function'
typeof () => {};     // 'function'
typeof Math.sqrt;    // 'function'
typeof class {};     // 'function' - classes são funções
```

## Verificações Práticas

### Validar Tipos em Funções

```javascript
function procesarValor(valor) {
  if (typeof valor === 'string') {
    return valor.toUpperCase();
  } else if (typeof valor === 'number') {
    return valor * 2;
  } else if (typeof valor === 'boolean') {
    return !valor;
  } else {
    throw new Error('Tipo não suportado');
  }
}

console.log(procesarValor('hello'));    // 'HELLO'
console.log(procesarValor(21));         // 42
console.log(procesarValor(true));       // false
```

### Verificar Undefined

```javascript
let valor;

// ✅ MELHOR - usar typeof
if (typeof valor === 'undefined') {
  console.log('Valor não foi definido');
}

// ❌ EVITAR - pode lançar ReferenceError
// if (valor === undefined) { }  // Se 'valor' não existir, erro!
```

### Verificar Nulidade

```javascript
function validarDado(dado) {
  // Verificar null
  if (dado === null) {
    return 'Valor é null';
  }
  
  // Verificar undefined
  if (dado === undefined) {
    return 'Valor é undefined';
  }
  
  // Verificar se é vazio/falsy
  if (!dado) {
    return 'Valor é falsy';
  }
  
  return 'Valor válido';
}

console.log(validarDado(null));       // 'Valor é null'
console.log(validarDado(undefined));  // 'Valor é undefined'
console.log(validarDado(0));          // 'Valor é falsy'
console.log(validarDado(''));         // 'Valor é falsy'
console.log(validarDado('hello'));    // 'Valor válido'
```

### Verificar Arrays com Cuidado

```javascript
const arr = [1, 2, 3];

// ❌ typeof não diferencia objetos e arrays
console.log(typeof arr); // 'object'

// ✅ CORRETO - usar Array.isArray()
console.log(Array.isArray(arr)); // true

// Alternativa
console.log(arr instanceof Array); // true
```

### Verificar Funções

```javascript
function saudar() {
  return 'Olá';
}

const flecha = () => 'Oi';

const objeto = {
  metodo() { return 'Método'; }
};

console.log(typeof saudar);      // 'function'
console.log(typeof flecha);      // 'function'
console.log(typeof objeto.metodo); // 'function'
```

### Verificar Números Válidos

```javascript
function ehNumeroValido(valor) {
  return typeof valor === 'number' && !isNaN(valor);
}

console.log(ehNumeroValido(42));      // true
console.log(ehNumeroValido('42'));    // false
console.log(ehNumeroValido(NaN));     // false
console.log(ehNumeroValido(Infinity)); // true (é um número!)
```

## ⚠️ Armadilhas Comuns

### typeof com Variáveis Não Declaradas

```javascript
// ✅ typeof não lança erro para variáveis não declaradas
typeof naoExiste;  // 'undefined'

// ❌ Mas acessar a variável diretamente lança erro
console.log(naoExiste); // ReferenceError
```

### NaN é um número?

```javascript
console.log(typeof NaN); // 'number' - confuso, mas true!

// Para verificar NaN, use isNaN() ou Number.isNaN()
console.log(isNaN(NaN));         // true
console.log(Number.isNaN(NaN));  // true - mais seguro
```

### Distinguir Null vs Undefined

```javascript
function verificarValor(valor) {
  if (valor === null) {
    return 'null (nulidade explícita)';
  }
  if (valor === undefined) {
    return 'undefined (não definido)';
  }
  if (typeof valor === 'undefined') {
    return 'typeof retorna undefined';
  }
  return 'valor válido: ' + valor;
}

console.log(verificarValor(null));      // 'null (nulidade explícita)'
console.log(verificarValor(undefined)); // 'undefined (não definido)'
```

## Comparação: typeof vs instanceof

```javascript
const obj = {};
const arr = [];
const func = () => {};

// typeof verifica tipo primitivo
console.log(typeof obj);   // 'object'
console.log(typeof arr);   // 'object'
console.log(typeof func);  // 'function'

// instanceof verifica herança
console.log(obj instanceof Object);   // true
console.log(arr instanceof Array);    // true
console.log(arr instanceof Object);   // true (Arrays herdam de Object)
console.log(func instanceof Function); // true
```

:::info
Use `typeof` para primitivos e `instanceof` ou `Array.isArray()` para objetos.
:::

## Resumo

| Uso | Solução |
|-----|---------|
| **Verificar primitivos** | `typeof valor` |
| **Verificar arrays** | `Array.isArray(valor)` |
| **Verificar nulidade** | `valor === null` ou `valor === undefined` |
| **Verificar NaN** | `Number.isNaN(valor)` |
| **Verificar instância** | `valor instanceof Classe` |

## Relacionado

- [Symbol](./symbol.md) - Tipo primitivo único
- [BigInt](./bigint.md) - Números inteiros grandes
- [Classes](../poo/classes.md) - Usar com instanceof
