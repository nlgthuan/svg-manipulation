# SVG Manipulation Tool

SVG Manipulation Tool is a web application built using Preact, designed to handle SVG file uploads and manipulate their properties such as fill color, stroke color, rotation, and scaling. The app allows selecting multiple SVGs and applying transformations via an intuitive toolbox UI.

## Features
- Upload multiple SVG files with a maximum size limit.
- Change fill and stroke colors of SVG elements.
- Rotate and scale SVG graphics.
- Toggle between proportional and individual width/height scaling.

## Installation

Follow the below steps to get a copy of the project running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 20 or higher)

### Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/svg-manipulation-tool.git
   cd svg-manipulation-tool
   ```

2. **Install Dependencies:**

   Run the following command to install all the required packages and dependencies:

   ```bash
   npm install
   ```

3. **Start the Development Server:**

   Use the following command to start the app in development mode:

   ```bash
   npm run dev
   ```

   This command will start a local development server and open the application in your default web browser.

4. **Build for Production:**

   To create a production-ready build of the project, run:

   ```bash
   npm run build
   ```

   This will generate a `dist` directory with all the necessary files for deployment.

## Usage

Once the app is running, you can upload SVG files by clicking the "Choose SVGs" button. The uploaded files will be displayed in an interface where you can select them to apply various transformations using the toolbox.

- **Fill Color:** Change the fill color using the color picker.
- **Stroke Color:** Alter the stroke using the color picker.
- **Rotation:** Rotate the SVG by specifying a degree value.
- **Scaling:** Adjust width and height scaling with the option to maintain proportionality.
