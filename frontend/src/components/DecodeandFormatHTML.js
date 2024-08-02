const entityMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };
  
  function decodeHTML(str) {
    return str.replace(/&[^;]+;/g, match => entityMap[match] || match);
  }
  
  function formatHTML(str) {
    // Handle bold text
    str = str.replace(/<b>(.*?)<\/b>/g, '\n\n**$1**\n\n')
             .replace(/<strong>(.*?)<\/strong>/g, '\n\n**$1**\n\n');
  
    // Handle italic text
    str = str.replace(/<i>(.*?)<\/i>/g, '*$1*')
             .replace(/<em>(.*?)<\/em>/g, '*$1*');
  
    // Handle line breaks and paragraphs
    str = str.replace(/<br\s*\/?>/g, '\n')
             .replace(/<\/p>\s*<p>/g, '\n\n')
             .replace(/<p>/g, '\n\n')
             .replace(/<\/p>/g, '');
  
    // Handle unordered lists
    str = str.replace(/<ul>/g, '\n')
             .replace(/<\/ul>/g, '\n')
             .replace(/<li>/g, '\n• ')
             .replace(/<\/li>/g, '');
  
    // Handle ordered lists
    str = str.replace(/<ol>/g, '\n')
             .replace(/<\/ol>/g, '\n')
             .replace(/<li>(\d+\.)\s/g, '\n$1 ')
             .replace(/<\/li>/g, '');
  
    // Ensure paragraphs and headings have newlines for separation
    str = str.replace(/\n\n+/g, '\n\n');
  
    // Trim leading and trailing whitespace
    str = str.trim();
  
    return str;
  }
  
  export default function decodeAndFormatHTML(htmlString) {
    const decodedString = decodeHTML(htmlString);
    const formattedString = formatHTML(decodedString);
    return formattedString;
  }
  