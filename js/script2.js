function calculateNutriscore(energy, sugars, saturatedFat, sodium, proteins) {
    // Les seuils pour chaque composant 
    const thresholds = {
        "energy": [335, 670, 1000, 1660],
        "sugars": [4.5, 9, 13.5, 18],
        "saturated_fat": [1, 2, 3, 4],
        "sodium": [90, 180, 270, 360],
        "proteins": [1, 2, 3, 4],
    };
    // Points attribués pour chaque composant 
    const points = {
        "energy": [0, 1, 2, 3, 4],
        "sugars": [0, 1, 2, 3, 4],
        "saturated_fat": [0, 1, 2, 3, 4],
        "sodium": [0, 1, 2, 3, 4],
        "proteins": [0, 1, 2, 3, 4],
    };
    // Calcul du Nutri-Score 
    let nutriscore = 0;
    const components = ["energy", "sugars", "saturated_fat", "sodium", "proteins"];
    for (const component of components) {
        for (let i = 0; i < thresholds[component].length; i++) {
            if (component === "proteins" && i === 2) continue;
            if (component === "sodium" && i === 1) continue;
            if (component === "saturated_fat" && i === 1) continue;
            if (component === "sugars" && i === 0) continue;
            if (component === "energy" && i === 0) continue;
            if (component === "proteins" && i === 0 && proteins <= thresholds[component][i]) {
                nutriscore += points[component][i];
            } else if (component === "sugars" && i === 0 && sugars <= thresholds[component][i]) {
                nutriscore += points[component][i];
            } else if (component === "saturated_fat" && i === 0 && saturatedFat <= thresholds[component][i]) {
                nutriscore += points[component][i];
            } else if (component === "sodium" && i === 0 && sodium <= thresholds[component][i]) {
                nutriscore += points[component][i];
            } else if (component === "energy" && i === 0 && energy <= thresholds[component][i]) {
                nutriscore += points[component][i];
            } else if ((thresholds[component][i] <= energy && component === "energy") ||
                (thresholds[component][i] <= sugars && component === "sugars") ||
                (thresholds[component][i] <= saturatedFat && component === "saturated_fat") ||
                (thresholds[component][i] <= sodium && component === "sodium") ||
                (thresholds[component][i] <= proteins && component === "proteins")) {
                nutriscore += points[component][i];
            }
        }
    }
    return nutriscore;
}

// get the data


// ------------------------------------
//  colored yhe results
const convert_score_to_color = (score) => {
    if(0 <= score && score <= 2) {
        return "#32de84"
    }else if (3 <= score && score <= 10) {
        return"#FFFF00"
    }else if(11 <= score && score <= 18) {
        return "#ffa500"
    }else {
        return "#FF0000"
    }
}
// ------------------------------------


const btn = document.querySelector('button');
btn.addEventListener('click', ()=> {
    const energyInput = document.querySelector("#energy");
    const sugarsInput = document.querySelector("#sugars");
    const saturatedFatInput = document.querySelector("#saturated_fat");
    const sodiumInput = document.querySelector("#sodium");
    const proteinsInput = document.querySelector("#proteins");

    const energy = parseFloat(energyInput.value);
    const sugars = parseFloat(sugarsInput.value);
    const saturatedFat = parseFloat(saturatedFatInput.value);
    const sodium = parseFloat(sodiumInput.value);
    const proteins = parseFloat(proteinsInput.value);
    
    const result = calculateNutriscore(energy, sugars, saturatedFat, sodium, proteins);
    console.log(`Nutri-Score: ${result}`);
    document.querySelector('#nutriScoreResult').classList.add('contor');
    document.querySelector('#nutriScoreResult').style.color = convert_score_to_color(result)
    // if (proteins >= 4) {
    //     document.querySelector('#nutriScoreResult').innerHTML = "Protiene Value Must be less then 4"
    // }else{
        document.querySelector('#nutriScoreResult').innerHTML = result;
    // }
    // Clear the input fields
    // energyInput.value = "";
    // sugarsInput.value = "";
    // saturatedFatInput.value = "";
    // sodiumInput.value = "";
    // proteinsInput.value = "";
    let colored = convert_score_to_color(result); 
    console.log(colored)
})
