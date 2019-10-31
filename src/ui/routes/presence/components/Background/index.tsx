import * as React from 'react'
import Particles from 'react-particles-js';

export default () => {
  return (
    <Particles
      params={{
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 900
            }
          },
          color: {
            value: '#a8ff3e'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 2,
              color: '#a8ff3e'
            },
            polygon: {
              nb_sides: 8
            },
            image: {
              src: '',
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 1,
            random: false,
            anim: {
              enable: false,
              speed: 2,
              opacity_min: 0,
              sync: false
            }
          },
          size: {
            value: 2,
            random: false,
            anim: {
              enable: false,
              speed: 20,
              size_min: 0,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 100,
            color: '#a8ff3e',
            opacity: 1,
            width: 2
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 3000,
              rotateY: 3000
            }
          },
        }

      }}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -999
      }} />
  )
}