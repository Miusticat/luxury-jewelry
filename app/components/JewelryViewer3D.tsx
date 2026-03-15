"use client";

import { useRef, Suspense, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Sparkles,
  Text3D,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import type { RingConfiguration, MetalType } from "./ring-config";

const metalProfiles: Record<
  MetalType,
  { color: string; roughness: number; clearcoat: number; clearcoatRoughness: number; envMapIntensity: number }
> = {
  "18K Rose Gold": {
    color: "#d9a585",
    roughness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.045,
    envMapIntensity: 5.2,
  },
  "18K Yellow Gold": {
    color: "#c9a84c",
    roughness: 0.06,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 5.1,
  },
  "18K White Gold": {
    color: "#e3e6ec",
    roughness: 0.048,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    envMapIntensity: 5.4,
  },
  Platinum: {
    color: "#dadddf",
    roughness: 0.042,
    clearcoat: 1,
    clearcoatRoughness: 0.038,
    envMapIntensity: 5.5,
  },
};

function RendererSetup({ exposure }: { exposure: number }) {
  const { gl } = useThree();

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = exposure;
  }, [gl, exposure]);

  return null;
}

function AccentLights() {
  return (
    <>
      <pointLight position={[2.3, 1.8, 1.7]} color="#fff5e0" intensity={4.5} distance={12} decay={2} />
      <pointLight position={[-2.1, 0.8, -1.8]} color="#c8d8ff" intensity={3.1} distance={10} decay={2} />
      <pointLight position={[0.5, 2.6, -1.4]} color="#C9A84C" intensity={3.4} distance={10} decay={2} />
    </>
  );
}

function RingModelGLB({ config }: { config: RingConfiguration }) {
  const { nodes } = useGLTF("/models/diamond_engagement_ring.glb") as unknown as {
    nodes: Record<string, THREE.Mesh>;
  };
  const metalProfile = metalProfiles[config.metal];

  const metalMesh = nodes.Object_3;
  const diamondMesh = nodes.Object_2;

  const engravingPlacement = useMemo(() => {
    const geometry = metalMesh.geometry;
    if (!geometry.boundingBox) {
      geometry.computeBoundingBox();
    }

    const box = geometry.boundingBox;
    if (!box) return { radius: 0.45, y: -0.05 };

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const outerRadius = Math.max(size.x, size.z) * 0.5;

    // Place text on the inner wall of the shank, below the head/prongs.
    return {
      radius: outerRadius * 0.72,
      y: center.y - size.y * 0.2,
    };
  }, [metalMesh.geometry]);

  return (
    <group>
      <mesh geometry={metalMesh.geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={metalProfile.color}
          metalness={1}
          roughness={metalProfile.roughness}
          clearcoat={metalProfile.clearcoat}
          clearcoatRoughness={metalProfile.clearcoatRoughness}
          reflectivity={1}
          envMapIntensity={metalProfile.envMapIntensity}
        />
        <Engraving3D
          text={config.engraving}
          radius={engravingPlacement.radius}
          y={engravingPlacement.y}
        />
      </mesh>

      <mesh geometry={diamondMesh.geometry} castShadow>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={1}
          thickness={0.8}
          roughness={0.002}
          ior={2.42}
          attenuationColor="#d8ecff"
          attenuationDistance={0.32}
          clearcoat={1}
          clearcoatRoughness={0}
          reflectivity={1}
          envMapIntensity={2.2}
        />
      </mesh>
    </group>
  );
}

type FitMetrics = {
  center: [number, number, number];
  radius: number;
};

function Engraving3D({
  text,
  radius,
  y,
}: {
  text: string;
  radius: number;
  y: number;
}) {
  const clean = text.trim().toUpperCase().slice(0, 14);
  if (!clean) return null;

  const chars = clean.split("");
  const spacing = 0.09;
  const start = -((chars.length - 1) * spacing) / 2;
  const fontUrl = "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json";

  return (
    <group>
      {chars.map((char, index) => {
        const theta = start + index * spacing;
        const x = Math.sin(theta) * radius;
        const z = Math.cos(theta) * radius;

        return (
          <group key={`${char}-${index}`} position={[x, y, z]} rotation={[Math.PI / 2, Math.PI + theta, 0]}>
            <Text3D
              font={fontUrl}
              size={0.034}
              height={0.0045}
              curveSegments={8}
              bevelEnabled
              bevelThickness={0.0012}
              bevelSize={0.0009}
              bevelSegments={3}
              position={[0, 0, -0.009]}
            >
              {char}
              <meshPhysicalMaterial
                color="#3a2a20"
                metalness={0.65}
                roughness={0.5}
                clearcoat={0.06}
                clearcoatRoughness={0.8}
                envMapIntensity={0.35}
              />
            </Text3D>
          </group>
        );
      })}
    </group>
  );
}

function RingModel({
  config,
  onFit,
}: {
  config: RingConfiguration;
  onFit: (fit: FitMetrics) => void;
}) {
  const fitRootRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!fitRootRef.current) return;

    const root = fitRootRef.current;
    root.scale.setScalar(1);
    root.position.set(0, 0, 0);

    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    if (!Number.isFinite(maxDim) || maxDim <= 0) return;

    const targetSize = 1.8;
    const scale = targetSize / maxDim;
    root.scale.setScalar(scale);
    root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    const fittedBox = new THREE.Box3().setFromObject(root);
    const fittedCenter = fittedBox.getCenter(new THREE.Vector3());
    const fittedSize = fittedBox.getSize(new THREE.Vector3());

    onFit({
      center: [fittedCenter.x, fittedCenter.y, fittedCenter.z],
      radius: fittedSize.length() * 0.5,
    });
  }, [onFit]);

  return (
    <group rotation={[-0.35, 0, 0.14]}>
      <group ref={fitRootRef}>
        <RingModelGLB config={config} />
      </group>
    </group>
  );
}

