const fs = require('fs');
const csv = require('csv-parser');

// Categories for classification
const categories = {
  groceries: 'Essential',
  rent: 'Essential',
  utilities: 'Essential',
  gas: 'Essential',
  insurance: 'Essential',
  medicine: 'Essential',
  desk: 'Essential',

  streaming: 'Want',
  gaming: 'Want',
  shoes: 'Want',
  clothing: 'Want',
  dining: 'Want',
  restaurant: 'Want',
  concert: 'Want',

  liquor: 'Irresponsible',
  casino: 'Irresponsible',
  lottery: 'Irresponsible',
  'strip club': 'Irresponsible'
};

// Function to classify transactions
function classifyTransaction(description) {
  const desc = String(description).toLowerCase();
  for (const keyword in categories) {
    if (desc.includes(keyword)) {
      return categories[keyword];
    }
  }
  return 'Uncategorized';
}

// Process the CSV file
function processTransactions(filePath) {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      // Dynamically find description and amount columns
      const descKey = Object.keys(row).find(key =>
        ['description', 'memo', 'name'].includes(key.toLowerCase())
      );
      const amtKey = Object.keys(row).find(key =>
        key.toLowerCase().includes('amount')
      );

      if (!descKey || !amtKey) {
        console.error('CSV must include Description and Amount columns');
        process.exit(1);
      }

      const category = classifyTransaction(row[descKey]);
      const amount = parseFloat(row[amtKey]) || 0;

      results.push({ category, amount });
    })
    .on('end', () => {
      // Summarize by category
      const summary = {};

      results.forEach(({ category, amount }) => {
        summary[category] = (summary[category] || 0) + amount;
      });

      // Convert to chart-ready format
      const output = Object.entries(summary).map(([label, value]) => ({ label, value }));
      console.log(output);
    });
}

// Example usage
const filePath = 'transactions.csv'; // Replace with your CSV path
processTransactions(filePath);
