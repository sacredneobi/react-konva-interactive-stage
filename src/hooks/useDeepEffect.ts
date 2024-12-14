import { DependencyList, EffectCallback, useEffect, useRef } from "react";
import isEqual from "lodash.isequal";

/**
 * Like useEffect, but with deep comparison of dependencies.
 * Only triggers when dependencies actually change in value, not just in reference.
 */
export function useDeepEffect(effect: EffectCallback, deps: DependencyList) {
  const previousRef = useRef<DependencyList>();

  // We intentionally only pass deps to useEffect, so it only reruns when deps change.
  // The deep comparison inside determines if effect() should be called.
  useEffect(() => {
    if (!previousRef.current || !isEqual(previousRef.current, deps)) {
      previousRef.current = deps;
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
