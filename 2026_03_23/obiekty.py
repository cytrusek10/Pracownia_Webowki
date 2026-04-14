from typing import List
import os

class Course:
    def __init__(self, student_id: int, name: str):
        self.student_id: int = student_id
        self.name: str = name

class Student:
    def __init__(self, student_id: int, first_name: str, last_name: str, age: int):
        self.id: int = student_id
        self.first_name: str = first_name
        self.last_name: str = last_name
        self.age: int = age
        self.courses: List[str] = []

    def __str__(self) -> str:
        courses_str = ", ".join(self.courses)
        return f"{self.first_name} {self.last_name} ({self.age} lat): {courses_str}"

def run_task():
    students = {}

    if not os.path.exists('students.txt'):
        return

    with open('students.txt', 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip():
                parts = line.strip().split(',')
                if len(parts) == 4:
                    s_id, imie, nazwisko, wiek = parts
                    students[int(s_id)] = Student(int(s_id), imie, nazwisko, int(wiek))

    if not os.path.exists('courses.txt'):
        return

    with open('courses.txt', 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip():
                parts = line.strip().split(',')
                if len(parts) == 2:
                    s_id, nazwa_kursu = parts
                    s_id = int(s_id)
                    if s_id in students:
                        students[s_id].courses.append(nazwa_kursu)

    for s in students.values():
        print(s)

        filename = f"{s.first_name.lower()}_{s.last_name.lower()}.txt"
        with open(filename, 'w', encoding='utf-8') as out:
            out.write("Kursy:\n")
            for course in s.courses:
                out.write(f"- {course},\n")

if __name__ == "__main__":
    run_task()