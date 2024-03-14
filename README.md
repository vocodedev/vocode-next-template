<a href="https://github.com/vocodedev/vocode-next-template">
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
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvocodedev%2Fvocode-next-template&demo-title=Next.js%2FVercel%20Template%20with%20Vocode's&demo-description=The%20fastest%20way%20to%20build%20Voice%20AI%20application%20with%20Vocode%20and%20Next.js&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fvocodedev%2Fvocode-next-template%2Fmain%2Fpublic%2Freadme_hero.webp"><strong>Deploy to Vercel</strong></a> ·
  <a href="#developing-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a> ·
  <a href="#learn-more"><strong>Learn More</strong></a>
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

# Prerequisites

## Prerequisites

Before you can run this application, you need to have the following installed:

- [Node.js and npm](https://nodejs.org/en/download/)
- [Python](https://www.python.org/downloads/) (version 3.9 or higher)
- [Poetry](https://python-poetry.org/docs/#installation)
- [OpenSSL 1.1.1](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/quickstarts/setup-platform?tabs=linux%2Cubuntu%2Cdotnetcli%2Cdotnet%2Cjre%2Cmaven%2Cnodejs%2Cmac%2Cpypi&pivots=programming-language-python) (required for Azure)
- [FFmpeg](https://ffmpeg.org/download.html)

Please follow the links to download and install each prerequisite.


# Deploy Your Own FrontEnd
You can clone & deploy it to Vercel with one click:

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvocodedev%2Fvocode-next-template&demo-title=Next.js%2FVercel%20Template%20with%20Vocode's&demo-description=The%20fastest%20way%20to%20build%20Voice%20AI%20application%20with%20Vocode%20and%20Next.js&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fvocodedev%2Fvocode-next-template%2Fmain%2Fpublic%2Freadme_hero.webp">
    <img src="https://vercel.com/button" alt="Deploy with Vercel">
  </a>
</p>

# Developing Locally
You can clone & create this repo with the following command

```bash
npx create-next-app vocode-nextjs --example "https://github.com/vocodedev/vocode-next-template"
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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the file. Please note that this has been extensively tested with the latest versions of Chrome. For other browsers, if you encounter any issues, please create a GitHub issue in this repository: [https://github.com/vocodedev/vocode-react-sdk](https://github.com/vocodedev/vocode-react-sdk).

## Docker all-in-one

### Build
```bash
docker build --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
             --build-arg VCS_REF=$(git rev-parse --short HEAD) \
             --build-arg VERSION=0.1.111 \
             -t vocode/vocode:0.1.111 .

```
### Run docker

```
docker run --rm --env-file .env -p 3000:3000 vocode/vocode:0.1.111
```

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
