// Curated data for Chinni's Munnar Trip Project

const TRIP_DATA = {
    nickname: "Chinni",
    destination: "Munnar, Kerala",
    tagline: "The Emerald Queen of the Western Ghats 🍃",
    departureDate: "Upcoming Adventure",
    
    // Heartfelt Hero Wish
    heroWish: {
        title: "Happy & Safe Journey, Dearest Chinni! 🌸✨",
        subtitle: "May your trip to Munnar be filled with dreamy mist, endless green tea hills, laughter, warm cups of chai, and unforgettable memories!",
        quote: "“Travel far, laugh hard, stay safe, and let the mountain breeze heal your soul. Can't wait to hear every single story when you're back!” — Your Bestie ❤️"
    },

    // VIP Boarding Pass Details
    boardingPass: {
        passenger: "Chinni (The VIP Bestie)",
        flightNo: "LOVE-777",
        from: "HOME 🏡",
        to: "MUNNAR 🌿",
        seat: "BESTIE-01A (Window Seat)",
        gate: "JOY-07",
        boardingTime: "Adventure O'Clock",
        class: "First Class Sunshine ✨",
        barcode: "||| | |||| || |||||| | ||||| ||| |||| |"
    },

    // Curated Munnar Spots with Bestie Tips
    spots: [
        {
            id: "tea-estates",
            name: "Kolukkumalai & Rolling Tea Gardens",
            tag: "World's Highest Tea Estate",
            image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
            vibe: "Dreamy Clouds & Tea Aroma ☕",
            bestTime: "Sunrise (5:30 AM - 7:00 AM)",
            bestieTip: "Chinni, don't miss the 4x4 Jeep safari here! The sunrise above the clouds is magical. Drink hot freshly plucked cardamom tea at the top!",
            mustDo: "Take a silhouette photo against the sea of clouds."
        },
        {
            id: "eravikulam",
            name: "Eravikulam National Park",
            tag: "Home of Nilgiri Tahr & Anamudi",
            image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=800&q=80",
            vibe: "Lush Flora & Rolling Peaks 🦌",
            bestTime: "Morning (8:30 AM - 11:00 AM)",
            bestieTip: "Book tickets online beforehand to skip lines. Look out for the friendly mountain goats (Nilgiri Tahr). Wear comfortable walking shoes!",
            mustDo: "Spot the Nilgiri Tahr and breathe in pure mountain air."
        },
        {
            id: "mattupetty-echo",
            name: "Mattupetty Dam & Echo Point",
            tag: "Speedboats & Misty Reflections",
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
            vibe: "Serene Water & Fun Screams 🚤",
            bestTime: "Afternoon (1:00 PM - 4:00 PM)",
            bestieTip: "Chinni, you MUST shout my name at Echo Point and see if the hills scream it back! Also, grab some fresh homemade spiced chocolates near the stalls.",
            mustDo: "Shout your loudest dream at Echo Point!"
        },
        {
            id: "waterfalls",
            name: "Attukad & Lakkam Waterfalls",
            tag: "Cascading Chilly Waters",
            image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
            vibe: "Cold Mist & Roaring Rapids 💦",
            bestTime: "Late Morning (10:00 AM - 1:00 PM)",
            bestieTip: "Rocks near the water get very slippery! Admire the beauty safely from the viewpoints and click aesthetic reels with your hair blowing in the spray.",
            mustDo: "Listen to the roar of water with your eyes closed for 1 minute."
        },
        {
            id: "top-station",
            name: "Top Station & Kundala Lake",
            tag: "Border of Kerala & Tamil Nadu",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            vibe: "Panoramic Vistas & Shikara Boating 🛶",
            bestTime: "Early Morning or Sunset",
            bestieTip: "Go for the Kashmiri-style pedal boat or Shikara at Kundala Lake surrounded by eucalyptus trees. Total Bollywood movie vibes!",
            mustDo: "Paddle gently across the lake while admiring the reflection of the pines."
        },
        {
            id: "tea-museum",
            name: "Tata Tea Museum & Spice Markets",
            tag: "Flavors & History",
            image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
            vibe: "Chai Heaven & Shopping Spree 🛍️",
            bestTime: "Anytime during afternoon",
            bestieTip: "Don't forget to pack genuine Munnar green tea, roasted pepper, cardamom, and fresh artisanal chocolates for both of us!",
            mustDo: "Sample at least 3 different infused teas at the tasting bar."
        }
    ],

    // Bestie Safety Shield Data
    safetyShield: {
        emergencyContacts: [
            { label: "Kerala Police Emergency", number: "112", icon: "shield-alert", desc: "24/7 Police & Distress" },
            { label: "Women Safety Helpline", number: "1091", icon: "heart-handshake", desc: "Dedicated Women Helpline Kerala" },
            { label: "Munnar Tourist Police Aid", number: "04865-230321", icon: "phone-call", desc: "Local Munnar Station Assistance" },
            { label: "Kerala Tourism 24x7 Help", number: "1800-425-4747", icon: "info", desc: "Toll-Free Tourist Guidance" }
        ],
        goldenRules: [
            {
                title: "Ghat Road & Hairpin Curves 🚗",
                icon: "compass",
                content: "The climb to Munnar has 17+ hairpin bends! Keep motion sickness tablets handy (like Avomine), sit by the window with fresh air, chew mint or ginger candy, and avoid staring down at your phone while driving uphill."
            },
            {
                title: "Tea Garden Walking & Leech Alert 🌿",
                icon: "footprints",
                content: "Always stay on marked walking trails. If it's damp or raining, tiny leeches might appear in tall grass. Wear closed high socks or sneakers. Carrying a pinch of salt or eucalyptus/Dettol spray easily keeps them away!"
            },
            {
                title: "Chilly Nights & Weather Shifts 🧥",
                icon: "cloud-rain",
                content: "Munnar temperatures drop rapidly after 5 PM down to 10°C–14°C! Always carry a light warm jacket, thermal, or windcheater, plus a mini umbrella in your daypack because mountain clouds love sudden showers."
            },
            {
                title: "Elephant Corridors & Wildlife 🐘",
                icon: "shield-check",
                content: "Some road stretches (like near Chinnakanal & Anayirangal) are elephant migration routes. Never stop to take close selfies with wild animals or monkeys, and avoid night driving on isolated forest roads."
            },
            {
                title: "Phone Battery & Offline Maps 🔋",
                icon: "battery-charging",
                content: "Hill network signals (Airtel/Jio) can drop inside valleys. Download offline Google Maps for 'Munnar' before leaving your hotel, and always carry a charged power bank!"
            },
            {
                title: "Hydration & Street Food Wisdom 💧",
                icon: "cup-soda",
                content: "Even when it feels cold, mountain air dehydrates you fast! Sip warm water frequently. Enjoy hot piping roadside vadas and corn, but drink packaged or boiled water."
            }
        ]
    },

    // Interactive Packing Checklist
    packingItems: [
        { id: "pack-1", category: "Warm Clothing", text: "Cozy Fleece Jacket / Hoodie", icon: "shirt", packed: false },
        { id: "pack-2", category: "Warm Clothing", text: "Warm Socks & Scarf / Beanie", icon: "sparkles", packed: false },
        { id: "pack-3", category: "Warm Clothing", text: "Comfortable Walking Pants / Jeans", icon: "shirt", packed: false },
        { id: "pack-4", category: "Essentials", text: "Compact Umbrella / Rain Poncho", icon: "umbrella", packed: false },
        { id: "pack-5", category: "Essentials", text: "Sturdy Grip Sneakers / Trek Shoes", icon: "footprints", packed: false },
        { id: "pack-6", category: "Electronics", text: "10,000+ mAh Charged Power Bank", icon: "battery-charging", packed: false },
        { id: "pack-7", category: "Electronics", text: "Camera / Extra Storage for 1000s of selfies", icon: "camera", packed: false },
        { id: "pack-8", category: "Health & Care", text: "Motion Sickness meds (Avomine/Diziron)", icon: "pill", packed: false },
        { id: "pack-9", category: "Health & Care", text: "Lip Balm & Cold Cream / Moisturizer", icon: "smile", packed: false },
        { id: "pack-10", category: "Health & Care", text: "Band-aids & Antiseptic / Ointment", icon: "activity", packed: false },
        { id: "pack-11", category: "Aesthetic", text: "Cute Sunglasses for scenic mountain pics", icon: "glasses", packed: false },
        { id: "pack-12", category: "Aesthetic", text: "Your brightest smile & bestie vibes", icon: "heart", packed: true }
    ],

    // "Open When..." Secret Bestie Envelopes
    envelopes: [
        {
            id: "env-1",
            trigger: "Open When You Leave for the Trip 🎒",
            color: "from-emerald-500 to-teal-700",
            icon: "send",
            title: "Safe Travels, My Favorite Human! 🚀",
            message: `Chinni my girl,\n\nThe day is finally here! Take a deep breath, leave all your worries and stress behind, and get ready to be mesmerized by the misty hills.\n\nPromise me you'll eat well, stay alert, keep your phone charged, and text me the moment you reach your room.\n\nI'm already counting down the days until we catch up and you show me all your pictures. Have the time of your life! You deserve every bit of this peace.\n\nWith all my love and blessings,\nYour Bestie Forever ❤️`
        },
        {
            id: "env-2",
            trigger: "Open When You Feel the First Chilly Munnar Breeze 🌫️",
            color: "from-sky-500 to-indigo-700",
            icon: "cloud-fog",
            title: "That Cold Fog Hitting Your Face! ❄️",
            message: `Brrrrr! Feel that crisp, pure mountain air?\n\nClose your eyes for 10 seconds right now. Inhale deeply. That earthy scent of damp eucalyptus, fresh tea leaves, and rain—that is what freedom smells like.\n\nWrap yourself snug in your warm jacket, put on our favorite songs, and smile because you are in paradise. Don't forget to take a misty selfie for me right now!\n\nStay cozy, Chinni! ☕`
        },
        {
            id: "env-3",
            trigger: "Open When You Sip Fresh Munnar Tea ☕",
            color: "from-amber-500 to-orange-700",
            icon: "coffee",
            title: "Cheers to the Freshest Chai! 🍵",
            message: `If you are reading this, I bet your hands are wrapped around a steaming glass of cardamom or ginger tea with mist dancing in front of you!\n\nTake a slow sip. Isn't it a million times better than ordinary city tea?\n\nReminder: You are contractually obligated by bestie friendship laws to bring back a huge pack of authentic Munnar tea powder and homemade hazelnut chocolates for me! No excuses! 😋🍫`
        },
        {
            id: "env-4",
            trigger: "Open If You Ever Miss Me or Feel Anxious 💌",
            color: "from-rose-500 to-pink-700",
            icon: "heart",
            title: "I'm Right Here With You! 🤗",
            message: `Hey Chinni,\n\nIf you're ever feeling a bit tired, home-sick, or anxious on this trip, remember that distance is just geography. I'm just one single tap or phone call away!\n\nYou are strong, adventurous, and capable of conquering any hill station. Take it easy, don't rush through sightseeing, and prioritize your comfort and safety above everything.\n\nSending you the warmest, tightest virtual hug right across the mountains! You got this! 💖`
        }
    ],

    // Fun Bestie Munnar Challenges / Bucket List
    challenges: [
        { id: "ch-1", text: "Take a slow-motion video walking through tea bushes with mist rolling in 🌿", done: false },
        { id: "ch-2", text: "Shout your bestie's name at Echo Point until it reverberates 🗣️", done: false },
        { id: "ch-3", text: "Eat hot piping banana fritters (Pazham Pori) & spiced chai at a roadside shop ☕", done: false },
        { id: "ch-4", text: "Click a goofy photo pretending to hold the giant mountain peak ⛰️", done: false },
        { id: "ch-5", text: "Buy authentic Munnar homemade dark chocolates 🍫", done: false },
        { id: "ch-6", text: "Send a 10-second video of Munnar mist to your bestie saying 'Wish you were here!' 🎥", done: false }
    ]
};
