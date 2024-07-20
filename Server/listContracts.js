const fs = require('fs');
const path = require('path');

async function listContracts() {
  const contractsDir = path.join(__dirname, 'contracts');
  const files = fs.readdirSync(contractsDir);

  console.log('Danh sách các hợp đồng đã được biên dịch:');
  files.forEach(file => {
    if (file.endsWith('.sol')) {
      console.log(file);
    }
  });
}

listContracts().catch(console.error);
