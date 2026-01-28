---
id: static
title: Métodos Estáticos (static)
sidebar_position: 2
---

# Static - Métodos e Propriedades de Classe

## O que é?

**Static** permite criar métodos e propriedades que pertencem à **classe em si**, não às instâncias. São acessados diretamente na classe, não em objetos criados dela.

## Sintaxe Básica

```javascript
class MeuaClasse {
  static propriedadeEstatica = 'valor';
  
  static metodoEstatico() {
    return 'Sou um método estático';
  }
}

// Acessar diretamente na classe
console.log(MeuaClasse.propriedadeEstatica); // 'valor'
console.log(MeuaClasse.metodoEstatico());    // 'Sou um método estático'

// ❌ NÃO funciona em instâncias
const obj = new MeuaClasse();
console.log(obj.metodoEstatico);             // undefined
```

## Métodos Estáticos

Úteis para funções utilitárias ou de fábrica:

```javascript
class Utilitarios {
  static ehNumeroPositivo(num) {
    return typeof num === 'number' && num > 0;
  }
  
  static ehEmail(email) {
    return email.includes('@') && email.includes('.');
  }
  
  static ordenar(array) {
    return [...array].sort((a, b) => a - b);
  }
}

console.log(Utilitarios.ehNumeroPositivo(42));      // true
console.log(Utilitarios.ehEmail('test@example.com')); // true
console.log(Utilitarios.ordenar([3, 1, 2]));         // [1, 2, 3]
```

## Propriedades Estáticas

Dados compartilhados por toda a classe:

```javascript
class Usuario {
  static totalDeUsuarios = 0;
  
  constructor(nome) {
    this.nome = nome;
    Usuario.totalDeUsuarios++;
  }
  
  static obterTotal() {
    return Usuario.totalDeUsuarios;
  }
}

new Usuario('Alice');
new Usuario('Bob');
new Usuario('Charlie');

console.log(Usuario.obterTotal()); // 3
```

## Exemplos Práticos

### Padrão Factory (Criação)

```javascript
class Pessoa {
  constructor(nome, tipo) {
    this.nome = nome;
    this.tipo = tipo;
  }
  
  static criarAluno(nome) {
    return new Pessoa(nome, 'aluno');
  }
  
  static criarProfessor(nome) {
    return new Pessoa(nome, 'professor');
  }
}

const aluno = Pessoa.criarAluno('João');
const prof = Pessoa.criarProfessor('Maria');

console.log(aluno.tipo);  // 'aluno'
console.log(prof.tipo);   // 'professor'
```

### Validações Globais

```javascript
class Produto {
  static PRECO_MINIMO = 0.01;
  static PRECO_MAXIMO = 999999.99;
  
  constructor(nome, preco) {
    if (!Produto.validarPreco(preco)) {
      throw new Error(`Preço deve estar entre ${Produto.PRECO_MINIMO} e ${Produto.PRECO_MAXIMO}`);
    }
    this.nome = nome;
    this.preco = preco;
  }
  
  static validarPreco(preco) {
    return preco >= Produto.PRECO_MINIMO && preco <= Produto.PRECO_MAXIMO;
  }
}

try {
  const p = new Produto('Notebook', 2500.00);
  console.log('Produto criado');
} catch (error) {
  console.error(error.message);
}
```

### Gerenciador de Recursos

```javascript
class ConexaoBD {
  static #instancia = null; // Privada
  
  // Padrão Singleton
  static obterInstancia() {
    if (!ConexaoBD.#instancia) {
      ConexaoBD.#instancia = new ConexaoBD();
    }
    return ConexaoBD.#instancia;
  }
  
  conectar() {
    console.log('Conectado ao BD');
  }
}

const bd1 = ConexaoBD.obterInstancia();
const bd2 = ConexaoBD.obterInstancia();

console.log(bd1 === bd2); // true - mesma instância!
```

### Contantes de Classe

```javascript
class Configuracao {
  static TEMAS = {
    CLARO: 'light',
    ESCURO: 'dark',
    AUTO: 'auto'
  };
  
  static IDIOMAS = {
    PT: 'pt-br',
    EN: 'en-us',
    ES: 'es-es'
  };
  
  static VERSAO = '1.2.3';
  
  static obterInfo() {
    return `Versão ${Configuracao.VERSAO}`;
  }
}

console.log(Configuracao.TEMAS.CLARO);   // 'light'
console.log(Configuracao.IDIOMAS.PT);    // 'pt-br'
console.log(Configuracao.obterInfo());   // 'Versão 1.2.3'
```

