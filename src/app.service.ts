import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  // Sample URLS
  // https://docs.google.com/document/d/e/2PACX-1vTMOmshQe8YvaRXi6gEPKKlsC6UpFJSMAk4mQjLm_u1gmHdVVTaeh7nBNFBRlui0sTZ-snGwZM4DBCT/pub
  // https://docs.google.com/document/d/e/2PACX-1vTMOmshQe8YvaRXi6gEPKKlsC6UpFJSMAk4mQjLm_u1gmHdVVTaeh7nBNFBRlui0sTZ-snGwZM4DBCT/pub
  async generatePatternFromURL(url: string | undefined) {
    if (!url) {
      return {
        success: false,
      };
    }
    const response = await fetch(url);
    const html = await response.text();

    const tdRegex = /<td[^>]*>(.*?)<\/td>/gs;
    let cellMatches: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = tdRegex.exec(html)) !== null) {
      // Strip any inner HTML tags (like <span> or <div>) and decode basic entities
      const cellText = match[1]
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
        .trim();

      cellMatches.push(cellText);
    }

    const headerIndex = cellMatches.findIndex((text) =>
      text.includes('x-coordinate'),
    );

    if (headerIndex !== -1) {
      cellMatches = cellMatches.slice(headerIndex + 3);
    }

    const data: { x: number; char: string; y: number }[] = [];
    let maxX = 0;
    let maxY = 0;

    for (let i = 0; i < cellMatches.length; i += 3) {
      const x = parseInt(cellMatches[i], 10);
      const char = cellMatches[i + 1];
      const y = parseInt(cellMatches[i + 2], 10);

      if (!isNaN(x) && !isNaN(y) && char !== undefined) {
        data.push({ x, char, y });
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }

    const grid: string[][] = Array.from(
      { length: maxY + 1 },
      () => Array(maxX + 1).fill(' ') as [string],
    );

    data.forEach(({ x, char, y }) => {
      grid[y][x] = char;
    });

    for (let y = maxY; y >= 0; y--) {
      console.log(grid[y].join(''));
    }

    return {
      success: true,
      data,
    };
  }
}
