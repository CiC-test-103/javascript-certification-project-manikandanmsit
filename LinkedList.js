// Necessary Imports (you will need to use this)
const { Student } = require("./Student");
const fs = require("fs");
/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data; // Student
  next; // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head; // Object
  tail; // Object
  length; // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO
    let newNode = new Node(newStudent);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    if (!this.head) {
      return false; // List is empty, nothing to remove
    }

    let current = this.head;
    let previous = null;

    // Check if the student to be removed is the head
    if (current.data.getEmail() === email) {
      this.head = current.next;
      if (!this.head) {
        this.tail = null; // If the list becomes empty, set tail to null
      }
      this.length--;
      return true; // Student removed successfully
    }

    // Traverse the list to find the student
    while (current) {
      if (current.data.getEmail() === email) {
        previous.next = current.next;

        // If the student to be removed is the tail
        if (current === this.tail) {
          this.tail = previous; // Update tail to the previous node
        }

        this.length--;
        return true; // Student removed successfully
      }
      previous = current;
      current = current.next;
    }

    return false; // Student not found
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    let current = this.head;

    // Traverse the list to find the student with the matching email
    while (current) {
      if (current.data.getEmail() === email) {
        return current.data; // Return the student object if email matches
      }
      current = current.next;
    }

    return -1; // Return -1 if no student was found with the given email
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO
    this.head = null; // Set head to null, removing all nodes
    this.tail = null; // Set tail to null as well
    this.length = 0; // Reset length to 0
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    let current = this.head;
    let studentList = [];
    while (current) {
      //studentList += current.data.getString() + "\n";
      studentList.push(current.data.getName());
      current = current.next;
    }
    return studentList.join(", ");
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO

    let studentsArray = [];
    let current = this.head;

    // Traverse the list and add students to the array
    while (current) {
      studentsArray.push(current.data); // Push the student (not the Node) to the array
      current = current.next;
    }

    // Sort the array of students by name (alphabetically)
    studentsArray.sort((a, b) => {
      return a.getName().localeCompare(b.getName()); // Compare by student name
    });

    return studentsArray;
    //return [];
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    let studentsArray = [];
    let current = this.head;

    // Traverse the list to find students matching the specialization
    while (current) {
      if (current.data.getSpecialization() === specialization) {
        studentsArray.push(current.data); // Add the student to the array if specialization matches
      }
      current = current.next;
    }

    // Sort the filtered students by name
    studentsArray.sort((a, b) => {
      return a.getName().localeCompare(b.getName()); // Compare by student name
    });

    return studentsArray; // Return the filtered and sorted array
    //return [];
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinAge(minAge) {
    // TODO
    let studentsArray = [];
    let current = this.head;

    // Get the current year (1 as an example)
    const currentYear = 1;

    // Traverse the list to find students who meet the age requirement
    while (current) {
      const studentAge = currentYear - current.data.getYear();

      // If the student's age is greater than or equal to minAge, add to array
      if (studentAge >= minAge) {
        studentsArray.push(current.data);
      }
      current = current.next;
    }

    // Sort the filtered students by name
    studentsArray.sort((a, b) => {
      return a.getName().localeCompare(b.getName()); // Compare by student name
    });

    return studentsArray; // Return the filtered and sorted array
    //return [];
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  // Convert the linked list to an array of student objects
  toArray() {
    let current = this.head;
    const studentsArray = [];

    while (current) {
      // Push each student's data into the array
      studentsArray.push({
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization(),
      });
      current = current.next;
    }

    return studentsArray;
  }

  // Save the current linked list to a JSON file
  async saveToJson(fileName) {
    try {
      const studentsArray = this.toArray();

      // Write the studentsArray to a JSON file
      await fs.promises.writeFile(
        fileName,
        JSON.stringify(studentsArray, null, 2)
      );

      console.log("Linked list saved successfully.");
    } catch (error) {
      console.error("Error saving the file:", error);
    }
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  // TODO

  async loadFromJSON(fileName) {
    try {
      // Read the JSON file
      const data = await fs.promises.readFile(fileName, "utf-8");

      // Parse the data into a JavaScript object (array of students)
      const studentsData = JSON.parse(data);

      // Clear the existing list to start fresh
      this.clearStudents();

      // Rebuild the linked list from the JSON data
      studentsData.forEach((studentData) => {
        // Create a new Student object for each student
        const student = new Student(
          studentData.name,
          studentData.year,
          studentData.email,
          studentData.specialization
        );
        // Add the student to the list
        this.addStudent(student);
      });

      console.log("Linked list loaded successfully.");
    } catch (error) {
      console.error("Error loading the file:", error);
    }
  }
}

module.exports = { LinkedList };