### Classe com Métodos Estáticos e de Instância

```javascript
class Conta {
  static taxaPadrao = 0.02; // 2%
  static contas = [];       // Registro global
  
  constructor(titular, saldo) {
    this.titular = titular;
    this.saldo = saldo;
    Conta.contas.push(this);
  }
  
  // Método de instância
  depositar(valor) {
    this.saldo += valor;
    return `Depósito de R$ ${valor} realizado`;
  }
  
  // Método estático - calcular juros globalmente
  static aplicarJurosTodasContas() {
    Conta.contas.forEach(conta => {
      const juros = conta.saldo * Conta.taxaPadrao;
      conta.saldo += juros;
    });
  }
  
  // Método estático - obter saldo total
  static obterSaldoTotal() {
    return Conta.contas.reduce((total, conta) => total + conta.saldo, 0);
  }
}

const conta1 = new Conta('Alice', 1000);
const conta2 = new Conta('Bob', 2000);

console.log(Conta.obterSaldoTotal()); // 3000

Conta.aplicarJurosTodasContas();

console.log(Conta.obterSaldoTotal()); // 3060 (com juros)
console.log(conta1.saldo);            // 1020
```

## Diferenças: Static vs Instância

```javascript
class Exemplo {
  static staticProp = 'valor estático';
  instanciaProp = 'valor da instância';
  
  static metodoEstatico() {
    return 'método estático';
  }
  
  metodoInstancia() {
    return 'método de instância';
  }
}

// Acessar static
console.log(Exemplo.staticProp);       // 'valor estático'
console.log(Exemplo.metodoEstatico()); // 'método estático'

// Acessar de instância
const obj = new Exemplo();
console.log(obj.instanciaProp);        // 'valor da instância'
console.log(obj.metodoInstancia());    // 'método de instância'

// ❌ Não funciona misturar
console.log(obj.staticProp);           // undefined
console.log(Exemplo.instanciaProp);    // undefined
```

## This em Contextos Static

```javascript
class Classe {
  static nome = 'ClasseEstatica';
  
  static testar() {
    // 'this' refere-se à classe
    console.log(this.nome);           // 'ClasseEstatica'
    console.log(this === Classe);     // true
  }
  
  metodo() {
    // 'this' refere-se à instância
    console.log(this.nome);           // undefined (não é propriedade)
    console.log(this instanceof Classe); // true
  }
}

Classe.testar();
const obj = new Classe();
obj.metodo();
```

## ⚠️ Armadilhas

### Não Usar Static sem Razão

```javascript
// ❌ Ruim - static sem necessidade
class Pessoa {
  static nome = '';
  
  constructor(nome) {
    Pessoa.nome = nome; // Compartilhado entre instâncias!
  }
}

const p1 = new Pessoa('Alice');
const p2 = new Pessoa('Bob');
console.log(p1.nome); // undefined
console.log(Pessoa.nome); // 'Bob' - compartilhado!

// ✅ Certo
class Pessoa {
  constructor(nome) {
    this.nome = nome; // Cada instância tem sua cópia
  }
}

const p1 = new Pessoa('Alice');
const p2 = new Pessoa('Bob');
console.log(p1.nome); // 'Alice'
console.log(p2.nome); // 'Bob'
```

### Herança com Static

```javascript
class Animal {
  static som = 'Som do animal';
  
  static fazerSom() {
    return this.som;
  }
}

class Cachorro extends Animal {
  static som = 'Au au';
}

console.log(Animal.fazerSom());   // 'Som do animal'
console.log(Cachorro.fazerSom()); // 'Au au' - herda e sobrescreve
```

## Resumo

| Tipo | Acesso | Uso |
|------|--------|-----|
| **Static** | `Classe.propriedade` | Dados/métodos da classe |
| **Instância** | `obj.propriedade` | Dados/métodos do objeto |
| **Compartilhado** | Static sim, instância não | Considerar efeitos colaterais |

## Padrões Comuns

```javascript
// Constantes de classe
class Status {
  static ATIVO = 1;
  static INATIVO = 0;
}

// Factory pattern
class Usuario {
  static criarAdmin(nome) {
    return new Usuario(nome, 'admin');
  }
}

// Singleton
class Logger {
  static instancia = null;
  static obter() {
    return this.instancia || (this.instancia = new Logger());
  }
}
```

## Relacionado

- [Classes](./classes.md) - Introdução a classes
- [Private/Get/Set](./private-get-set.md) - Encapsulamento
