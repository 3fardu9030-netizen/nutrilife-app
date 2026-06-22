import React, { useState, useMemo } from "react";
import { supabase } from "../lib/supabase"; 

function Calculators() {
  const [inputs, setInputs] = useState({
    weight: "", height: "", age: "", gender: "Male",
    activity: "Moderately Active", neck: "", waist: "", hip: "", goal: "Maintenance"
  });

  const handleInputChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value === "" ? "" : Number(value) || value }));
  };

  // --- CALCULATIONS ---
  const bmi = useMemo(() => {
    if (!inputs.height || !inputs.weight) return "0.0";
    const heightM = inputs.height / 100;
    return (inputs.weight / (heightM * heightM)).toFixed(1);
  }, [inputs.height, inputs.weight]);

  const bodyFat = useMemo(() => {
    if (!inputs.height || !inputs.waist || !inputs.neck) return "0.0";
    let bf = 0;
    if (inputs.gender === "Male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(inputs.waist - inputs.neck) + 0.15456 * Math.log10(inputs.height)) - 450;
    } else {
      if (!inputs.hip) return "0.0";
      bf = 495 / (1.29579 - 0.35004 * Math.log10(inputs.waist + inputs.hip - inputs.neck) + 0.22100 * Math.log10(inputs.height)) - 450;
    }
    return Math.max(0, bf).toFixed(1);
  }, [inputs]);

  const calorieTarget = useMemo(() => {
    if (!inputs.weight || !inputs.height || !inputs.age) return 0;
    let bmr = inputs.gender === "Male" 
        ? 10 * inputs.weight + 6.25 * inputs.height - 5 * inputs.age + 5 
        : 10 * inputs.weight + 6.25 * inputs.height - 5 * inputs.age - 161;
    
    const factors = { "Sedentary": 1.2, "Lightly Active": 1.375, "Moderately Active": 1.55, "Very Active": 1.725 };
    let tdee = Math.round(bmr * (factors[inputs.activity] || 1.2));
    if (inputs.goal === "Loss") tdee -= 500;
    if (inputs.goal === "Gain") tdee += 400;
    return tdee;
  }, [inputs]);

  const waterTarget = useMemo(() => inputs.weight ? (inputs.weight * 0.035).toFixed(1) : "0.0", [inputs.weight]);
  const proteinTarget = useMemo(() => inputs.weight ? Math.round(inputs.weight * 1.6) : 0, [inputs.weight]);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto" id="printable-report">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Health Calculator Engine</h1>
        
        {/* Print Button: Hidden during print */}
        <button 
          onClick={() => window.print()}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition print:hidden"
        >
          <i className="fa-solid fa-print mr-2"></i> Print Report
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:hidden">
        <input type="number" placeholder="Weight (kg)" className="border p-2 rounded" onChange={e => handleInputChange("weight", e.target.value)} />
        <input type="number" placeholder="Height (cm)" className="border p-2 rounded" onChange={e => handleInputChange("height", e.target.value)} />
        <input type="number" placeholder="Age" className="border p-2 rounded" onChange={e => handleInputChange("age", e.target.value)} />
        <select className="border p-2 rounded" onChange={e => handleInputChange("gender", e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="number" placeholder="Neck (cm)" className="border p-2 rounded" onChange={e => handleInputChange("neck", e.target.value)} />
        <input type="number" placeholder="Waist (cm)" className="border p-2 rounded" onChange={e => handleInputChange("waist", e.target.value)} />
        {inputs.gender === "Female" && (
           <input type="number" placeholder="Hip (cm)" className="border p-2 rounded" onChange={e => handleInputChange("hip", e.target.value)} />
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="border p-4 text-center rounded bg-slate-50"><strong>BMI</strong><br/>{bmi}</div>
        <div className="border p-4 text-center rounded bg-slate-50"><strong>Body Fat</strong><br/>{bodyFat}%</div>
        <div className="border p-4 text-center rounded bg-slate-50"><strong>Calories</strong><br/>{calorieTarget}</div>
        <div className="border p-4 text-center rounded bg-slate-50"><strong>Water (L)</strong><br/>{waterTarget}</div>
        <div className="border p-4 text-center rounded bg-slate-50"><strong>Protein (g)</strong><br/>{proteinTarget}</div>
      </div>
    </div>
  );
}

export default Calculators;