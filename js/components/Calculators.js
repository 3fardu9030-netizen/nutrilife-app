const Calculators = () => {

    // =========================
    // SUPABASE CONFIG
    // =========================
    const supabaseUrl = 'https://msabqzswtyujglgtjoum.supabase.co';
    const supabaseAnonKey = 'sb_publishable_3eU-kOn3yGHWC53T9ZPuMA_b8gwkb6Z';

    const supabase = window.supabase.createClient(
        supabaseUrl,
        supabaseAnonKey
    );

    // =========================
    // AUTH STATES
    // =========================
    const [user, setUser] = React.useState(null);
    const [authEmail, setAuthEmail] = React.useState('');
    const [authPassword, setAuthPassword] = React.useState('');
    const [authLoading, setAuthLoading] = React.useState(false);

    // =========================
    // LOGIN SESSION TRACKING
    // =========================
    React.useEffect(() => {

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

    }, []);

    // =========================
    // AUTH FUNCTIONS
    // =========================

    const handleSignUp = async (e) => {
        e.preventDefault();

        setAuthLoading(true);

        const { error } = await supabase.auth.signUp({
            email: authEmail,
            password: authPassword
        });

        if (error) {
            alert(error.message);
        } else {
            alert('Success! Check your email for verification.');
        }

        setAuthLoading(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setAuthLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: authEmail,
            password: authPassword
        });

        if (error) {
            alert(error.message);
        }

        setAuthLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

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
    // INPUT HANDLER
    // =========================
    const handleInputChange = (key, value) => {
        setInputs({
            ...inputs,
            [key]: value
        });
    };

    // =========================
    // BMI
    // =========================
    const bmi = React.useMemo(() => {

        const heightM = inputs.height / 100;

        return (
            inputs.weight /
            (heightM * heightM)
        ).toFixed(1);

    }, [inputs.weight, inputs.height]);

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
        return ((inputs.weight * 0.035) + 0.4).toFixed(1);
    }, [inputs.weight]);

    // =========================
    // BODY FAT
    // =========================
    const bodyFat = React.useMemo(() => {

        const h = inputs.height / 2.54;
        const w = inputs.waist / 2.54;
        const n = inputs.neck / 2.54;
        const hip = inputs.hip / 2.54;

        try {

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
            return 20;
        }

    }, [inputs]);

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
                                onClick={handleLogin}
                                disabled={authLoading}
                                className="flex-1 bg-blue-600 text-white p-2 rounded"
                            >
                                Login
                            </button>

                            <button
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
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Logout
                        </button>

                    </div>

                    {/* TAB BAR */}
                    <div className="flex gap-2 flex-wrap">

                        {['bmi', 'calorie', 'water', 'protein', 'fat'].map((tab) => (

                            <button
                                key={tab}
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

                    {/* MAIN CONTENT */}
                    <div className="grid lg:grid-cols-2 gap-6">

                        {/* INPUTS */}
                        <div className="bg-white rounded-xl shadow p-6 space-y-4">

                            <h2 className="font-bold text-xl">
                                Parameters
                            </h2>

                            <input
                                type="number"
                                value={inputs.height}
                                onChange={(e) =>
                                    handleInputChange(
                                        'height',
                                        parseFloat(e.target.value)
                                    )
                                }
                                placeholder="Height"
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="number"
                                value={inputs.weight}
                                onChange={(e) =>
                                    handleInputChange(
                                        'weight',
                                        parseFloat(e.target.value)
                                    )
                                }
                                placeholder="Weight"
                                className="w-full border p-2 rounded"
                            />

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
                                <div>
                                    <h2 className="text-3xl font-bold">
                                        {calorieTarget} kcal/day
                                    </h2>
                                </div>
                            )}

                            {activeTab === 'water' && (
                                <div>
                                    <h2 className="text-3xl font-bold">
                                        {waterTarget} Liters/day
                                    </h2>
                                </div>
                            )}

                            {activeTab === 'protein' && (
                                <div>
                                    <h2 className="text-3xl font-bold">
                                        {proteinTarget}g Protein/day
                                    </h2>
                                </div>
                            )}

                            {activeTab === 'fat' && (
                                <div>
                                    <h2 className="text-3xl font-bold">
                                        {bodyFat}% Body Fat
                                    </h2>
                                </div>
                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

window.Calculators = Calculators;