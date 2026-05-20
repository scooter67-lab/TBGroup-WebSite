export function deepMerge(target, source) {
  if (!source) return { ...target };
  const out = Array.isArray(target) ? [...target] : { ...target };
  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    const tgtVal = out[key];
    if (Array.isArray(srcVal)) {
      out[key] = srcVal;
    } else if (srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal)) {
      out[key] = deepMerge(tgtVal && typeof tgtVal === 'object' ? tgtVal : {}, srcVal);
    } else if (srcVal !== undefined) {
      out[key] = srcVal;
    }
  }
  return out;
}
