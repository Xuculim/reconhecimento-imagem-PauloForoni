from __future__ import annotations


def summarize_list(values: list[int]) -> tuple[float, float, int, int]:
    """Retorna soma, média, máximo e mínimo de uma lista de valores."""
    total = sum(values)
    average = total / len(values)
    maximum = values[0]
    minimum = values[0]

    for value in values:
        if value > maximum:
            maximum = value
        if value < minimum:
            minimum = value

    return total, average, maximum, minimum


def main() -> None:
    numbers = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    total, average, maximum, minimum = summarize_list(numbers)

    print("total:", total)
    print("media:", average)
    print("maior:", maximum)
    print("menor:", minimum)


if __name__ == "__main__":
    main()