// Munnar Escapade - Core Application Logic
// Dedicated with love to Chinni 🍃

document.addEventListener('DOMContentLoaded', () => {
    // 1. STATE INITIALIZATION
    let currentNickname = localStorage.getItem('munnar_bestie_name') || TRIP_DATA.nickname || "Chinni";
    let packingList = JSON.parse(localStorage.getItem('munnar_packing_items')) || TRIP_DATA.packingItems;
    let challengesData = JSON.parse(localStorage.getItem('munnar_challenges')) || TRIP_DATA.challenges;

    // Update all nickname placeholders across the page
    function applyNickname(name) {
        currentNickname = name;
        localStorage.setItem('munnar_bestie_name', name);
        document.querySelectorAll('.recipient-name').forEach(el => {
            el.textContent = name;
        });
        // Update document title
        document.title = `Happy Journey to Munnar, ${name}! 🍃✨`;
    }
    applyNickname(currentNickname);

    // 2. CANVAS ANIMATION: FLOATING MIST & TEA LEAF DRIFT
    const canvas = document.getElementById('mistCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 32;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * canvas.width;
            this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
            this.size = Math.random() * 5 + 4;
            this.speedY = -(Math.random() * 0.7 + 0.3);
            this.speedX = Math.sin(Math.random() * Math.PI) * 0.6 - 0.2;
            this.opacity = Math.random() * 0.45 + 0.15;
            this.type = Math.random() > 0.4 ? 'mist' : 'leaf';
            this.rotation = Math.random() * 360;
            this.rotSpeed = (Math.random() - 0.5) * 1.5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.005) * 0.4;
            this.rotation += this.rotSpeed;

            if (this.y < -30 || this.x < -30 || this.x > canvas.width + 30) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);

            if (this.type === 'mist') {
                // Soft glowing misty orb
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 4);
                grad.addColorStop(0, `rgba(167, 243, 208, ${this.opacity * 0.8})`);
                grad.addColorStop(0.5, `rgba(52, 211, 153, ${this.opacity * 0.3})`);
                grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(0, 0, this.size * 4, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Delicate emerald tea leaf
                ctx.fillStyle = `rgba(52, 211, 153, ${this.opacity})`;
                ctx.beginPath();
                ctx.moveTo(0, -this.size * 1.6);
                ctx.quadraticCurveTo(this.size * 1.2, 0, 0, this.size * 1.6);
                ctx.quadraticCurveTo(-this.size * 1.2, 0, 0, -this.size * 1.6);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 3. AMBIENT AUDIO SYNTHESIZER (WEB AUDIO API)
    // Plays soothing mountain wind & soft crystal chimes without external mp3 dependencies
    let audioCtx = null;
    let isAudioPlaying = false;
    let windGain = null;
    let chimeInterval = null;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function startAmbientSound() {
        initAudio();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        // Generate gentle mountain wind using filtered white noise
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Bandpass filter to make it sound like breezy mountain air
        const bandpass = audioCtx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 380;
        bandpass.Q.value = 1.2;

        windGain = audioCtx.createGain();
        windGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

        whiteNoise.connect(bandpass);
        bandpass.connect(windGain);
        windGain.connect(audioCtx.destination);
        whiteNoise.start();

        // Occasional gentle crystal chime notes
        const chimePitches = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
        function playChime() {
            if (!isAudioPlaying || !audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const freq = chimePitches[Math.floor(Math.random() * chimePitches.length)];

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.035, audioCtx.currentTime + 0.15);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.0);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 3.2);
        }

        chimeInterval = setInterval(playChime, 4500);
        isAudioPlaying = true;
        updateAudioButtonUI(true);
    }

    function stopAmbientSound() {
        if (windGain && audioCtx) {
            windGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
        }
        if (chimeInterval) {
            clearInterval(chimeInterval);
        }
        isAudioPlaying = false;
        updateAudioButtonUI(false);
    }

    function playCelebrationJingle() {
        initAudio();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        // Cute joyful chime chords: C5, E5, G5, C6
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, index) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const startTime = audioCtx.currentTime + index * 0.1;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0.08, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(startTime);
            osc.stop(startTime + 0.85);
        });
    }

    const audioToggleBtn = document.getElementById('audioToggleBtn');
    const audioIcon = document.getElementById('audioIcon');
    const audioStatusText = document.getElementById('audioStatusText');

    function updateAudioButtonUI(playing) {
        if (playing) {
            audioToggleBtn.classList.add('bg-emerald-600/80', 'border-emerald-300', 'text-white');
            audioStatusText.textContent = "Misty Vibe ON";
            audioIcon.setAttribute('data-lucide', 'volume-2');
        } else {
            audioToggleBtn.classList.remove('bg-emerald-600/80', 'border-emerald-300', 'text-white');
            audioStatusText.textContent = "Mountain Vibe";
            audioIcon.setAttribute('data-lucide', 'volume-x');
        }
        lucide.createIcons();
    }

    audioToggleBtn.addEventListener('click', () => {
        if (isAudioPlaying) {
            stopAmbientSound();
        } else {
            startAmbientSound();
        }
    });

    // 4. CONFETTI CELEBRATIONS
    function triggerConfettiBurst() {
        playCelebrationJingle();
        
        // Multi-stage confetti celebration
        const count = 200;
        const defaults = {
            origin: { y: 0.65 },
            colors: ['#10b981', '#34d399', '#f59e0b', '#f43f5e', '#ffffff']
        };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }

    document.getElementById('heroWishCelebrationBtn').addEventListener('click', triggerConfettiBurst);
    document.getElementById('topWishBtn').addEventListener('click', triggerConfettiBurst);

    // 5. RENDER SAFETY RULES
    const safetyRulesGrid = document.getElementById('safetyRulesGrid');
    if (safetyRulesGrid) {
        safetyRulesGrid.innerHTML = TRIP_DATA.safetyShield.goldenRules.map(rule => `
            <div class="glass-card p-5 rounded-2xl flex flex-col justify-between border-l-4 border-l-emerald-400">
                <div class="space-y-2">
                    <div class="flex items-center gap-2.5 text-emerald-300">
                        <div class="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30">
                            <i data-lucide="${rule.icon}" class="w-4 h-4"></i>
                        </div>
                        <h4 class="font-bold font-outfit text-white text-base">${rule.title}</h4>
                    </div>
                    <p class="text-xs sm:text-sm text-emerald-100/80 leading-relaxed pt-1">
                        ${rule.content}
                    </p>
                </div>
                <div class="mt-3 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                    <span>Bestie Care Note</span>
                    <span>Safety First ✓</span>
                </div>
            </div>
        `).join('');
    }

    // 1-Tap WhatsApp Safe Ping Button
    const sendSafePingBtn = document.getElementById('sendSafePingBtn');
    if (sendSafePingBtn) {
        sendSafePingBtn.addEventListener('click', () => {
            const message = encodeURIComponent(`Hey Bestie! ❤️ I have safely arrived in Munnar! ⛰️🍃 The misty weather is gorgeous and everything is safe and good! Sending you lots of love from the tea hills! ✨`);
            window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
        });
    }

    // 6. RENDER MUNNAR SPOTS
    const spotsGrid = document.getElementById('spotsGrid');
    if (spotsGrid) {
        spotsGrid.innerHTML = TRIP_DATA.spots.map(spot => `
            <div class="glass-card rounded-3xl overflow-hidden flex flex-col group">
                <div class="relative h-52 overflow-hidden">
                    <img src="${spot.image}" alt="${spot.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#041a12] via-[#041a12]/30 to-transparent"></div>
                    <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-emerald-300">
                        ${spot.tag}
                    </span>
                    <span class="absolute bottom-3 left-3 text-xs font-semibold text-amber-300 bg-emerald-950/70 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                        ${spot.vibe}
                    </span>
                </div>
                
                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <h4 class="font-bold font-outfit text-lg text-white group-hover:text-emerald-300 transition-colors">
                                ${spot.name}
                            </h4>
                        </div>
                        <p class="text-xs text-emerald-300/80 flex items-center gap-1.5 font-medium">
                            <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i> Best Time: ${spot.bestTime}
                        </p>
                        
                        <!-- Bestie Personal Tip Box -->
                        <div class="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-xs text-emerald-100/90 leading-snug">
                            <span class="font-bold text-amber-300 block mb-1">💡 Bestie's Secret Tip:</span>
                            ${spot.bestieTip.replace('Chinni', `<span class="recipient-name font-bold text-emerald-300">${currentNickname}</span>`)}
                        </div>
                    </div>

                    <div class="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs">
                        <span class="text-emerald-400/80 font-medium">Must-Do Activity:</span>
                        <span class="font-bold text-white">${spot.mustDo}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 7. INTERACTIVE PACKING CHECKLIST
    const packingListGrid = document.getElementById('packingListGrid');
    const packProgressBar = document.getElementById('packProgressBar');
    const packProgressPercent = document.getElementById('packProgressPercent');
    const packProgressLabel = document.getElementById('packProgressLabel');
    const luggageEmoji = document.getElementById('luggageEmoji');

    function updatePackingProgress() {
        const total = packingList.length;
        const packedCount = packingList.filter(item => item.packed).length;
        const percentage = total > 0 ? Math.round((packedCount / total) * 100) : 0;

        packProgressBar.style.width = `${percentage}%`;
        packProgressPercent.textContent = `${percentage}%`;
        packProgressLabel.textContent = `${packedCount} of ${total} items packed`;

        if (percentage === 100) {
            luggageEmoji.textContent = "✨🧳🎉";
            triggerConfettiBurst();
        } else if (percentage >= 50) {
            luggageEmoji.textContent = "🧳";
        } else {
            luggageEmoji.textContent = "🎒";
        }
        localStorage.setItem('munnar_packing_items', JSON.stringify(packingList));
    }

    function renderPackingList() {
        if (!packingListGrid) return;
        packingListGrid.innerHTML = packingList.map((item, index) => `
            <div data-index="${index}" class="packing-item-card glass-card p-3.5 rounded-2xl flex items-center justify-between cursor-pointer select-none transition-all ${item.packed ? 'border-emerald-500/60 bg-emerald-950/70' : 'hover:border-emerald-400/40'}">
                <div class="flex items-center gap-3">
                    <div class="w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${item.packed ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-emerald-500/40 text-transparent'}">
                        <i data-lucide="check" class="w-4 h-4"></i>
                    </div>
                    <div>
                        <span class="text-xs uppercase text-emerald-400/70 font-semibold block text-[10px]">${item.category}</span>
                        <span class="text-sm font-medium ${item.packed ? 'line-through text-emerald-300/60' : 'text-white'}">${item.text}</span>
                    </div>
                </div>
                <div class="text-emerald-400/60">
                    <i data-lucide="${item.icon || 'package'}" class="w-4 h-4"></i>
                </div>
            </div>
        `).join('');

        lucide.createIcons();

        // Attach Click Listeners
        document.querySelectorAll('.packing-item-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.getAttribute('data-index'));
                packingList[index].packed = !packingList[index].packed;
                renderPackingList();
                updatePackingProgress();
            });
        });
    }

    renderPackingList();
    updatePackingProgress();

    // Add New Custom Item to Packing Bag
    const addPackItemBtn = document.getElementById('addPackItemBtn');
    const newPackItemInput = document.getElementById('newPackItemInput');
    if (addPackItemBtn && newPackItemInput) {
        addPackItemBtn.addEventListener('click', () => {
            const text = newPackItemInput.value.trim();
            if (text) {
                packingList.push({
                    id: `pack-custom-${Date.now()}`,
                    category: "Chinni's Choice",
                    text: text,
                    icon: "sparkles",
                    packed: false
                });
                newPackItemInput.value = '';
                renderPackingList();
                updatePackingProgress();
            }
        });

        newPackItemInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addPackItemBtn.click();
        });
    }

    // 8. "OPEN WHEN..." SECRET BESTIE ENVELOPES
    const envelopesGrid = document.getElementById('envelopesGrid');
    const envelopeModal = document.getElementById('envelopeModal');
    const modalEnvelopeTrigger = document.getElementById('modalEnvelopeTrigger');
    const modalEnvelopeTitle = document.getElementById('modalEnvelopeTitle');
    const modalEnvelopeMessage = document.getElementById('modalEnvelopeMessage');
    const closeEnvelopeModalBtn = document.getElementById('closeEnvelopeModalBtn');
    const modalEnvelopeCloseActionBtn = document.getElementById('modalEnvelopeCloseActionBtn');

    function openEnvelopeModal(envelope) {
        modalEnvelopeTrigger.textContent = envelope.trigger;
        modalEnvelopeTitle.textContent = envelope.title;
        modalEnvelopeMessage.textContent = envelope.message.replace(/Chinni/g, currentNickname);
        
        envelopeModal.classList.remove('hidden');
        setTimeout(() => {
            envelopeModal.classList.add('modal-open');
        }, 10);

        triggerConfettiBurst();
    }

    function closeEnvelopeModal() {
        envelopeModal.classList.remove('modal-open');
        setTimeout(() => {
            envelopeModal.classList.add('hidden');
        }, 300);
    }

    if (closeEnvelopeModalBtn) closeEnvelopeModalBtn.addEventListener('click', closeEnvelopeModal);
    if (modalEnvelopeCloseActionBtn) modalEnvelopeCloseActionBtn.addEventListener('click', closeEnvelopeModal);
    envelopeModal.addEventListener('click', (e) => {
        if (e.target === envelopeModal) closeEnvelopeModal();
    });

    if (envelopesGrid) {
        envelopesGrid.innerHTML = TRIP_DATA.envelopes.map((env, index) => `
            <div data-env-index="${index}" class="envelope-item envelope-card glass-panel rounded-3xl p-6 text-center cursor-pointer border border-emerald-500/20 hover:border-pink-400/50 flex flex-col items-center justify-between group">
                <div class="space-y-4 w-full">
                    <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr ${env.color} flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">
                        💌
                    </div>
                    <div>
                        <span class="text-xs uppercase font-extrabold text-amber-300 tracking-wider block mb-1">
                            Secret Note #${index + 1}
                        </span>
                        <h4 class="font-bold font-outfit text-base text-white group-hover:text-amber-200 transition-colors">
                            ${env.trigger}
                        </h4>
                    </div>
                </div>

                <div class="mt-6 w-full pt-4 border-t border-emerald-500/20">
                    <span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 group-hover:text-white transition-colors">
                        <span>Tap to Open Letter</span>
                        <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                    </span>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.envelope-item').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.getAttribute('data-env-index'));
                openEnvelopeModal(TRIP_DATA.envelopes[index]);
            });
        });
    }

    // 9. MUNNAR BESTIE BUCKET LIST CHALLENGES
    const challengesListEl = document.getElementById('challengesList');
    const challengeScore = document.getElementById('challengeScore');

    function updateChallengeScore() {
        const total = challengesData.length;
        const done = challengesData.filter(c => c.done).length;
        challengeScore.textContent = `${done} / ${total} Completed`;
        localStorage.setItem('munnar_challenges', JSON.stringify(challengesData));
        if (done === total && total > 0) {
            triggerConfettiBurst();
        }
    }

    function renderChallenges() {
        if (!challengesListEl) return;
        challengesListEl.innerHTML = challengesData.map((ch, idx) => `
            <div data-ch-index="${idx}" class="challenge-item p-4 rounded-2xl glass-card flex items-center justify-between cursor-pointer border border-emerald-500/20 hover:border-amber-400/40 transition-all ${ch.done ? 'bg-emerald-950/70 border-emerald-400/50' : ''}">
                <div class="flex items-center gap-3">
                    <div class="w-6 h-6 rounded-full flex items-center justify-center border transition-all ${ch.done ? 'bg-amber-400 border-amber-300 text-slate-900' : 'border-emerald-500/40 text-transparent'}">
                        <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>
                    </div>
                    <span class="text-xs sm:text-sm font-medium ${ch.done ? 'line-through text-emerald-300/60' : 'text-emerald-100'}">
                        ${ch.text}
                    </span>
                </div>
                <span class="text-xs font-bold ${ch.done ? 'text-amber-300' : 'text-emerald-400/50'}">
                    ${ch.done ? 'Done! ⭐' : 'To Do'}
                </span>
            </div>
        `).join('');

        lucide.createIcons();

        document.querySelectorAll('.challenge-item').forEach(item => {
            item.addEventListener('click', () => {
                const idx = parseInt(item.getAttribute('data-ch-index'));
                challengesData[idx].done = !challengesData[idx].done;
                renderChallenges();
                updateChallengeScore();
            });
        });
    }

    renderChallenges();
    updateChallengeScore();

    // 10. VIP BOARDING PASS PRINT / SAVE
    const downloadPassBtn = document.getElementById('downloadPassBtn');
    if (downloadPassBtn) {
        downloadPassBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // 11. PERSONALIZE / SETTINGS MODAL
    const openPersonalizeBtn = document.getElementById('openPersonalizeBtn');
    const personalizeModal = document.getElementById('personalizeModal');
    const closePersonalizeModalBtn = document.getElementById('closePersonalizeModalBtn');
    const editNicknameInput = document.getElementById('editNicknameInput');
    const savePersonalizeBtn = document.getElementById('savePersonalizeBtn');

    if (openPersonalizeBtn && personalizeModal) {
        openPersonalizeBtn.addEventListener('click', () => {
            editNicknameInput.value = currentNickname;
            personalizeModal.classList.remove('hidden');
            setTimeout(() => personalizeModal.classList.add('modal-open'), 10);
        });

        function closePersonalize() {
            personalizeModal.classList.remove('modal-open');
            setTimeout(() => personalizeModal.classList.add('hidden'), 300);
        }

        closePersonalizeModalBtn.addEventListener('click', closePersonalize);
        personalizeModal.addEventListener('click', (e) => {
            if (e.target === personalizeModal) closePersonalize();
        });

        savePersonalizeBtn.addEventListener('click', () => {
            const newName = editNicknameInput.value.trim();
            if (newName) {
                applyNickname(newName);
                closePersonalize();
                triggerConfettiBurst();
            }
        });
    }

    // Initialize all Lucide Icons on final load
    lucide.createIcons();
});
