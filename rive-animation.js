// This code loads and plays your Rive animation

const r = new rive.Rive({
    src: 'assets/riv.riv', // <-- Updated with your file path
    canvas: document.getElementById('rive-canvas'),
    autoplay: true,
    stateMachines: 'Button Animation', // <-- Make sure this matches your state machine name
    onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
    },
});

// Ensure the animation resizes with the window
window.addEventListener('resize', () => {
    r.resizeDrawingSurfaceToCanvas();
});