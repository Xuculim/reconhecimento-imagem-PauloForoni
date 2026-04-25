from __future__ import annotations


def calculate_invoice(
    client_name: str, quantities: list[int], prices: list[float], discount_percent: float
) -> dict:
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
    """Executa o programa principal de fatura."""
    # ENTRADA DE DADOS
    cliente = input("Qual é seu nome? ")

    qtd1 = int(input("Quantidade do item 1: "))
    item1 = float(input("Preço do item 1: "))

    qtd2 = int(input("Quantidade do item 2: "))
    item2 = float(input("Preço do item 2: "))

    qtd3 = int(input("Quantidade do item 3: "))
    item3 = float(input("Preço do item 3: "))

    desconto_cupom = float(
        input("Você tem um cupom de desconto? (Digite o percentual ou 0): ")
    )

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
