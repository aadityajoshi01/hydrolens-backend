HydroLens – Intelligent Water Monitoring App

Overview
HydroLens is a real-time water quality monitoring application designed for smart city infrastructure. It monitors critical parameters like Total Dissolved Solids (TDS) and Turbidity (NTU) to ensure water safety and detect anomalies such as contamination or pipeline issues.

The app is built using Flutter and uses a hybrid architecture combining a web-based dashboard with native mobile processing.

Features

Real-time monitoring of TDS, Turbidity (NTU), and Voltage
Predictive analysis using edge logic (trend-based alerts)
Interactive city map with zone-based monitoring
Historical data visualization using charts
Demo mode for testing without IoT hardware
Mobile-optimized UI with dark theme

Architecture

HydroLens uses a hybrid system:

Frontend: HTML, CSS, JavaScript dashboard rendered via Flutter WebView
Backend: Firebase Realtime Database for live IoT data
Edge Processing: Dart logic in Flutter for fast, offline-capable analysis

Technology Stack

Flutter (Dart)
WebView Flutter
HTML, CSS, JavaScript
Chart.js
Firebase Realtime Database
IoT Sensors (ESP32 / Arduino)

APK Installation

Download the APK from the Releases section
Transfer it to your Android device
Enable “Install from Unknown Sources”
Install and open the app

Usage

Connect IoT sensors to Firebase to stream live data
Open the app to view real-time dashboard
Use Demo Mode for testing without hardware
Monitor alerts and trends directly on the app

Future Improvements

Machine Learning based prediction models
Push notifications for alerts
Multi-city support
Cloud analytics integration

Developer

Aaditya Joshi
Computer Engineering Student
