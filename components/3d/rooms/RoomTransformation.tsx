"use client";

import { useRef, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGameStore } from "@/hooks/useGameStore";
import { usePlayerStore } from "@/hooks/usePlayerPosition";

interface UseRoomTransformationOptions {
  roomId: number;
  roomCenter: THREE.Vector3;
}

export function useRoomTransformation({
  roomId,
  roomCenter,
}: UseRoomTransformationOptions) {
  // Refs for animatable objects
  const wallRefs = useRef<(THREE.Mesh | null)[]>([]);
  const problemRefs = useRef<(THREE.Object3D | null)[]>([]);
  const solutionRefs = useRef<(THREE.Object3D | null)[]>([]);
  const problemTextRef = useRef<THREE.Group | null>(null);
  const solutionTextRef = useRef<THREE.Group | null>(null);
  const statTextRef = useRef<THREE.Group | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Callback ref factories for collecting refs into arrays
  const setWallRef = useCallback((index: number) => {
    return (el: THREE.Mesh | null) => {
      wallRefs.current[index] = el;
    };
  }, []);

  const setProblemRef = useCallback((index: number) => {
    return (el: THREE.Object3D | null) => {
      problemRefs.current[index] = el;
    };
  }, []);

  const setSolutionRef = useCallback((index: number) => {
    return (el: THREE.Object3D | null) => {
      solutionRefs.current[index] = el;
    };
  }, []);

  const resetRoom = useCallback(() => {
    const { setActiveRoom, setTransformationPhase, markVisited } =
      useGameStore.getState();
    const { setIsInRoom, setRoomCameraTarget } = usePlayerStore.getState();

    // Fold walls back
    wallRefs.current.forEach((wall) => {
      if (wall) {
        gsap.to(wall.rotation, {
          y: 0,
          duration: 0.6,
          ease: "power2.inOut",
        });
      }
    });

    setTransformationPhase("reset");
    markVisited(roomId);

    // Small delay so wall animation completes before clearing state
    setTimeout(() => {
      setActiveRoom(null);
      setIsInRoom(false);
      setRoomCameraTarget(null);
      setTransformationPhase("idle");
    }, 700);
  }, [roomId]);

  const triggerTransformation = useCallback(() => {
    const { activeRoom, setActiveRoom, setTransformationPhase } =
      useGameStore.getState();
    const { setIsInRoom, setRoomCameraTarget } = usePlayerStore.getState();

    // Prevent re-triggering while active
    if (activeRoom !== null) return;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // ------- PHASE 1: ENTER (0.5s) -------
    tl.call(
      () => {
        setActiveRoom(roomId);
        setIsInRoom(true);
        setRoomCameraTarget(roomCenter);
        setTransformationPhase("enter");
      },
      [],
      0
    );

    // Small pause for camera to settle
    tl.addLabel("enterDone", 0.5);

    // ------- PHASE 2: PROBLEM (1.5s) -------
    tl.call(
      () => {
        setTransformationPhase("problem");
      },
      [],
      "enterDone"
    );

    // Scale in problem text
    if (problemTextRef.current) {
      tl.fromTo(
        problemTextRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.7)" },
        "enterDone"
      );
    }

    // Pause for reading
    tl.addLabel("problemRead", "enterDone+=1.5");

    // ------- PHASE 3: TRANSFORM (1.2s) -------
    tl.call(
      () => {
        setTransformationPhase("transform");
      },
      [],
      "problemRead"
    );

    // Fold walls outward: left wall rotates +PI/2, right wall rotates -PI/2
    wallRefs.current.forEach((wall, i) => {
      if (wall) {
        const targetRotation = i === 0 ? Math.PI / 2 : -Math.PI / 2;
        tl.to(
          wall.rotation,
          { y: targetRotation, duration: 1.0, ease: "power2.inOut" },
          "problemRead"
        );
      }
    });

    // Shrink problem objects
    problemRefs.current.forEach((obj) => {
      if (obj) {
        tl.to(
          obj.scale,
          { x: 0, y: 0, z: 0, duration: 0.8, ease: "back.in(1.7)" },
          "problemRead"
        );
      }
    });

    // Shrink problem text
    if (problemTextRef.current) {
      tl.to(
        problemTextRef.current.scale,
        { x: 0, y: 0, z: 0, duration: 0.6, ease: "back.in(1.7)" },
        "problemRead+=0.2"
      );
    }

    tl.addLabel("transformDone", "problemRead+=1.2");

    // ------- PHASE 4: SOLUTION (2s) -------
    tl.call(
      () => {
        setTransformationPhase("solution");
      },
      [],
      "transformDone"
    );

    // Scale in solution objects with stagger
    solutionRefs.current.forEach((obj, i) => {
      if (obj) {
        tl.to(
          obj.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          `transformDone+=${i * 0.15}`
        );
      }
    });

    // Scale in solution text
    if (solutionTextRef.current) {
      tl.fromTo(
        solutionTextRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.7)" },
        "transformDone+=0.3"
      );
    }

    // Scale in stat text
    if (statTextRef.current) {
      tl.fromTo(
        statTextRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.7)" },
        "transformDone+=0.6"
      );
    }

    tl.addLabel("solutionDone", "transformDone+=2");

    // ------- PHASE 5: AUTO-RESET (after 4s delay) -------
    tl.call(() => resetRoom(), [], "solutionDone+=4");
  }, [roomId, roomCenter, resetRoom]);

  return {
    wallRefs,
    problemRefs,
    solutionRefs,
    problemTextRef,
    solutionTextRef,
    statTextRef,
    setWallRef,
    setProblemRef,
    setSolutionRef,
    triggerTransformation,
  };
}
