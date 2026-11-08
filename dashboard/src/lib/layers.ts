// The overlays the page stacks (the record sheet, the floating Jarvis panel), in the order they opened, so one
// Escape closes only the topmost (TL-007 maintenance, fix review 2). The palette is a kit dialog that handles its
// own Escape; while it is open, neither layer reacts.
const stack: string[] = [];

export function pushLayer(id: string): () => void {
  const drop = () => {
    const k = stack.lastIndexOf(id);
    if (k >= 0) stack.splice(k, 1);
  };
  drop();
  stack.push(id);
  return drop;
}

export function isTopLayer(id: string): boolean {
  return stack[stack.length - 1] === id;
}

/** True while a dialog that is not one of ours (the palette) is open. */
export function foreignDialogOpen(): boolean {
  return !!document.querySelector('[role="dialog"]:not([data-lab-sheet]):not([data-jarvis-float])');
}
