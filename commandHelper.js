// Get DOM elements
const buttonContainer = document.getElementById("buttonContainer");
const commandOutput = document.getElementById("commandOutput");
const clearButton = document.getElementById("clearButton");
const copyButton = document.getElementById("copyButton");
const historyContainer = document.getElementById("historyContainer");

// Load data from JSON file
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const buttonGroups = data.buttonGroups;
    const numHistoryData = data.numHistoryData;
    let selectedButtons = [];

    // Generate button groups and options
    buttonGroups.forEach(group => {
      const groupDiv = generateButtonGroup(group);
      buttonContainer.appendChild(groupDiv);
    });

    // Add event listeners to buttons
    const buttonOptions = document.querySelectorAll(".buttonOption");
    buttonOptions.forEach(button => {
      button.addEventListener("click", () => {
        button.classList.toggle("selected");
        updateSelectedButtons();
        updateCommandOutput();
      });
    });

    // Add event listener to clear button
    clearButton.addEventListener("click", () => {
      clearSelection();
      updateCommandOutput();
    });

    // Add event listener to copy button
    copyButton.addEventListener("click", () => {
      copyCommandOutput();
    });

    // Generate initial command output
    updateSelectedButtons();
    updateCommandOutput();

    // Generate command history
    let commandHistory = [];
    generateCommandHistory();

    // Helper functions
    function generateButtonGroup(group) {
      const groupDiv = document.createElement("div");
      groupDiv.classList.add("buttonGroup");
      
      const label = document.createElement("label");
      label.textContent = group.groupName;
      groupDiv.appendChild(label);
      
      group.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("buttonOption");
        button.textContent = option.name;
        button.dataset.value = option.value;
        groupDiv.appendChild(button);
      });
      
      return groupDiv;
    }

    function updateSelectedButtons() {
      selectedButtons = Array.from(document.querySelectorAll(".buttonOption.selected"));
    }

    function generateCommand() {
      let command = "mycommand";
      selectedButtons.forEach(button => {
        command += " " + button.dataset.value;
      });
      return command;
    }

    function updateCommandOutput() {
      const command = generateCommand();
      commandOutput.textContent = command;
      saveCommand(command);
    }

    function clearSelection() {
      selectedButtons.forEach(button => {
        button.classList.remove("selected");
      });
    }

    function copyCommandOutput() {
      const command = generateCommand();
      const tempInput = document.createElement("input");
      tempInput.value = command;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("Command copied to clipboard!");
    }

    function saveCommand(command) {
      commandHistory.push(command);
      if (commandHistory.length > numHistoryData) {
        commandHistory.shift();
      }
      generateCommandHistory();
    }

    function generateCommandHistory() {
      historyContainer.innerHTML = "";
      commandHistory.forEach(command => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("historyItem");
        historyItem.textContent = command;
        historyContainer.appendChild(historyItem);
      });
    }
  });
