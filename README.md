# aframe-workshop

This workshop will teach you how to create a simple [A-Frame](https://aframe.io/) scene to run on your phone and display Augmented Reality content using [AR.js](https://github.com/jeromeetienne/AR.js/blob/master/README.md)

## Prerequisites

    - [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    - [node](https://nodejs.org) (not strictly necessary - use whatever technique works for you to serve a site on localhost)
    - [vscode](https://code.visualstudio.com/) (or any text editor)
    - [netlify account](https://netlify.com)
    - [printed Hiro marker](https://upload.wikimedia.org/wikipedia/commons/4/48/Hiro_marker_ARjs.png)

## Setup

Install `http-server` to run examples locally:

    npm i http-server -g

## Cube

Show a cube above the Hiro marker
Change the size, position, rotation, color of the cube

## Gltf

Show a gltf model above the Hiro marker
Animate the rotation of the model about the Y (up) axis

`debugUIEnabled: false;` to remove debug messages overlays
`vr-mode-ui="enabled: false"` to remove VR goggles toggle (not needed)
`renderer="colorManagement: true;"` needed for gltfs (try without)
`loading-screen="dotsColor: white; backgroundColor: black"` loading screen shows while preloading `<a-assets>`

## Custom markers

Upload an image to create a custom marker here: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
Can use Arucogen to generate images without rotational symmetry: http://chev.me/arucogen/

Replace Hiro marker with custom marker

`patternRatio: 0.6;` needed as the marker ratio isn't 50%. "Pattern Ratio 0.6" in marker generator means that the pattern within the marker makes up 60% of the overall marker width (including border).

Should be a black border.

Thicker borders are better for stability.

Markers can be as small as 1.5/2cm but means that the phone has to be held close.

Models must be placed inside the `a-marker` tags.

Need to include a `<a-entity camera></a-entity>`

## Multiple markers


## Triggering animations

