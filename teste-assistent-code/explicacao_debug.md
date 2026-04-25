# Explicação dos Erros em `debug.py`

## Erros Identificados

### ❌ Erro 1: Falta de Aspas na Função `input()` - Linha 6

**Código com erro:**
```python
item1 = float(input(Preço do item 1? ))
```

**Causa:** A string `"Preço do item 1? "` não está envolvida por aspas duplas ou simples. Python tenta interpretar `Preço` como uma variável, resultando em um `NameError`.

**Correção:**
```python
item1 = float(input("Preço do item 1: "))
```

---

### ❌ Erro 2: Falta de Conversão de Tipo - Linha 23

**Código com erro:**
```python
desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
```

**Causa:** A função `input()` sempre retorna uma string. Na linha 24, o código tenta usar `desconto_cupom / 100`, o que gera um `TypeError` pois não é possível dividir uma string por um número.

**Correção:**
```python
desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
```

---

### ❌ Erro 3: F-String Ausente - Linha 38

**Código com erro:**
```python
print(" Item 2:        R$ {total_item2:.2f}")
```

**Causa:** A string não possui o prefixo `f`, então as chaves `{}` são interpretadas como texto literal em vez de uma placeholder para substituição de variáveis.

**Correção:**
```python
print(f" Item 2:        R$ {total_item2:.2f}")
```

---

### ❌ Erro 4: Indentação Incorreta - Linha 40

**Código com erro:**
```python
if desconto_cupom > 0: 
print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```

**Causa:** O `print()` dentro do bloco `if` não está indentado. Python exige que o código dentro de blocos condicionais esteja indentado com espaços ou tabulações.

**Correção:**
```python
if desconto_cupom > 0:
    print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```

---

## Código Corrigido

```python
from __future__ import annotations


def calculate_invoice(client_name: str, quantities: list[int], prices: list[float], discount_percent: float) -> dict:
    """Calcula a fatura completa de um cliente."""
    items_total = [qty * price for qty, price in zip(quantities, prices)]
    subtotal = sum(items_total)
    tax = subtotal * 0.10
    discount_amount = subtotal * (discount_percent / 100)
    total = subtotal + tax - discount_amount

    return {
        "client": client_name,
        "items": items_total,
        "subtotal": subtotal,
        "tax": tax,
        "discount": discount_amount,
        "total": total,
        "discount_percent": discount_percent,
    }


def display_invoice(invoice: dict) -> None:
    """Exibe a fatura formatada."""
    line = "=" * 31
    separator = "-" * 31

    print(line)
    print(f" Cliente: {invoice['client']}")
    print(line)
    print(f" Item 1:        R$ {invoice['items'][0]:.2f}")
    print(f" Item 2:        R$ {invoice['items'][1]:.2f}")
    print(f" Item 3:        R$ {invoice['items'][2]:.2f}")
    print(separator)
    print(f" Subtotal:      R$ {invoice['subtotal']:.2f}")
    print(f" Imposto (10%): R$ {invoice['tax']:.2f}")

    if invoice["discount_percent"] > 0:
        print(f" Desconto ({invoice['discount_percent']:.0f}%): -R$ {invoice['discount']:.2f}")

    print(line)
    print(f" TOTAL:         R$ {invoice['total']:.2f}")
    print(line)


def main() -> None:
    # ENTRADA DE DADOS
    cliente = input("Qual é seu nome? ")

    qtd1 = int(input("Quantidade do item 1: "))
    item1 = float(input("Preço do item 1: "))

    qtd2 = int(input("Quantidade do item 2: "))
    item2 = float(input("Preço do item 2: "))

    qtd3 = int(input("Quantidade do item 3: "))
    item3 = float(input("Preço do item 3: "))

    desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))

    # CÁLCULOS E EXIBIÇÃO
    invoice = calculate_invoice(
        client_name=cliente,
        quantities=[qtd1, qtd2, qtd3],
        prices=[item1, item2, item3],
        discount_percent=desconto_cupom,
    )
    display_invoice(invoice)


if __name__ == "__main__":
    main()
```

---

## Melhorias Implementadas (Além das Correções)

1. **Função auxiliar `calculate_invoice()`**: Separa a lógica de cálculo da exibição.
2. **Função `display_invoice()`**: Centraliza a formatação e exibição dos dados.
3. **Type hints**: Adicionados tipos de retorno e parâmetros para melhor legibilidade.
4. **Uso de dicionários**: Facilita o acesso aos valores calculados.
5. **Função `main()`**: Organiza o fluxo principal do programa.
6. **Uso de `zip()`**: Simplifica a iteração sobre quantidades e preços.
