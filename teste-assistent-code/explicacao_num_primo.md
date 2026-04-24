# Explicação da Função `is_prime` em Python

## Visão Geral
A função `is_prime(n: int) -> bool` verifica se um número inteiro `n` é um número primo. Um número primo é um número maior que 1 que não tem divisores positivos além de 1 e ele mesmo.

## Código da Função

```python
def is_prime(n: int) -> bool:
    """Retorna True se n for um número primo, caso contrário False."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False

    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6

    return True
```

## Explicação Linha por Linha

1. **Definição da Função**:
   ```python
   def is_prime(n: int) -> bool:
   ```
   - Define uma função chamada `is_prime` que recebe um parâmetro `n` do tipo `int` e retorna um valor booleano (`bool`).

2. **Docstring**:
   ```python
   """Retorna True se n for um número primo, caso contrário False."""
   ```
   - Uma string de documentação que descreve o que a função faz.

3. **Verificação Inicial para n <= 1**:
   ```python
   if n <= 1:
       return False
   ```
   - Números menores ou iguais a 1 não são primos. Por exemplo, 0, 1, números negativos.

4. **Verificação para n <= 3**:
   ```python
   if n <= 3:
       return True
   ```
   - 2 e 3 são números primos. Como já verificamos n > 1, aqui n é 2 ou 3.

5. **Verificação de Divisibilidade por 2 ou 3**:
   ```python
   if n % 2 == 0 or n % 3 == 0:
       return False
   ```
   - Se n for par (exceto 2, que já foi tratado) ou divisível por 3, não é primo.

6. **Loop para Verificar Outros Fatores**:
   ```python
   i = 5
   while i * i <= n:
       if n % i == 0 or n % (i + 2) == 0:
           return False
       i += 6
   ```
   - Começa com i = 5 (próximo número ímpar após 3).
   - Verifica se n é divisível por i ou i+2 (que são números da forma 6k±1, otimizando a verificação).
   - Incrementa i em 6 para pular números pares e múltiplos de 3.
   - Para quando i*i > n, pois não há necessidade de verificar fatores maiores que a raiz quadrada de n.

7. **Retorno Final**:
   ```python
   return True
   ```
   - Se nenhum divisor foi encontrado, n é primo.

## Exemplo de Uso
O código inclui um bloco `if __name__ == "__main__":` para testar a função:

```python
if __name__ == "__main__":
    teste = [1, 2, 3, 4, 16, 17, 18, 19, 20, 23]
    for num in teste:
        print(f"{num} -> {is_prime(num)}")
```

Saída esperada:
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

## Eficiência
- A função usa o algoritmo de verificação de primalidade otimizado, que verifica apenas até a raiz quadrada de n.
- Pula verificações desnecessárias para números pares e múltiplos de 3, tornando-a mais eficiente para números maiores.