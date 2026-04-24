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


if __name__ == "__main__":
    teste = [1, 2, 3, 4, 16, 17, 18, 19, 20, 23]
    for num in teste:
        print(f"{num} -> {is_prime(num)}")
