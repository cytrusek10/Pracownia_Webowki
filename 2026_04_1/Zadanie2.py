from dataclasses import dataclass, field


@dataclass
class Course:
    name: str


@dataclass
class Student:
    id: int
    first_name: str
    last_name: str
    age: int
    courses: list[Course] = field(default_factory=list)


def load_students(filepath: str) -> dict[int, Student]:
    students: dict[int, Student] = {}
    with open(filepath, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split(",")
            student_id, first_name, last_name, age = int(parts[0]), parts[1], parts[2], int(parts[3])
            students[student_id] = Student(id=student_id, first_name=first_name, last_name=last_name, age=age)
    return students


def load_courses(filepath: str, students: dict[int, Student]) -> None:
    with open(filepath, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split(",")
            student_id, course_name = int(parts[0]), parts[1]
            if student_id in students:
                students[student_id].courses.append(Course(name=course_name))


def print_students(students: dict[int, Student]) -> None:
    for student in students.values():
        courses_str = ", ".join(c.name for c in student.courses)
        print(f"{student.first_name} {student.last_name} ({student.age} lat): {courses_str}")


def save_student_files(students: dict[int, Student], output_dir: str = ".") -> None:
    import os
    os.makedirs(output_dir, exist_ok=True)
    for student in students.values():
        filename = f"{student.first_name.lower()}_{student.last_name.lower()}.txt"
        filepath = os.path.join(output_dir, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write("Kursy:\n")
            for i, course in enumerate(student.courses):
                if i < len(student.courses) - 1:
                    f.write(f"- {course.name},\n")
                else:
                    f.write(f"- {course.name}\n")


if __name__ == "__main__":
    import os

    base_dir = os.path.dirname(os.path.abspath(__file__))
    students_file = os.path.join(base_dir, "Python - zadanie 2", "students.txt")
    courses_file = os.path.join(base_dir, "Python - zadanie 2", "courses.txt")
    output_dir = os.path.join(base_dir, "output")

    students = load_students(students_file)
    load_courses(courses_file, students)
    print_students(students)
    save_student_files(students, output_dir)
    print(f"\nPliki zapisane w: {output_dir}/")
