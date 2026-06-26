// MotionKit - Figma Sandbox Main Thread
// Fully supports custom keyframes, physical spring calculations, and advanced stagger engines.

// Show the plugin panel UI
figma.showUI(__html__, {
  width: 320,
  height: 560,
  themeColors: true
});

// Professional standard motion presets — smoother multi-keyframe curves
// with intermediate easing stops for silky deceleration.
var PRESETS = [
  {
    id: "fadeIn",
    label: "Fade In",
    description: "Smoothly transition opacity from zero to fully visible.",
    properties: [
      { t: 0, opacity: 0 },
      { t: 0.4, opacity: 0.6 },
      { t: 0.7, opacity: 0.9 },
      { t: 1, opacity: 1 }
    ]
  },
  {
    id: "slideInLeft",
    label: "Slide In Left",
    description: "Slide from the left with a gentle fade-in effect.",
    properties: [
      { t: 0, opacity: 0, x: -80 },
      { t: 0.35, opacity: 0.5, x: -25 },
      { t: 0.65, opacity: 0.85, x: -5 },
      { t: 1, opacity: 1, x: 0 }
    ]
  },
  {
    id: "slideInUp",
    label: "Slide In Up",
    description: "Slide upwards from below with a smooth fade-in.",
    properties: [
      { t: 0, opacity: 0, y: 80 },
      { t: 0.35, opacity: 0.5, y: 25 },
      { t: 0.65, opacity: 0.85, y: 5 },
      { t: 1, opacity: 1, y: 0 }
    ]
  },
  {
    id: "scaleUp",
    label: "Scale Up",
    description: "Expand outwards from 70% to full size with a fade-in.",
    properties: [
      { t: 0, opacity: 0, scaleX: 0.7, scaleY: 0.7 },
      { t: 0.4, opacity: 0.6, scaleX: 0.88, scaleY: 0.88 },
      { t: 0.7, opacity: 0.92, scaleX: 0.97, scaleY: 0.97 },
      { t: 1, opacity: 1, scaleX: 1, scaleY: 1 }
    ]
  },
  {
    id: "bounce",
    label: "Bounce",
    description: "Playful bouncing vertical movement settling at rest.",
    properties: [
      { t: 0, y: 0 },
      { t: 0.18, y: -36 },
      { t: 0.36, y: 0 },
      { t: 0.5, y: -16 },
      { t: 0.64, y: 0 },
      { t: 0.76, y: -6 },
      { t: 0.88, y: 0 },
      { t: 1, y: 0 }
    ]
  },
  {
    id: "rotateIn",
    label: "Rotate In",
    description: "Rotate clockwise from -25 degrees with a subtle fade-in.",
    properties: [
      { t: 0, opacity: 0, rotation: -25 },
      { t: 0.35, opacity: 0.5, rotation: -8 },
      { t: 0.7, opacity: 0.9, rotation: -1 },
      { t: 1, opacity: 1, rotation: 0 }
    ]
  },
  {
    id: "elasticPop",
    label: "Elastic Pop",
    description: "A snappy spring scale-up that overshoots and settles fluidly.",
    properties: [
      { t: 0, opacity: 0, scaleX: 0.3, scaleY: 0.3 },
      { t: 0.35, opacity: 0.7, scaleX: 0.85, scaleY: 0.85 },
      { t: 0.55, opacity: 0.9, scaleX: 1.08, scaleY: 1.08 },
      { t: 0.72, scaleX: 0.97, scaleY: 0.97 },
      { t: 0.86, scaleX: 1.02, scaleY: 1.02 },
      { t: 1, opacity: 1, scaleX: 1, scaleY: 1 }
    ]
  },
  {
    id: "squashStretch",
    label: "Squash & Stretch",
    description: "Organic physical jelly movement scaling out-of-sync.",
    properties: [
      { t: 0, scaleX: 1, scaleY: 1, y: 0 },
      { t: 0.12, scaleX: 1.18, scaleY: 0.82, y: 12 },
      { t: 0.3, scaleX: 0.88, scaleY: 1.12, y: -8 },
      { t: 0.5, scaleX: 0.82, scaleY: 1.18, y: -22 },
      { t: 0.68, scaleX: 1.06, scaleY: 0.94, y: 4 },
      { t: 0.82, scaleX: 0.97, scaleY: 1.03, y: -1 },
      { t: 1, scaleX: 1, scaleY: 1, y: 0 }
    ]
  },
  {
    id: "maskRevealUp",
    label: "Mask Reveal Up",
    description: "Reveal the element from a clipped bottom boundary.",
    properties: [
      { t: 0, opacity: 0, y: 60 },
      { t: 0.3, opacity: 0.4, y: 22 },
      { t: 0.65, opacity: 0.85, y: 4 },
      { t: 1, opacity: 1, y: 0 }
    ]
  },
  {
    id: "shiver",
    label: "Shiver / Glitch",
    description: "High-frequency jitter translation for energetic alerts.",
    properties: [
      { t: 0, x: 0, y: 0 },
      { t: 0.1, x: -6, y: 3 },
      { t: 0.2, x: 6, y: -3 },
      { t: 0.3, x: -5, y: 2 },
      { t: 0.4, x: 5, y: -2 },
      { t: 0.55, x: -3, y: 1 },
      { t: 0.7, x: 3, y: -1 },
      { t: 0.85, x: -1, y: 0 },
      { t: 1, x: 0, y: 0 }
    ]
  },
  {
    id: "floatLoop",
    label: "Float Loop",
    description: "Continuous floating cycle ideal for persistent highlights.",
    properties: [
      { t: 0, y: 0 },
      { t: 0.25, y: -10 },
      { t: 0.5, y: -16 },
      { t: 0.75, y: -10 },
      { t: 1, y: 0 }
    ]
  },
  {
    id: "pulseLoop",
    label: "Pulse Loop",
    description: "Gentle breathing scale cycle for organic calling cards.",
    properties: [
      { t: 0, scaleX: 1, scaleY: 1 },
      { t: 0.25, scaleX: 1.03, scaleY: 1.03 },
      { t: 0.5, scaleX: 1.06, scaleY: 1.06 },
      { t: 0.75, scaleX: 1.03, scaleY: 1.03 },
      { t: 1, scaleX: 1, scaleY: 1 }
    ]
  }
];

