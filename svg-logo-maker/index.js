const inquirer = require('inquirer');
const fs = require('fs');
const Circle = require('./shapes/Circle');
const Square = require('./shapes/Square');
const Triangle = require('./shapes/Triangle');

async function main() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Enter text for the logo:',
            },
            {
                type: 'input',
                name: 'color',
                message: 'Enter the color for the shape:',
            },
            {
                type: 'list',
                name: 'shape',
                message: 'Choose a shape:',
                choices: ['Circle', 'Square', 'Triangle'],
            },
        ]);

        let shape;
        switch (answers.shape) {
            case 'Circle':
                shape = new Circle(answers.color);
                break;
            case 'Square':
                shape = new Square(answers.color);
                break;
            case 'Triangle':
                shape = new Triangle(answers.color);
                break;
        }

        const svgContent = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shape.render()}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">${answers.text}</text>
</svg>
        `;

        fs.writeFileSync('logo.svg', svgContent.trim());
        console.log('Generated logo.svg');
    } catch (error) {
        console.error('Error generating SVG logo:', error);
    }
}

main();
