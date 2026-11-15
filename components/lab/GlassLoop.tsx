"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero visual: the Hey Coco! "C" badge as a glossy 3D coin, orbited by a glass ring and colour beads.
 * Texture: /public/brand/logo-1024.webp (from the logo file). Falls back to the flat logo when
 * WebGL is unavailable; reduced motion renders one still frame.
 */
export default function GlassLoop() {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let stop = () => {};
    let cancelled = false;

    (async () => {
      try {
        const THREE = await import("three");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // Load the texture before touching the DOM, so a cancelled (StrictMode) run leaves nothing behind.
        const tex = await new THREE.TextureLoader().loadAsync("/brand/logo-1024.webp");
        if (cancelled) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setClearColor(0x000000, 0); // transparent: the hero video/montage shows behind the badge
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.NoToneMapping;
        el.appendChild(renderer.domElement);
        renderer.domElement.style.cssText = "display:block;width:100%;height:100%";

        const scene = new THREE.Scene();
        // no scene.background: keep the canvas transparent

        // Studio environment: strip lights give the coin and glass crisp highlights.
        const env = new THREE.Scene();
        env.add(new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshBasicMaterial({ color: 0x8a948f, side: THREE.BackSide })));
        const panel = (w: number, h: number, x: number, y: number, z: number, rx: number, ry: number, c: [number, number, number]) => {
          const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c[0], c[1], c[2]), side: THREE.DoubleSide }));
          m.position.set(x, y, z);
          m.rotation.set(rx, ry, 0);
          env.add(m);
        };
        panel(18, 3, 0, 9, 2, Math.PI / 2, 0, [9, 9, 9]);
        panel(2.2, 16, -9, 0, 2, 0, Math.PI / 2, [8, 8, 8]);
        panel(2.2, 16, 9, 1, -1, 0, -Math.PI / 2, [7, 7, 7]);
        panel(10, 2, 0, -8, 4, -Math.PI / 2.4, 0, [4, 4, 4]);
        panel(3, 3, 6, -4, 6, 0, -0.5, [8, 3.2, 1.2]);
        const pmrem = new THREE.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(env, 0.02).texture;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();


        // Coin: a circle extruded with a rounded bevel. Front/back use the logo, the rim is the logo's pink.
        const R = 2.2;
        const BEVEL = 0.1;
        const shape = new THREE.Shape();
        shape.absarc(0, 0, R, 0, Math.PI * 2, false);
        const coinGeo = new THREE.ExtrudeGeometry(shape, {
          depth: 0.34,
          bevelEnabled: true,
          bevelThickness: BEVEL,
          bevelSize: BEVEL,
          bevelSegments: 8,
          curveSegments: 128,
        });
        coinGeo.center();
        const span = 2 * (R + BEVEL);
        tex.repeat.set(1 / span, 1 / span);
        tex.offset.set(0.5, 0.5);
        // Self-lit face (emissive map) keeps the logo colours true; clearcoat still gives it a glossy sticker shine.
        const faceMat = new THREE.MeshPhysicalMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.7, roughness: 0.4, clearcoat: 1, clearcoatRoughness: 0.14, envMapIntensity: 0.4 });
        const rimMat = new THREE.MeshPhysicalMaterial({ color: 0xf2a3a9, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.1 });
        const coin = new THREE.Mesh(coinGeo, [faceMat, rimMat]);

        // Glass ring + colour beads orbiting the coin.
        const ringGeo = new THREE.TorusGeometry(3.35, 0.2, 48, 220);
        const glass = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transmission: 1,
          thickness: 1.4,
          roughness: 0,
          ior: 1.45,
          clearcoat: 1,
          envMapIntensity: 1.2,
          attenuationColor: new THREE.Color(0xfdeedd),
          attenuationDistance: 3,
          iridescence: 0.5,
        });
        const ring = new THREE.Mesh(ringGeo, glass);
        const beadGeo = new THREE.SphereGeometry(0.3, 48, 48);
        const beadMats: InstanceType<typeof THREE.MeshPhysicalMaterial>[] = [];
        const bead = (c: number, a: number) => {
          const mat = new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.18, clearcoat: 1, envMapIntensity: 1 });
          beadMats.push(mat);
          const m = new THREE.Mesh(beadGeo, mat);
          m.position.set(Math.cos(a) * 3.35, Math.sin(a) * 3.35, 0);
          return m;
        };
        const orbit = new THREE.Group();
        orbit.add(ring, bead(0xf6b124, 0.6), bead(0xec6530, 2.7), bead(0xf2a3a9, 4.6));
        orbit.rotation.set(1.1, 0.35, 0);

        const group = new THREE.Group();
        group.add(coin, orbit);
        scene.add(group);

        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        camera.position.set(0, 0, 13);

        const size = () => {
          const w = el.clientWidth || 600;
          const h = el.clientHeight || 600;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          group.scale.setScalar(w < 520 ? 0.72 : 1);
        };
        size();
        const ro = new ResizeObserver(size);
        ro.observe(el);

        let mx = 0;
        let my = 0;
        const onMove = (e: PointerEvent) => {
          mx = (e.clientX / window.innerWidth - 0.5) * 2;
          my = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        let visible = true;
        const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
        io.observe(el);

        let raf = 0;
        const t0 = performance.now();
        const frame = (now: number) => {
          raf = requestAnimationFrame(frame);
          if (!visible || document.hidden) return;
          const t = (now - t0) / 1000;
          group.rotation.y = Math.sin(t * 0.6) * 0.5 + mx * 0.3;
          group.rotation.x = Math.sin(t * 0.45) * 0.1 + my * 0.14;
          group.position.y = Math.sin(t * 0.9) * 0.18;
          orbit.rotation.z = t * 0.35;
          renderer.render(scene, camera);
        };
        if (reduce) renderer.render(scene, camera);
        else raf = requestAnimationFrame(frame);

        stop = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          io.disconnect();
          window.removeEventListener("pointermove", onMove);
          coinGeo.dispose();
          ringGeo.dispose();
          beadGeo.dispose();
          beadMats.forEach((m) => m.dispose());
          faceMat.dispose();
          rimMat.dispose();
          glass.dispose();
          tex.dispose();
          pmrem.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  return (
    <div ref={host} aria-hidden className="absolute inset-0">
      {failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/brand/logo-512.webp" alt="" className="lab-bob absolute left-1/2 top-1/2 w-[62%] max-w-[420px] -translate-x-1/2 -translate-y-1/2" />
      )}
    </div>
  );
}