// Broadcast selection changes to the UI
function sendSelectionState() {
  try {
    var selection = figma.currentPage.selection;
    if (!selection || selection.length === 0) {
      figma.ui.postMessage({ type: "SELECTION_CHANGED", hasSelection: false });
      return;
    }
    
    var node = selection[0];
    if (!node || node.removed) {
      figma.ui.postMessage({ type: "SELECTION_CHANGED", hasSelection: false });
      return;
    }

    var isAnimatedContainer = (node.type === "FRAME" || node.type === "COMPONENT" || node.type === "INSTANCE");
    var childrenCount = isAnimatedContainer && node.children ? node.children.length : 0;

    if (isAnimatedContainer) {
      figma.ui.postMessage({
        type: "SELECTION_CHANGED",
        hasSelection: true,
        name: node.name,
        width: node.width,
        height: node.height,
        childrenCount: childrenCount
      });
    } else {
      figma.ui.postMessage({
        type: "SELECTION_CHANGED",
        hasSelection: false,
        notAFrame: true
      });
    }
  } catch (e) {
    console.log("Error evaluating selection state: " + e.message);
    figma.ui.postMessage({ type: "SELECTION_CHANGED", hasSelection: false });
  }
}

// Find a preset by ID (including support for dynamically built custom presets)
function findPreset(presetId, params) {
  if (presetId === "custom") {
    return {
      id: "custom",
      label: "Custom Motion",
      description: "User-defined keyframes and parameters.",
      properties: params.customKeyframes || []
    };
  }

  var p;
  for (p = 0; p < PRESETS.length; p++) {
    if (PRESETS[p].id === presetId) {
      return PRESETS[p];
    }
  }
  return null;
}

