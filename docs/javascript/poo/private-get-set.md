---
id: private-get-set
title: Private, Get e Set
sidebar_position: 3
---

# Private, Get e Set - Encapsulamento

## O que é?

Encapsulamento é a prática de proteger dados internos e controlar como são acessados. Em JavaScript, usamos:

- **`#`** - Propriedades privadas (não acessíveis de fora)
- **`get`** - Acessar propriedade com lógica customizada
- **`set`** - Atribuir propriedade com validação

## Propriedades Privadas (`#`)

Começam com `#` e só são acessíveis dentro da classe:

```javascript
class Conta {
  #saldo = 0; // Privada
  titular = '';  // Pública
  
  constructor(titular, saldoInicial) {
    this.titular = titular;
    this.#saldo = saldoInicial;
  }
  
  // Acessar privado dentro da classe
  getSaldo() {
    return this.#saldo;
  }
  
  // Modificar privado com validação
  depositar(valor) {
    if (valor <= 0) {
      throw new Error('Valor deve ser positivo');
    }
    this.#saldo += valor;
  }
}

const conta = new Conta('Alice', 1000);

console.log(conta.getSaldo());    // 1000 ✓
console.log(conta.titular);       // 'Alice' ✓

// ❌ Erro - não é possível acessar privado
console.log(conta.#saldo);        // SyntaxError
conta.#saldo = 999999;            // SyntaxError
```

:::info
Privacidade é real em JavaScript (desde ES2022). Diferente de usar `_` por convenção, `#` é verdadeiramente inacessível.
:::

## Getters (`get`)

Acessar propriedade como se fosse um atributo, mas executando lógica:

```javascript
class Retangulo {
  constructor(largura, altura) {
    this.largura = largura;
    this.altura = altura;
  }
  
  // Getter - chamar sem parenteses
  get area() {
    return this.largura * this.altura;
  }
  
  get perimetro() {
    return 2 * (this.largura + this.altura);
  }
}

const rect = new Retangulo(5, 3);

console.log(rect.area);      // 15 - não precisa de ()
console.log(rect.perimetro); // 16 - não precisa de ()
```

## Setters (`set`)

Atribuir valor com validação:

```javascript
class Produto {
  #preco;
  
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco; // Usa o setter
  }
  
  // Setter - validação ao atribuir
  set preco(valor) {
    if (typeof valor !== 'number') {
      throw new TypeError('Preço deve ser um número');
    }
    if (valor < 0) {
      throw new Error('Preço não pode ser negativo');
    }
    this.#preco = valor;
  }
  
  // Getter - retorna o valor
  get preco() {
    return this.#preco;
  }
}

const produto = new Produto('Notebook', 2500);
console.log(produto.preco); // 2500

produto.preco = 3000;      // Usa o setter
console.log(produto.preco); // 3000

// ❌ Validação funciona
produto.preco = -100;      // Error: Preço não pode ser negativo
```

## Exemplo Completo: Classe Segura

```javascript
class Usuario {
  #email;
  #senha;
  #dataRegistro;
  
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;    // Usa setter
    this.senha = senha;    // Usa setter
    this.#dataRegistro = new Date();
  }
  
  // Getter - email
  get email() {
    return this.#email;
  }
  
  // Setter - email com validação
  set email(novoEmail) {
    if (!novoEmail.includes('@')) {
      throw new Error('Email inválido');
    }
    this.#email = novoEmail;
  }
  
  // Getter - senha (nunca retorna a real)
  get senha() {
    return '***'; // Nunca expor a real
  }
  
  // Setter - senha com validação
  set senha(novaSenha) {
    if (novaSenha.length < 8) {
      throw new Error('Senha deve ter mínimo 8 caracteres');
    }
    this.#senha = novaSenha;
  }
  
  // Método privado
  #criptografar(texto) {
    return 'criptografado_' + texto;
  }
  
  // Verificar senha
  verificarSenha(tentativa) {
    return this.#senha === tentativa;
  }
  
  // Tempo desde registro (getter calculado)
  get diasRegistrado() {
    const hoje = new Date();
    const diferenca = hoje - this.#dataRegistro;
    return Math.floor(diferenca / (1000 * 60 * 60 * 24));
  }
}

const usuario = new Usuario('Alice', 'alice@example.com', 'senha123');

console.log(usuario.email);      // 'alice@example.com'
console.log(usuario.senha);      // '***' (protegida)
console.log(usuario.diasRegistrado); // 0

// Alterar email com validação
usuario.email = 'newemail@example.com';
console.log(usuario.email); // 'newemail@example.com'

// ❌ Setter rejeita inválidos
usuario.email = 'invalido';  // Error: Email inválido
```

## Métodos Privados

Similar a propriedades, começam com `#`:

```javascript
class Autenticacao {
  #apiKey;
  
  constructor(apiKey) {
    this.#apiKey = apiKey;
  }
  
  // Método privado
  #validarChave() {
    return this.#apiKey.length > 10;
  }
  
  // Método privado
  #fazer_requisicao(endpoint) {
    if (!this.#validarChave()) {
      throw new Error('Chave inválida');
    }
    return `Acessando ${endpoint}`;
  }
  
  // Método público
  obterDados(endpoint) {
    return this.#fazer_requisicao(endpoint);
  }
}

const auth = new Autenticacao('1234567890abcdef');
console.log(auth.obterDados('/api/users')); // 'Acessando /api/users'

// ❌ Não pode chamar método privado
auth.#fazer_requisicao('/api/users'); // SyntaxError
```

## Getters e Setters para Validação

```javascript
class Pessoa {
  #idade;
  
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade; // Usa o setter
  }
  
  get idade() {
    return this.#idade;
  }
  
  set idade(novaIdade) {
    if (typeof novaIdade !== 'number') {
      throw new TypeError('Idade deve ser um número');
    }
    if (novaIdade < 0) {
      throw new RangeError('Idade não pode ser negativa');
    }
    if (novaIdade > 150) {
      throw new RangeError('Idade deve ser realista');
    }
    this.#idade = novaIdade;
  }
  
  get maiorDeIdade() {
    return this.#idade >= 18;
  }
}

const pessoa = new Pessoa('Bob', 25);
console.log(pessoa.maiorDeIdade); // true

pessoa.idade = 17;
console.log(pessoa.maiorDeIdade); // false

// ❌ Validação rejeita
pessoa.idade = -5;    // RangeError
pessoa.idade = 200;   // RangeError
```

## Getters Calculados

Propriedades que derivam de outras:

```javascript
class Temperatura {
  #celsius;
  
  constructor(celsius) {
    this.#celsius = celsius;
  }
  
  get celsius() {
    return this.#celsius;
  }
  
  // Converter para Fahrenheit (apenas leitura)
  get fahrenheit() {
    return (this.#celsius * 9/5) + 32;
  }
  
  // Converter para Kelvin (apenas leitura)
  get kelvin() {
    return this.#celsius + 273.15;
  }
  
  set celsius(novaTemp) {
    this.#celsius = novaTemp;
  }
}

const temp = new Temperatura(25);
console.log(temp.celsius);    // 25
console.log(temp.fahrenheit); // 77
console.log(temp.kelvin);     // 298.15

temp.celsius = 0;
console.log(temp.fahrenheit); // 32
```

## Comparação: Before e After

### ❌ Antes (sem encapsulamento)

```javascript
class ContaRuim {
  constructor(saldo) {
    this.saldo = saldo;
  }
}

const conta = new ContaRuim(1000);
conta.saldo = -99999; // Sem validação!
```

### ✅ Depois (com encapsulamento)

```javascript
class ContaBem {
  #saldo;
  
  constructor(saldo) {
    this.saldo = saldo; // Usa setter
  }
  
  get saldo() {
    return this.#saldo;
  }
  
  set saldo(valor) {
    if (valor < 0) {
      throw new Error('Saldo não pode ser negativo');
    }
    this.#saldo = valor;
  }
}

const conta = new ContaBem(1000);
conta.saldo = -99999; // Error!
```

## ⚠️ Armadilhas

### Confundir com Tipos

```javascript
// ❌ Não é tipagem (não valida em tempo de compilação)
class Exemplo {
  #numero: number; // Sintaxe TypeScript, não JavaScript!
}

// ✅ JavaScript puro - validar no setter
class Exemplo {
  #numero;
  
  set numero(valor) {
    if (typeof valor !== 'number') {
      throw new TypeError('Deve ser número');
    }
    this.#numero = valor;
  }
}
```

### Privacidade vs Segurança

```javascript
// ⚠️ Privado não impede acesso completamente
class Segredo {
  #valor = 'secreto';
}

const obj = new Segredo();

// Mas é realmente privado:
console.log(Object.getOwnPropertyNames(obj));   // []
console.log(Object.getOwnPropertySymbols(obj));  // []

// Não há forma simples de acessar #valor
```

## Resumo

| Recurso | Sintaxe | Uso |
|---------|---------|-----|
| **Privado** | `#propriedade` | Dados internos ocultos |
| **Getter** | `get propriedade()` | Acessar com lógica |
| **Setter** | `set propriedade(valor)` | Atribuir com validação |

## Padrão Completo

```javascript
class Segura {
  #dados;
  
  constructor(valor) {
    this.dados = valor; // Usa setter
  }
  
  get dados() {
    return this.#dados;
  }
  
  set dados(valor) {
    if (!valor) throw new Error('Vazio');
    this.#dados = valor;
  }
}
```

## Relacionado

- [Classes](./classes.md) - Sintaxe de classes
- [Static](./static.md) - Propriedades de classe
- [Tratamento de Erros](../assincronia/tratamento-erros.md) - Validações com throw
