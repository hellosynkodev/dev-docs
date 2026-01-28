---
id: structure-guide
title: Guia da Estrutura
slug: /javascript/estrutura
---

# 📚 Guia da Estrutura de Documentação

## Visão Geral

Esta documentação JavaScript está organizada em **6 seções principais** com uma total de **13 páginas técnicas**.

## 📁 Estrutura de Pastas

```
docs/javascript/
├── intro.md                          # Página de boas-vindas
├── tipos-dados/                      # Tipos primitivos e typeof
│   ├── symbol.md                    # Identificadores únicos
│   ├── bigint.md                    # Números inteiros grandes
│   └── typeof.md                    # Verificar tipos
├── strings/                          # Manipulação de strings
│   └── concatenacao.md              # Formas de unir strings
├── console/                          # Logging e debugging
│   └── console-basico.md            # Console.log e métodos
├── assincronia/                      # Programação assíncrona
│   ├── async-await.md               # Funções assíncronas
│   ├── tratamento-erros.md          # Try/catch/finally
│   └── throw.md                     # Lançar erros
├── poo/                              # Orientação a Objetos
│   ├── classes.md                   # Sintaxe de classes
│   ├── static.md                    # Membros estáticos
│   └── private-get-set.md           # Encapsulamento
└── operadores/                       # Operadores especiais
    └── spread-rest.md               # Spread e Rest
```

## 🎯 Seções Detalhadas

### 1️⃣ **Tipos de Dados** (3 páginas)
Conceitos fundamentais sobre tipos primitivos especiais:
- `Symbol` - Identificadores únicos e imutáveis
- `BigInt` - Números inteiros arbitrariamente grandes
- `typeof` - Verificar e validar tipos

**Quando usar:** Entender tipos primitivos, criar identificadores únicos, trabalhar com números grandes.

### 2️⃣ **Strings** (1 página)
Manipulação e concatenação de strings:
- Concatenação com `+`, template strings, `concat()`, `join()`

**Quando usar:** Construir strings dinamicamente, URLs, mensagens formatadas.

### 3️⃣ **Console** (1 página)
Ferramentas de logging e debugging:
- `console.log()`, `error()`, `warn()`, `table()`, `time()`, `group()`

**Quando usar:** Debug, visualizar dados estruturados, medir performance.

### 4️⃣ **Assincronia** (3 páginas)
Trabalhar com operações assíncronas:
- `async/await` - Sintaxe moderna para promises
- `try/catch/finally` - Tratar erros graciosamente
- `throw new Error` - Lançar erros customizados

**Quando usar:** Requisições HTTP, operações de longa duração, tratamento de falhas.

### 5️⃣ **Programação Orientada a Objetos** (3 páginas)
Criar estruturas complexas com classes:
- `classes` - Blueprints para objetos
- `static` - Métodos e propriedades de classe
- `private`, `get`, `set` - Encapsulamento

**Quando usar:** Organizar código, criar APIs, implementar padrões de design.

### 6️⃣ **Operadores** (1 página)
Operadores especiais para manipulação de dados:
- `spread` (`...`) - Espalhar elementos
- `rest` (`...`) - Capturar múltiplos argumentos

**Quando usar:** Clonar objetos, mesclar arrays, parâmetros variáveis.

## 🔗 Fluxo de Aprendizado Recomendado

### Iniciante
1. Tipos de Dados → typeof
2. Strings → Concatenação
3. Console → Debugging básico
4. Classes → Introdução

### Intermediário
5. Assincronia → Async/Await
6. Operadores → Spread/Rest
7. POO → Static e Encapsulamento

### Avançado
8. Tratamento de Erros → Padrões
9. Classes → Herança
10. Padrões de Design com Static

## 🔍 Características Especiais

✅ **Links cruzados** - Cada página referencia conceitos relacionados
✅ **Exemplos práticos** - Código pronto para copiar e colar
✅ **Padrões comuns** - Soluções para problemas reais
✅ **Armadilhas evitadas** - O que não fazer e por quê
✅ **Resumos tabulares** - Referência rápida

## 📖 Como Usar Esta Documentação

1. **Busca rápida**: Use a barra de busca para encontrar um conceito
2. **Relacionado**: Cada página sugere tópicos afins no final
3. **Índice hierárquico**: O sidebar esquerdo mostra a estrutura completa
4. **Código executável**: Todos os exemplos podem ser testados no console

## 📝 Convenções

- **❌ Evitar** - Padrão ruim ou anti-padrão
- **✅ Usar** - Padrão recomendado
- **⚠️ Cuidado** - Comportamento inesperado
- **:::info** - Informação contextual
- **:::warning** - Alerta importante

## 🚀 Próximos Passos

Considere expandir com:
- Destructuring avançado
- Closures e escopo
- Prototype e herança
- Módulos (import/export)
- Generators e Iteradores
- Proxy e Reflect

---

**Última atualização:** 28 de janeiro de 2026
**Total de páginas:** 13
**Tempo de leitura estimado:** 2-3 horas