// Generate CSS / Tailwind / Framer Motion / GSAP code blocks for export
function generateExportCode(presetId, params, format) {
  var duration = params.duration || 600;
  var easing = params.easing || "ease";
  var delay = params.delay || 0;
  var direction = params.direction || "normal";
  var intensity = params.intensity !== undefined ? params.intensity : 1.0;

  var preset = findPreset(presetId, params);
  if (!preset) return "";

  var cssEasing = easing;
  if (easing === "spring") {
    cssEasing = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  } else if (easing === "custom-bezier" && params.bezierPoints) {
    cssEasing = "cubic-bezier(" + params.bezierPoints.join(", ") + ")";
  } else if (easing === "custom-spring") {
    cssEasing = "cubic-bezier(0.25, 1, 0.5, 1)"; // Visual approximation for basic CSS
  }

  if (format === "css") {
    var keyframesStr = "@keyframes " + presetId + " {\n";
    var k;
    for (k = 0; k < preset.properties.length; k++) {
      var kf = preset.properties[k];
      var percentage = Math.round(kf.t * 100) + "%";
      keyframesStr += "  " + percentage + " {\n";
      
      var transforms = [];
      if (kf.opacity !== undefined) {
        keyframesStr += "    opacity: " + kf.opacity + ";\n";
      }
      if (kf.x !== undefined) {
        transforms.push("translateX(" + (kf.x * intensity) + "px)");
      }
      if (kf.y !== undefined) {
        transforms.push("translateY(" + (kf.y * intensity) + "px)");
      }
      var scaleX = kf.scaleX !== undefined ? kf.scaleX : null;
      var scaleY = kf.scaleY !== undefined ? kf.scaleY : null;
      if (scaleX !== null && scaleY !== null) {
        transforms.push("scale(" + scaleX + ", " + scaleY + ")");
      } else if (scaleX !== null) {
        transforms.push("scaleX(" + scaleX + ")");
      } else if (scaleY !== null) {
        transforms.push("scaleY(" + scaleY + ")");
      }
      if (kf.rotation !== undefined) {
        transforms.push("rotate(" + (kf.rotation * intensity) + "deg)");
      }

      if (transforms.length > 0) {
        keyframesStr += "    transform: " + transforms.join(" ") + ";\n";
      }
      keyframesStr += "  }\n";
    }
    keyframesStr += "}\n\n";

    var animationShorthand = presetId + " " + duration + "ms " + cssEasing + " " + delay + "ms 1 " + direction + " forwards";
    var classStr = ".animated-element {\n" +
                   "  animation: " + animationShorthand + ";\n" +
                   "}\n";
    return keyframesStr + classStr;
  }

  if (format === "tailwind") {
    var keyframeRules = {};
    var k;
    for (k = 0; k < preset.properties.length; k++) {
      var kf = preset.properties[k];
      var percentage = Math.round(kf.t * 100) + "%";
      var frameProps = {};
      
      if (kf.opacity !== undefined) frameProps["opacity"] = String(kf.opacity);
      
      var transforms = [];
      if (kf.x !== undefined) transforms.push("translateX(" + (kf.x * intensity) + "px)");
      if (kf.y !== undefined) transforms.push("translateY(" + (kf.y * intensity) + "px)");
      var scaleX = kf.scaleX !== undefined ? kf.scaleX : null;
      var scaleY = kf.scaleY !== undefined ? kf.scaleY : null;
      if (scaleX !== null && scaleY !== null) {
        transforms.push("scale(" + scaleX + ", " + scaleY + ")");
      } else if (scaleX !== null) {
        transforms.push("scaleX(" + scaleX + ")");
      } else if (scaleY !== null) {
        transforms.push("scaleY(" + scaleY + ")");
      }
      if (kf.rotation !== undefined) transforms.push("rotate(" + (kf.rotation * intensity) + "deg)");
      
      if (transforms.length > 0) {
        frameProps["transform"] = transforms.join(" ");
      }
      keyframeRules[percentage] = frameProps;
    }

    var tailwindConfig = 
      "// Add to tailwind.config.js extend object:\n" +
      "theme: {\n" +
      "  extend: {\n" +
      "    keyframes: {\n" +
      "      " + presetId + ": " + JSON.stringify(keyframeRules, null, 8).slice(0, -1) + "      },\n" +
      "    },\n" +
      "    animation: {\n" +
      "      " + presetId + ": '" + presetId + " " + duration + "ms " + cssEasing + " " + delay + "ms forwards'\n" +
      "    }\n" +
      "  }\n" +
      "}\n\n" +
      "// HTML class usage:\n" +
      "<div class=\"animate-" + presetId + "\">...</div>";
    
    return tailwindConfig;
  }

  if (format === "framer") {
    // Construct framer motion variants
    var initialProps = {};
    var animateProps = {};
    
    // Find initial state (t=0) and final state (t=1 or last)
    var t0 = preset.properties[0];
    var tEnd = preset.properties[preset.properties.length - 1];

    if (t0.opacity !== undefined) initialProps["opacity"] = t0.opacity;
    if (t0.x !== undefined) initialProps["x"] = t0.x * intensity;
    if (t0.y !== undefined) initialProps["y"] = t0.y * intensity;
    if (t0.scaleX !== undefined) initialProps["scaleX"] = t0.scaleX;
    if (t0.scaleY !== undefined) initialProps["scaleY"] = t0.scaleY;
    if (t0.rotation !== undefined) initialProps["rotate"] = t0.rotation * intensity;

    if (tEnd.opacity !== undefined) animateProps["opacity"] = tEnd.opacity;
    if (tEnd.x !== undefined) animateProps["x"] = tEnd.x * intensity;
    if (tEnd.y !== undefined) animateProps["y"] = tEnd.y * intensity;
    if (tEnd.scaleX !== undefined) animateProps["scaleX"] = tEnd.scaleX;
    if (tEnd.scaleY !== undefined) animateProps["scaleY"] = tEnd.scaleY;
    if (tEnd.rotation !== undefined) animateProps["rotate"] = tEnd.rotation * intensity;

    // Custom multi-keyframe transition if keyframes > 2
    if (preset.properties.length > 2) {
      var opacities = [], xs = [], ys = [], scaleXs = [], scaleYs = [], rotates = [], times = [];
      var i;
      for (i = 0; i < preset.properties.length; i++) {
        var pItem = preset.properties[i];
        times.push(pItem.t);
        if (pItem.opacity !== undefined) opacities.push(pItem.opacity);
        if (pItem.x !== undefined) xs.push(pItem.x * intensity);
        if (pItem.y !== undefined) ys.push(pItem.y * intensity);
        if (pItem.scaleX !== undefined) scaleXs.push(pItem.scaleX);
        if (pItem.scaleY !== undefined) scaleYs.push(pItem.scaleY);
        if (pItem.rotation !== undefined) rotates.push(pItem.rotation * intensity);
      }

      if (opacities.length > 0) animateProps["opacity"] = opacities;
      if (xs.length > 0) animateProps["x"] = xs;
      if (ys.length > 0) animateProps["y"] = ys;
      if (scaleXs.length > 0) animateProps["scaleX"] = scaleXs;
      if (scaleYs.length > 0) animateProps["scaleY"] = scaleYs;
      if (rotates.length > 0) animateProps["rotate"] = rotates;
    }

    var transitionConfig = {
      duration: duration / 1000,
      delay: delay / 1000
    };

    if (easing === "spring") {
      transitionConfig["type"] = "spring";
      transitionConfig["bounce"] = 0.3;
    } else if (easing === "custom-spring" && params.springParams) {
      transitionConfig["type"] = "spring";
      transitionConfig["mass"] = params.springParams.mass;
      transitionConfig["stiffness"] = params.springParams.stiffness;
      transitionConfig["damping"] = params.springParams.damping;
    } else if (easing === "custom-bezier" && params.bezierPoints) {
      transitionConfig["ease"] = params.bezierPoints;
    } else {
      transitionConfig["ease"] = easing;
    }

    var framerCode = 
      "import { motion } from 'framer-motion';\n\n" +
      "export const MotionElement = () => {\n" +
      "  return (\n" +
      "    <motion.div\n" +
      "      initial={" + JSON.stringify(initialProps) + "}\n" +
      "      animate={" + JSON.stringify(animateProps) + "}\n" +
      "      transition={" + JSON.stringify(transitionConfig, null, 8).slice(0, -1) + "      }\n" +
      "    >\n" +
      "      ✦\n" +
      "    </motion.div>\n" +
      "  );\n" +
      "};";
    return framerCode;
  }

  if (format === "gsap") {
    var gsapEasing = "power2.out";
    if (easing === "ease-in") gsapEasing = "power2.in";
    else if (easing === "ease-out") gsapEasing = "power2.out";
    else if (easing === "ease-in-out") gsapEasing = "power2.inOut";
    else if (easing === "linear") gsapEasing = "none";
    else if (easing === "spring" || easing === "custom-spring") {
      var stiffness = (params.springParams && params.springParams.stiffness) || 100;
      var damping = (params.springParams && params.springParams.damping) || 15;
      gsapEasing = "elastic.out(1, " + (stiffness / 200).toFixed(2) + ")";
    } else if (easing === "custom-bezier" && params.bezierPoints) {
      gsapEasing = "CustomEase.create('custom', '" + params.bezierPoints.join(",") + "')";
    }

    var t0 = preset.properties[0];
    var tEnd = preset.properties[preset.properties.length - 1];
    
    var fromVars = {};
    var toVars = {
      duration: duration / 1000,
      delay: delay / 1000,
      ease: gsapEasing
    };

    if (t0.opacity !== undefined) fromVars["opacity"] = t0.opacity;
    if (t0.x !== undefined) fromVars["x"] = t0.x * intensity;
    if (t0.y !== undefined) fromVars["y"] = t0.y * intensity;
    if (t0.scaleX !== undefined) fromVars["scaleX"] = t0.scaleX;
    if (t0.scaleY !== undefined) fromVars["scaleY"] = t0.scaleY;
    if (t0.rotation !== undefined) fromVars["rotation"] = t0.rotation * intensity;

    if (tEnd.opacity !== undefined) toVars["opacity"] = tEnd.opacity;
    if (tEnd.x !== undefined) toVars["x"] = tEnd.x * intensity;
    if (tEnd.y !== undefined) toVars["y"] = tEnd.y * intensity;
    if (tEnd.scaleX !== undefined) toVars["scaleX"] = tEnd.scaleX;
    if (tEnd.scaleY !== undefined) toVars["scaleY"] = tEnd.scaleY;
    if (tEnd.rotation !== undefined) toVars["rotation"] = tEnd.rotation * intensity;

    var gsapCode = "";
    if (params.staggerEnabled && params.staggerDelay) {
      toVars["stagger"] = {
        each: params.staggerDelay / 1000,
        from: params.staggerOrder === "center" ? "center" : (params.staggerOrder === "reverse" ? "end" : (params.staggerOrder === "random" ? "random" : "start"))
      };
      gsapCode = 
        "// Ensure GSAP is loaded (and CustomEase if using custom beziers)\n" +
        "gsap.fromTo('.animated-element-children',\n" +
        "  " + JSON.stringify(fromVars) + ",\n" +
        "  " + JSON.stringify(toVars, null, 2) + "\n" +
        ");";
    } else {
      gsapCode = 
        "// Ensure GSAP is loaded\n" +
        "gsap.fromTo('.animated-element',\n" +
        "  " + JSON.stringify(fromVars) + ",\n" +
        "  " + JSON.stringify(toVars, null, 2) + "\n" +
        ");";
    }
    return gsapCode;
  }

  if (format === "webanim") {
    // Generate Web Animations API code
    var keyframesArray = [];
    var i;
    for (i = 0; i < preset.properties.length; i++) {
      var kf = preset.properties[i];
      var frame = { offset: kf.t };
      
      if (kf.opacity !== undefined) frame["opacity"] = kf.opacity;
      
      var transforms = [];
      if (kf.x !== undefined) transforms.push("translateX(" + (kf.x * intensity) + "px)");
      if (kf.y !== undefined) transforms.push("translateY(" + (kf.y * intensity) + "px)");
      var scaleX = kf.scaleX !== undefined ? kf.scaleX : null;
      var scaleY = kf.scaleY !== undefined ? kf.scaleY : null;
      if (scaleX !== null && scaleY !== null) {
        transforms.push("scale(" + scaleX + ", " + scaleY + ")");
      } else if (scaleX !== null) {
        transforms.push("scaleX(" + scaleX + ")");
      } else if (scaleY !== null) {
        transforms.push("scaleY(" + scaleY + ")");
      }
      if (kf.rotation !== undefined) transforms.push("rotate(" + (kf.rotation * intensity) + "deg)");
      
      if (transforms.length > 0) {
        frame["transform"] = transforms.join(" ");
      }
      keyframesArray.push(frame);
    }

    var optionsConfig = {
      duration: duration,
      delay: delay,
      easing: cssEasing,
      fill: "forwards"
    };

    var webAnimCode = 
      "const element = document.querySelector('.animated-element');\n\n" +
      "const keyframes = " + JSON.stringify(keyframesArray, null, 2) + ";\n\n" +
      "const options = " + JSON.stringify(optionsConfig, null, 2) + ";\n\n" +
      "element.animate(keyframes, options);";
    return webAnimCode;
  }

  return "";
}

