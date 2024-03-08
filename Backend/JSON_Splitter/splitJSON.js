const fs = require("fs");

// Read the JSON file
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Define the number of objects per file
    const objectsPerFile = 30;
    let fileIndex = 0;

    // Loop through the JSON data and split into smaller files
    for (let i = 0; i < jsonData.length; i += objectsPerFile) {
      const chunk = jsonData.slice(i, i + objectsPerFile);
      const fileName = `output_${fileIndex++}.json`;

      // Write the chunk to a new JSON file
      fs.writeFile(fileName, JSON.stringify(chunk, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log(`File saved: ${fileName}`);
        }
      });
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
