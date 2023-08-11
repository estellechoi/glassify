import { ReactNode, useLayoutEffect } from 'react';
import type { DocumentContext, ScrollLockStep } from './types';
import handleIOSScrollLock from './handleIOSScrollLock';
import adjustScrollbarPadding from './adjustScrollbarPadding';
import preventScroll from './preventScroll';
import useUserAgent from '../useUserAgent';
import { getDisposables } from './getDisposables';

const lockScroll = (ctx: DocumentContext, isIOS: boolean) => {
  const IOSStep = isIOS ? [handleIOSScrollLock()] : [];
  const steps: ScrollLockStep<any>[] = [...IOSStep, adjustScrollbarPadding(), preventScroll()];

  // Run all `before` actions together
  steps.forEach(({ before }) => before?.(ctx));

  // Run all `after` actions together
  steps.forEach(({ after }) => after?.(ctx));
};

const unlockScroll = (ctx: DocumentContext) => {
  const { disposables } = ctx;
  disposables.dispose();
};

const useScrollLock = (enabled: boolean, escapedElement?: HTMLElement | null): boolean => {
  const isLocked = !!document;

  const { isIOS } = useUserAgent();

  useLayoutEffect(() => {
    const targetDocument = escapedElement?.ownerDocument ?? document;

    if (!targetDocument) return;
    if (!enabled) return;

    const options = { escapedElement };
    const disposables = getDisposables();
    // Prevent the document from scrolling
    lockScroll({ document: targetDocument, disposables, options }, isIOS);

    // Allow document to scroll
    unlockScroll({ document: targetDocument, disposables, options });
  }, [enabled, escapedElement?.ownerDocument]);

  return isLocked;
};

export default useScrollLock;
