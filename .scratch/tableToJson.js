const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlContent = fs.readFileSync(path.join(__dirname, 'tables.html'), 'utf8');

// Parse HTML and extract table data
function parseTableFromHTML(html) {
    const locations = [];
    
    // Use regex to find all table rows (excluding header)
    const rowRegex = /<tr[^>]*>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<\/tr>/gs;
    let match;
    
    while ((match = rowRegex.exec(html)) !== null) {
        const city = match[1].replace(/<[^>]*>/g, '').trim(); // Remove HTML tags
        const address = match[2].replace(/<[^>]*>/g, '').trim(); // Remove HTML tags
        
        // Skip header row and empty rows
        if (city.toLowerCase().includes('city/town') || !city || !address) {
            continue;
        }
        
        // Clean up city name (remove "NEW" prefix if present)
        const cleanCity = city.replace(/^NEW\s+/i, '').trim();
        
        // Clean up address (remove HTML entities and normalize spaces)
        const cleanAddress = address
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/\s+/g, ' ')
            .replace(/([a-zA-Z])([0-9])/g, '$1 $2') // Add space between letters and numbers
            .replace(/([0-9])([a-zA-Z])/g, '$1 $2') // Add space between numbers and letters
            .trim();
        
        locations.push({
            city: cleanCity,
            address: cleanAddress
        });
    }
    
    return locations;
}

// Parse the HTML and extract locations
const locations = parseTableFromHTML(htmlContent);

// Sort locations by city first, then by address
locations.sort((a, b) => {
    // First sort by city (case-insensitive)
    const cityComparison = a.city.toLowerCase().localeCompare(b.city.toLowerCase());
    if (cityComparison !== 0) {
        return cityComparison;
    }
    // If cities are the same, sort by address (case-insensitive)
    return a.address.toLowerCase().localeCompare(b.address.toLowerCase());
});

// Create the JSON structure similar to locations.json
const jsonData = {
    locations: locations
};

// Write to JSON file
const outputPath = path.join(__dirname, 'parsed_locations.json');
fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));

console.log(`Successfully parsed ${locations.length} locations and saved to ${outputPath}`);
console.log('Sample entries:');
locations.slice(0, 3).forEach((location, index) => {
    console.log(`${index + 1}. ${location.city} - ${location.address}`);
});
