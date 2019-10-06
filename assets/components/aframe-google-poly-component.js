AFRAME.registerSystem('google-poly', {
  schema: {
    api_key: {
      type: 'string',
    }
  },
  loadAsset: function (id, scale, el) {
    var API_KEY = this.data.api_key;
    var url = `https://poly.googleapis.com/v1/assets/${id}/?key=${API_KEY}`;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.addEventListener('load', function (event) {
      var asset = JSON.parse(event.target.response);
      var modelFormat = 'GLTF2';
      var model3d = function (modelType) {
        var polyAsset = asset.formats.find(format => {
          return format.formatType === modelType;
        });
        return polyAsset;
      };
      var loadOBJ = function (format) {
        var obj = format.root;
        var mtl = format.resources.find(resource => {
          return resource.url.endsWith('mtl')
        });
        var path = obj.url.slice(0, obj.url.indexOf(obj.relativePath));
        var loader = new THREE.MTLLoader();
        loader.setCrossOrigin(true);
        loader.setMaterialOptions({
          ignoreZeroRGBs: true
        });
        loader.setTexturePath(path);
        loader.load(mtl.url, function (materials) {
          var loader = new THREE.OBJLoader();
          loader.setMaterials(materials);
          loader.load(obj.url, function (object) {
            var box = new THREE.Box3();
            box.setFromObject(object);
            var center = box.getCenter();
            center.y = box.min.y;
            object.position.sub(center);
            var scaler = new THREE.Group();
            scaler.add(object);
            el.setObject3D('asset', scaler);
          });
        });
      }
      var loadGLTF = function (format) {
        var obj = format.root;
        var loader = new THREE.GLTFLoader();
        loader.setCrossOrigin(true);
        loader.load(obj.url,
          function (gltf) {
            var mroot = gltf.scene;
            var bbox = new THREE.Box3().setFromObject(mroot);
            var cent = bbox.getCenter(new THREE.Vector3());
            var size = bbox.getSize(new THREE.Vector3());

            // Rescale the object to normalized space
            var maxAxis = Math.max(size.x, size.y, size.z);
            mroot.scale.multiplyScalar(1.0 / maxAxis);
            bbox.setFromObject(mroot);
            bbox.getCenter(cent);
            bbox.getSize(size);

            // Reposition
            mroot.position.copy(cent).multiplyScalar(-1);
            el.setObject3D('mesh', mroot);
          },
          function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (error) {
            console.error(error);
          }
        );
      }
      if (model3d('GLTF2') == undefined) {
        console.warn('Cannot load model as GLTF. Attempting to load OBJ');
        if (model3d('OBJ') == undefined) {
          console.error('Only GLTF and OBJ are supported at this time');
        } else {
          var gpolyasset = model3d('OBJ')
          loadOBJ(gpolyasset);
        }
      } else {
        var gpolyasset = model3d('GLTF2')
        loadGLTF(gpolyasset);
      }
    });
    request.send(null);
  },
  init: function () {}
})
AFRAME.registerComponent('google-poly', {
  schema: {
    src: {
      type: 'string',
      default: '5vbJ5vildOq'
    }
  },
  init: function () {
    var comp = this,
      el = this.el,
      data = this.data,
      system = this.system;
    system.loadAsset(data.src, data.scale, el);
  }
})
AFRAME.registerPrimitive('a-google-poly', {
  defaultComponents: {
    'position': {
      x: 0,
      y: 0,
      z: 0
    },
    'scale': {
      x: 1,
      y: 1,
      z: 1
    },
    'g-poly': {}
  },
  mappings: {
    'src': 'google-poly.src',
  }
})