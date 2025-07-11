#!/usr/bin/env node

/**
 * Site Inspiration CLI
 * 
 * A utility for capturing inspiration from existing websites using Puppeteer.
 * Takes screenshots of different pages, analyzes layout, and helps plan new themes.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class SiteInspiration {
    constructor() {
        this.browser = null;
        this.page = null;
        this.outputDir = './inspiration-outputs';
    }

    async initialize() {
        console.log('🚀 Starting Site Inspiration CLI...');
        
        // Ensure output directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }

        // Launch browser
        this.browser = await puppeteer.launch({
            headless: false, // Show browser for debugging
            defaultViewport: null,
            args: ['--start-maximized']
        });

        this.page = await this.browser.newPage();
        
        // Set a realistic viewport
        await this.page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });

        // Set user agent to avoid bot detection
        await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }

    async captureInspiration(url, siteName) {
        console.log(`📸 Capturing inspiration from: ${url}`);
        
        try {
            // Navigate to the site
            await this.page.goto(url, { 
                waitUntil: 'networkidle2',
                timeout: 30000 
            });

            // Wait for page to fully load
            await this.page.waitForTimeout(2000);

            // Create site-specific directory
            const siteDir = path.join(this.outputDir, siteName);
            if (!fs.existsSync(siteDir)) {
                fs.mkdirSync(siteDir, { recursive: true });
            }

            // Take full page screenshot
            const fullPagePath = path.join(siteDir, 'full-page.png');
            await this.page.screenshot({
                path: fullPagePath,
                fullPage: true,
                quality: 90
            });
            console.log(`✅ Full page screenshot saved: ${fullPagePath}`);

            // Take viewport screenshot
            const viewportPath = path.join(siteDir, 'viewport.png');
            await this.page.screenshot({
                path: viewportPath,
                quality: 90
            });
            console.log(`✅ Viewport screenshot saved: ${viewportPath}`);

            // Analyze page structure
            const analysis = await this.analyzePage();
            
            // Save analysis
            const analysisPath = path.join(siteDir, 'analysis.json');
            fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
            console.log(`✅ Page analysis saved: ${analysisPath}`);

            // Try to find and capture additional pages
            await this.captureAdditionalPages(siteDir);

            return {
                success: true,
                screenshots: [fullPagePath, viewportPath],
                analysis: analysisPath
            };

        } catch (error) {
            console.error(`❌ Error capturing inspiration:`, error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async analyzePage() {
        console.log('🔍 Analyzing page structure...');
        
        const analysis = await this.page.evaluate(() => {
            // Get page title
            const title = document.title;
            
            // Get navigation structure
            const navElements = Array.from(document.querySelectorAll('nav a, header a')).map(a => ({
                text: a.textContent.trim(),
                href: a.href
            }));

            // Get heading structure
            const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
                tag: h.tagName.toLowerCase(),
                text: h.textContent.trim(),
                classes: h.className
            }));

            // Get color scheme
            const computedStyle = window.getComputedStyle(document.body);
            const colorScheme = {
                backgroundColor: computedStyle.backgroundColor,
                color: computedStyle.color,
                fontFamily: computedStyle.fontFamily
            };

            // Get layout structure
            const sections = Array.from(document.querySelectorAll('section, main, article, div[class*="section"]')).map(section => ({
                tagName: section.tagName.toLowerCase(),
                classes: section.className,
                id: section.id,
                childCount: section.children.length
            }));

            // Get button styles
            const buttons = Array.from(document.querySelectorAll('button, a[class*="btn"], a[class*="button"]')).map(btn => ({
                text: btn.textContent.trim(),
                classes: btn.className,
                href: btn.href || null
            }));

            return {
                title,
                url: window.location.href,
                timestamp: new Date().toISOString(),
                navigation: navElements,
                headings,
                colorScheme,
                sections,
                buttons,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            };
        });

        return analysis;
    }

    async captureAdditionalPages(siteDir) {
        console.log('🔗 Looking for additional pages to capture...');
        
        try {
            // Get navigation links
            const navLinks = await this.page.evaluate(() => {
                const links = Array.from(document.querySelectorAll('nav a, header a, .nav a'))
                    .map(a => ({ text: a.textContent.trim(), href: a.href }))
                    .filter(link => link.href && !link.href.includes('#') && !link.href.includes('mailto:') && !link.href.includes('tel:'))
                    .slice(0, 5); // Limit to 5 additional pages
                
                return links;
            });

            for (const link of navLinks) {
                try {
                    console.log(`📄 Capturing page: ${link.text}`);
                    await this.page.goto(link.href, { waitUntil: 'networkidle2', timeout: 15000 });
                    await this.page.waitForTimeout(1000);
                    
                    const safeName = link.text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                    const pagePath = path.join(siteDir, `${safeName}.png`);
                    
                    await this.page.screenshot({
                        path: pagePath,
                        fullPage: true,
                        quality: 90
                    });
                    
                    console.log(`✅ Page captured: ${pagePath}`);
                } catch (error) {
                    console.log(`⚠️ Could not capture page ${link.text}: ${error.message}`);
                }
            }
        } catch (error) {
            console.log(`⚠️ Error capturing additional pages: ${error.message}`);
        }
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            console.log('🎯 Browser closed');
        }
    }

    async generateReport(siteName) {
        const siteDir = path.join(this.outputDir, siteName);
        const analysisPath = path.join(siteDir, 'analysis.json');
        
        if (!fs.existsSync(analysisPath)) {
            console.log('❌ No analysis found');
            return;
        }

        const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf8'));
        
        const report = `
# ${siteName} Inspiration Report

## Site Analysis
- **Title**: ${analysis.title}
- **URL**: ${analysis.url}
- **Captured**: ${new Date(analysis.timestamp).toLocaleString()}

## Navigation Structure
${analysis.navigation.map(nav => `- [${nav.text}](${nav.href})`).join('\n')}

## Heading Structure
${analysis.headings.map(h => `${'#'.repeat(parseInt(h.tag.slice(1)))} ${h.text}`).join('\n')}

## Color Scheme
- **Background**: ${analysis.colorScheme.backgroundColor}
- **Text Color**: ${analysis.colorScheme.color}
- **Font Family**: ${analysis.colorScheme.fontFamily}

## Layout Sections
${analysis.sections.map(section => `- ${section.tagName}${section.classes ? ` (${section.classes})` : ''}`).join('\n')}

## Button Styles
${analysis.buttons.map(btn => `- "${btn.text}"${btn.classes ? ` (${btn.classes})` : ''}`).join('\n')}

## Screenshots
- Full page: full-page.png
- Viewport: viewport.png
- Additional pages: *.png

## Component Planning
Based on this analysis, consider creating:
- Header component with navigation
- Hero section
- Content sections
- Button components
- Footer component

## Next Steps
1. Review screenshots for visual design patterns
2. Identify key components to recreate
3. Plan CSS framework usage
4. Create component structure
        `;

        const reportPath = path.join(siteDir, 'README.md');
        fs.writeFileSync(reportPath, report);
        console.log(`📋 Report generated: ${reportPath}`);
    }
}

// CLI Interface
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log(`
Usage: node inspiration-cli.js <url> <site-name>

Examples:
  node inspiration-cli.js https://example.com example-site
  node inspiration-cli.js https://getastrothemes.com/demo/upstart/?src=astrobuild upstart-theme
        `);
        return;
    }

    const [url, siteName] = args;
    const inspector = new SiteInspiration();

    try {
        await inspector.initialize();
        const result = await inspector.captureInspiration(url, siteName);
        
        if (result.success) {
            await inspector.generateReport(siteName);
            console.log(`🎉 Inspiration capture completed for ${siteName}`);
        } else {
            console.log(`❌ Failed to capture inspiration: ${result.error}`);
        }
    } catch (error) {
        console.error('❌ Unexpected error:', error);
    } finally {
        await inspector.close();
    }
}

// Run CLI if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = SiteInspiration;