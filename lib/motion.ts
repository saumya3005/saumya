import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 10 },
  show: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const timelineReveal: Variants = {
  hidden: { height: 0, opacity: 0 },
  show: { 
    height: "100%", 
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

export const cardHover = {
  rest: { scale: 1, y: 0, rotateX: 0, rotateY: 0 },
  hover: { scale: 1.03, y: -5, transition: { type: 'spring', stiffness: 400, damping: 25 } }
};

export const magneticHover = {
  rest: { x: 0, y: 0, scale: 1 },
  hover: { scale: 1.1, transition: { type: 'spring', stiffness: 350, damping: 20 } }
};
