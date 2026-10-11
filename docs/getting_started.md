# Getting Started

## Overview

Local LLM is an on-device AI app designed to run large language models fully offline on mobile devices.

### Available Models
Local LLM supports popular open-weight SLMs and LLMs:

- Qwen 2.5 & Qwen 2
- Google Gemma
- Meta Llama
- DeepSeek
- Microsoft Phi
- SmolLM
- Mistral

Models need to be downloaded before use. You can download and use these models directly from the app or add any other GGUF models from Hugging Face!

## Using Local LLM

### Downloading a Model

- Tap the menu (☰)
- Navigate to the “Models” page
- Choose your desired model and hit download

### Loading a Model
After downloading, tap *Load* to bring the model into memory. Now you’re ready to chat!

### Hardware Acceleration
- On iOS devices, Apple’s GPU API (Metal) is used.
- On Android devices, OpenCL GPU offloading and multi-core CPU threading are supported.

#### Auto Offload/Load
To keep the device running smoothly, Local LLM can automatically manage memory usage:

- Enable “Auto Offload/Load” on the model page
- The app will offload the model when in the background
- It will reload when you return

### Chatting
Once your model is loaded, head to the “Chat” page and start conversing with the loaded model completely offline!

## Feedback
If you have suggestions for new models or features, please submit feedback in-app or open an issue on GitHub.