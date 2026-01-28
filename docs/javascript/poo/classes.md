---
id: classes
title: Classes - Introdução
sidebar_position: 1
---

# Classes em JavaScript

## O que é?

**Classes** são blueprints (moldes) para criar objetos com propriedades e métodos. Introduzidas no ES6 (2015), oferecem uma forma clara e organizada de trabalhar com orientação a objetos.

## Conceitos Básicos

### Declarar uma Classe

```javascript
class Usuario {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
  
  saudar() {
    console.log(`Olá, eu sou ${this.nome}`);
  }
}

// Criar instância
const usuario1 = new Usuario('Alice', 'alice@example.com');
usuario1.saudar(); // 'Olá, eu sou Alice'
```

### Constructor

O `constructor` é executado automaticamente quando uma instância é criada:

```javascript
class Carro {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
    this.velocidade = 0;
  }
}

const carro1 = new Carro('Tesla', 'Model 3');
console.log(carro1.marca);  // 'Tesla'
console.log(carro1.modelo); // 'Model 3'
```

## Métodos

Métodos são funções dentro da classe:

```javascript
class Calculadora {
  somar(a, b) {
    return a + b;
  }
  
  subtrair(a, b) {
    return a - b;
  }
  
  multiplicar(a, b) {
    return a * b;
  }
}

const calc = new Calculadora();
console.log(calc.somar(5, 3));       // 8
console.log(calc.multiplicar(4, 7)); // 28
```

## Propriedades e Métodos

```javascript
class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }
  
  apresentar() {
    return `Sou ${this.nome}, tenho ${this.idade} anos`;
  }
  
  envelhecer() {
    this.idade++;
    return `Agora tenho ${this.idade} anos`;
  }
}

const pessoa = new Pessoa('Bob', 30);
console.log(pessoa.apresentar()); // 'Sou Bob, tenho 30 anos'
console.log(pessoa.envelhecer()); // 'Agora tenho 31 anos'
```

## Encapsulamento com `#` (Privado)

Propriedades e métodos privados começam com `#`:

```javascript
class Conta {
  #saldo = 0; // Propriedade privada
  
  constructor(titular, saldoInicial) {
    this.titular = titular;
    this.#saldo = saldoInicial;
  }
  
  depositar(valor) {
    this.#saldo += valor;
  }
  
  // Método privado
  #calcularJuros(taxa) {
    return this.#saldo * taxa;
  }
  
  // Acessar valor privado através de método público
  getSaldo() {
    return this.#saldo;
  }
  
  sacar(valor) {
    if (valor > this.#saldo) {
      throw new Error('Saldo insuficiente');
    }
    this.#saldo -= valor;
  }
}

const conta = new Conta('Alice', 1000);
console.log(conta.getSaldo());  // 1000

// ❌ Não é possível acessar directly
console.log(conta.#saldo);      // SyntaxError

// ✅ Usar método público
conta.depositar(500);
console.log(conta.getSaldo());  // 1500
```

## Getters e Setters

Controlar acesso a propriedades:

```javascript
class Produto {
  constructor(nome, precoCusto) {
    this.nome = nome;
    this._precoCusto = precoCusto; // _ por convenção
  }
  
  // Getter - acessar como propriedade
  get preco() {
    return (this._precoCusto * 1.5).toFixed(2);
  }
  
  // Setter - atribuir como propriedade
  set precoCusto(valor) {
    if (valor < 0) {
      throw new Error('Preço não pode ser negativo');
    }
    this._precoCusto = valor;
  }
  
  get margemLucro() {
    const markup = (this._precoCusto * 1.5) - this._precoCusto;
    return ((markup / this._precoCusto) * 100).toFixed(1) + '%';
  }
}

const produto = new Produto('Notebook', 2000);
console.log(produto.preco);      // '3000.00' (getter)
console.log(produto.margemLucro); // '50.0%'

produto.precoCusto = 2500;       // setter
console.log(produto.preco);      // '3750.00'
```

## Herança

Criar classes que herdam de outras:

```javascript
class Animal {
  constructor(nome) {
    this.nome = nome;
  }
  
  fazer_som() {
    console.log(`${this.nome} faz som`);
  }
}

class Cachorro extends Animal {
  fazer_som() {
    console.log(`${this.nome} faz: Au au!`);
  }
  
  buscar() {
    console.log(`${this.nome} foi buscar`);
  }
}

class Gato extends Animal {
  fazer_som() {
    console.log(`${this.nome} faz: Miau!`);
  }
}

const dog = new Cachorro('Rex');
dog.fazer_som(); // 'Rex faz: Au au!'
dog.buscar();    // 'Rex foi buscar'

const cat = new Gato('Whiskers');
cat.fazer_som(); // 'Whiskers faz: Miau!'
```

## super()

Acessar a classe pai:

```javascript
class Veiculo {
  constructor(marca) {
    this.marca = marca;
  }
  
  ligar() {
    console.log(`${this.marca} ligado`);
  }
}

class Moto extends Veiculo {
  constructor(marca, tipo) {
    super(marca);        // Chamar constructor da classe pai
    this.tipo = tipo;
  }
  
  ligar() {
    super.ligar();       // Chamar método da classe pai
    console.log('Moto pronta para rodar');
  }
}

const moto = new Moto('Harley', 'Cruiser');
moto.ligar();
// 'Harley ligado'
// 'Moto pronta para rodar'
```

## Exemplo Completo: Sistema de Usuários

```javascript
class Usuario {
  #senha;
  
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.#senha = senha;
    this.ativo = true;
  }
  
  verificarSenha(tentativa) {
    return this.#senha === tentativa;
  }
  
  mudarSenha(senhaAtual, novaSenha) {
    if (!this.verificarSenha(senhaAtual)) {
      throw new Error('Senha atual incorreta');
    }
    this.#senha = novaSenha;
    console.log('Senha alterada com sucesso');
  }
}

class Admin extends Usuario {
  constructor(nome, email, senha, nivel) {
    super(nome, email, senha);
    this.nivel = nivel;
  }
  
  removerUsuario(usuario) {
    usuario.ativo = false;
    console.log(`Usuário ${usuario.nome} removido`);
  }
}

const admin = new Admin('Carlos', 'carlos@admin.com', 'admin123', 1);
const user = new Usuario('Diana', 'diana@user.com', 'pass123');

admin.removerUsuario(user);
// 'Usuário Diana removido'
```

## Comparação: Função vs Classe

### Com Função (Antigo)

```javascript
function Pessoa(nome) {
  this.nome = nome;
}

Pessoa.prototype.saudar = function() {
  console.log(`Olá, sou ${this.nome}`);
};

const p = new Pessoa('Eve');
p.saudar();
```

### Com Classe (Moderno)

```javascript
class Pessoa {
  constructor(nome) {
    this.nome = nome;
  }
  
  saudar() {
    console.log(`Olá, sou ${this.nome}`);
  }
}

const p = new Pessoa('Eve');
p.saudar();
```

Muito mais legível! ✓

## Resumo

| Conceito | Descrição |
|----------|-----------|
| **class** | Declarar uma classe |
| **constructor** | Inicializar propriedades |
| **método** | Função dentro da classe |
| **#propriedade** | Propriedade privada |
| **get/set** | Controlar acesso |
| **extends** | Herança |
| **super** | Acessar classe pai |

## Relacionado

- [Static](./static.md) - Métodos e propriedades de classe
- [Private/Get/Set](./private-get-set.md) - Encapsulamento
- [typeof](../tipos-dados/typeof.md) - Verificar tipo de instância
