# Daily Inspiration - Quote Generator

A modern, interactive web application that generates inspirational quotes with beautiful visualizations and AI-powered explanations.

## Features

- 🎨 **Dynamic Visual Design**
  - Beautiful color schemes that change with each quote
  - Elegant typography with multiple font options
  - Smooth animations and transitions
  - Responsive design for all devices

- 📝 **Smart Quote Generation**
  - Curated quotes from various categories
  - Tag-based filtering
  - Carousel view for multiple quotes
  - Unique quote selection algorithm

- 🤖 **AI-Powered Features**
  - AI-generated explanations for each quote
  - Contextual understanding of quote meanings
  - Intelligent quote categorization

- 🎯 **Interactive Elements**
  - Tag-based navigation
  - Quote carousel with smooth transitions
  - Shareable quote images
  - Tooltip-enhanced navigation

- 🎨 **Customization Options**
  - Multiple color schemes
  - Various font styles
  - Customizable quote display
  - Responsive layout

## Installation

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/inspirational-quotes.git
   cd inspirational-quotes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Deployment

1. Build and run using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Or build and run the Docker image directly:
   ```bash
   docker build -t inspirational-quotes .
   docker run -p 3000:3000 -e GEMINI_API_KEY=your_gemini_api_key inspirational-quotes
   ```

3. The application will be available at [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env` file in the root directory with the following variables:
```
GEMINI_API_KEY=your_gemini_api_key
```

## Usage

1. **Generating Quotes**
   - Click the refresh button to get a new random quote
   - Select a tag to view quotes from specific categories
   - Use the carousel to browse multiple quotes

2. **Customizing Display**
   - The color scheme changes automatically with each quote
   - Font styles are applied based on the quote content
   - Layout adjusts automatically for different screen sizes

3. **Sharing Quotes**
   - Click the share button to generate a shareable image
   - The image includes the quote, author, and current styling
   - Share directly to social media or save locally

4. **Getting Explanations**
   - Click the "Explanation" button to get an AI-generated explanation
   - The explanation provides context and meaning for the quote
   - Each explanation is unique and tailored to the quote

## API Integration

The application uses the following APIs:
- [Quotable API](https://api.quotable.kurokeita.dev/) for quote generation
- Gemini API for quote explanations

## Technologies Used

- **Frontend**
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - HTML2Canvas for image generation

- **APIs**
  - Quotable API
  - Gemini API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Quotes provided by [Quotable API](https://api.quotable.kurokeita.dev/)
- AI explanations powered by Gemini
- Design inspiration from various sources
- Special thanks to all contributors

<!-- ## Contact

For any questions or suggestions, please reach out to [your-email@example.com](mailto:your-email@example.com) -->

