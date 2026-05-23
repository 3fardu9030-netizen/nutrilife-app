const Calculators = () => {

    // =========================
    // SUPABASE CLIENT
    // =========================
    const supabase = window.supabaseClient;

    if (!supabase) {
        return (
            <div className="p-10 text-red-500 text-center">
                Supabase failed to load.
            </div>
        );
    }

    // =========================
    // AUTH STATES
    // =========================
    const [user, setUser] = React.useState(null);
    const [authEmail, setAuthEmail] = React.useState('');
    const [authPassword, setAuthPassword] = React.useState('');
    const [authLoading, setAuthLoading] = React.useState(false);

    // =========================
    // ACTIVE TAB
    // =========================
    const [activeTab, setActiveTab] = React.useState('bmi');

    // =========================
    // INPUT STATES
    // =========================
    const [inputs, setInputs] = React.useState({
        weight: 70,
        height: 175,
        age: 28,
        gender: 'Male',
        activity: 'Moderately Active',
        neck: 38,
        waist: 84,
        hip: 94,
        goal: 'Maintenance'
    });

    // =========================
    // SESSION TRACKING
    // =========================
    React.useEffect(() => {

        if (!supabase) {
            console.error('Supabase client not found');
            return;
        }

        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };

    }, [supabase]);

    // =========================
    // INPUT HANDLER
    // =========================
    const handleInputChange = (key, value) => {

        setInputs(prev => ({
            ...prev,
            [key]: value
        }));

    };

    // =========================
    // SIGN UP
    // =========================
    const handleSignUp = async () => {

        if (!authEmail || !authPassword) {
            alert('Please enter email and password');
            return;
        }

        try {

            setAuthLoading(true);

            const { error } = await supabase.auth.signUp({
                email: authEmail,
                password: authPassword
            });

            if (error) {
                alert(error.message);
            } else {
                alert('Signup successful! Check your email.');
            }

        } catch (err) {

            console.error(err);
            alert('Signup failed');

        } finally {

            setAuthLoading(false);

        }
    };

    // =========================
    // LOGIN
    // =========================
    const handleLogin = async () => {

        if (!authEmail || !authPassword) {
            alert('Please enter email and password');
            return;
        }

        try {

            setAuthLoading(true);

            const { error } = await supabase.auth.signInWithPassword({
                email: authEmail,
                password: authPassword
            });

            if (error) {
                alert(error.message);
            }

        } catch (err) {

            console.error(err);
            alert('Login failed');

        } finally {

            setAuthLoading(false);

        }
    };

    // =========================
    // LOGOUT
    // =========================
    const handleLogout = async () => {

        try {
            await supabase.auth.signOut();
        } catch (err) {
            console.error(err);
        }

    };

    // =========================
    // BMI
    // =========================
    const bmi = React.useMemo(() => {

        if (!inputs.height || !inputs.weight) {
            return 0;
        }

        const heightM = inputs.height / 100;

        return (
            inputs.weight /
            (heightM * heightM)
        ).toFixed(1);

    }, [inputs.height, inputs.weight]);

    // =========================
    // BMI STATUS
    // =========================
    const bmiStatus = React.useMemo(() => {

        const val = parseFloat(bmi);

        if (val < 18.5) {
            return {
                name: 'Underweight',
                color: 'text-blue-500 bg-blue-100'
            };
        }

        if (val < 25) {
            return {
                name: 'Normal',
                color: 'text-green-500 bg-green-100'
            };
        }

        if (val < 30) {
            return {
                name: 'Overweight',
                color: 'text-yellow-500 bg-yellow-100'
            };
        }

        return {
            name: 'Obese',
            color: 'text-red-500 bg-red-100'
        };

    }, [bmi]);

    // =========================
    // CALORIES
    // =========================
    const calorieTarget = React.useMemo(() => {

        let bmr = 0;

        if (inputs.gender === 'Male') {

            bmr =
                10 * inputs.weight +
                6.25 * inputs.height -
                5 * inputs.age +
                5;

        } else {

            bmr =
                10 * inputs.weight +
                6.25 * inputs.height -
                5 * inputs.age -
                161;
        }

        const factors = {
            Sedentary: 1.2,
            'Lightly Active': 1.375,
            'Moderately Active': 1.55,
            'Very Active': 1.725
        };

        const tdee = Math.round(
            bmr * factors[inputs.activity]
        );

        if (inputs.goal === 'Loss') {
            return tdee - 500;
        }

        if (inputs.goal === 'Gain') {
            return tdee + 400;
        }

        return tdee;

    }, [inputs]);

    // =========================
    // WATER
    // =========================
    const waterTarget = React.useMemo(() => {

        return (
            (inputs.weight * 0.035) + 0.4
        ).toFixed(1);

    }, [inputs.weight]);

    // =========================
    // PROTEIN
    // =========================
    const proteinTarget = React.useMemo(() => {

        let multiplier = 1.2;

        if (inputs.activity === 'Moderately Active') {
            multiplier = 1.6;
        }

        if (inputs.activity === 'Very Active') {
            multiplier = 2.0;
        }

        return Math.round(
            inputs.weight * multiplier
        );

    }, [inputs.weight, inputs.activity]);

    // =========================
    // BODY FAT
    // =========================
    const bodyFat = React.useMemo(() => {

        try {

            const h = inputs.height / 2.54;
            const w = inputs.waist / 2.54;
            const n = inputs.neck / 2.54;
            const hip = inputs.hip / 2.54;

            if (inputs.gender === 'Male') {

                const val =
                    86.01 * Math.log10(w - n) -
                    70.041 * Math.log10(h) +
                    36.76;

                return val.toFixed(1);

            } else {

                const val =
                    163.205 * Math.log10(w + hip - n) -
                    97.684 * Math.log10(h) -
                    78.387;

                return val.toFixed(1);

            }

        } catch {

            return '0';

        }

    }, [inputs]);

    // =========================
    // UI
    // =========================
    return (

        <div className="min-h-screen bg-slate-100 p-4">

            {!user ? (

                <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold mb-6 text-center">
                        NutriLife Login
                    </h2>

                    <div className="space-y-4">

                        <input
                            type="email"
                            placeholder="Email"
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                            className="w-full border p-2 rounded"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            className="w-full border p-2 rounded"
                        />

                        <div className="flex gap-3">

                            <button
                                type="button"
                                onClick={handleLogin}
                                disabled={authLoading}
                                className="flex-1 bg-blue-600 text-white p-2 rounded"
                            >
                                {authLoading ? 'Loading...' : 'Login'}
                            </button>

                            <button
                                type="button"
                                onClick={handleSignUp}
                                disabled={authLoading}
                                className="flex-1 bg-green-600 text-white p-2 rounded"
                            >
                                Sign Up
                            </button>

                        </div>

                    </div>

                </div>

            ) : (

                <div className="max-w-5xl mx-auto space-y-6">

                    {/* HEADER */}
                    <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">

                        <div>
                            Logged in as:
                            <strong> {user.email}</strong>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Logout
                        </button>

                    </div>

                    {/* TABS */}
                    <div className="flex gap-2 flex-wrap">

                        {['bmi', 'calorie', 'water', 'protein', 'fat'].map((tab) => (

                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded font-bold ${
                                    activeTab === tab
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-white'
                                }`}
                            >
                                {tab.toUpperCase()}
                            </button>

                        ))}

                    </div>

                    {/* CONTENT */}
                    <div className="grid lg:grid-cols-2 gap-6">

                        {/* INPUTS */}
                        <div className="bg-white rounded-xl shadow p-6 space-y-4">

                            <h2 className="font-bold text-xl">
                                Parameters
                            </h2>

                            {/* HEIGHT */}
                            <div>
                                <label className="block font-semibold mb-1">
                                    Height (cm)
                                </label>

                                <input
                                    type="number"
                                    value={inputs.height}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'height',
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    className="w-full border p-2 rounded"
                                    placeholder="Enter height"
                                />
                            </div>

                            {/* WEIGHT */}
                            <div>
                                <label className="block font-semibold mb-1">
                                    Weight (kg)
                                </label>

                                <input
                                    type="number"
                                    value={inputs.weight}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'weight',
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    className="w-full border p-2 rounded"
                                    placeholder="Enter weight"
                                />
                            </div>

                            {/* AGE */}
                            <div>
                                <label className="block font-semibold mb-1">
                                    Age
                                </label>

                                <input
                                    type="number"
                                    value={inputs.age}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'age',
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    className="w-full border p-2 rounded"
                                    placeholder="Enter age"
                                />
                            </div>

                            {/* GENDER */}
                            <div>
                                <label className="block font-semibold mb-1">
                                    Gender
                                </label>

                                <select
                                    value={inputs.gender}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'gender',
                                            e.target.value
                                        )
                                    }
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            {/* ACTIVITY */}
                            <div>
                                <label className="block font-semibold mb-1">
                                    Activity Level
                                </label>

                                <select
                                    value={inputs.activity}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'activity',
                                            e.target.value
                                        )
                                    }
                                    className="w-full border p-2 rounded"
                                >
                                    <option>Sedentary</option>
                                    <option>Lightly Active</option>
                                    <option>Moderately Active</option>
                                    <option>Very Active</option>
                                </select>
                            </div>

                            {/* GOAL */}
                            <div>
                                <label className="block font-semibold mb-1">
                                    Goal
                                </label>

                                <select
                                    value={inputs.goal}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'goal',
                                            e.target.value
                                        )
                                    }
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="Loss">Weight Loss</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Gain">Weight Gain</option>
                                </select>
                            </div>

                            {/* BODY FAT EXTRA FIELDS */}
                            {activeTab === 'fat' && (
                                <>
                                    <div>
                                        <label className="block font-semibold mb-1">
                                            Neck (cm)
                                        </label>

                                        <input
                                            type="number"
                                            value={inputs.neck}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'neck',
                                                    parseFloat(e.target.value) || 0
                                                )
                                            }
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold mb-1">
                                            Waist (cm)
                                        </label>

                                        <input
                                            type="number"
                                            value={inputs.waist}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'waist',
                                                    parseFloat(e.target.value) || 0
                                                )
                                            }
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>

                                    {inputs.gender === 'Female' && (
                                        <div>
                                            <label className="block font-semibold mb-1">
                                                Hip (cm)
                                            </label>

                                            <input
                                                type="number"
                                                value={inputs.hip}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'hip',
                                                        parseFloat(e.target.value) || 0
                                                    )
                                                }
                                                className="w-full border p-2 rounded"
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                        </div>

                        {/* OUTPUTS */}
                        <div className="bg-white rounded-xl shadow p-6">

                            {activeTab === 'bmi' && (
                                <div>

                                    <h2 className="text-3xl font-bold">
                                        BMI: {bmi}
                                    </h2>

                                    <p
                                        className={`mt-3 inline-block px-3 py-1 rounded ${bmiStatus.color}`}
                                    >
                                        {bmiStatus.name}
                                    </p>

                                </div>
                            )}

                            {activeTab === 'calorie' && (
                                <h2 className="text-3xl font-bold">
                                    {calorieTarget} kcal/day
                                </h2>
                            )}

                            {activeTab === 'water' && (
                                <h2 className="text-3xl font-bold">
                                    {waterTarget} Liters/day
                                </h2>
                            )}

                            {activeTab === 'protein' && (
                                <h2 className="text-3xl font-bold">
                                    {proteinTarget}g Protein/day
                                </h2>
                            )}

                            {activeTab === 'fat' && (
                                <h2 className="text-3xl font-bold">
                                    {bodyFat}% Body Fat
                                </h2>
                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

window.Calculators = Calculators;