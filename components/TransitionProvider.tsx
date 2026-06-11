'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}
