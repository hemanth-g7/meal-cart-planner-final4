// Utility functions for exporting grocery lists to various formats

export interface GroceryItem {
  name: string;
  quantity: number | string;
}

export interface ExportData {
  username: string;
  familySize: number;
  generatedDate: string;
  items: GroceryItem[];
  totalItems: number;
}

// Export as JSON file
export const exportAsJSON = (data: ExportData) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `grocery-list-${data.username}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export as CSV file
export const exportAsCSV = (data: ExportData) => {
  const headers = ['Item Name', 'Quantity'];
  const csvContent = [
    `# Grocery List for ${data.username}`,
    `# Family Size: ${data.familySize}`,
    `# Generated: ${data.generatedDate}`,
    `# Total Items: ${data.totalItems}`,
    '',
    headers.join(','),
    ...data.items.map(item => `"${item.name}","${item.quantity}"`)
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `grocery-list-${data.username}-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export as TXT file
export const exportAsTXT = (data: ExportData) => {
  const txtContent = [
    '='.repeat(50),
    `GROCERY LIST FOR ${data.username.toUpperCase()}`,
    '='.repeat(50),
    '',
    `Family Size: ${data.familySize} members`,
    `Generated: ${data.generatedDate}`,
    `Total Items: ${data.totalItems}`,
    '',
    '-'.repeat(30),
    'SHOPPING LIST',
    '-'.repeat(30),
    '',
    ...data.items.map((item, index) => 
      `${(index + 1).toString().padStart(3, ' ')}. ${item.name.padEnd(30, '.')} x${item.quantity}`
    ),
    '',
    '='.repeat(50),
    'Happy Shopping! 🛒',
    '='.repeat(50)
  ].join('\n');

  const blob = new Blob([txtContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `grocery-list-${data.username}-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export as PDF-ready HTML
export const exportAsPrintableHTML = (data: ExportData) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grocery List - ${data.username}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #4CAF50;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #4CAF50;
            margin: 0;
            font-size: 2.5em;
        }
        .info {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .info-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .info-label {
            font-weight: bold;
            color: #666;
        }
        .shopping-list {
            background: white;
            border: 2px solid #4CAF50;
            border-radius: 10px;
            overflow: hidden;
        }
        .list-header {
            background: #4CAF50;
            color: white;
            padding: 15px;
            text-align: center;
            font-size: 1.3em;
            font-weight: bold;
        }
        .list-items {
            padding: 0;
        }
        .list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 20px;
            border-bottom: 1px solid #eee;
            transition: background-color 0.2s;
        }
        .list-item:hover {
            background-color: #f5f5f5;
        }
        .list-item:last-child {
            border-bottom: none;
        }
        .item-name {
            font-weight: 500;
            flex-grow: 1;
        }
        .item-quantity {
            background: #4CAF50;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-weight: bold;
            min-width: 40px;
            text-align: center;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #4CAF50;
            color: #666;
        }
        @media print {
            body { margin: 0; padding: 15px; }
            .list-item:hover { background-color: transparent; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🛒 Grocery List</h1>
        <p>For ${data.username}</p>
    </div>
    
    <div class="info">
        <div class="info-grid">
            <div class="info-item">
                <span class="info-label">👥 Family Size:</span>
                <span>${data.familySize} members</span>
            </div>
            <div class="info-item">
                <span class="info-label">📅 Generated:</span>
                <span>${data.generatedDate}</span>
            </div>
            <div class="info-item">
                <span class="info-label">📦 Total Items:</span>
                <span>${data.totalItems}</span>
            </div>
        </div>
    </div>
    
    <div class="shopping-list">
        <div class="list-header">
            Shopping List
        </div>
        <div class="list-items">
            ${data.items.map(item => `
                <div class="list-item">
                    <span class="item-name">${item.name}</span>
                    <span class="item-quantity">×${item.quantity}</span>
                </div>
            `).join('')}
        </div>
    </div>
    
    <div class="footer">
        <p>Generated by Meal Cart Planner Pro</p>
        <p>Happy Shopping! 🛒✨</p>
    </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `grocery-list-${data.username}-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Print the list directly
export const printList = (data: ExportData) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Grocery List - ${data.username}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .info { margin-bottom: 20px; }
        .list-item { padding: 8px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
        .quantity { font-weight: bold; color: #4CAF50; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🛒 Grocery List for ${data.username}</h1>
        <p>Family Size: ${data.familySize} | Generated: ${data.generatedDate}</p>
    </div>
    <div class="info">
        <h3>Shopping List (${data.totalItems} items):</h3>
    </div>
    ${data.items.map(item => `
        <div class="list-item">
            <span>${item.name}</span>
            <span class="quantity">×${item.quantity}</span>
        </div>
    `).join('')}
    <div style="margin-top: 30px; text-align: center; color: #666;">
        <p>Happy Shopping! 🛒</p>
    </div>
</body>
</html>`;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.print();
};