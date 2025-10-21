
let imie = "Nikodem";
let wiek = 18;
let liczba = 5;


function przywitaj() {
    console.log("Joł joł" + imie + "! Masz " + wiek + " lat.");
}


function policzDo(n) {
    for (let i = 1; i <= n; i++) {
        console.log("Liczba: " + i);
    }
}


przywitaj();
policzDo(liczba);


if (wiek >= 18) {
    console.log("Można kupić energola :O");
} else {
    console.log("Nie można kupić energola :(");
}
