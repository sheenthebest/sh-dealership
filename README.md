# FiveM Vehicle Dealership

This project is a Work in Progress.

## Showcase
![Screenshot](https://github.com/sheenthebest/sh-dealership/blob/main/screen.jpg?raw=true)
![Screenshot](https://github.com/sheenthebest/sh-dealership/blob/main/screen2.jpg?raw=true)

## Overview

This repository contains the UI for a FiveM script where players can purchase vehicles. The UI is built using HTML, CSS, and JavaScript, providing a smooth and interactive experience for the users.

## Features

- **Categories:** Vehicles are sorted into various categories such as Super, Muscle, Sports, Motorcycles, Off-road, SUV, Sedans, and Compacts.
- **Vehicle Details:** Players can view details such as name, model, price, and image of each vehicle.
- **Search and Filters:** Players can search for specific vehicles and apply filters to sort them by price, name, etc.
- **Vehicle Purchase:** A modal window allows players to configure their vehicle (color, engine, suspension, turbo) before confirming the purchase.

## Configuration

The `config.js` file contains the configuration for vehicle categories and details. Here's an example entry:

```javascript
const categories = [
    { name: 'Super', image: 'super' },
    { name: 'Muscle', image: 'muscle' },
    { name: 'Sports', image: 'sports' },
    { name: 'Motorcycles', image: 'motorcycles' },
    { name: 'Off-road', image: 'offroad' },
    { name: 'SUV', image: 'suv' },
    { name: 'Sedans', image: 'sedans' },
    { name: 'Compacts', image: 'compacts' },
];

const cars = [
    { name: 'Adder', model: 'adder', category: 'Super', price: 1000000, image: 'adder' },
    // More vehicle entries...
];
