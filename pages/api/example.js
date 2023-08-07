import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const fileName = "example.txt";
  const filePath = path.join(process.cwd(), fileName);
  const fileContent = "This is an example content to be written to the file.";

  try {
    // Write the file asynchronously
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).json({ error: "Error writing file." });
      } else {
        console.log("File written successfully.");

        // Set the appropriate headers for the download
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${fileName}"`
        );
        res.setHeader("Content-Type", "text/plain");

        // Stream the file to the response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error." });
  }
}
