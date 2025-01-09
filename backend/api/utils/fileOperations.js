const fs = require("fs");

const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    if (!data) {
      console.error("O arquivo está vazio.");
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler o arquivo ${filePath}:`, err);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    const validData = Array.isArray(data) ? data : [];
    fs.writeFileSync(filePath, JSON.stringify(validData, null, 2));
  } catch (err) {
    console.error(`Erro ao escrever no arquivo ${filePath}:`, err);
  }
};

module.exports = { readData, writeData };