function CameraFitController({
  fit,
  controlsRef,
}: {
  fit: FitMetrics | null;
  controlsRef: React.RefObject<any>;
}) {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!fit) return;

    const cam = camera as THREE.PerspectiveCamera;
    const target = new THREE.Vector3(fit.center[0], fit.center[1], fit.center[2]);

    const fov = THREE.MathUtils.degToRad(cam.fov);
    const aspect = Math.max(size.width / Math.max(size.height, 1), 0.1);
    const fitHeightDistance = fit.radius / Math.tan(fov / 2);
    const fitWidthDistance = fit.radius / (Math.tan(fov / 2) * aspect);
    const distance = Math.max(fitHeightDistance, fitWidthDistance) * 1.45;

    cam.position.set(target.x + distance * 0.15, target.y + distance * 0.16, target.z + distance);
    cam.near = Math.max(distance / 100, 0.01);
    cam.far = distance * 20;
    cam.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.copy(target);
      controlsRef.current.minDistance = distance * 0.9;
      controlsRef.current.maxDistance = distance * 1.28;
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.085;
      controlsRef.current.rotateSpeed = 0.62;
      controlsRef.current.zoomSpeed = 0.72;
      controlsRef.current.update();
    }
  }, [fit, camera, size.width, size.height, controlsRef]);

  return null;
}

function Scene({ config }: { config: RingConfiguration }) {
  const controlsRef = useRef<any>(null);
  const [fit, setFit] = useState<FitMetrics | null>(null);

  return (
    <>
      <RendererSetup exposure={1.1} />
      <CameraFitController fit={fit} controlsRef={controlsRef} />

      <ambientLight intensity={0.06} />
      <directionalLight position={[2.4, 3.9, 2.2]} intensity={2.4} color="#fffaf3" castShadow />
      <directionalLight position={[-2.6, 2.4, -2]} intensity={0.95} color="#ebf2ff" />
      <spotLight
        position={[0.3, 3.3, 2.5]}
        intensity={2.85}
        angle={0.5}
        penumbra={1}
        color="#fffdf8"
        castShadow
      />
      <pointLight position={[0.1, 1.35, -3.1]} intensity={1.35} color="#a9c2ff" />
      <AccentLights />

      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr" />

      <RingModel config={config} onFit={setFit} />

      <Sparkles
        count={40}
        scale={4.3}
        size={0.42}
        speed={0.18}
        noise={0.38}
        color="#fff3d4"
        opacity={0.42}
      />

      <ContactShadows
        position={[0, -2.58, 0]}
        opacity={0.35}
        scale={7.1}
        blur={2.4}
        far={3.5}
        color="#000000"
      />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={2.2}
        maxDistance={6.5}
        autoRotate={false}
        enableDamping
        dampingFactor={0.085}
        rotateSpeed={0.62}
        zoomSpeed={0.72}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function JewelryViewer3D({ config }: { config: RingConfiguration }) {
  return (
    <div className="w-full h-full min-h-[500px] relative">
      <Canvas
        shadows
        camera={{ position: [0.06, 1.0, 4.15], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene config={config} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/diamond_engagement_ring.glb");
