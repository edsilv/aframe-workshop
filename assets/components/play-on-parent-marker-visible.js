AFRAME.registerSystem('play-on-parent-marker-visible', {
    init: function () {
      this.entities = [];
    },
    register: function (el) {
      this.entities.push(el);

      el.addEventListener('loaded', function (evt) {
        el.sound = evt.target.components.sound;
      });
    },  
    unregister: function (el) {
      var index = this.entities.indexOf(el);
      this.entities.splice(index, 1);
    },
    tick: function () {
      this.entities.forEach(function (el) {
        var marker = el.parentEl;

        if (el.sound.loaded) {
          if (marker.object3D.visible) {
              if (!el.sound.isPlaying) {
                  el.sound.playSound();
              }                                
          } else {
              el.sound.pauseSound();
          }
        }
      });
    }
  })
  AFRAME.registerComponent('play-on-parent-marker-visible', {
    init: function () {
      this.system.register(this.el);
    },
    remove: function () {
      this.system.unregister(this.el);
    }
  })