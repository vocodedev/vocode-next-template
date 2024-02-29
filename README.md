<a href="https://github.com/ArtisanLabs/vocode-next-vercel-template">
  <img alt="Next.js/Vercel Template with Vocode's FastAPI Python Backend" src="public/readme_hero.webp">
  <h1 align="center">Next.js/Vercel Template with Vocode's FastAPI Python Backend</h1>
</a>

<p align="center">
  The fastest way to build Voice AI application with 
  <a href="https://vocode.dev" target="_blank" rel="noopener noreferrer"> Vocode</a> and 
  <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer"> Next.js</a>
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FArtisanLabs%2Fvocode-next-vercel-template&env=OPENAI_API_KEY,DEEPGRAM_API_KEY,AZURE_SPEECH_KEY,AZURE_SPEECH_REGION"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-vocode-examples"><strong>More Examples</strong></a>
</p>
<br/>


## Introduction

This is a hybrid Next.js + Python application that uses Next.js for the frontend and FastAPI for the API backend. It is designed to build Voice AI applications with Vocode and Next.js. The backend is powered by FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints. This setup allows you to write Next.js apps that use Python AI libraries on the backend, providing a powerful tool for AI application development.

## Features

- Local Development: This template is configured to work seamlessly in a local environment, using Python as backend FastAPI.
- FastAPI Integration: The template establishes a connection between the Next.js frontend and the FastAPI Python backend.
- Vercel Deployment: While Vercel does not currently support WebSocket, this template can still be deployed on Vercel as a frontend application.

## How It Works

The Python/FastAPI server is integrated into the Next.js app under the `/api/` route.

This is achieved using `next.config.js` rewrites to map any request to `/api/:path*` to the FastAPI API, which is hosted in the `/api` folder.

On localhost, the rewrite will be made to the `127.0.0.1:8000` port, which is where the FastAPI server is running.

In production, the FastAPI server is hosted as Python serverless functions on Vercel.

The FastAPI backend uses the Vocode library to connect to AI providers like Text-to-Speech (TTS), Speech-to-Text (STT), and Language Model (LLM) via websockets. This allows for real-time, efficient communication between the application and the AI services, enabling the development of robust, interactive Voice AI applications.

# Deploy Your Own FrontEnd
You can clone & deploy it to Vercel with one click:

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FArtisanLabs%2Fvocode-next-vercel-template&env=OPENAI_API_KEY,DEEPGRAM_API_KEY,AZURE_SPEECH_KEY,AZURE_SPEECH_REGION">
    <img src="https://vercel.com/button" alt="Deploy with Vercel">
  </a>
</p>

# Developing Locally
You can clone & create this repo with the following command

```bash
npx create-next-app vocode-nextjs --example "https://github.com/ArtisanLabs/vocode-next-vercel-template"
```

Then, install the dependencies:

```bash
npm install
# or
yarn install
```

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Vocode Documentation](https://docs.vocode.dev/welcome) - learn about Vocode features and API.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - learn about FastAPI features and API.

You can check out [the Vocode Python GitHub repository](https://github.com/vocodedev/vocode-python) - your feedback and contributions are welcome!

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) and our [Code of Conduct](./CODE_OF_CONDUCT.md) for more information.

## License

This project is licensed under the [MIT License](./LICENSE).

## Contact

If you have any questions, feel free to open an issue or contact us directly at our [GitHub](https://github.com/vocodedev).
