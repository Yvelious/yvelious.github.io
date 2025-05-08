export function getBreakpointsObjectFromCss() {
    const breakpoints = getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/\"/g, '').trim();
    const breakpointsArray = breakpoints.split(', ').map(item => item.split(': '));
    return Object.fromEntries(breakpointsArray);
}