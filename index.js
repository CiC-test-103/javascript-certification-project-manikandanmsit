// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require("./Student");
const readline = require("readline");

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(" ");

  switch (operation) {
    case "add":
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
      console.log("Adding student...");
      const [name, year, email, specialization] = args;
      // --------> WRITE YOUR CODE BELOW

      // Ensure the necessary arguments are provided
      if (!name || !year || !email || !specialization) {
        console.log(
          "Missing information. Please provide name, year, email, and specialization."
        );
        return;
      }
      // Create a new student object using the provided data
      const newStudent = new Student(
        name,
        parseInt(year),
        email,
        specialization
      );
      // Add the student to the linked list
      studentManagementSystem.addStudent(newStudent);

      // Display the updated list of students
      console.log("Student added successfully!");
      console.log("Updated student list: ");
      console.log(studentManagementSystem.displayStudents());

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "remove":
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log("Removing student...");
      // --------> WRITE YOUR CODE BELOW

      // Get the email from the arguments
      const emailToRemove = args[0];

      // Ensure an email was provided
      if (!emailToRemove) {
        console.log("Please provide the email of the student to remove.");
        return;
      }

      // Attempt to remove the student from the linked list
      const result = studentManagementSystem.removeStudent(emailToRemove);

      if (result) {
        console.log("Student removed successfully.");
      } else {
        console.log("Student not found.");
      }

      // Display the updated student list
      console.log("Updated student list: ");
      console.log(studentManagementSystem.displayStudents());

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "display":
      /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */
      console.log("Displaying students...");
      // --------> WRITE YOUR CODE BELOW
      // Display the students from the linked list
      const studentsList = studentManagementSystem.displayStudents();
      if (studentsList) {
        console.log("Current students: ");
        console.log(studentsList);
      } else {
        console.log("No students found.");
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case "find":
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */
      console.log("Finding student...");
      // --------> WRITE YOUR CODE BELOW
      // Get the email from the arguments
      const emailToFind = args[0];

      // Ensure an email was provided
      if (!emailToFind) {
        console.log("Please provide the email of the student to find.");
        return;
      }

      // Find the student by email
      const student = studentManagementSystem.findStudent(emailToFind);

      if (student !== -1) {
        console.log("Student found: ");
        console.log(student.getString()); // Display student details using the getString() method
      } else {
        console.log("Student does not exist.");
      }

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "save":
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (saveFileName)
       *   - Use implemented functions in LinkedList to save the data
       */
      console.log("Saving data...");
      // --------> WRITE YOUR CODE BELOW

      // Get the file name from the arguments
      const saveFileName = args[0];

      if (!saveFileName) {
        console.log("Please provide the file name to save the data.");
        return;
      }

      // Save the linked list to the JSON file
      await studentManagementSystem.saveToJson(saveFileName);

      break;

    // --------> WRITE YOUR CODE ABOVE

    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */
      console.log("Loading data...");
      // --------> WRITE YOUR CODE BELOW

      // Get the file name from the arguments
      const fileName = args[0];

      if (!fileName) {
        console.log("Please provide the file name to load the data.");
        return;
      }

      // Load the linked list from the JSON file
      await studentManagementSystem.loadFromJSON(fileName);

      // Display the updated student list
      console.log("Updated student list: ");
      console.log(studentManagementSystem.displayStudents());

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "clear":
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log("Clearing data...");
      // --------> WRITE YOUR CODE BELOW

      // Clear the linked list
      studentManagementSystem.clearStudents();

      // Display the updated (empty) student list
      console.log("Nothing student list: ");

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "q":
      console.log("Exiting...");
      rl.close();
      break;

    default:
      console.log('Unknown command. Type "help" for a list of commands.');
      break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log("Welcome to the Student Management System!");
main();
rl.on("line", async (input) => {
  if (input.trim().toLowerCase() === "help") {
    main();
  } else {
    await handleCommand(input);
  }
});
rl.on("close", () => {
  console.log("Goodbye!");
});
