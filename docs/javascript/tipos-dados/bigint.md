---
id: bigint
title: BigInt
sidebar_position: 2
---

# BigInt

## O que é?

**BigInt** é um tipo primitivo que permite representar números inteiros arbitrariamente grandes, sem limite de tamanho. O tipo `Number` em JavaScript só pode representar inteiros com segurança até $2^{53} - 1$ ($9.007.199.254.740.991$).

## Por que usar?

- Trabalhar com números muito grandes (criptografia, IDs longos)
- Evitar perda de precisão em cálculos
- Operações matemáticas exatas com grandes números

## Criando BigInts

### Usando o sufixo `n`

```javascript
const big1 = 9007199254740992n; // além do limite seguro do Number
const big2 = 123456789012345678901234567890n;

console.log(big1); // 9007199254740992n
console.log(big2); // 123456789012345678901234567890n
```

### Usando a função construtora

```javascript
const big = BigInt('9007199254740992');
console.log(big); // 9007199254740992n
```

## Diferença entre Number e BigInt

```javascript
// Limite do Number
const maxSafeNumber = Number.MAX_SAFE_INTEGER;
console.log(maxSafeNumber); // 9007199254740991

// Number perde precisão além do limite
const num1 = 9007199254740992;
const num2 = 9007199254740993;
console.log(num1 === num2); // true - PERDA DE PRECISÃO!

// BigInt mantém precisão
const big1 = 9007199254740992n;
const big2 = 9007199254740993n;
console.log(big1 === big2); // false - precisão mantida
```

## Operações com BigInt

### Operações Aritméticas

```javascript
const a = 100n;
const b = 30n;

console.log(a + b);  // 130n
console.log(a - b);  // 70n
console.log(a * b);  // 3000n
console.log(a / b);  // 3n (divisão inteira, descarta resto)
console.log(a % b);  // 10n (resto da divisão)
console.log(a ** 2n); // 10000n (exponenciação)
```

### Comparação

```javascript
const big = 10n;
const num = 10;

console.log(big === num);  // false (tipos diferentes)
console.log(big == num);   // true (comparação de valor)
console.log(big > 5);      // true (conversão implícita funciona)
console.log(big < 20);     // true
```

## ⚠️ Restrições Importantes

### Não pode misturar BigInt e Number

```javascript
// ❌ ERRO
const result = 10n + 5;    // TypeError
const result2 = 10 + 5n;   // TypeError
const result3 = 10n * 2.5; // TypeError

// ✅ CORRETO - converter explicitamente
const result = 10n + BigInt(5);     // 15n
const result2 = Number(10n) + 5;    // 15
```

### Operações que não funcionam com BigInt

```javascript
// Math (a maioria não funciona com BigInt)
Math.sqrt(16n);     // ❌ TypeError

// Alguns métodos especiais funcionam
const big = 10n;
console.log(Math.max(big, 5n)); // TypeError

// Operações lógicas funcionam
console.log(!0n);    // true
console.log(!1n);    // false
```

### JSON não suporta BigInt

```javascript
const data = { id: 123456789012345678901234567890n };

// ❌ ERRO - BigInt não é serializável por padrão
JSON.stringify(data); // TypeError

// ✅ SOLUÇÃO - converter ou usar replacer
const json = JSON.stringify(data, (key, value) => 
  typeof value === 'bigint' ? value.toString() : value
);
console.log(json); // {"id":"123456789012345678901234567890"}
```

## Exemplos Práticos

### Cálculo de Fibonacci com Números Grandes

```javascript
function fibonacci(n) {
  if (n <= 1n) return n;
  
  let a = 0n, b = 1n;
  for (let i = 2n; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

console.log(fibonacci(50n));   // 12586269025n
console.log(fibonacci(100n));  // 354224848179261915075n
```

### Trabalhar com IDs Grandes

```javascript
// IDs de usuário muito grandes
const userId1 = 99999999999999999999n;
const userId2 = 88888888888888888888n;

const users = new Map();
users.set(userId1, 'Alice');
users.set(userId2, 'Bob');

console.log(users.get(userId1)); // 'Alice'
```

### Armazenar Grandes Quantidades

```javascript
const totalAtomsInUniverse = 10n ** 80n; // 10^80

console.log(totalAtomsInUniverse);
// 100000000000000000000000000000000000000000000000000000000000000000000000000000000n
```

## Verificando se é BigInt

```javascript
const big = 10n;
const num = 10;

console.log(typeof big);     // 'bigint'
console.log(typeof num);     // 'number'

// Função auxiliar
function isBigInt(value) {
  return typeof value === 'bigint';
}

console.log(isBigInt(10n));  // true
console.log(isBigInt(10));   // false
```

## Resumo

| Aspecto | Number | BigInt |
|--------|--------|--------|
| **Tamanho máximo seguro** | $2^{53} - 1$ | Ilimitado |
| **Precisão** | Limitada | Exata |
| **Com decimais** | ✓ Suporta | ✗ Só inteiros |
| **typeof** | `'number'` | `'bigint'` |
| **Operações Math** | ✓ Maioria | ✗ Não suporta |
| **JSON.stringify** | ✓ Funciona | ✗ Erro padrão |

## Relacionado

- [typeof](./typeof.md) - Verificar tipos de dados
- [Tratamento de Erros](../assincronia/tratamento-erros.md) - Lidar com exceções ao converter
