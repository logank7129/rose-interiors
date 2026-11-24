import wixWindow from "wix-window";

$w.onReady(function () {

    const device = wixWindow.formFactor;  // Desktop / Tablet / Mobile

    // ---------------------------------------
    // SELECT CORRECT IDs BASED ON DEVICE
    // ---------------------------------------

    let layoutId, sizeId, packId, themeId, calcBtnId, resultId;

    if (device === "Desktop") {
        layoutId = "#kitchenLayout";
        sizeId = "#kitchenMeasurement";
        packId = "#packageSelect";
        themeId = "#finalTheme";
        calcBtnId = "#calculateBtn";
        resultId = "#resultText";
    }

    if (device === "Tablet") {
        layoutId = "#tKitchenLayout";
        sizeId = "#tKitchenMeasurement";
        packId = "#tPackageSelect";
        themeId = "#tFinalTheme";
        calcBtnId = "#tCalculateBtn";
        resultId = "#tResultText";
    }

    if (device === "Mobile") {
        layoutId = "#mKitchenLayout";
        sizeId = "#mKitchenMeasurement";
        packId = "#mPackageSelect";
        themeId = "#mFinalTheme";
        calcBtnId = "#mCalculateBtn";
        resultId = "#mResultText";
    }

    // ---------------------------------------
    // HIDE RESULT INITIALLY
    // ---------------------------------------
    if ($w(resultId)) {
        $w(resultId).hide();
    }

    // ---------------------------------------
    // SET OPTIONS FOR DROPDOWNS
    // ---------------------------------------
    if ($w(layoutId)) {
        $w(layoutId).options = [
            { label: "L-Shape Kitchen", value: "L-Shape" },
            { label: "U-Shape Kitchen", value: "U-Shape" },
            { label: "Parallel / Galley Kitchen", value: "Parallel" },
            { label: "Straight Kitchen", value: "Straight" },
            { label: "Island Kitchen", value: "Island" }
        ];
    }

    if ($w(sizeId)) {
        $w(sizeId).options = [
            { label: "Small (40–60 sq.ft)", value: "Small" },
            { label: "Medium (60–100 sq.ft)", value: "Medium" },
            { label: "Large (100–150 sq.ft)", value: "Large" },
            { label: "Extra Large (150+ sq.ft)", value: "XL" }
        ];
    }

    if ($w(packId)) {
        $w(packId).options = [
            { label: "Basic", value: "Basic" },
            { label: "Premium", value: "Premium" },
            { label: "Luxury", value: "Luxury" }
        ];
    }

    if ($w(themeId)) {
        $w(themeId).options = [
            { label: "Modern", value: "Modern" },
            { label: "Contemporary", value: "Contemporary" },
            { label: "Minimalist", value: "Minimalist" },
            { label: "Classic", value: "Classic" },
            { label: "Industrial", value: "Industrial" }
        ];
    }

    // ---------------------------------------
    // CALCULATION LOGIC (USED FOR ALL DEVICES)
    // ---------------------------------------

    function calculateKitchenCost() {

        const layout = $w(layoutId).value;
        const size = $w(sizeId).value;
        const pack = $w(packId).value;
        const theme = $w(themeId).value;

        if (!layout || !size || !pack || !theme) {
            $w(resultId).text = "Please fill all fields.";
            $w(resultId).show();
            return;
        }

        const sizeBaseCost = {
            "Small": 30000,
            "Medium": 45000,
            "Large": 60000,
            "XL": 80000
        };

        const layoutCost = {
            "Straight": 0,
            "Parallel": 4000,
            "L-Shape": 6000,
            "U-Shape": 8000,
            "Island": 10000
        };

        const packageMultiplier = {
            "Basic": 1.0,
            "Premium": 1.15,
            "Luxury": 1.3
        };

        const themeMultiplier = {
            "Modern": 1.05,
            "Contemporary": 1.08,
            "Minimalist": 1.03,
            "Classic": 1.10,
            "Industrial": 1.12
        };

        let base = sizeBaseCost[size] || 40000;
        let extra = layoutCost[layout] || 0;

        let total = (base + extra);
        total *= packageMultiplier[pack] || 1;
        total *= themeMultiplier[theme] || 1;

        let finalPrice = "₹" + Math.round(total).toLocaleString("en-IN");

        $w(resultId).text = finalPrice;
        $w(resultId).show();
    }

    // ---------------------------------------
    // BUTTON CLICK EVENT
    // ---------------------------------------

    if ($w(calcBtnId)) {
        $w(calcBtnId).onClick(() => {
            calculateKitchenCost();
        });
    }
});
