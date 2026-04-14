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

def read_graph(filename: str) -> tuple[List[List[int]], int]:
    adj_list: List[List[int]] = []
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        num_vertices = int(lines[0].strip())
        for line in lines[1:]:
            if line.strip():
                parts = list(map(int, line.split()))
                if len(parts) > 1:
                    adj_list.append(parts[1:])
                else:
                    adj_list.append([])
    return adj_list, num_vertices

def write_neighbours_list(adj_list: List[List[int]]) -> None:
    print("Reprezentacja w postaci listy sąsiedztwa:")
    for i, neighbors in enumerate(adj_list):
        neighbors_str = ", ".join(map(str, neighbors))
        print(f"Sąsiadami wierzchołka {i} są: {neighbors_str}")

def list_to_matrix(adj_list: List[List[int]], num_vertices: int) -> List[List[int]]:
    matrix = [[0 for _ in range(num_vertices)] for _ in range(num_vertices)]
    for i, neighbors in enumerate(adj_list):
        for neighbor in neighbors:
            matrix[i][neighbor] = 1
    return matrix

def write_matrix(matrix: List[List[int]]) -> None:
    print("\nReprezentacja w postaci macierzy sąsiedztwa:")
    for row in matrix:
        print(" ".join(map(str, row)))

def main() -> None:
    filename = "graph.txt"
    try:
        adj_list, num_vertices = read_graph(filename)
        write_neighbours_list(adj_list)
        matrix = list_to_matrix(adj_list, num_vertices)
        write_matrix(matrix)
    except FileNotFoundError:
        print(f"Błąd: Nie znaleziono pliku {filename}")
    except Exception as e:
        print(f"Wystąpił błąd: {e}")

if __name__ == "__main__":
    main()