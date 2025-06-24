#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Command } = require("commander");

const program = new Command();

program
    .name("csv-json-cli")
    .description("Effortlessly convert between CSV and JSON formats from the command line.")
    .option("-f, --file <path>", "Specify the path to the file you wish to convert")
    .option("-j, --json", "Convert a CSV file to beautiful, structured JSON")
    .option("-c, --csv", "Convert a JSON file to a clean, readable CSV")
    .addHelpCommand(true)
    .parse(process.argv);

const options = program.opts();

if (!options.file) {
    console.error("❌ Please provide a file path using -f or --file");
    process.exit(1);
}

if (options.json && options.csv) {
    console.error("❌ Please choose either --json or --csv, not both.");
    process.exit(1);
}

if (options.json) {
    convertToJson(options.file);
} else if (options.csv) {
    convertToCsv(options.file);
} else {
    console.error("❌ Please specify a conversion type: --json or --csv");
    process.exit(1);
}

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
