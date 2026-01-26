import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Dashboard',
        upload: 'Upload Reports',
        assistant: 'AI Assistant',
        doctors: 'Find Doctors',
        nearby: 'Nearby Care',
        medicines: 'Medicines',
        history: 'History',
        help: 'Help & Safety',
        settings: 'Settings',
        myHealth: 'My Health',
        stage: 'Disease Stage',
        carePlan: 'Care Plan',
        precautions: 'Precautions',
        lifestyle: 'Diet & Exercise',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        profile: 'Profile'
      },
      // Auth
      auth: {
        email: 'Email',
        password: 'Password',
        name: 'Full Name',
        confirmPassword: 'Confirm Password',
        loginTitle: 'Welcome Back',
        loginSubtitle: 'Sign in to continue your health journey',
        registerTitle: 'Create Account',
        registerSubtitle: 'Start your personalized health experience',
        forgotPassword: 'Forgot password?',
        noAccount: "Don't have an account?",
        hasAccount: 'Already have an account?',
        signUp: 'Sign Up',
        signIn: 'Sign In',
        locationMode: 'Location Mode',
        autoLocation: 'Use Current Location',
        manualLocation: 'Enter Location Manually',
        locationPlaceholder: 'Enter city, pincode or address',
        selectLanguage: 'Preferred Language'
      },
      // Dashboard
      dashboard: {
        welcome: 'Welcome back',
        healthOverview: 'Health Overview',
        recentUploads: 'Recent Uploads',
        quickActions: 'Quick Actions',
        uploadReport: 'Upload Report',
        findDoctor: 'Find Doctor',
        nearbyHospital: 'Nearby Hospital',
        askAI: 'Ask AI',
        noUploads: 'No uploads yet',
        startUploading: 'Upload your first medical document to get started'
      },
      // Upload
      upload: {
        title: 'Upload Medical Documents',
        subtitle: 'Upload your prescriptions, lab reports, or medical images',
        dropzone: 'Drag and drop files here, or click to browse',
        supportedFormats: 'Supported: PDF, JPG, PNG, TXT',
        orPaste: 'Or paste text directly',
        textPlaceholder: 'Paste prescription or medical text here...',
        orLink: 'Or enter a link',
        linkPlaceholder: 'Enter URL to medical document',
        uploadBtn: 'Upload',
        processing: 'Processing...',
        success: 'Upload successful!',
        analyzing: 'Analyzing document...'
      },
      // AI Assistant
      assistant: {
        title: 'AI Health Assistant',
        subtitle: 'Ask any health-related question',
        placeholder: 'Type your health question...',
        send: 'Send',
        voiceInput: 'Voice Input',
        listening: 'Listening...',
        disclaimer: 'This is for awareness only. Please consult a licensed doctor.',
        medicalOnly: 'I can only help with medical and health-related questions.'
      },
      // Doctors
      doctors: {
        title: 'Find Doctors',
        search: 'Search by condition or specialty',
        filters: 'Filters',
        specialty: 'Specialty',
        rating: 'Rating',
        distance: 'Distance',
        availability: 'Availability',
        callNow: 'Call Now',
        viewProfile: 'View Profile',
        feedback: 'Leave Feedback',
        reviews: 'Reviews',
        experience: 'years experience',
        conditions: 'Treats'
      },
      // Nearby
      nearby: {
        title: 'Nearby Healthcare',
        subtitle: 'Find hospitals, clinics, and pharmacies near you',
        hospitals: 'Hospitals',
        clinics: 'Clinics',
        pharmacies: 'Pharmacies',
        directions: 'Get Directions',
        distance: 'away',
        updateLocation: 'Update Location',
        yourLocation: 'Your Location',
        makeCall: 'Make Call',
        maps: 'Maps'
      },
      // Medicines
      medicines: {
        title: 'Your Medicines',
        subtitle: 'Manage your prescriptions and find pharmacies',
        availability: 'Check Availability',
        nearbyPharmacies: 'Nearby Pharmacies',
        orderOnline: 'Order Online',
        noMedicines: 'No medicines found',
        uploadPrescription: 'Upload a prescription to see your medicines'
      },
      // My Health
      myHealth: {
        stageTitle: 'Health Stage',
        stageSubtitle: 'Track your health journey',
        carePlanTitle: 'Care Plan',
        carePlanSubtitle: 'Your personalized care recommendations',
        precautionsTitle: 'Precautions',
        precautionsSubtitle: 'Important safety guidelines',
        lifestyleTitle: 'Diet & Exercise',
        lifestyleSubtitle: 'Healthy living recommendations',
        doTitle: 'Do',
        dontTitle: "Don't",
        warningSignsTitle: 'Warning Signs',
        dietTab: 'Diet',
        exerciseTab: 'Exercise'
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
        retry: 'Retry',
        save: 'Save',
        cancel: 'Cancel',
        close: 'Close',
        confirm: 'Confirm',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        back: 'Back',
        next: 'Next',
        search: 'Search',
        noResults: 'No results found',
        seeAll: 'See All'
      },
      // Help
      help: {
        title: 'Help & Safety',
        subtitle: 'Emergency contacts and safety information',
        emergency: 'Emergency',
        ambulance: 'Ambulance',
        emergencyNumber: '108 / 112',
        callEmergency: 'Call Emergency Services',
        faq: 'Frequently Asked Questions',
        contact: 'Contact Support'
      },
      // Settings
      settings: {
        title: 'Settings',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
        system: 'System',
        language: 'Language',
        location: 'Location',
        notifications: 'Notifications',
        privacy: 'Privacy',
        about: 'About'
      }
    }
  },
  hi: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'डैशबोर्ड',
        upload: 'रिपोर्ट अपलोड करें',
        assistant: 'AI सहायक',
        doctors: 'डॉक्टर खोजें',
        nearby: 'नजदीकी देखभाल',
        medicines: 'दवाइयाँ',
        history: 'इतिहास',
        help: 'मदद और सुरक्षा',
        settings: 'सेटिंग्स',
        myHealth: 'मेरा स्वास्थ्य',
        stage: 'रोग चरण',
        carePlan: 'देखभाल योजना',
        precautions: 'सावधानियाँ',
        lifestyle: 'आहार और व्यायाम',
        login: 'लॉगिन',
        register: 'रजिस्टर',
        logout: 'लॉगआउट',
        profile: 'प्रोफाइल'
      },
      // Auth
      auth: {
        email: 'ईमेल',
        password: 'पासवर्ड',
        name: 'पूरा नाम',
        confirmPassword: 'पासवर्ड की पुष्टि करें',
        loginTitle: 'वापस स्वागत है',
        loginSubtitle: 'अपनी स्वास्थ्य यात्रा जारी रखने के लिए साइन इन करें',
        registerTitle: 'खाता बनाएं',
        registerSubtitle: 'अपना व्यक्तिगत स्वास्थ्य अनुभव शुरू करें',
        forgotPassword: 'पासवर्ड भूल गए?',
        noAccount: 'खाता नहीं है?',
        hasAccount: 'पहले से खाता है?',
        signUp: 'साइन अप',
        signIn: 'साइन इन',
        locationMode: 'स्थान मोड',
        autoLocation: 'वर्तमान स्थान का उपयोग करें',
        manualLocation: 'स्थान मैन्युअल रूप से दर्ज करें',
        locationPlaceholder: 'शहर, पिनकोड या पता दर्ज करें',
        selectLanguage: 'पसंदीदा भाषा'
      },
      // Dashboard
      dashboard: {
        welcome: 'वापस स्वागत है',
        healthOverview: 'स्वास्थ्य सारांश',
        recentUploads: 'हाल की अपलोड',
        quickActions: 'त्वरित कार्य',
        uploadReport: 'रिपोर्ट अपलोड करें',
        findDoctor: 'डॉक्टर खोजें',
        nearbyHospital: 'नजदीकी अस्पताल',
        askAI: 'AI से पूछें',
        noUploads: 'अभी तक कोई अपलोड नहीं',
        startUploading: 'शुरू करने के लिए अपना पहला मेडिकल दस्तावेज़ अपलोड करें'
      },
      // Upload
      upload: {
        title: 'मेडिकल दस्तावेज़ अपलोड करें',
        subtitle: 'अपने प्रिस्क्रिप्शन, लैब रिपोर्ट या मेडिकल इमेज अपलोड करें',
        dropzone: 'फाइलें यहां खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें',
        supportedFormats: 'समर्थित: PDF, JPG, PNG, TXT',
        orPaste: 'या टेक्स्ट सीधे पेस्ट करें',
        textPlaceholder: 'प्रिस्क्रिप्शन या मेडिकल टेक्स्ट यहां पेस्ट करें...',
        orLink: 'या लिंक दर्ज करें',
        linkPlaceholder: 'मेडिकल दस्तावेज़ का URL दर्ज करें',
        uploadBtn: 'अपलोड करें',
        processing: 'प्रोसेसिंग...',
        success: 'अपलोड सफल!',
        analyzing: 'दस्तावेज़ का विश्लेषण हो रहा है...'
      },
      // AI Assistant
      assistant: {
        title: 'AI स्वास्थ्य सहायक',
        subtitle: 'कोई भी स्वास्थ्य संबंधी प्रश्न पूछें',
        placeholder: 'अपना स्वास्थ्य प्रश्न टाइप करें...',
        send: 'भेजें',
        voiceInput: 'वॉइस इनपुट',
        listening: 'सुन रहा है...',
        disclaimer: 'यह केवल जागरूकता के लिए है। कृपया लाइसेंस प्राप्त डॉक्टर से परामर्श करें।',
        medicalOnly: 'मैं केवल चिकित्सा और स्वास्थ्य संबंधी प्रश्नों में मदद कर सकता हूं।'
      },
      // Doctors
      doctors: {
        title: 'डॉक्टर खोजें',
        search: 'स्थिति या विशेषता से खोजें',
        filters: 'फ़िल्टर',
        specialty: 'विशेषता',
        rating: 'रेटिंग',
        distance: 'दूरी',
        availability: 'उपलब्धता',
        callNow: 'अभी कॉल करें',
        viewProfile: 'प्रोफाइल देखें',
        feedback: 'फीडबैक दें',
        reviews: 'समीक्षाएं',
        experience: 'वर्षों का अनुभव',
        conditions: 'इलाज करते हैं'
      },
      // Nearby
      nearby: {
        title: 'नजदीकी स्वास्थ्य सेवा',
        subtitle: 'अपने पास अस्पताल, क्लिनिक और फार्मेसी खोजें',
        hospitals: 'अस्पताल',
        clinics: 'क्लिनिक',
        pharmacies: 'फार्मेसी',
        directions: 'दिशा-निर्देश प्राप्त करें',
        distance: 'दूर',
        updateLocation: 'स्थान अपडेट करें',
        yourLocation: 'आपका स्थान',
        makeCall: 'कॉल करें',
        maps: 'मानचित्र'
      },
      // Medicines
      medicines: {
        title: 'आपकी दवाइयाँ',
        subtitle: 'अपने प्रिस्क्रिप्शन प्रबंधित करें और फार्मेसी खोजें',
        availability: 'उपलब्धता जांचें',
        nearbyPharmacies: 'नजदीकी फार्मेसी',
        orderOnline: 'ऑनलाइन ऑर्डर करें',
        noMedicines: 'कोई दवाई नहीं मिली',
        uploadPrescription: 'अपनी दवाइयाँ देखने के लिए प्रिस्क्रिप्शन अपलोड करें'
      },
      // My Health
      myHealth: {
        stageTitle: 'स्वास्थ्य चरण',
        stageSubtitle: 'अपनी स्वास्थ्य यात्रा ट्रैक करें',
        carePlanTitle: 'देखभाल योजना',
        carePlanSubtitle: 'आपकी व्यक्तिगत देखभाल सिफारिशें',
        precautionsTitle: 'सावधानियाँ',
        precautionsSubtitle: 'महत्वपूर्ण सुरक्षा दिशानिर्देश',
        lifestyleTitle: 'आहार और व्यायाम',
        lifestyleSubtitle: 'स्वस्थ जीवन की सिफारिशें',
        doTitle: 'करें',
        dontTitle: 'न करें',
        warningSignsTitle: 'चेतावनी के संकेत',
        dietTab: 'आहार',
        exerciseTab: 'व्यायाम'
      },
      // Common
      common: {
        loading: 'लोड हो रहा है...',
        error: 'कुछ गलत हो गया',
        retry: 'पुनः प्रयास करें',
        save: 'सहेजें',
        cancel: 'रद्द करें',
        close: 'बंद करें',
        confirm: 'पुष्टि करें',
        delete: 'हटाएं',
        edit: 'संपादित करें',
        view: 'देखें',
        back: 'वापस',
        next: 'अगला',
        search: 'खोजें',
        noResults: 'कोई परिणाम नहीं मिला',
        seeAll: 'सभी देखें'
      },
      // Help
      help: {
        title: 'मदद और सुरक्षा',
        subtitle: 'आपातकालीन संपर्क और सुरक्षा जानकारी',
        emergency: 'आपातकालीन',
        ambulance: 'एम्बुलेंस',
        emergencyNumber: '108 / 112',
        callEmergency: 'आपातकालीन सेवाओं को कॉल करें',
        faq: 'अक्सर पूछे जाने वाले प्रश्न',
        contact: 'सहायता से संपर्क करें'
      },
      // Settings
      settings: {
        title: 'सेटिंग्स',
        theme: 'थीम',
        light: 'लाइट',
        dark: 'डार्क',
        system: 'सिस्टम',
        language: 'भाषा',
        location: 'स्थान',
        notifications: 'नोटिफिकेशन',
        privacy: 'गोपनीयता',
        about: 'के बारे में'
      }
    }
  },
  te: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'డాష్‌బోర్డ్',
        upload: 'రిపోర్టులు అప్‌లోడ్ చేయండి',
        assistant: 'AI సహాయకుడు',
        doctors: 'డాక్టర్లను కనుగొనండి',
        nearby: 'సమీప సంరక్షణ',
        medicines: 'మందులు',
        history: 'చరిత్ర',
        help: 'సహాయం & భద్రత',
        settings: 'సెట్టింగ్‌లు',
        myHealth: 'నా ఆరోగ్యం',
        stage: 'వ్యాధి దశ',
        carePlan: 'సంరక్షణ ప్రణాళిక',
        precautions: 'జాగ్రత్తలు',
        lifestyle: 'ఆహారం & వ్యాయామం',
        login: 'లాగిన్',
        register: 'రిజిస్టర్',
        logout: 'లాగ్ అవుట్',
        profile: 'ప్రొఫైల్'
      },
      // Auth
      auth: {
        email: 'ఇమెయిల్',
        password: 'పాస్‌వర్డ్',
        name: 'పూర్తి పేరు',
        confirmPassword: 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
        loginTitle: 'తిరిగి స్వాగతం',
        loginSubtitle: 'మీ ఆరోగ్య ప్రయాణాన్ని కొనసాగించడానికి సైన్ ఇన్ చేయండి',
        registerTitle: 'ఖాతా సృష్టించండి',
        registerSubtitle: 'మీ వ్యక్తిగత ఆరోగ్య అనుభవాన్ని ప్రారంభించండి',
        forgotPassword: 'పాస్‌వర్డ్ మరచిపోయారా?',
        noAccount: 'ఖాతా లేదా?',
        hasAccount: 'ఇప్పటికే ఖాతా ఉందా?',
        signUp: 'సైన్ అప్',
        signIn: 'సైన్ ఇన్',
        locationMode: 'స్థాన మోడ్',
        autoLocation: 'ప్రస్తుత స్థానాన్ని ఉపయోగించండి',
        manualLocation: 'స్థానాన్ని మాన్యువల్‌గా నమోదు చేయండి',
        locationPlaceholder: 'నగరం, పిన్‌కోడ్ లేదా చిరునామా నమోదు చేయండి',
        selectLanguage: 'ఇష్టపడే భాష'
      },
      // Dashboard
      dashboard: {
        welcome: 'తిరిగి స్వాగతం',
        healthOverview: 'ఆరోగ్య సారాంశం',
        recentUploads: 'ఇటీవల అప్‌లోడ్‌లు',
        quickActions: 'త్వరిత చర్యలు',
        uploadReport: 'రిపోర్ట్ అప్‌లోడ్ చేయండి',
        findDoctor: 'డాక్టర్‌ను కనుగొనండి',
        nearbyHospital: 'సమీప ఆసుపత్రి',
        askAI: 'AIని అడగండి',
        noUploads: 'ఇంకా అప్‌లోడ్‌లు లేవు',
        startUploading: 'ప్రారంభించడానికి మీ మొదటి వైద్య పత్రాన్ని అప్‌లోడ్ చేయండి'
      },
      // Upload
      upload: {
        title: 'వైద్య పత్రాలను అప్‌లోడ్ చేయండి',
        subtitle: 'మీ ప్రిస్క్రిప్షన్‌లు, లాబ్ రిపోర్ట్‌లు లేదా వైద్య చిత్రాలను అప్‌లోడ్ చేయండి',
        dropzone: 'ఫైల్‌లను ఇక్కడ డ్రాగ్ చేసి వదలండి, లేదా బ్రౌజ్ చేయడానికి క్లిక్ చేయండి',
        supportedFormats: 'మద్దతు: PDF, JPG, PNG, TXT',
        orPaste: 'లేదా టెక్స్ట్‌ను నేరుగా పేస్ట్ చేయండి',
        textPlaceholder: 'ప్రిస్క్రిప్షన్ లేదా వైద్య టెక్స్ట్‌ను ఇక్కడ పేస్ట్ చేయండి...',
        orLink: 'లేదా లింక్ నమోదు చేయండి',
        linkPlaceholder: 'వైద్య పత్రానికి URL నమోదు చేయండి',
        uploadBtn: 'అప్‌లోడ్ చేయండి',
        processing: 'ప్రాసెస్ అవుతోంది...',
        success: 'అప్‌లోడ్ విజయవంతం!',
        analyzing: 'పత్రాన్ని విశ్లేషిస్తోంది...'
      },
      // AI Assistant
      assistant: {
        title: 'AI ఆరోగ్య సహాయకుడు',
        subtitle: 'ఏదైనా ఆరోగ్య సంబంధిత ప్రశ్న అడగండి',
        placeholder: 'మీ ఆరోగ్య ప్రశ్నను టైప్ చేయండి...',
        send: 'పంపండి',
        voiceInput: 'వాయిస్ ఇన్‌పుట్',
        listening: 'వింటోంది...',
        disclaimer: 'ఇది అవగాహన కోసం మాత్రమే. దయచేసి లైసెన్స్ పొందిన వైద్యుడిని సంప్రదించండి.',
        medicalOnly: 'నేను వైద్య మరియు ఆరోగ్య సంబంధిత ప్రశ్నలకు మాత్రమే సహాయం చేయగలను.'
      },
      // Doctors
      doctors: {
        title: 'డాక్టర్లను కనుగొనండి',
        search: 'పరిస్థితి లేదా స్పెషాలిటీ ద్వారా శోధించండి',
        filters: 'ఫిల్టర్లు',
        specialty: 'స్పెషాలిటీ',
        rating: 'రేటింగ్',
        distance: 'దూరం',
        availability: 'అందుబాటు',
        callNow: 'ఇప్పుడు కాల్ చేయండి',
        viewProfile: 'ప్రొఫైల్ చూడండి',
        feedback: 'ఫీడ్‌బ్యాక్ ఇవ్వండి',
        reviews: 'సమీక్షలు',
        experience: 'సంవత్సరాల అనుభవం',
        conditions: 'చికిత్స చేస్తారు'
      },
      // Nearby
      nearby: {
        title: 'సమీప ఆరోగ్య సంరక్షణ',
        subtitle: 'మీ దగ్గర ఆసుపత్రులు, క్లినిక్‌లు మరియు ఫార్మసీలను కనుగొనండి',
        hospitals: 'ఆసుపత్రులు',
        clinics: 'క్లినిక్‌లు',
        pharmacies: 'ఫార్మసీలు',
        directions: 'దిశలు పొందండి',
        distance: 'దూరంలో',
        updateLocation: 'స్థానాన్ని అప్‌డేట్ చేయండి',
        yourLocation: 'మీ స్థానం',
        makeCall: 'కాల్ చేయండి',
        maps: 'మ్యాప్స్'
      },
      // Medicines
      medicines: {
        title: 'మీ మందులు',
        subtitle: 'మీ ప్రిస్క్రిప్షన్‌లను నిర్వహించండి మరియు ఫార్మసీలను కనుగొనండి',
        availability: 'అందుబాటును తనిఖీ చేయండి',
        nearbyPharmacies: 'సమీప ఫార్మసీలు',
        orderOnline: 'ఆన్‌లైన్‌లో ఆర్డర్ చేయండి',
        noMedicines: 'మందులు కనుగొనబడలేదు',
        uploadPrescription: 'మీ మందులను చూడటానికి ప్రిస్క్రిప్షన్ అప్‌లోడ్ చేయండి'
      },
      // My Health
      myHealth: {
        stageTitle: 'ఆరోగ్య దశ',
        stageSubtitle: 'మీ ఆరోగ్య ప్రయాణాన్ని ట్రాక్ చేయండి',
        carePlanTitle: 'సంరక్షణ ప్రణాళిక',
        carePlanSubtitle: 'మీ వ్యక్తిగత సంరక్షణ సిఫార్సులు',
        precautionsTitle: 'జాగ్రత్తలు',
        precautionsSubtitle: 'ముఖ్యమైన భద్రతా మార్గదర్శకాలు',
        lifestyleTitle: 'ఆహారం & వ్యాయామం',
        lifestyleSubtitle: 'ఆరోగ్యకరమైన జీవన సిఫార్సులు',
        doTitle: 'చేయండి',
        dontTitle: 'చేయవద్దు',
        warningSignsTitle: 'హెచ్చరిక సంకేతాలు',
        dietTab: 'ఆహారం',
        exerciseTab: 'వ్యాయామం'
      },
      // Common
      common: {
        loading: 'లోడ్ అవుతోంది...',
        error: 'ఏదో తప్పు జరిగింది',
        retry: 'మళ్లీ ప్రయత్నించండి',
        save: 'సేవ్ చేయండి',
        cancel: 'రద్దు చేయండి',
        close: 'మూసివేయండి',
        confirm: 'నిర్ధారించండి',
        delete: 'తొలగించండి',
        edit: 'సవరించండి',
        view: 'చూడండి',
        back: 'వెనుకకు',
        next: 'తదుపరి',
        search: 'శోధించండి',
        noResults: 'ఫలితాలు కనుగొనబడలేదు',
        seeAll: 'అన్నీ చూడండి'
      },
      // Help
      help: {
        title: 'సహాయం & భద్రత',
        subtitle: 'అత్యవసర సంప్రదింపులు మరియు భద్రతా సమాచారం',
        emergency: 'అత్యవసరం',
        ambulance: 'అంబులెన్స్',
        emergencyNumber: '108 / 112',
        callEmergency: 'అత్యవసర సేవలకు కాల్ చేయండి',
        faq: 'తరచుగా అడిగే ప్రశ్నలు',
        contact: 'సహాయానికి సంప్రదించండి'
      },
      // Settings
      settings: {
        title: 'సెట్టింగ్‌లు',
        theme: 'థీమ్',
        light: 'లైట్',
        dark: 'డార్క్',
        system: 'సిస్టమ్',
        language: 'భాష',
        location: 'స్థానం',
        notifications: 'నోటిఫికేషన్లు',
        privacy: 'గోప్యత',
        about: 'గురించి'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
