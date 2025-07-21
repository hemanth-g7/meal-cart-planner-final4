// Advanced file export utilities with multiple formats and enhanced features

export interface GroceryItem {
  name: string;
  quantity: number | string;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  notes?: string;
}

export interface ExportData {
  username: string;
  familySize: number;
  generatedDate: string;
  items: GroceryItem[];
  totalItems: number;
  estimatedCost?: number;
  mealPlan?: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
  };
}

// Enhanced JSON export with metadata
export const exportAsEnhancedJSON = (data: ExportData) => {
  const enhancedData = {
    ...data,
    exportVersion: '2.0',
    exportTimestamp: new Date().toISOString(),
    metadata: {
      appName: 'Meal Cart Planner Pro',
      exportFormat: 'JSON',
      totalCategories: [...new Set(data.items.map(item => item.category || 'General'))].length,
      highPriorityItems: data.items.filter(item => item.priority === 'high').length,
    }
  };

  const jsonString = JSON.stringify(enhancedData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadFile(blob, `grocery-list-${data.username}-${getDateString()}.json`);
};

// Enhanced CSV export with categories and priorities
export const exportAsEnhancedCSV = (data: ExportData) => {
  const headers = ['Item Name', 'Quantity', 'Category', 'Priority', 'Notes'];
  const csvContent = [
    `# Enhanced Grocery List for ${data.username}`,
    `# Family Size: ${data.familySize} members`,
    `# Generated: ${data.generatedDate}`,
    `# Total Items: ${data.totalItems}`,
    `# Export Date: ${new Date().toLocaleDateString()}`,
    '',
    headers.join(','),
    ...data.items.map(item => [
      `"${item.name}"`,
      `"${item.quantity}"`,
      `"${item.category || 'General'}"`,
      `"${item.priority || 'medium'}"`,
      `"${item.notes || ''}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  downloadFile(blob, `grocery-list-${data.username}-${getDateString()}.csv`);
};

// Export as Excel-compatible format
export const exportAsExcel = (data: ExportData) => {
  const excelContent = [
    'Item Name\tQuantity\tCategory\tPriority\tNotes',
    ...data.items.map(item => 
      `${item.name}\t${item.quantity}\t${item.category || 'General'}\t${item.priority || 'medium'}\t${item.notes || ''}`
    )
  ].join('\n');

  const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
  downloadFile(blob, `grocery-list-${data.username}-${getDateString()}.xls`);
};

// Export as PDF-ready HTML with enhanced styling
export const exportAsStyledHTML = (data: ExportData) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grocery List - ${data.username}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 30px;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #4CAF50;
            padding-bottom: 30px;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin: -40px -40px 40px -40px;
            padding: 40px;
            border-radius: 15px 15px 0 0;
        }
        .header h1 {
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .header .subtitle {
            font-size: 1.2em;
            opacity: 0.9;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .info-card {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .info-card h3 {
            font-size: 2em;
            margin-bottom: 5px;
        }
        .info-card p {
            opacity: 0.9;
        }
        .shopping-list {
            background: white;
            border: 3px solid #4CAF50;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        .list-header {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 1.5em;
            font-weight: bold;
        }
        .category-section {
            margin-bottom: 0;
        }
        .category-header {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            padding: 15px 20px;
            font-weight: bold;
            color: #1976d2;
            border-bottom: 2px solid #2196f3;
        }
        .list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 25px;
            border-bottom: 1px solid #eee;
            transition: all 0.3s ease;
        }
        .list-item:hover {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            transform: translateX(5px);
        }
        .list-item:last-child {
            border-bottom: none;
        }
        .item-details {
            flex-grow: 1;
        }
        .item-name {
            font-weight: 600;
            font-size: 1.1em;
            color: #333;
        }
        .item-notes {
            font-size: 0.9em;
            color: #666;
            margin-top: 2px;
        }
        .item-quantity {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 8px 15px;
            border-radius: 25px;
            font-weight: bold;
            min-width: 50px;
            text-align: center;
            margin-right: 10px;
        }
        .priority-badge {
            padding: 4px 10px;
            border-radius: 15px;
            font-size: 0.8em;
            font-weight: bold;
            text-transform: uppercase;
        }
        .priority-high { background: #ffebee; color: #c62828; }
        .priority-medium { background: #fff3e0; color: #ef6c00; }
        .priority-low { background: #e8f5e8; color: #2e7d32; }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 30px;
            border-top: 3px solid #4CAF50;
            color: #666;
        }
        .footer h3 {
            color: #4CAF50;
            margin-bottom: 10px;
        }
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
            .list-item:hover { background: transparent; transform: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛒 Grocery List</h1>
            <p class="subtitle">Smart Shopping Made Easy</p>
        </div>
        
        <div class="info-grid">
            <div class="info-card">
                <h3>👤</h3>
                <p><strong>${data.username}</strong><br>Family Head</p>
            </div>
            <div class="info-card">
                <h3>${data.familySize}</h3>
                <p>Family Members</p>
            </div>
            <div class="info-card">
                <h3>${data.totalItems}</h3>
                <p>Total Items</p>
            </div>
            <div class="info-card">
                <h3>📅</h3>
                <p>${data.generatedDate}</p>
            </div>
        </div>
        
        <div class="shopping-list">
            <div class="list-header">
                🛍️ Your Shopping List
            </div>
            ${generateCategorizedItems(data.items)}
        </div>
        
        ${data.mealPlan ? generateMealPlanSection(data.mealPlan) : ''}
        
        <div class="footer">
            <h3>🌟 Happy Shopping!</h3>
            <p>Generated by Meal Cart Planner Pro</p>
            <p>Exported on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
    </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  downloadFile(blob, `grocery-list-${data.username}-${getDateString()}.html`);
};

// Generate categorized items HTML
const generateCategorizedItems = (items: GroceryItem[]) => {
  const categories = [...new Set(items.map(item => item.category || 'General'))];
  
  return categories.map(category => {
    const categoryItems = items.filter(item => (item.category || 'General') === category);
    return `
      <div class="category-section">
        <div class="category-header">
          📦 ${category} (${categoryItems.length} items)
        </div>
        ${categoryItems.map(item => `
          <div class="list-item">
            <div class="item-details">
              <div class="item-name">${item.name}</div>
              ${item.notes ? `<div class="item-notes">💡 ${item.notes}</div>` : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              ${item.priority ? `<span class="priority-badge priority-${item.priority}">${item.priority}</span>` : ''}
              <span class="item-quantity">×${item.quantity}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
};

// Generate meal plan section
const generateMealPlanSection = (mealPlan: any) => {
  return `
    <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%); border-radius: 15px;">
      <h3 style="text-align: center; color: #2d3436; margin-bottom: 20px;">🍽️ Your Meal Plan</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
        <div style="background: white; padding: 15px; border-radius: 10px;">
          <h4 style="color: #e17055;">🌅 Breakfast</h4>
          <ul>${mealPlan.breakfast?.map((meal: string) => `<li>${meal}</li>`).join('') || '<li>Not planned</li>'}</ul>
        </div>
        <div style="background: white; padding: 15px; border-radius: 10px;">
          <h4 style="color: #00b894;">☀️ Lunch</h4>
          <ul>${mealPlan.lunch?.map((meal: string) => `<li>${meal}</li>`).join('') || '<li>Not planned</li>'}</ul>
        </div>
        <div style="background: white; padding: 15px; border-radius: 10px;">
          <h4 style="color: #6c5ce7;">🌙 Dinner</h4>
          <ul>${mealPlan.dinner?.map((meal: string) => `<li>${meal}</li>`).join('') || '<li>Not planned</li>'}</ul>
        </div>
      </div>
    </div>
  `;
};

// Export as XML format
export const exportAsXML = (data: ExportData) => {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<GroceryList>
  <Metadata>
    <Username>${data.username}</Username>
    <FamilySize>${data.familySize}</FamilySize>
    <GeneratedDate>${data.generatedDate}</GeneratedDate>
    <TotalItems>${data.totalItems}</TotalItems>
    <ExportDate>${new Date().toISOString()}</ExportDate>
  </Metadata>
  <Items>
    ${data.items.map(item => `
    <Item>
      <Name>${item.name}</Name>
      <Quantity>${item.quantity}</Quantity>
      <Category>${item.category || 'General'}</Category>
      <Priority>${item.priority || 'medium'}</Priority>
      ${item.notes ? `<Notes>${item.notes}</Notes>` : ''}
    </Item>`).join('')}
  </Items>
  ${data.mealPlan ? `
  <MealPlan>
    <Breakfast>${data.mealPlan.breakfast?.join(', ') || ''}</Breakfast>
    <Lunch>${data.mealPlan.lunch?.join(', ') || ''}</Lunch>
    <Dinner>${data.mealPlan.dinner?.join(', ') || ''}</Dinner>
  </MealPlan>` : ''}
</GroceryList>`;

  const blob = new Blob([xmlContent], { type: 'application/xml' });
  downloadFile(blob, `grocery-list-${data.username}-${getDateString()}.xml`);
};

// Export as Markdown format
export const exportAsMarkdown = (data: ExportData) => {
  const categories = [...new Set(data.items.map(item => item.category || 'General'))];
  
  const markdownContent = `# 🛒 Grocery List for ${data.username}

## 📋 Summary
- **Family Size:** ${data.familySize} members
- **Generated:** ${data.generatedDate}
- **Total Items:** ${data.totalItems}
- **Export Date:** ${new Date().toLocaleDateString()}

---

## 🛍️ Shopping List

${categories.map(category => {
  const categoryItems = data.items.filter(item => (item.category || 'General') === category);
  return `### 📦 ${category}

${categoryItems.map(item => {
  let itemLine = `- **${item.name}** - Quantity: \`×${item.quantity}\``;
  if (item.priority) itemLine += ` - Priority: \`${item.priority.toUpperCase()}\``;
  if (item.notes) itemLine += `\n  > 💡 ${item.notes}`;
  return itemLine;
}).join('\n')}`;
}).join('\n\n')}

${data.mealPlan ? `
---

## 🍽️ Meal Plan

### 🌅 Breakfast
${data.mealPlan.breakfast?.map(meal => `- ${meal}`).join('\n') || '- Not planned'}

### ☀️ Lunch
${data.mealPlan.lunch?.map(meal => `- ${meal}`).join('\n') || '- Not planned'}

### 🌙 Dinner
${data.mealPlan.dinner?.map(meal => `- ${meal}`).join('\n') || '- Not planned'}
` : ''}

---

*Generated by **Meal Cart Planner Pro** 🌟*
*Happy Shopping! 🛒✨*`;

  const blob = new Blob([markdownContent], { type: 'text/markdown' });
  downloadFile(blob, `grocery-list-${data.username}-${getDateString()}.md`);
};

// Print with enhanced styling
export const printEnhancedList = (data: ExportData) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Grocery List - ${data.username}</title>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            margin: 20px; 
            line-height: 1.6;
            color: #333;
        }
        .header { 
            text-align: center; 
            margin-bottom: 30px; 
            padding: 20px;
            border: 3px solid #4CAF50;
            border-radius: 10px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .header h1 {
            color: #4CAF50;
            margin-bottom: 10px;
        }
        .info-grid { 
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 30px; 
        }
        .info-card {
            text-align: center;
            padding: 15px;
            border: 2px solid #4CAF50;
            border-radius: 8px;
            background: #f8f9fa;
        }
        .category-section {
            margin-bottom: 25px;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .category-header {
            background: #4CAF50;
            color: white;
            padding: 10px 15px;
            font-weight: bold;
        }
        .list-item { 
            padding: 10px 15px; 
            border-bottom: 1px solid #eee; 
            display: flex; 
            justify-content: space-between;
            align-items: center;
        }
        .list-item:last-child {
            border-bottom: none;
        }
        .item-name {
            font-weight: 600;
        }
        .item-notes {
            font-size: 0.9em;
            color: #666;
            font-style: italic;
        }
        .quantity { 
            font-weight: bold; 
            color: #4CAF50; 
            background: #e8f5e8;
            padding: 4px 8px;
            border-radius: 4px;
        }
        .priority {
            font-size: 0.8em;
            padding: 2px 6px;
            border-radius: 3px;
            text-transform: uppercase;
            font-weight: bold;
        }
        .priority-high { background: #ffebee; color: #c62828; }
        .priority-medium { background: #fff3e0; color: #ef6c00; }
        .priority-low { background: #e8f5e8; color: #2e7d32; }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #4CAF50;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🛒 Grocery List</h1>
        <p><strong>${data.username}</strong> | Family of ${data.familySize}</p>
    </div>
    
    <div class="info-grid">
        <div class="info-card">
            <strong>Total Items</strong><br>${data.totalItems}
        </div>
        <div class="info-card">
            <strong>Generated</strong><br>${data.generatedDate}
        </div>
        <div class="info-card">
            <strong>Family Size</strong><br>${data.familySize} members
        </div>
        <div class="info-card">
            <strong>Printed</strong><br>${new Date().toLocaleDateString()}
        </div>
    </div>

    ${generateCategorizedItemsForPrint(data.items)}
    
    <div class="footer">
        <p><strong>Happy Shopping! 🛒</strong></p>
        <p>Generated by Meal Cart Planner Pro</p>
    </div>
</body>
</html>`;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.print();
};

// Generate categorized items for print
const generateCategorizedItemsForPrint = (items: GroceryItem[]) => {
  const categories = [...new Set(items.map(item => item.category || 'General'))];
  
  return categories.map(category => {
    const categoryItems = items.filter(item => (item.category || 'General') === category);
    return `
      <div class="category-section">
        <div class="category-header">
          📦 ${category} (${categoryItems.length} items)
        </div>
        ${categoryItems.map(item => `
          <div class="list-item">
            <div>
              <div class="item-name">${item.name}</div>
              ${item.notes ? `<div class="item-notes">💡 ${item.notes}</div>` : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              ${item.priority ? `<span class="priority priority-${item.priority}">${item.priority}</span>` : ''}
              <span class="quantity">×${item.quantity}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
};

// Utility functions
const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const getDateString = () => {
  return new Date().toISOString().split('T')[0];
};

// Save to local storage with enhanced data
export const saveToLocalStorage = (data: ExportData, key?: string) => {
  const storageKey = key || `grocery-list-${data.username}-${Date.now()}`;
  const enhancedData = {
    ...data,
    savedAt: new Date().toISOString(),
    version: '2.0'
  };
  
  try {
    localStorage.setItem(storageKey, JSON.stringify(enhancedData));
    return storageKey;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    throw new Error('Failed to save list locally');
  }
};

// Load from local storage
export const loadFromLocalStorage = (key: string): ExportData | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};

// Get all saved lists from local storage
export const getAllSavedLists = (): { key: string; data: ExportData }[] => {
  const savedLists: { key: string; data: ExportData }[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('grocery-list-')) {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '');
        savedLists.push({ key, data });
      } catch (error) {
        console.error(`Failed to parse saved list ${key}:`, error);
      }
    }
  }
  
  return savedLists.sort((a, b) => 
    new Date(b.data.savedAt || 0).getTime() - new Date(a.data.savedAt || 0).getTime()
  );
};