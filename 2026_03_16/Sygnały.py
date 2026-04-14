def rozwiaz_wega():
    try:
        with open('sygnaly.txt', 'r') as f:
            slowa = [linia.strip() for linia in f.readlines()]
    except FileNotFoundError:
        print("Błąd: Nie znaleziono pliku sygnaly.txt w tym folderze!")
        return

    # Zadanie 4.1
    przeslanie = ""
    for i in range(39, len(slowa), 40):
        przeslanie += slowa[i][9]
    
    # Zadanie 4.2
    max_roznych = 0
    najlepsze_slowo = ""
    for slowo in slowa:
        liczba_roznych = len(set(slowo))
        if liczba_roznych > max_roznych:
            max_roznych = liczba_roznych
            najlepsze_slowo = slowo
            
    # Zadanie 4.3
    slowa_bliskie = []
    for slowo in slowa:
        poprawne = True
        for litera1 in slowo:
            for litera2 in slowo:
                if abs(ord(litera1) - ord(litera2)) > 10:
                    poprawne = False
                    break
            if not poprawne:
                break
        if poprawne:
            slowa_bliskie.append(slowo)

    # Zapisywanie wyników do pliku wyniki4.txt
    with open('wyniki4.txt', 'w') as out:
        out.write("4.1\n" + przeslanie + "\n\n")
        out.write(f"4.2\n{najlepsze_slowo} {max_roznych}\n\n")
        out.write("4.3\n" + "\n".join(slowa_bliskie) + "\n")
    
    print("Gotowe! Wyniki zostały zapisane w pliku wyniki4.txt")

if __name__ == "__main__":
    rozwiaz_wega()