// Helper to apply native Figma Motion timeline keyframes directly to a node
function applyNativeMotionPreset(node, preset, params) {
  if (typeof node.applyManualKeyframeTrack !== "function") {
    return;
  }

  var duration = params.duration || 600;
  var easing = params.easing || "ease";
  var delay = params.delay || 0;
  var intensity = params.intensity !== undefined ? params.intensity : 1.0;

  // Clear existing tracks first to prevent overlapping animation conflicts
  var fields = ['OPACITY', 'TRANSLATION_X', 'TRANSLATION_Y', 'SCALE_X', 'SCALE_Y', 'ROTATION'];
  var f;
  for (f = 0; f < fields.length; f++) {
    try {
      node.removeManualKeyframeTrack({ type: 'PROPERTY', name: fields[f] });
    } catch (e) {}
  }

  // Set the native timeline duration to match the total duration (including delay)
  try {
    if (node.timelines && node.timelines.length > 0) {
      var timelineId = node.timelines[0].id;
      var totalDurationSeconds = (delay + duration) / 1000;
      node.setTimelineDuration(timelineId, totalDurationSeconds);
    }
  } catch (e) {}

  // Determine native easing object — EASE_OUT as default for silky deceleration
  var nativeEasing = { type: 'EASE_OUT' };
  
  if (easing === 'ease') {
    // Use a smooth expo-out style cubic-bezier for the default "ease" mode
    nativeEasing = {
      type: 'CUSTOM_CUBIC_BEZIER',
      easingFunctionCubicBezier: { x1: 0.16, y1: 1, x2: 0.3, y2: 1 }
    };
  } else if (easing === 'ease-in') {
    nativeEasing = { type: 'EASE_IN' };
  } else if (easing === 'ease-out') {
    nativeEasing = { type: 'EASE_OUT' };
  } else if (easing === 'ease-in-out') {
    nativeEasing = { type: 'EASE_IN_AND_OUT' };
  } else if (easing === 'linear') {
    nativeEasing = { type: 'LINEAR' };
  } else if (easing === 'spring') {
    var bounceVal = 0.3;
    if (figma.motion && typeof figma.motion.physicalSpringToNormalized === 'function') {
      try {
        bounceVal = figma.motion.physicalSpringToNormalized({ mass: 1, stiffness: 100, damping: 15 });
      } catch (e) {}
    }
    nativeEasing = {
      type: 'CUSTOM_SPRING',
      easingFunctionSpring: { bounce: bounceVal }
    };
  } else if (easing === 'custom-bezier' && params.bezierPoints) {
    nativeEasing = {
      type: 'CUSTOM_CUBIC_BEZIER',
      easingFunctionCubicBezier: {
        x1: params.bezierPoints[0],
        y1: params.bezierPoints[1],
        x2: params.bezierPoints[2],
        y2: params.bezierPoints[3]
      }
    };
  } else if (easing === 'custom-spring' && params.springParams) {
    var bounceVal = 0.3;
    if (figma.motion && typeof figma.motion.physicalSpringToNormalized === 'function') {
      try {
        bounceVal = figma.motion.physicalSpringToNormalized({
          mass: params.springParams.mass || 1,
          stiffness: params.springParams.stiffness || 100,
          damping: params.springParams.damping || 15
        });
      } catch (e) {}
    }
    nativeEasing = {
      type: 'CUSTOM_SPRING',
      easingFunctionSpring: { bounce: bounceVal }
    };
  }

  // Detect which properties are animated in the preset
  var animatedProperties = [];
  var k;
  for (k = 0; k < preset.properties.length; k++) {
    var kf = preset.properties[k];
    var prop;
    for (prop in kf) {
      if (prop !== 't' && animatedProperties.indexOf(prop) === -1) {
        animatedProperties.push(prop);
      }
    }
  }

  // Build and apply manual keyframe tracks for each animated property
  var p;
  for (p = 0; p < animatedProperties.length; p++) {
    var propName = animatedProperties[p];
    var nativePropName = null;
    var baseVal = 0;

    if (propName === 'opacity') {
      nativePropName = 'OPACITY';
      baseVal = 1.0;
    } else if (propName === 'x') {
      nativePropName = 'TRANSLATION_X';
      baseVal = 0.0;
    } else if (propName === 'y') {
      nativePropName = 'TRANSLATION_Y';
      baseVal = 0.0;
    } else if (propName === 'scaleX') {
      nativePropName = 'SCALE_X';
      baseVal = 1.0;
    } else if (propName === 'scaleY') {
      nativePropName = 'SCALE_Y';
      baseVal = 1.0;
    } else if (propName === 'rotation') {
      nativePropName = 'ROTATION';
      baseVal = 0.0;
    }

    if (!nativePropName) continue;

    var nativeKeyframes = [];
    var j;
    for (j = 0; j < preset.properties.length; j++) {
      var presetKf = preset.properties[j];
      if (presetKf[propName] === undefined) continue;

      var seconds = (delay + presetKf.t * duration) / 1000;
      var rawVal = presetKf[propName];

      // Apply intensity for translation and rotation offsets
      if (propName === 'x' || propName === 'y' || propName === 'rotation') {
        rawVal = rawVal * intensity;
      }

      var kfObj = {
        timelinePosition: seconds,
        value: { type: 'FLOAT', value: rawVal }
      };

      // Set transition easing on subsequent keyframes
      if (presetKf.t > 0) {
        kfObj.easing = nativeEasing;
      }

      nativeKeyframes.push(kfObj);
    }

    try {
      node.applyManualKeyframeTrack(
        { type: 'PROPERTY', name: nativePropName },
        {
          baseValue: { type: 'FLOAT', value: baseVal },
          keyframes: nativeKeyframes
        }
      );
    } catch (trackError) {
      console.log("Failed to apply track " + nativePropName + ": " + trackError.message);
    }
  }
}

