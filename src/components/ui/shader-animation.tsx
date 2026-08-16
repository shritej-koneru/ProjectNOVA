"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || isMobile()) return

    const container = containerRef.current

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      const vec3 cerulean = vec3(0.0, 0.475, 0.569);
      const vec3 seagrass = vec3(0.263, 0.604, 0.525);
      const vec3 gold     = vec3(0.914, 0.851, 0.522);
      const vec3 indigo   = vec3(0.133, 0.180, 0.314);

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;

        float r = 0.0, g = 0.0, b = 0.0;
        for(int i = 0; i < 5; i++){
          float v = lineWidth * float(i*i) / abs(
            fract(t + float(i)*0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2)
          );
          r += v;
        }
        for(int i = 0; i < 5; i++){
          float v = lineWidth * float(i*i) / abs(
            fract(t - 0.01 + float(i)*0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2)
          );
          g += v;
        }
        for(int i = 0; i < 5; i++){
          float v = lineWidth * float(i*i) / abs(
            fract(t - 0.02 + float(i)*0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2)
          );
          b += v;
        }

        vec3 color = cerulean * r + seagrass * g + gold * b + indigo * 0.15;

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'low-power',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))

    container.appendChild(renderer.domElement)

    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      if (width === 0 || height === 0) return
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    let animationId = 0
    let running = true

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      if (!running) return
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }

    animationId = requestAnimationFrame(animate)

    const observer = new IntersectionObserver(
      (entries) => {
        running = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0 }
    )
    observer.observe(container)

    return () => {
      window.removeEventListener("resize", onWindowResize)
      cancelAnimationFrame(animationId)
      observer.disconnect()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{
        background: isMobile()
          ? "radial-gradient(ellipse at center, #0466c8 0%, #001845 40%, #222E50 100%)"
          : "#222E50",
        overflow: "hidden",
      }}
    />
  )
}
