AFRAME.registerComponent('resize', {
    schema: {
      axis: {
        type: 'string',
        default: 'x'
      },
      value: {
        type: 'number',
        default: 1
      }
    },
    init: function() {
      var el = this.el;
      var data = this.data;
      var model = el.object3D;
      el.addEventListener('model-loaded', function(e) {
        var box = new THREE.Box3().setFromObject(model);
        var size = box.getSize();
        var x = size.x;
        var y = size.y;
        var z = size.z;
        if(data.axis === 'x') {
          var scale = data.value / x;
        }
        else if(data.axis === 'y') {
          var scale = data.value / y;
        }
        else {
          var scale = data.value / z;
        }
        el.setAttribute('scale', scale + ' ' + scale + ' ' + scale);
      });
    }
  });