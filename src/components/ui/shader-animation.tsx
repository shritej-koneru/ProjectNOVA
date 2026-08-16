"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = (((h % 360) + 360) % 360) / 360;
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h * 12) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

function readVar(name: string): [number, number, number] {
  const root = document.documentElement;
  let raw = root.style.getPropertyValue(name).trim();
  if (!raw) raw = getComputedStyle(root).getPropertyValue(name).trim();
  const [h, s, l] = raw.split(/\s+/).map(parseFloat);
  if (![h, s, l].every(Number.isFinite)) return [0, 0, 0];
  return hslToRgb(h, s, l);
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
      uniform vec3 uPrimary;
      uniform vec3 uSecondary;
      uniform vec3 uAccent;
      uniform vec3 uBackground;

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

        vec3 color = uPrimary * r + uSecondary * g + uAccent * b + uBackground * 0.15;

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
      uPrimary: { value: new THREE.Vector3() },
      uSecondary: { value: new THREE.Vector3() },
      uAccent: { value: new THREE.Vector3() },
      uBackground: { value: new THREE.Vector3() },
    }

    const applyPaletteColors = () => {
      const setVec = (name: 'uPrimary' | 'uSecondary' | 'uAccent' | 'uBackground', value: [number, number, number]) => {
        uniforms[name].value.set(value[0], value[1], value[2]);
      };
      setVec('uPrimary', readVar('--primary'));
      setVec('uSecondary', readVar('--secondary'));
      setVec('uAccent', readVar('--accent'));
      setVec('uBackground', readVar('--background'));
    }

    applyPaletteColors()

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
    let lastPaletteRead = 0

    const animate = (now: number) => {
      animationId = requestAnimationFrame(animate)
      if (!running) return
      if (now - lastPaletteRead > 100) {
        lastPaletteRead = now
        applyPaletteColors()
      }
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
          ? "radial-gradient(ellipse at center, hsl(var(--primary)) 0%, hsl(var(--background)) 40%, hsl(var(--surface)) 100%)"
          : "hsl(var(--background))",
        overflow: "hidden",
      }}
    />
  )
}
