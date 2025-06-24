# csv-json

A simple and fast command-line tool & node js libary to convert between JSON and CSV formats.

## 🚀 Features

- Convert JSON to CSV
- Convert CSV to JSON
- Cross-platform binaries: **Windows**, **Linux**, and **macOS**
- No need to install Node.js when using the compiled binary

---

## 📦 Installation (for development)

Clone the repository and install dependencies:

```
git clone https://github.com/Ahmed-Hussein793/csv-json
cd csv-json
npm install
```
## 🔧 Usage

Convert JSON to CSV:
```
csv-json -f path/to/file.json --csv
```

Convert CSV to JSON:
```
csv-json -f path/to/file.csv --json
```


## 💻 Download Binaries (for normal users)

### 📥 Download for Linux OS: 
    ```bash
      wget https://github.com/Ahmed-Hussein793/csv-json/raw/refs/heads/main/linux/csv-json-cli
      chmod +x
    ```
### 📥 Dwonload for Windows OS: 
    ```powershell
      curl -LO https://github.com/Ahmed-Hussein793/csv-json/raw/refs/heads/main/windows/csv-json-cli.exe
      csv-json-win.exe -f file.json --csv
    ```

### 📥 Download for Mac OS: 
```bash
      curl -LO https://github.com/Ahmed-Hussein793/csv-json/raw/refs/heads/main/linux/csv-json-cli
      chmod +x csv-json-macos
```
### 📂 Example

csv-json -f data.json --csv

csv-json -f data.csv --json


---

### 📄 License

MIT License © 2025 [Ahmed Hussein]
