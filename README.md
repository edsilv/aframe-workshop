# aframe-workshop

(work in progress)

[Examples](https://aframe-workshop.netlify.com)

This workshop will teach you how to create [A-Frame](https://aframe.io/) scenes to run on your phone and display Augmented Reality content using [AR.js](https://github.com/jeromeetienne/AR.js/blob/master/README.md)

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

## GLTF

Show a gltf model above the Hiro marker

Animate the rotation of the model about the Y (up) axis

`debugUIEnabled: false;` to remove debug messages overlays

`vr-mode-ui="enabled: false"` to remove VR goggles toggle (not needed)

`renderer="colorManagement: true;"` needed for gltfs (try without)

`loading-screen="dotsColor: white; backgroundColor: black"` loading screen shows while preloading `<a-assets>`

## Custom markers

Print this [Aruco marker](http://chev.me/arucogen/)

Upload an image to create a custom marker here: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

Better to use simple shapes

Can use Arucogen to generate generic images without rotational symmetry: http://chev.me/arucogen/

`patternRatio: 0.66;` needed as the marker ratio isn't 50%. A "Pattern Ratio 0.6" in the marker generator means that the pattern within the marker makes up 60% of the overall marker width (including border). For a 4x4 aruco the pattern ratio is 4/6. For a 5x5 it's 5/7 etc.

Should be a black border.

Thicker borders are better for stability.

Markers can be as small as 1.5/2cm but means that the phone has to be held close.

Models must be placed inside the `a-marker` tags.

Need to include a `<a-entity camera></a-entity>`

## Multiple markers

Use `rotating` mixin instead of duplicating attribute.

## Animating GLTFs

