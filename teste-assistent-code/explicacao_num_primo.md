# Explicação da Função `is_prime` em Python

## Visão Geral
A função `is_prime(number: int) -> bool` determina se um número inteiro positivo é primo. O código foi organizado para ser mais legível, com uma função auxiliar para verificar divisibilidade e um `main()` que centraliza a execução.

## Código Refatorado

```python
from __future__ import annotations


def is_divisible_by(value: int, divisor: int) -> bool:
    """Retorna True quando value é divisível por divisor."""
    return value % divisor == 0


def is_prime(number: int) -> bool:
    """Retorna True se number for primo, caso contrário False."""
    if number <= 1:
        return False
    if number <= 3:
        return True
    if is_divisible_by(number, 2) or is_divisible_by(number, 3):
        return False

    limit = int(number**0.5) + 1
    for factor in range(5, limit, 6):
        if is_divisible_by(number, factor) or is_divisible_by(number, factor + 2):
            return False

    return True


def main() -> None:
    test_numbers = [1, 2, 3, 4, 16, 17, 18, 19, 20, 23]
    for number in test_numbers:
        print(f"{number} -> {is_prime(number)}")


if __name__ == "__main__":
    main()
```

## Por que essa versão é mais limpa?

- `is_divisible_by` isola a lógica de divisibilidade, deixando `is_prime` mais legível.
- Nomes descritivos como `number` e `test_numbers` ajudam a entender o propósito de cada variável.
- `main()` separa a lógica de teste da definição da função.
- O loop usa `range(5, limit, 6)` para verificar apenas os candidatos relevantes.

## Explicação da Lógica

1. **Casos simples**:
   - `number <= 1` → não primo.
   - `number <= 3` → primo.

2. **Divisibilidade por 2 ou 3**:
   - Se o número é par ou múltiplo de 3, ele não é primo.

3. **Verificação com passo 6**:
   - O código testa apenas divisores na forma `6k - 1` e `6k + 1`.
   - Isso evita verificar números pares e múltiplos de 3 desnecessariamente.

4. **Limite pela raiz quadrada**:
   - O loop vai até `int(number**0.5) + 1`, porque não há divisores úteis acima da raiz quadrada.

## Exemplo de Uso

Executando o arquivo diretamente, o Python imprime:

```
1 -> False
2 -> True
3 -> True
4 -> False
16 -> False
17 -> True
18 -> False
19 -> True
20 -> False
23 -> True
```

## Observação
Este código é um bom equilíbrio entre clareza e desempenho para a verificação de primalidade em números inteiros moderados.
