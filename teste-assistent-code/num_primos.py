from __future__ import annotations


def is_divisible_by(value: int, divisor: int) -> bool:
    """Retorna True quando um valor é divisível por um divisor."""
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
        result = is_prime(number)
        print(f"{number} -> {result}")


if __name__ == "__main__":
    main()