// Asynchronous execution of preset application on the canvas
async function applyPresetAsync(presetId, params) {
  var selection = figma.currentPage.selection;
  if (selection.length === 0) {
    figma.notify("Error - Please select a frame on the canvas");
    return;
  }

  var selectedNode = selection[0];
  if (selectedNode.type !== "FRAME" && selectedNode.type !== "COMPONENT" && selectedNode.type !== "INSTANCE") {
    figma.notify("Error - Selection must be a Frame, Component, or Instance");
    return;
  }

  // Find the selected preset
  var preset = findPreset(presetId, params);
  if (!preset) {
    figma.notify("Error - Preset not found");
    return;
  }

  // Enable clipsContent automatically for mask reveals
  if (presetId.indexOf("mask") !== -1) {
    try {
      selectedNode.clipsContent = true;
    } catch (e) {}
  }

  // 1. Apply native motion keyframes to the parent container frame
  try {
    applyNativeMotionPreset(selectedNode, preset, params);
  } catch (motionError) {
    console.log("Figma Motion API Error (Parent): " + motionError.message);
  }

  // 2. ALWAYS apply the SAME full-intensity motion to every visible child.
  //    If stagger is enabled, children get sequential delays for cascading.
  //    If stagger is off, all children get the same timing as the parent.
  if (selectedNode.children && selectedNode.children.length > 0) {
    var children = selectedNode.children;
    var useStagger = params.staggerEnabled;
    var staggerDelay = params.staggerDelay || 100;

    // Filter active and visible children
    var validChildren = [];
    var i;
    for (i = 0; i < children.length; i++) {
      var child = children[i];
      if (child && !child.removed && child.visible !== false) {
        validChildren.push(child);
      }
    }

    var totalChildren = validChildren.length;

    for (i = 0; i < totalChildren; i++) {
      var child = validChildren[i];

      // Calculate per-child delay
      var calculatedDelay = params.delay;

      if (useStagger && totalChildren > 1) {
        var order = params.staggerOrder || "forward";

        if (order === "forward") {
          calculatedDelay += i * staggerDelay;
        } else if (order === "reverse") {
          calculatedDelay += (totalChildren - 1 - i) * staggerDelay;
        } else if (order === "center") {
          var center = (totalChildren - 1) / 2;
          var dist = Math.abs(i - center);
          calculatedDelay += Math.round(dist * staggerDelay);
        } else if (order === "random") {
          calculatedDelay += Math.round(Math.random() * totalChildren * staggerDelay);
        }
      }

      // SAME full intensity and same motion as the parent frame
      var childParams = {
        duration: params.duration,
        easing: params.easing,
        delay: calculatedDelay,
        direction: params.direction,
        intensity: params.intensity, // Full intensity — same motion as parent
        bezierPoints: params.bezierPoints,
        springParams: params.springParams
      };

      try {
        applyNativeMotionPreset(child, preset, childParams);
      } catch (childError) {
        console.log("Figma Motion API Error (Child " + i + "): " + childError.message);
      }
    }
  }

  // Focus selection and viewport strictly on the animated node
  figma.currentPage.selection = [selectedNode];
  figma.viewport.scrollAndZoomIntoView([selectedNode]);

  var childCount = (selectedNode.children ? selectedNode.children.length : 0);
  figma.notify("✓ MotionKit applied to " + selectedNode.name + " + " + childCount + " children");

  // Send completion message to UI
  figma.ui.postMessage({ type: "DONE" });
}

// Set up listeners for communication from the UI
figma.ui.onmessage = function(msg) {
  if (msg.type === "APPLY_PRESET") {
    applyPresetAsync(msg.presetId, msg.params);
  } else if (msg.type === "EXPORT_CODE") {
    var codeString = generateExportCode(msg.presetId, msg.params, msg.format);
    figma.ui.postMessage({ type: "EXPORT_RESULT", code: codeString, format: msg.format });
  }
};

// Monitor selection changes on the canvas
figma.on("selectionchange", function() {
  sendSelectionState();
});

// Broadcast initial selection state on launch
sendSelectionState();
