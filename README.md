# aframe-workshop

[Examples](https://aframe-workshop.netlify.com)

This workshop will teach you how to create [A-Frame](https://aframe.io/) scenes to run on your phone and display Augmented Reality content using [AR.js](https://github.com/jeromeetienne/AR.js/blob/master/README.md) an [emscripten](https://en.wikipedia.org/wiki/Emscripten) port of [ARToolkit](https://github.com/artoolkit/artoolkit5)

## Prerequisites

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [vscode](https://code.visualstudio.com/) (or any text editor)
- [github account](https://github.com)
- [netlify account](https://netlify.com)
- [printed Hiro marker](https://upload.wikimedia.org/wikipedia/commons/4/48/Hiro_marker_ARjs.png)
- [printed Aruco markers](http://chev.me/arucogen/) (use dictionary: 4x4, marker ids: 0 and 1, marker size: 100mm)

## Setup

In the following exercises you will follow along with the workshop instructor to create a series of web pages that allow you to view 3D content displayed over printed AR markers using your smartphone.

We will be using https://netlify.com to serve these web pages from a github repository. Netlify supports SSL (https) by default, which is necessary for accessing your phone's camera.

First create a github repository called `asyncjs-aframe-workshop` and clone it to your laptop.

Now login to netlify.com and select `New site from Git`.

Choose `GitHub`.

Search for `asyncjs-aframe-workshop` and select it.

Click `Deploy site` using the default presets.

You will be directed to an overview page. Your site will have been given an auto-generated name e.g. https://dazzling-yalow-d3b2a0.netlify.com

Click this link to view your site. You will see a `Page not found` message. This is because we haven't pushed anything to our connected GitHub repo yet.

In your cloned repo, create a new file called `index.html` and type `Hello world` as the content.

Add `index.html` to git, commit, and push it.

    git add index.html
    git commit -m "initial commit"
    git push origin master

Wait a few moments then refresh your netlify page. You should see `Hello world`. You now have everything you need to develop your web pages!

All exercises have examples here: https://github.com/edsilv/aframe-workshop/tree/master/ar

[A-Frame documentation](https://aframe.io/docs/0.9.0/introduction/)

[AR.js documentation](https://github.com/jeromeetienne/AR.js-docs)

## Exercises

<details>
<summary>1. Cube</summary>

Create a `cube.html` page. Use this "boilerplate" code:

```html
<html>
  <head>
    <title>A-Frame Workshop</title>
    <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
    <script src="https://unpkg.com/ar.js@1.7.1/aframe/build/aframe-ar.min.js"></script>
  </head>

  <body style="margin: 0px; overflow: hidden;">
    <a-scene embedded arjs="sourceType: webcam;">
    </a-scene>
  </body>
</html>
```

**Goals**

- Display a 3D cube above the printed Hiro marker
- Change the default size, position, rotation, and color of the cube


</details>

<details>
<summary>2. GLTF</summary>

Save your `cube.html` as a new `gltf.html` page, removing your cube from the scene.

**Goals**

- Load a gltf model above the Hiro marker, e.g. https://nomad-project.co.uk/objects/collection/headrest/_headrest/headrest.gltf
- Animate the rotation of the model about the Y (up) axis
- Use `<a-assets>` to preload your gltf
- Use `debugUIEnabled: false;` to remove debug message overlays
- Use `vr-mode-ui="enabled: false"` to remove VR goggles toggle (not needed)
- Use `renderer="colorManagement: true;"` to enable colour management (otherwise gltfs don't display correctly)
- Use `loading-screen="dotsColor: white; backgroundColor: black"` to create a customised loading screen

</details>

<details>
<summary>3. Custom Marker</summary>

Save your `gltf.html` page as a new `custom-marker.html` page, removing your gltf entity and `a-marker-camera` from the scene.

**Goals**

- Upload `assets/markers/upload/0.png` to create a custom marker here: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
- Download the generated .patt file and add to `assets/markers`
- Use this custom marker in your scene instead of the Hiro marker preset

**Notes**

- Set AR.js `patternRatio: 0.66;`: Aesthetically, it's preferable for the black border to match the Aruco grid pattern. `patternRatio: 0.66;` is needed as the marker ratio isn't 50%. A "Pattern Ratio 0.6" in the marker generator means that the pattern within the marker makes up 60% of the overall marker width (including border). For a 4x4 aruco the pattern ratio is 4/6 (4 grid items plus 2 sides of border). For a 5x5 it's 5/7 (5 grid items plus two sides of border), etc.
- Use `<a-entity camera></a-entity>`
- Models must be placed inside the `a-marker` tags
- Better to use simple shapes for markers
- Markers must not have rotational symmetry
- Black borders seem to work best
- Thicker borders are better for stability
- Markers can be as small as 1.5/2cm but it means that the phone has to be held close

</details>

<details>
<summary>4. Multiple Markers</summary>

Save your `custom-marker.html` page as a new `multiple-markers.html` page.

**Goals**

- Upload `assets/markers/upload/1.png` to create a custom marker here: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
- Use this second custom marker in your scene to display https://nomad-project.co.uk/objects/collection/gourd/_gourd/gourd.gltf
- Create a `rotating` mixin instead of duplicating the animation attribute.

</details>