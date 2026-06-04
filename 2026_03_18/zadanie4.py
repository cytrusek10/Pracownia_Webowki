"""
Matura 2018 – Informatyka, Poziom Rozszerzony (Czerwiec)
Zadanie 4: Scalanie

Pliki wejściowe: dane1.txt, dane2.txt (po 1000 wierszy)
                 przyklad1.txt, przyklad2.txt (po 5 wierszy – dane testowe)

Każdy wiersz zawiera posortowany niemalejąco ciąg 10 liczb całkowitych
z przedziału [0, 100], oddzielonych spacjami.

Zadanie 4.1 (0-1 pkt)
    Podaj, w ilu wierszach ciągi mają tę samą OSTATNIĄ liczbę.
    Dla plików przykładowych: 3

Zadanie 4.2 (0-3 pkt)
    Podaj, ile jest par, w których OBA ciągi mają dokładnie 5 liczb
    parzystych i 5 liczb nieparzystych.
    Dla plików przykładowych: 1

Zadanie 4.3 (0-4 pkt)
    Podaj, ile par ciągów zbudowanych jest z takich samych ZBIORÓW liczb
    (powtórzenia mogą być różne). Wypisz numery tych wierszy.
    Dla plików przykładowych: 2 pary, wiersze: 1, 5
"""

from pathlib import Path




def wczytaj_dane(plik1: str, plik2: str) -> list[tuple[list[int], list[int]]]:
    """Wczytuje dwa pliki i zwraca listę par ciągów (wiersz po wierszu)."""
    with open(plik1, encoding="utf-8") as f1, open(plik2, encoding="utf-8") as f2:
        pary = []
        for linia1, linia2 in zip(f1, f2):
            ciag1 = list(map(int, linia1.split()))
            ciag2 = list(map(int, linia2.split()))
            pary.append((ciag1, ciag2))
    return pary


def zadanie_4_1(pary: list[tuple[list[int], list[int]]]) -> int:
    """
    Zlicza wiersze, w których ostatnia liczba obu ciągów jest taka sama.
    Złożoność: O(n)
    """
    return sum(1 for c1, c2 in pary if c1[-1] == c2[-1])


def zadanie_4_2(pary: list[tuple[list[int], list[int]]]) -> int:
    """
    Zlicza pary, w których oba ciągi mają dokładnie 5 liczb parzystych
    i 5 liczb nieparzystych.
    Złożoność: O(n * k), gdzie k = długość ciągu (tu k=10)
    """
    def ile_parzystych(ciag: list[int]) -> int:
        return sum(1 for x in ciag if x % 2 == 0)

    count = 0
    for c1, c2 in pary:
        if ile_parzystych(c1) == 5 and ile_parzystych(c2) == 5:
            count += 1
    return count


def zadanie_4_3(pary: list[tuple[list[int], list[int]]]) -> tuple[int, list[int]]:
    """
    Znajduje pary ciągów zbudowanych z takich samych liczb (porównanie zbiorów).
    Zwraca (liczba_par, lista_numerów_wierszy).
    Złożoność: O(n * k)
    Uwaga: zbiór eliminuje powtórzenia – zgodnie z treścią zadania
           "liczba powtórzeń takich samych liczb w ciągach może być różna".
    """
    numery = []
    for nr, (c1, c2) in enumerate(pary, start=1):
        if set(c1) == set(c2):
            numery.append(nr)
    return len(numery), numery




def uruchom(plik1: str, plik2: str, prefix: str = "") -> None:
    """Wykonuje wszystkie podzadania i zapisuje wyniki do plików."""
    etykieta = f"[{prefix}] " if prefix else ""
    print(f"\n{'='*55}")
    print(f"  {etykieta}Pliki: {plik1}  /  {plik2}")
    print(f"{'='*55}")

    pary = wczytaj_dane(plik1, plik2)
    print(f"  Wczytano {len(pary)} wierszy.\n")

    # Zadanie 4.1
    wynik_41 = zadanie_4_1(pary)
    print(f"  Zadanie 4.1")
    print(f"  Liczba wierszy z tą samą ostatnią liczbą: {wynik_41}")

    # Zadanie 4.2
    wynik_42 = zadanie_4_2(pary)
    print(f"\n  Zadanie 4.2")
    print(f"  Liczba par (5 parzystych + 5 nieparzystych w obu): {wynik_42}")

    # Zadanie 4.3
    liczba_par, numery = zadanie_4_3(pary)
    print(f"\n  Zadanie 4.3")
    print(f"  Liczba par ciągów z identycznym zbiorem liczb: {liczba_par}")
    if numery:
        print(f"  Numery wierszy: {', '.join(map(str, numery))}")
    else:
        print("  Brak takich par.")


    katalog = Path(plik1).parent
    sufiks = f"_{prefix}" if prefix else ""

    for nr, wynik in [("4_1", str(wynik_41)),
                      ("4_2", str(wynik_42)),
                      ("4_3", f"{liczba_par}\n{', '.join(map(str, numery))}")]:
        sciezka = katalog / f"wynik{sufiks}_{nr}.txt"
        sciezka.write_text(wynik + "\n", encoding="utf-8")
        print(f"\n  >> Zapisano: {sciezka}")


if __name__ == "__main__":
    
    if Path("przyklad1.txt").exists() and Path("przyklad2.txt").exists():
        uruchom("przyklad1.txt", "przyklad2.txt", prefix="przyklad")
        print("\n  Oczekiwane wyniki dla przykładu:")
        print("  4.1 -> 3   |   4.2 -> 1   |   4.3 -> 2 par, wiersze: 1, 5")

    # --- dane właściwe ---
    if Path("dane1.txt").exists() and Path("dane2.txt").exists():
        uruchom("dane1.txt", "dane2.txt")
    else:
        print("\n  [!] Brak plików dane1.txt / dane2.txt – uruchom tylko na przykładach.")
