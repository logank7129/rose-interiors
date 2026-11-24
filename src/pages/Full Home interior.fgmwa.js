import wixWindow from 'wix-window';

$w.onReady(function () {

    const device = wixWindow.formFactor; 
    let homeId, styleId, bedId, areaId, workId, btnId, resultId;

    // Detect device and assign IDs
    if (device === "Desktop") {
        homeId = "#homeType";
        styleId = "#interiorStyle";
        bedId = "#bedrooms";
        areaId = "#areaRange";
        workId = "#workNeeded";
        btnId = "#calculateBtn";
        resultId = "#resultText";
    }

    if (device === "Tablet") {
        homeId = "#tHomeType";
        styleId = "#tInteriorStyle";
        bedId = "#tBedrooms";
        areaId = "#tAreaRange";
        workId = "#tWorkNeeded";
        btnId = "#tCalculateBtn";
        resultId = "#tResultText";
    }

    if (device === "Mobile") {
        homeId = "#mHomeType";
        styleId = "#mInteriorStyle";
        bedId = "#mBedrooms";
        areaId = "#mAreaRange";
        workId = "#mWorkNeeded";
        btnId = "#mCalculateBtn";
        resultId = "#mResultText";
    }

    // Setup dropdown options
    setupOptions(homeId, styleId, bedId, areaId, workId);

    // Hide result initially
    $w(resultId).hide();

    // Button click = calculate
    $w(btnId).onClick(() => {
        calculateCost(homeId, styleId, bedId, areaId, workId, resultId);
    });
});


// --------------------- Functions --------------------- //

function setupOptions(homeId, styleId, bedId, areaId, workId) {

    $w(homeId).options = [
        { label: '1 BHK', value: '1 BHK' },
        { label: '2 BHK', value: '2 BHK' },
        { label: '3 BHK', value: '3 BHK' },
        { label: '4+ BHK', value: '4+ BHK' }
    ];

    $w(styleId).options = [
        { label: 'Basic', value: 'Basic' },
        { label: 'Standard', value: 'Standard' },
        { label: 'Premium', value: 'Premium' }
    ];

    $w(bedId).options = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4+', value: '4+' }
    ];

    $w(areaId).options = [
        { label: 'Below 800 sq.ft', value: 'Below 800' },
        { label: '800–1200 sq.ft', value: '800–1200' },
        { label: '1200–1800 sq.ft', value: '1200–1800' },
        { label: 'Above 1800 sq.ft', value: 'Above 1800' }
    ];

    $w(workId).options = [
        { label: 'Modular Kitchen', value: 'Modular Kitchen' },
        { label: 'Wardrobes & Storage', value: 'Wardrobes & Storage' },
        { label: 'Painting', value: 'Painting' },
        { label: 'False Ceiling', value: 'False Ceiling' },
        { label: 'Electrical & Lighting', value: 'Electrical & Lighting' }
    ];
}


function calculateCost(idHome, idStyle, idBed, idArea, idWork, resultId) {

    const homeType = $w(idHome).value;
    const interiorStyle = $w(idStyle).value;
    const bedrooms = $w(idBed).value;
    const areaRange = $w(idArea).value;
    const selectedWorks = $w(idWork).value || [];

    const basePrices = {
        '1 BHK': 15000,
        '2 BHK': 25000,
        '3 BHK': 35000,
        '4+ BHK': 45000
    };

    const styleMultiplier = {
        'Basic': 1,
        'Standard': 1.2,
        'Premium': 1.5
    };

    const workAddons = {
        'Modular Kitchen': 10000,
        'Wardrobes & Storage': 8000,
        'Painting': 5000,
        'False Ceiling': 7000,
        'Electrical & Lighting': 6000
    };

    let baseCost = basePrices[homeType] || 15000;
    let styleFactor = styleMultiplier[interiorStyle] || 1;
    let addons = selectedWorks.reduce((sum, work) => sum + (workAddons[work] || 0), 0);

    let totalCost = (baseCost * styleFactor) + addons;
    let formattedCost = '₹' + totalCost.toLocaleString('en-IN');

    $w(resultId).text = ` ${formattedCost}`;
    $w(resultId).show();
}
