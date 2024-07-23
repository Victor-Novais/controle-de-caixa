const fs = require('fs');


const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler o arquivo de dados:', err);
        return [];
    }
};

const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Erro ao escrever no arquivo de dados:', err);
    }
};

module.exports = { readData, writeData };