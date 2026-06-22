import React, { useState, useEffect, useMemo } from "react";
// This will now work correctly because of the alias in supabase.js
import { supabaseClient } from "../lib/supabase"; 

function Calculators() {
  const [user, setUser] = useState(null);
  const [inputs, setInputs] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "Male",
    activity: "Moderately Active",
    neck: "",
    waist: "",
    hip: "",
    goal: "Maintenance"
  });

  useEffect(() => {
    // Check session on mount
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []); // Empty dependency array is correct here as the client instance is stable

  const handleInputChange = (key, value) => {
    setInputs(prev => ({
      ...prev,
      [key]: value === "" ? "" : value
    }));
  };

  // Metabolic formulas remain unchanged...
  const bmi = useMemo(() => {
    if (!inputs.height || !inputs.weight) return "0.0";
    const heightM = inputs.height / 100;
    return (inputs.weight / (heightM * heightM)).toFixed(1);
  }, [inputs.height, inputs.weight]);

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

  const waterTarget = useMemo(() => {
    return inputs.weight ? (inputs.weight * 0.035 + 0.4).toFixed(1) : "0.0";
  }, [inputs.weight]);

  const proteinTarget = useMemo(() => {
    return inputs.weight ? Math.round(inputs.weight * 1.6) : 0;
  }, [inputs.weight]);

  return (
    // ... your existing JSX remains perfectly fine
    <div className="space-y-8 page-transition">
      {/* Ensure your UI layout remains as you defined */}
    </div>
  );
}

export default Calculators;