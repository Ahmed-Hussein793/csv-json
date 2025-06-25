const fs = require("fs")
const path = require("path")

function convertToCsv(filePath) {
    const resolvedPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), String(filePath));
    const jsonFile = fs.readFileSync(resolvedPath, "utf8");
    const jsonContent = JSON.parse(jsonFile);
    const columns = Object.keys(jsonContent[0]);
    const rows = jsonContent.map(obj =>
        columns.map(col => `"${obj[col] ?? ""}"`).join(",")
    );
    const fileName = path.basename(filePath).replace(/\.json$/i, ".csv");
    fs.writeFileSync(fileName, [columns.join(","), ...rows].join("\n"), "utf8");
    console.log("✅ Converted JSON to CSV:", fileName);
}

function convertToJson(filePath) {
    const resolvedPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), String(filePath));
    const csvFile = fs.readFileSync(resolvedPath, "utf8");
    const lines = csvFile.split(/\r?\n/).filter(Boolean);
    const keys = lines[0].split(",");
    const values = lines.slice(1);
    const json = values.map(line => {
        const fields = line.split(",");
        return keys.reduce((acc, key, index) => {
            acc[key] = fields[index]?.replace(/^"|"$/g, "") ?? "";
            return acc;
        }, {});
    });
    const fileName = path.basename(filePath).replace(/\.csv$/i, ".json");
    fs.writeFileSync(fileName, JSON.stringify(json, null, 2), "utf8");
    console.log("✅ Converted CSV to JSON:", fileName);
}

module.exports = { convertToCsv, convertToJson }