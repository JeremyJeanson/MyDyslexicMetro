import document from "document";

// Activity % convert as angle (90° = 100%) 
export function activityToAngle90(activityGoal: number, activityToday: number): number {
  if (activityGoal <= 0) {
    return 0;
  }
  if (activityGoal) {
    const val = (activityToday || 0) * 90 / activityGoal;
    if (val > 90) return 90;
    return val;
  }
  return 0;
}

// Show control
export function show(control: GraphicsElement): void {
  control.style.display = "inline";
}

export function showManyById(ids: string[]): void {
  const max = ids.length - 1;
  for (let i = max; i >= 0; i--) {
    (document.getElementById(ids[i]) as GraphicsElement).style.display = "inline";
  }
}

// Hide control
export function hide(control: GraphicsElement): void {
  control.style.display = "none";
}
export function hideManyById(ids: string[]): void {
  const max = ids.length - 1;
  for (let i = max; i >= 0; i--) {
    (document.getElementById(ids[i]) as GraphicsElement).style.display = "none";
  }
}

// Set visibility
export function setVisibility(control: GraphicsElement, visible: boolean): void {
  control.style.display = visible
    ? "inline"
    : "none";
}

// highlight a control vith animation
export function highlight(control: GraphicsElement): void {
  control.animate("highlight");
}

// update color only when requested
export function fill(control: GraphicsElement, color: string): void {
  // if (control.style.fill === color) return;
  // console.warn(`${color} ${control.style.fill}`);
  control.style.fill = color;
}