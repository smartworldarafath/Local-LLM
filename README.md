<div align="center">

<img src="assets/images and logos/PocketPal-512x512.png" alt="Local LLM logo" width="120" />

# Local LLM

**A private, offline AI assistant running entirely on your mobile device.**

Chat with cutting-edge open-weight LLMs, customize your experience, and stay in total control of your data — completely on-device. No subscriptions, no cloud tracking, and zero internet required.

<br/>

[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://github.com/smartworldarafath/Local-LLM/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green.svg)](#)
[![Developer](https://img.shields.io/badge/Developer-Arafath%20Rahman-purple.svg)](mailto:arafathrahman711@gmail.com)

</div>

---

## 🌟 What is Local LLM?

Most AI apps today stream every message, prompt, and private idea to remote cloud servers where they are logged, processed, and monetized. **Local LLM** puts you back in the driver's seat:

- **🔒 100% Private by Design** — All prompts, inferences, and chat histories are processed directly on your phone's processor. Nothing ever leaves your device without your explicit action.
- **✈️ Fully Offline Execution** — Download your preferred models once and run them anywhere: on a flight, in remote areas, or completely off-grid.
- **⚡ Hardware Acceleration** — Utilizes device CPU multithreading and GPU offloading (OpenCL / Adreno on Android, Metal on iOS) for smooth token generation.
- **🎨 Personalized & Customizable** — Choose your preferred theme palette, customize AI personas, and adapt UI languages to your style.
- **🆓 Free & Open Source** — No ads, no hidden paywalls, and built openly under the permissive MIT license.

---

## 🚀 Key Features in v1.2.0

- **🤖 Diverse Model Architecture Support**: Quick-access filters and seamless downloads for leading model families:
  - **Qwen** (Qwen 2.5 / Qwen 2)
  - **Gemma** (Google DeepMind)
  - **Meta Llama** (Llama 3.1 / 3.2)
  - **DeepSeek** (DeepSeek-R1 / V2)
  - **Microsoft Phi** (Phi 3.5 / Phi 4)
  - **SmolLM** (Hugging Face TB)
  - **Mistral** (Mistral NeMo & 7B)
- **🎨 Dynamic Appearance Theming**: Personalize the app UI with five curated aesthetic palette presets (`#CDC5B4`, `#85756E`, `#95BB9E`, `#B8A5D6`, `#9397CC`) plus a one-tap **Reset** button.
- **⚙️ Granular Hardware Controls**: Fine-tune CPU thread allocation and adjust GPU layer offload sliders (0–99) to optimize battery life and tokens/sec.
- **📱 Realistic Device Benchmark Mockup**: Visualized device inspection featuring a Samsung "About Phone" style hardware overview card showing chipset, core topology, RAM, and OS status.
- **👤 'My Profile' Management**:
  - Customizable profile picture (presets, custom, or reset).
  - Profile name and optional email configuration.
  - Dual data storage strategy (**Sign-in** or **Local Storage**).
  - Flexible chat history persistence toggling (**Local** vs **Don't Save**).
- **💬 Telegram Feedback Loop**: Integrated feedback form that securely transmits user feedback and feature requests to the developer Telegram bot.
- **🌐 Multilingual Localization**: Dynamic in-app language switching with English as default.
- **🎭 AI Pixo Personas**: Evolved personality and persona framework ready for the upcoming v1.3 release.

---

## 🛠️ Tech Stack & Architecture

Local LLM is built with a high-performance cross-platform stack:

| Component | Technology |
| --- | --- |
| **Framework** | [React Native](https://reactnative.dev/) (New Architecture, Fabric & TurboModules) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Inference Engine** | [llama.cpp](https://github.com/ggerganov/llama.cpp) via [`llama.rn`](https://github.com/mybigday/llama.rn) (GGUF Quantization) |
| **Hardware Backends** | CPU multi-core, OpenCL (Android Adreno), Metal (iOS) |
| **State Management** | [MobX](https://mobx.js.org/) + `mobx-persist-store` |
| **Local Storage** | WatermelonDB & AsyncStorage |
| **UI Components** | React Native Paper & Vector Icons |

---

## 📥 Getting Started & Building from Source

### Prerequisites
- Node.js (v18+) & Yarn
- Android Studio / Android SDK (API 34+) & NDK (`27.3.13750724`)
- CMake (`3.22.1+`)
- Java 21 JDK

### 1. Clone the Repository
```bash
git clone https://github.com/smartworldarafath/Local-LLM.git
cd Local-LLM
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Run the App

#### Android
```bash
yarn android
```

#### Build Release APK
```bash
cd android
./gradlew assembleRelease
```
The output APK will be generated at `android/app/build/outputs/apk/prod/release/app-prod-release.apk`.

---

## 👨‍💻 Developer & Contact

- **Developer**: Arafath Rahman
- **Email**: [arafathrahman711@gmail.com](mailto:arafathrahman711@gmail.com)
- **GitHub**: [@smartworldarafath](https://github.com/smartworldarafath)
- **Repository**: [https://github.com/smartworldarafath/Local-LLM](https://github.com/smartworldarafath/Local-LLM)

---

## ❤️ Support & Sponsorship

If you find Local LLM helpful and want to support continued development:
- **Buy Me a Coffee**: [https://buymeacoffee.com/arafathrahman](https://buymeacoffee.com/arafathrahman)
- **SupportKori**: [https://www.supportkori.com/arafathrahman](https://www.supportkori.com/arafathrahman)
- **Payoneer / Direct Sponsorship**: Contact via [arafathrahman710@gmail.com](mailto:arafathrahman710@gmail.com?subject=Payoneer%20or%20Direct%20Sponsorship)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
