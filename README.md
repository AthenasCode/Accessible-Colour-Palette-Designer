# Accessible Colour Palette Designer

## About

As the title suggests, this is a tool intended to help designers and web developers create colour palettes that follow the [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum) for colour contrast.

Users should be able to choose colours to include in their palette by either inputting a hex code or using a colour picker. They can also include black or white by checking the relevant checkboxes.

Colour contrast between each possible combination is then automatically calculated and the combinations are displayed for the following categories: AAA, AA, and Low Contrast.

This allows users to experiment with colour choices until they find a palette that provides suitably accessible colours.

This was heavily inspired by [a11y Rocks](http://a11yrocks.com/colorPalette); however, I wanted a tool that would allow me to select colours with a picker and see the contrast options update in real time. 

Below are some other resources I've found helpful for generating colour palettes:

* [Adobe Color](https://color.adobe.com/create/color-wheel)
* [Canva Color Wheel](https://www.canva.com/colors/color-wheel/)
* [Coolors](https://coolors.co/463f3a-8a817c-bcb8b1-f4f3ee-e0afa0)
* [Encycolorpedia](https://encycolorpedia.com/eb667d)
* [Accessible Palette](https://accessiblepalette.com/) and a [great resource for understanding colour theory](https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems)

## Tech

Built with Next.js, TypeScript, and CSS Modules. I chose Next because it's the framework I was most familiar with after learning React. I had not used much TypeScript before starting this project, so I've used it here to learn.

## Components

Note: I found the way I structured this app quite confusing. I've tried to summarise the purpose of each component below. Ideally I would go back and consider a different structure, such as using Redux to avoid so much prop drilling.

### ChosenColor

A simple square for displaying a user's chosen color for any given color in the palette.

### ColorPalette

A set of six colors are displayed to the user (each as a ChosenColor component). The user can update any of the colors via the ColorPicker component which will trigger a useEffect, in which the contrasts between each color in the palette are calculated.

This produces an array of paired colors with their respective contrasts, and this array is then filtered to create three arrays: AAA, AA, and Low contrast pairings. 

These three arrays are passed up to the Home component where the pairings are stored such that the CombinationsSection and therefore Combinations components can access them.

### ColorPicker

Includes a form in which the user can input their preferred color as hex, or select one with a Sketch from [react-color](https://uiwjs.github.io/react-color/). Updating this triggers the calculation as above.

### CombinationsSection

A section for displaying AAA, AA, and Low contrast Combinations.

### Combinations

Displays each color contrast pairing for a given contrast array (AAA, AA, or Low) as ColorCombo components.

### ColorCombo

Displays a given color pairing and its contrast.


