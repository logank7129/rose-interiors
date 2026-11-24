let running = true;
let speed = 1; // pixels per frame
let containerIds = ['#marqueeBox1', '#marqueeBox2', '#marqueeBox3'];
let positions = [];

$w.onReady(() => {
    // Initialize positions based on widths + gap
    let gap = 20; // same as item spacing
    let cumulativeWidth = 0;

    containerIds.forEach((id, i) => {
        const box = $w(id);
        positions[i] = cumulativeWidth;
        cumulativeWidth += box.width + gap;
    });

    // Start marquee animation
    animateMarquee();

    // Hover pause/resume
    containerIds.forEach(id => {
        $w(id).onMouseIn(() => running = false);
        $w(id).onMouseOut(() => running = true);
    });

    // Ensure #box44 is hidden initially
    $w('#box44').hide();

    // Listen for slide changes on #slideshow1
    $w('#slideshow1').onCurrentIndexChanged(() => {
        if ($w('#slideshow1').isVisible) {
            $w('#box44').show();
        } else {
            $w('#box44').hide();
        }
    });

    // Also check on page load
    if ($w('#slideshow1').isVisible) {
        $w('#box44').show();
    } else {
        $w('#box44').hide();
    }
});

function animateMarquee() {
    if (!running) {
        setTimeout(animateMarquee, 16); // try again next frame
        return;
    }

    containerIds.forEach((id, i) => {
        positions[i] -= speed;
        // You cannot move boxes directly, so this is a placeholder for your animation logic
        // If you want to animate, consider using repeaters or other elements that support position changes
    });

    requestAnimationFrame(animateMarquee);
}
