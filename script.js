// =========================================================================
// DEV MODE: Set to 'true' to show Hacker Console & Bypass the 1-year grind.
// Set to 'false' to enable true suffering (0.0000003% drop rates).
// =========================================================================

// --- DOM Elements ---
const form = document.getElementById('router-form');
const rawDataInput = document.getElementById('raw-data');
const processBtn = document.getElementById('process-btn');
const consoleOutput = document.getElementById('console-output');
const checkboxes = document.querySelectorAll('.dest-toggle');
const pipelineVizContainer = document.getElementById('pipeline-container');

// Sidebar, Webhooks & Modal
const openSidebarBtn = document.getElementById('openSidebarBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const configSidebar = document.getElementById('configSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const pingDot = document.g
const modalTitle = document.getElementById('modalTitle');
const configTriggers = document.querySelectorAll('.config-trigger');
const fileUpload = document.getElementById('file-upload');
const fileNameDisplay = document.getElementById('file-name');

// ACTIVE CLOUDFLARE WEBHOOK URL
const N8N_WEBHOOK_URL = 'https://earlier-link-killing-exception.trycloudflare.com/webhook/agency-router';

// Platform Metadata Mapping
const platformDetails = {
    airtable: { icon: '📊', name: 'Airtable' },
    clickup: { icon: '🎯', name: 'ClickUp' },
    gohighlevel: { icon: '🚀', name: 'GHL' },
    slack: { icon: '💬', name: 'Slack' },
    hubspot: { icon: '🟧', name: 'HubSpot' },
    asana: { icon: '📝', name: 'Asana' },
    gmail: { icon: '📧', name: 'Gmail' },
    notion: { icon: '📓', name: 'Notion' },
    sheets: { icon: '📗', name: 'Sheets' },
    discord: { icon: '👾', name: 'Discord' },
    telegram: { icon: '✈️', name: 'Telegram' },
    monday: { icon: '📆', name: 'Monday.com' },
    trello: { icon: '📋', name: 'Trello' },
    shopify: { icon: '🛍️', name: 'Shopify' },
    klaviyo: { icon: '✉️', name: 'Klaviyo' },
    activecampaign: { icon: '⚡', name: 'ActiveCamp' },
    stripe: { icon: '💳', name: 'Stripe' },
    gcal: { icon: '📅', name: 'Google Cal' },
    whatsapp: { icon: '🟢', name: 'WhatsApp' },
    custom: { icon: '🔗', name: 'Custom API' }
};

// =========================================================================
// SYNC CONTRACT: Must match the destinations actually ENABLED in workflow.json
// 11 enabled, 7 disabled. The UI shows all 18 for transparency, but only the 11
// enabled ones will actually route data through the live n8n workflow.
// =========================================================================
const LIVE_PLATFORMS = new Set([
    'airtable', 'notion', 'clickup', 'asana',
    'monday', 'klaviyo', 'telegram', 'discord', 'gmail', 'custom'
]);

// Platforms present in n8n but currently disabled (do NOT call these from the UI)
const DISABLED_PLATFORMS = new Set([
    'sheets', 'trello', 'shopify', 'gcal', 'whatsapp', 'stripe', 'slack'
]);

// =========================================================================
// ISOLATED GACHA & VFX ENGINE
// =========================================================================

const ProceduralGenerator = {
    generateJunk: function() {
        const prefixes = ['Expired', 'Leaked', 'Broken', 'Deprecated', 'Ghost', 'Quantum', 'Cursed', 'Null', 'Undefined', 'Corrupted', 'Dangling', 'Zombie', 'Infinite', 'Orphaned', 'Malware', 'Spaghetti', 'Legacy', 'Rogue', 'Phantom', 'Hacked'];
        const suffixes = ['API Key', 'CSS File', 'Webhook', 'Promise', 'Div Tag', 'Database', 'Router', 'Variable', 'Function', 'Object', 'Array', 'String', 'Boolean', 'Integer', 'Float', 'Node', 'Component', 'Server', 'Log', 'Stacktrace', 'Memory Leak', 'Timeout', 'Exception', 'Middleware', 'Payload'];
        let pool = [];
        prefixes.forEach(p => suffixes.forEach(s => pool.push(`1x ${p} ${s}`)));
        return pool;
    },
    generateFaces: function() {
        const faces = ['◡‸◡', '⌐■_■', '╥﹏╥', '✧ω✧', 'o_O', 'ಠ_ಠ', 'ಥ_ಥ', '♡‿♡', '¬‿¬', '◉_◉', 'T_T', '¯\\_(ツ)_/¯', '≧◡≦', 'ᵔᴥᵔ', '-_-', 'O_o', 'x_x', 'u_u', 'v_v', '0_0', '$_$', 'T_T', ';_;', 'T.T', '._.', 'T__T'];
        return faces.map((f, i) => ({ id: `f_${i}`, name: `Emoticon ${i+1}`, val: f }));
    },
    generateColors: function() {
        return [
            { id: 'c_ruby', name: 'Quantum Ruby', val: 'hsl(345, 80%, 60%)', glow: 'hsla(345, 80%, 60%, 0.4)' },
            { id: 'c_amber', name: 'Solar Amber', val: 'hsl(35, 100%, 55%)', glow: 'hsla(35, 100%, 55%, 0.4)' },
            { id: 'c_gold', name: 'Aether Gold', val: 'hsl(45, 100%, 50%)', glow: 'hsla(45, 100%, 50%, 0.4)' },
            { id: 'c_lime', name: 'Cyber Lime', val: 'hsl(90, 80%, 55%)', glow: 'hsla(90, 80%, 55%, 0.4)' },
            { id: 'c_emerald', name: 'Neon Emerald', val: 'hsl(140, 80%, 50%)', glow: 'hsla(140, 80%, 50%, 0.4)' },
            { id: 'c_cyan', name: 'Void Cyan', val: 'hsl(180, 100%, 50%)', glow: 'hsla(180, 100%, 50%, 0.4)' },
            { id: 'c_azure', name: 'Plasma Azure', val: 'hsl(210, 100%, 60%)', glow: 'hsla(210, 100%, 60%, 0.4)' },
            { id: 'c_sapphire', name: 'Lunar Sapphire', val: 'hsl(240, 80%, 65%)', glow: 'hsla(240, 80%, 65%, 0.4)' },
            { id: 'c_amethyst', name: 'Cosmic Amethyst', val: 'hsl(275, 80%, 65%)', glow: 'hsla(275, 80%, 65%, 0.4)' },
            { id: 'c_magenta', name: 'Astral Magenta', val: 'hsl(320, 80%, 60%)', glow: 'hsla(320, 80%, 60%, 0.4)' }
        ];
    }
};

const EventEngine = {
    currentSeason: 'normal',
    rateMultiplier: 1, 
    init: function() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) this.currentSeason = 'spring';
        else if (month >= 5 && month <= 7) this.currentSeason = 'summer';
        else if (month >= 8 && month <= 10) this.currentSeason = 'autumn';
        else this.currentSeason = 'winter';
    },
    triggerAdminEvent: function(event) {
        const banner = document.getElementById('event-banner');
        if(!banner) return;
        banner.classList.remove('hidden');
        banner.classList.add('active');
        if (event === 'gacha_frenzy') {
            this.rateMultiplier = 1000;
            banner.innerText = "🔥 ADMIN EVENT: GACHA FRENZY (1000x RATES) 🔥";
        } else if (event === 'halloween') {
            this.currentSeason = 'spooky';
            banner.innerText = "🎃 SECRET EVENT: SPOOKY SEASON ACTIVE 🎃";
        } else if (event === 'summer') {
            this.currentSeason = 'summer';
            banner.innerText = "🏖️ SECRET EVENT: SUMMER HEAT ACTIVE 🏖️";
        }
        setTimeout(() => { 
            this.rateMultiplier = 1; 
            banner.classList.add('hidden'); 
        }, 3600000); 
    }
};

let savedInv = { colors: [], hats: [], themes: [], faces: [], pets: [] };
let savedEq = { color: null, hat: null, theme: null, face: null, pet: null };
try {
    const rawInv = localStorage.getItem('ai_gacha_inv');
    if (rawInv) savedInv = { ...savedInv, ...JSON.parse(rawInv) };
    const rawEq = localStorage.getItem('ai_gacha_equip');
    if (rawEq) savedEq = { ...savedEq, ...JSON.parse(rawEq) };
} catch(e) {
    console.warn("Corrupted save file detected and reset.");
}

const GachaSystem = {
    inventory: savedInv,
    equipped: savedEq,
    vfxIntervals: [],
    currentTheme: null, 
    currentPet: null,   
    pools: {
        colors: ProceduralGenerator.generateColors(),
        faces: ProceduralGenerator.generateFaces(),
        hats: [
            { id: 'h_crown', name: 'Burger King Crown', icon: '👑' }, { id: 'h_cowboy', name: 'Yeehaw Hat', icon: '🤠' },
            { id: 'h_shades', name: 'Deal With It', icon: '🕶️' }, { id: 'h_flower', name: 'Pretty Flower', icon: '🌸' },
            { id: 'h_halo', name: 'Holy Halo', icon: '😇' }, { id: 'h_cap', name: 'Blue Cap', icon: '🧢' },
            { id: 'h_wizard', name: 'Wizard Hat', icon: '🎩' }, { id: 'h_helm', name: 'Tactical Helm', icon: '🪖' },
            { id: 'h_goggles', name: 'Lab Goggles', icon: '🥽' }, { id: 'h_headset', name: 'Gamer Headset', icon: '🎧' },
            { id: 'h_ribbon', name: 'Pink Ribbon', icon: '🎀' }, { id: 'h_sprout', name: 'Pikmin Sprout', icon: '🌱' },
            { id: 'h_shroom', name: 'Toad Shroom', icon: '🍄' }, { id: 'h_pizza', name: 'Pizza Slice', icon: '🍕' }
        ],
        pets: [
            { id: 'p_ghost', name: 'Restless Spirit', icon: '👻', anim: 'pet-float' }, { id: 'p_fox', name: 'Scurrying Fox', icon: '🦊', anim: 'pet-walk' },
            { id: 'p_alien', name: 'Invader UFO', icon: '🛸', anim: 'pet-float' }, { id: 'p_frog', name: 'Pacing Frog', icon: '🐸', anim: 'pet-pace' },
            { id: 'p_turtle', name: 'Slow Turtle', icon: '🐢', anim: 'pet-walk' }, { id: 'p_lantern', name: 'Floating Lantern', icon: '🏮', anim: 'pet-float' },
            { id: 'p_wisp', name: 'Magical Wisp', icon: '✨', anim: 'pet-float' }
        ],
        themes: {
            spring: [{ id: 'leg_sakura', name: 'Sakura Garden', class: 'theme-sakura', hat: 'h_flower' }],
            winter: [{ id: 'leg_antarctica', name: 'Polar Ice', class: 'theme-antarctica', hat: null }],
            summer: [{ id: 'leg_ocean', name: 'Pacific Deep', class: 'theme-ocean', hat: 'h_goggles' }],
            autumn: [{ id: 'leg_autumn', name: 'Autumn Harvest', class: 'theme-autumn', hat: null }],
            spooky: [{ id: 'leg_spooky', name: 'Haunted Mansion', class: 'theme-spooky', hat: 'h_wizard' }],
            normal: [] 
        },
        junk: ProceduralGenerator.generateJunk()
    },
    save: function() {
        try {
            localStorage.setItem('ai_gacha_inv', JSON.stringify(this.inventory));
            localStorage.setItem('ai_gacha_equip', JSON.stringify(this.equipped));
        } catch(e) {}
        this.renderVaultBtn();
        this.applyEquipped();
    },
    roll: function() {
        const mult = (typeof DEV_MODE !== 'undefined' && DEV_MODE) ? 10000000 : EventEngine.rateMultiplier;
        const roll = Math.random() * 100;
        let drop = { rarity: 'miss', text: '...nothing happened.' };

        if (roll < (0.0000003 * mult)) { 
            const seasonThemes = this.pools.themes[EventEngine.currentSeason] || this.pools.themes.spring;
            if (seasonThemes.length > 0) {
                const item = seasonThemes[Math.floor(Math.random() * seasonThemes.length)];
                if (!this.inventory.themes.some(i => i.id === item.id)) {
                    this.inventory.themes.push(item);
                    if (item.hat && !this.inventory.hats.some(h => h.id === item.hat)) {
                        const hatObj = this.pools.hats.find(h => h.id === item.hat);
                        if(hatObj) this.inventory.hats.push(hatObj);
                    }
                }
                drop = { rarity: 'legendary', text: `✨ LEGENDARY: ${item.name} ✨` };
            }
        } 
        else if (roll < (0.00005 * mult)) { 
            const item = this.pools.pets[Math.floor(Math.random() * this.pools.pets.length)];
            if (!this.inventory.pets.some(i => i.id === item.id)) this.inventory.pets.push(item);
            drop = { rarity: 'epic', text: `🟣 EPIC: ${item.name}` };
        }
        else if (roll < (0.005 * mult)) { 
            const item = this.pools.hats[Math.floor(Math.random() * this.pools.hats.length)];
            if (!this.inventory.hats.some(i => i.id === item.id)) this.inventory.hats.push(item);
            drop = { rarity: 'rare', text: `🔵 RARE: ${item.name}` };
        }
        else if (roll < (0.1 * mult)) { 
            if (Math.random() > 0.5) {
                const item = this.pools.faces[Math.floor(Math.random() * this.pools.faces.length)];
                if (!this.inventory.faces.some(i => i.id === item.id)) this.inventory.faces.push(item);
                drop = { rarity: 'uncommon', text: `🟢 EMOTICON: ${item.val}` };
            } else {
                const item = this.pools.colors[Math.floor(Math.random() * this.pools.colors.length)];
                if (!this.inventory.colors.some(i => i.id === item.id)) this.inventory.colors.push(item);
                drop = { rarity: 'uncommon', text: `🟢 COLOR: ${item.name}` };
            }
        }
        else if (roll < (15.0 * mult)) { 
            const text = this.pools.junk[Math.floor(Math.random() * this.pools.junk.length)];
            drop = { rarity: 'common', text: `⚪ ${text}` };
        }
        this.save();
        return drop;
    },
    clearVFX: function() {
        this.vfxIntervals.forEach(clearInterval);
        this.vfxIntervals = [];
        const layer = document.getElementById('vfx-layer');
        if (layer) layer.innerHTML = '';
        document.body.className = ''; 
        
        if(!this.equipped.theme && localStorage.getItem('omni_light_mode') === 'true') {
            document.body.classList.add('light-mode');
        }
    },
    runVFXEngine: function(themeId) {
        this.clearVFX();
        const layer = document.getElementById('vfx-layer');
        if (!layer) return;

        if (themeId === 'leg_sakura') {
            document.body.classList.add('theme-sakura');
            this.vfxIntervals.push(setInterval(() => {
                let p = document.createElement('div');
                p.innerHTML = '🌸';
                p.className = 'vfx-particle vfx-sakura';
                p.style.setProperty('left', `${Math.random() * 100}vw`, 'important');
                p.style.setProperty('top', `-10vh`, 'important');
                p.style.setProperty('animation-duration', `${Math.random() * 3 + 5}s`, 'important');
                layer.appendChild(p);
                setTimeout(() => p.remove(), 8000);
            }, 300));
        } else if (themeId === 'leg_antarctica') {
            document.body.classList.add('theme-antarctica');
            this.vfxIntervals.push(setInterval(() => {
                let p = document.createElement('div');
                p.innerHTML = '❄️';
                p.className = 'vfx-particle vfx-snow';
                p.style.setProperty('left', `${Math.random() * 100}vw`, 'important');
                p.style.setProperty('top', `-10vh`, 'important');
                p.style.setProperty('font-size', `${Math.random() * 1 + 0.5}rem`, 'important');
                p.style.setProperty('animation-duration', `${Math.random() * 2 + 3}s`, 'important');
                layer.appendChild(p);
                setTimeout(() => p.remove(), 5000);
            }, 100));
        } else if (themeId === 'leg_ocean') {
            document.body.classList.add('theme-ocean');
            this.vfxIntervals.push(setInterval(() => {
                let p = document.createElement('div');
                p.innerHTML = '🫧';
                p.className = 'vfx-particle vfx-bubble';
                p.style.setProperty('left', `${Math.random() * 100}vw`, 'important');
                p.style.setProperty('bottom', `-10vh`, 'important');
                p.style.setProperty('animation-duration', `${Math.random() * 4 + 4}s`, 'important');
                layer.appendChild(p);
                setTimeout(() => p.remove(), 8000);
            }, 200));
            this.vfxIntervals.push(setInterval(() => {
                let p = document.createElement('div');
                p.innerHTML = '🐟';
                p.className = 'vfx-particle vfx-fish';
                p.style.setProperty('top', `${Math.random() * 80}vh`, 'important');
                p.style.setProperty('left', `0`, 'important');
                p.style.setProperty('animation-duration', `${Math.random() * 5 + 10}s`, 'important');
                layer.appendChild(p);
                setTimeout(() => p.remove(), 15000);
            }, 3000));
        } else if (themeId === 'leg_autumn') {
            document.body.classList.add('theme-autumn');
            this.vfxIntervals.push(setInterval(() => {
                let p = document.createElement('div');
                p.innerHTML = (Math.random() > 0.5) ? '🍁' : '🍂';
                p.className = 'vfx-particle vfx-leaf'; 
                p.style.setProperty('left', `${Math.random() * 100}vw`, 'important');
                p.style.setProperty('top', `-10vh`, 'important');
                p.style.setProperty('animation-duration', `${Math.random() * 3 + 5}s`, 'important');
                layer.appendChild(p);
                setTimeout(() => p.remove(), 8000);
            }, 300));
        } else if (themeId === 'leg_spooky') {
            document.body.classList.add('theme-spooky');
            this.vfxIntervals.push(setInterval(() => {
                let p = document.createElement('div');
                p.innerHTML = '🦇';
                p.className = 'vfx-particle vfx-fish'; 
                p.style.setProperty('top', `${Math.random() * 80}vh`, 'important');
                p.style.setProperty('left', `0`, 'important');
                p.style.setProperty('animation-duration', `${Math.random() * 4 + 6}s`, 'important');
                layer.appendChild(p);
                setTimeout(() => p.remove(), 10000);
            }, 2000));
        }
    },
    applyEquipped: function() {
        const bot = document.getElementById('sleeping-bot');
        const hatSlot = document.getElementById('bot-accessory');
        const petSlot = document.getElementById('pet-container');

        if (!bot || !hatSlot || !petSlot) return;

        if (this.equipped.face) {
            const f = this.pools.faces.find(i => i.id === this.equipped.face);
            if (f) bot.setAttribute('data-face', f.val);
        } else {
            bot.setAttribute('data-face', '◡‸◡');
        }

        if (this.equipped.color) {
            const c = this.pools.colors.find(i => i.id === this.equipped.color);
            if (c) {
                bot.style.setProperty('--bot-color', c.val);
                bot.style.setProperty('--bot-glow', c.glow);
            }
        } else {
            bot.style.removeProperty('--bot-color');
            bot.style.removeProperty('--bot-glow');
        }

        if (this.equipped.hat) {
            const h = this.pools.hats.find(i => i.id === this.equipped.hat);
            hatSlot.innerText = h ? h.icon : '';
        } else {
            hatSlot.innerText = '';
        }

        if (this.equipped.theme !== this.currentTheme) {
            if (this.equipped.theme) this.runVFXEngine(this.equipped.theme);
            else this.clearVFX();
            this.currentTheme = this.equipped.theme;
        }

        if (this.equipped.pet !== this.currentPet) {
            petSlot.innerHTML = '';
            if (this.equipped.pet) {
                const p = this.pools.pets.find(i => i.id === this.equipped.pet);
                if (p) {
                    const petEl = document.createElement('div');
                    petEl.className = `pixel-pet ${p.anim}`;
                    petEl.innerText = p.icon;
                    petSlot.appendChild(petEl);
                }
            }
            this.currentPet = this.equipped.pet;
        }
    },
    renderVaultBtn: function() {
        const btn = document.getElementById('btn-vault');
        if (!btn) return;
        const totalItems = this.inventory.colors.length + this.inventory.hats.length + this.inventory.themes.length + this.inventory.faces.length + this.inventory.pets.length;
        if (totalItems > 0) {
            btn.classList.remove('hidden');
            const vCount = document.getElementById('vault-count');
            if(vCount) vCount.innerText = `(${totalItems}/1000+)`;
        } else {
            btn.classList.add('hidden');
        }
    },
    renderVaultList: function() {
        const list = document.getElementById('vault-list');
        if (!list) return;
        list.innerHTML = '';

        const renderCategory = (title, items, typeKey) => {
            if (items.length === 0) return;
            let html = `<div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; margin-top:10px;">${title}</div>`;
            items.forEach(item => {
                const isEq = this.equipped[typeKey] === item.id;
                const eqText = isEq ? 'Equipped' : 'Equip';
                const btnClass = isEq ? 'inv-btn equipped' : 'inv-btn';
                let display = item.name;
                if(item.icon) display = `${item.icon} ${item.name}`;
                else if (item.val && typeKey === 'face') display = `${item.val}`;
                else if (item.val && typeKey === 'color') display = `<span style="color:${item.val}">●</span> ${item.name}`;

                html += `
                    <div class="inv-item">
                        <div class="inv-item-info">${display}</div>
                        <button class="${btnClass}" onclick="window.toggleEquip('${typeKey}', '${item.id}')">${eqText}</button>
                    </div>
                `;
            });
            list.innerHTML += html;
        };

        renderCategory('Legendary Interfaces', this.inventory.themes, 'theme');
        renderCategory('Auras & Companions (Epic)', this.inventory.pets, 'pet');
        renderCategory('Accessories (Rare)', this.inventory.hats, 'hat');
        renderCategory('Emoticons (Uncommon)', this.inventory.faces, 'face');
        renderCategory('Core Colors (Uncommon)', this.inventory.colors, 'color');
    }
};

window.GachaSystem = GachaSystem;

window.toggleEquip = function(typeKey, itemId) {
    if (GachaSystem.equipped[typeKey] === itemId) {
        GachaSystem.equipped[typeKey] = null; 
    } else {
        GachaSystem.equipped[typeKey] = itemId;
        
        if (typeKey === 'theme') {
            document.body.classList.remove('light-mode');
            try { localStorage.setItem('omni_light_mode', 'false'); } catch(e){}
            const btn = document.getElementById('theme-toggle');
            if (btn) btn.innerHTML = '☀️ Pastel Theme';
        }
    }
    GachaSystem.save();
    GachaSystem.renderVaultList();
};

EventEngine.init();

// PORTFOLIO MODE: Automatically unlock all items so employers can see your UI work!
GachaSystem.inventory.colors = [...GachaSystem.pools.colors];
GachaSystem.inventory.hats = [...GachaSystem.pools.hats];
GachaSystem.inventory.faces = [...GachaSystem.pools.faces];
GachaSystem.inventory.pets = [...GachaSystem.pools.pets];
GachaSystem.inventory.themes = [];
Object.keys(GachaSystem.pools.themes).forEach(season => {
    GachaSystem.inventory.themes.push(...GachaSystem.pools.themes[season]);
});
GachaSystem.save(); 

GachaSystem.applyEquipped();
GachaSystem.renderVaultBtn();

const sleepingBot = document.getElementById('sleeping-bot');
if (sleepingBot) {
    sleepingBot.addEventListener('click', (e) => {
        sleepingBot.style.transform = 'scale(0.9) translateY(5px)';
        setTimeout(() => sleepingBot.style.transform = '', 100);

        const dropData = GachaSystem.roll();
        const drop = document.createElement('div');
        drop.className = `gacha-drop rarity-${dropData.rarity}`;
        drop.innerText = dropData.text;
        
        const randomX = (Math.random() - 0.5) * 160; 
        drop.style.setProperty('--x-spread', `${randomX}px`);
        
        sleepingBot.appendChild(drop);
        setTimeout(() => drop.remove(), 1000);
    });
}

const btnVault = document.getElementById('btn-vault');
const vaultModal = document.getElementById('gacha-vault');
const closeVault = document.getElementById('close-vault');

window.openVault = function() {
    GachaSystem.renderVaultList();
    if(vaultModal) vaultModal.classList.add('open');
};

if (btnVault && vaultModal && closeVault) {
    btnVault.addEventListener('click', (e) => {
        e.stopPropagation();
        window.openVault();
    });
    
    closeVault.addEventListener('click', () => vaultModal.classList.remove('open'));
    
    // Global listener to detect clicks outside the floating vault box
    document.addEventListener('mousedown', (e) => {
        // Only run the check if the vault is actually open
        if (vaultModal.classList.contains('open')) {
            // If the click is NOT inside the vault AND NOT on the button that opens it
            if (!vaultModal.contains(e.target) && !btnVault.contains(e.target)) {
                vaultModal.classList.remove('open');
            }
        }
    });
}

window.forceWakeSystem = function() {
    forceSleep = false;
    const q1 = document.getElementById('q1');
    const q3 = document.getElementById('q3');
    const btnQ1 = document.getElementById('btn-q1');
    const btnQ3 = document.getElementById('btn-q3');

    if (q1) q1.style.display = 'flex';
    if (q3) q3.style.display = 'flex';
    if (btnQ1) btnQ1.classList.add('active');
    if (btnQ3) btnQ3.classList.add('active');

    updateResizers();
};

const dashTitle = document.getElementById('dash-title');
let titleClicks = 0; let titleTimeout;
if (dashTitle) {
    dashTitle.addEventListener('click', () => {
        if (window.innerWidth > 900) return; 
        titleClicks++;

        clearTimeout(titleTimeout);
        if (titleClicks >= 3) {
            forceSleep = !forceSleep;
            updateResizers();
            titleClicks = 0;
        } else {
            titleTimeout = setTimeout(() => titleClicks = 0, 400);
        }
    });
}

// =========================================================================
// LIGHT MODE SYSTEM 
// =========================================================================

window.toggleLightMode = function() {
    const willBeLight = !document.body.classList.contains('light-mode');
    
    if (willBeLight && GachaSystem && GachaSystem.equipped.theme) {
        GachaSystem.equipped.theme = null;
        GachaSystem.save(); 
    }
    
    document.body.classList.toggle('light-mode', willBeLight);
    try { localStorage.setItem('omni_light_mode', willBeLight); } catch(e){}
    const btn = document.getElementById('theme-toggle');
    if(btn) btn.innerHTML = willBeLight ? '🌙 Dark Theme' : '☀️ Pastel Theme';
};

try {
    if(localStorage.getItem('omni_light_mode') === 'true') {
        document.body.classList.add('light-mode');
        const btn = document.getElementById('theme-toggle');
        if(btn) btn.innerHTML = '🌙 Dark Theme';
    }
} catch(e){}

// =========================================================================
// STABLE BASE: PANELS, RESIZING, AND ROUTING LOGIC
// =========================================================================

let forceSleep = false;

function toggleQuadrant(qId) {
    forceSleep = false; 
    const q = document.getElementById(qId);
    const btn = document.getElementById(`btn-${qId}`);
    
    if (q.style.display === 'none') {
        q.style.display = 'flex';
        btn.classList.add('active');
    } else {
        q.style.display = 'none';
        btn.classList.remove('active');
    }
    updateResizers();
}

function updateResizers() {
    const q1Visible = document.getElementById('q1').style.display !== 'none';
    const q2Visible = document.getElementById('q2').style.display !== 'none';
    const q3Visible = document.getElementById('q3').style.display !== 'none';
    const q4Visible = document.getElementById('q4').style.display !== 'none';

    const q1 = document.getElementById('q1');
    const q3 = document.getElementById('q3');
    const topRow = document.getElementById('top-row');
    const botRow = document.getElementById('bottom-row');

    if (!q2Visible && q1Visible) {
        if (!q1.dataset.prevFlex) q1.dataset.prevFlex = q1.style.flex || '0 0 35%';
        q1.style.flex = '1 1 100%';
    } else if (q2Visible && q1Visible) {
        q1.style.flex = q1.dataset.prevFlex || '0 0 35%';
        q1.dataset.prevFlex = ''; 
    }

    if (!q4Visible && q3Visible) {
        if (!q3.dataset.prevFlex) q3.dataset.prevFlex = q3.style.flex || '0 0 70%';
        q3.style.flex = '1 1 100%';
    } else if (q4Visible && q3Visible) {
        q3.style.flex = q3.dataset.prevFlex || '0 0 70%';
        q3.dataset.prevFlex = ''; 
    }

    const topVisible = q1Visible || q2Visible;
    const botVisible = q3Visible || q4Visible;

    const isAsleep = forceSleep || (!topVisible && !botVisible);
    const idleState = document.getElementById('idle-state');
    if (idleState) idleState.style.display = isAsleep ? 'flex' : 'none';
    if (isAsleep) document.body.classList.add('idle-active');
    else document.body.classList.remove('idle-active');

    if (topRow && botRow) {
        if (topVisible && !botVisible) {
            if (!topRow.dataset.prevFlex) topRow.dataset.prevFlex = topRow.style.flex || '1 1 60%';
            topRow.style.flex = '1 1 100%';
        } else if (!topVisible && botVisible) {
            if (!botRow.dataset.prevFlex) botRow.dataset.prevFlex = botRow.style.flex || '1 1 40%';
            botRow.style.flex = '1 1 100%';
        } else if (topVisible && botVisible) {
            if (topRow.dataset.prevFlex) {
                topRow.style.flex = topRow.dataset.prevFlex;
                topRow.dataset.prevFlex = '';
            }
            if (botRow.dataset.prevFlex) {
                botRow.style.flex = botRow.dataset.prevFlex;
                botRow.dataset.prevFlex = '';
            }
        }
    }

    const rTop = document.getElementById('resizer-v-top');
    const rBot = document.getElementById('resizer-v-bottom');
    const rMain = document.getElementById('resizer-h-main');

    if (rTop) rTop.style.display = (q1Visible && q2Visible && !isAsleep) ? 'flex' : 'none';
    if (rBot) rBot.style.display = (q3Visible && q4Visible && !isAsleep) ? 'flex' : 'none';
    
    if (topRow) topRow.style.display = (topVisible && !isAsleep) ? 'flex' : 'none';
    if (botRow) botRow.style.display = (botVisible && !isAsleep) ? 'flex' : 'none';
    if (rMain) rMain.style.display = (topVisible && botVisible && !isAsleep) ? 'flex' : 'none';
}

const resizerVTop = document.getElementById('resizer-v-top');
let isResizingVTop = false;
if (resizerVTop) {
    resizerVTop.addEventListener('mousedown', () => { isResizingVTop = true; document.body.style.userSelect = 'none'; });
}
document.addEventListener('mousemove', (e) => {
    if (!isResizingVTop) return;
    const q1 = document.getElementById('q1');
    const topRow = document.getElementById('top-row');
    if(!topRow) return;
    const containerBox = topRow.getBoundingClientRect();
    let newWidth = e.clientX - containerBox.left;
    if (newWidth < 380) newWidth = 380; 
    if (newWidth > containerBox.width - 380) newWidth = containerBox.width - 380;
    q1.style.flex = `0 0 ${newWidth}px`;
});

const resizerVBottom = document.getElementById('resizer-v-bottom');
let isResizingVBottom = false;
if (resizerVBottom) {
    resizerVBottom.addEventListener('mousedown', () => { isResizingVBottom = true; document.body.style.userSelect = 'none'; });
}
document.addEventListener('mousemove', (e) => {
    if (!isResizingVBottom) return;
    const q3 = document.getElementById('q3');
    const bottomRow = document.getElementById('bottom-row');
    if(!bottomRow) return;
    const containerBox = bottomRow.getBoundingClientRect();
    let newWidth = e.clientX - containerBox.left;
    if (newWidth < 380) newWidth = 380;
    if (newWidth > containerBox.width - 380) newWidth = containerBox.width - 380;
    q3.style.flex = `0 0 ${newWidth}px`;
});

const resizerHMain = document.getElementById('resizer-h-main');
let isResizingHMain = false;
if (resizerHMain) {
    resizerHMain.addEventListener('mousedown', () => { isResizingHMain = true; document.body.style.userSelect = 'none'; });
}
document.addEventListener('mousemove', (e) => {
    if (!isResizingHMain) return;
    const mainContainer = document.getElementById('main-container');
    const topRow = document.getElementById('top-row');
    if(!mainContainer || !topRow) return;
    const containerBox = mainContainer.getBoundingClientRect();
    let newHeight = e.clientY - containerBox.top;
    if (newHeight < 300) newHeight = 300;
    if (newHeight > containerBox.height - 300) newHeight = containerBox.height - 300;
    topRow.style.flex = `0 0 ${newHeight}px`;
});

document.addEventListener('mouseup', () => { 
    isResizingVTop = false; 
    isResizingVBottom = false; 
    isResizingHMain = false; 
    document.body.style.userSelect = ''; 
});

window.openSidebar = function() {
    const configSidebar = document.getElementById('configSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const pingDot = document.getElementById('pingDot');
    
    if (configSidebar) configSidebar.classList.add('open');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    if (openSidebarBtn) openSidebarBtn.classList.add('hidden');
    if (pingDot) pingDot.style.display = 'none';
};

window.closeSidebar = function() {
    const configSidebar = document.getElementById('configSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const fullscreenModal = document.getElementById('fullscreenModal');
    const termWidget = document.getElementById('widget-terminal');
    const isTermOpen = termWidget && termWidget.classList.contains('open');

    if (configSidebar) configSidebar.classList.remove('open');
    if (!isTermOpen && openSidebarBtn) openSidebarBtn.classList.remove('hidden');
    if (sidebarOverlay && (!fullscreenModal || !fullscreenModal.classList.contains('open')) && !isTermOpen) {
        sidebarOverlay.classList.remove('active');
    }
};

window.closeModal = function() {
    const fullscreenModal = document.getElementById('fullscreenModal');
    const modalBody = document.getElementById('modalBody');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const configSidebar = document.getElementById('configSidebar');
    
    if (fullscreenModal) fullscreenModal.classList.remove('open');
    if (modalBody) modalBody.innerHTML = '';
    
    const termWidget = document.getElementById('widget-terminal');
    const isTermOpen = termWidget && termWidget.classList.contains('open');

    if (sidebarOverlay && (!configSidebar || !configSidebar.classList.contains('open')) && !isTermOpen) {
        sidebarOverlay.classList.remove('active');
    }
};

const sidebarOverlayElement = document.getElementById('sidebarOverlay');
if (sidebarOverlayElement) {
    sidebarOverlayElement.addEventListener('click', () => { 
        window.closeSidebar(); 
        window.closeModal(); 
        const termWidget = document.getElementById('widget-terminal');
        if (termWidget) termWidget.classList.remove('open');
        const openSidebarBtn = document.getElementById('openSidebarBtn');
        if (openSidebarBtn) openSidebarBtn.classList.remove('hidden');
        sidebarOverlayElement.classList.remove('active');
    });
}

window.toggleTerminal = function() {
    const termWidget = document.getElementById('widget-terminal');
    const overlay = document.getElementById('sidebarOverlay');
    const sidebarBtn = document.getElementById('openSidebarBtn');
    const configSidebar = document.getElementById('configSidebar');
    
    if (!termWidget) return;

    if (termWidget.classList.contains('open')) {
        termWidget.classList.remove('open');
        if (overlay && (!configSidebar || !configSidebar.classList.contains('open'))) {
            overlay.classList.remove('active');
        }
        if (sidebarBtn && (!configSidebar || !configSidebar.classList.contains('open'))) {
            sidebarBtn.classList.remove('hidden');
        }
    } else {
        termWidget.classList.add('open');
        if (overlay) overlay.classList.add('active');
        if (sidebarBtn) sidebarBtn.classList.add('hidden');
    }
};

window.switchInputTab = function(tab) {
    document.querySelectorAll('.in-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.input-view').forEach(v => v.style.display = 'none');
    
    const targetTab = document.getElementById(`tab-${tab}`);
    const targetView = document.getElementById(`view-${tab}`);
    if (targetTab) targetTab.classList.add('active');
    if (targetView) targetView.style.display = 'flex';
};

// simulateLiveIntercept removed

// Block locked platform toggles (disabled in n8n workflow)
document.addEventListener('change', (e) => {
    if (e.target.classList && e.target.classList.contains('dest-toggle') && e.target.disabled) {
        e.target.checked = false;
        logToTerminal(`⚠ ${e.target.value} is disabled in n8n workflow (coming soon)`, 'warn');
    }
});

// Hide webhook input container when the parent toggle is disabled
function syncWebhookContainerState() {
    document.querySelectorAll('.toggle-item.config-trigger').forEach(function(toggle) {
        var containerId = toggle.getAttribute('data-target');
        var container = document.getElementById(containerId);
        if (container) {
            if (toggle.disabled) {
                container.classList.remove('active');
                container.style.display = 'none';
            }
        }
    });
}
syncWebhookContainerState();

configTriggers.forEach(function(trigger) {
    trigger.addEventListener('change', function(e) {
        var targetId = e.target.getAttribute('data-target');
        var container = document.getElementById(targetId);
        if(container && !e.target.disabled) {
            if(e.target.checked) container.classList.add('active');
            else container.classList.remove('active');
        }
    });
});

window.openModal = function(title, url) {
    modalTitle.innerText = title;
    modalBody.innerHTML = `<iframe src="${url}" frameborder="0" width="100%" height="100%"></iframe>`;
    fullscreenModal.classList.add('open');
    sidebarOverlay.classList.add('active');
};

window.openFullscreen = function(platform) {
    const container = document.getElementById(`iframe-${platform}`);
    if (!container) return;

    const iframe = Array.from(container.querySelectorAll('iframe'))
        .find(el => getComputedStyle(el).display !== 'none') || container.querySelector('iframe');

    if (!iframe || !iframe.src) return;

    const titles = {
        airtable: 'Airtable CRM',
        clickup: 'ClickUp Tasks',
        monday: 'Monday Board',
        sheets: 'Google Sheets'
    };
    const title = titles[platform] || `${platformDetails[platform]?.name || platform} Full Screen`;
    openModal(title, iframe.src);
};

function logToTerminal(message, type = 'info') {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    let prefix = '<span style="color:#3b82f6;">[SYSTEM]</span>';
    if (type === 'send') prefix = '<span style="color:#3b82f6;">[POST -> n8n]</span>';
    if (type === 'success') prefix = '<span style="color:#10b981;">[200 OK]</span>';
    if (type === 'api') prefix = '<span style="color:#f59e0b;">[API CALL]</span>';
    if (type === 'error') prefix = '<span style="color:#ef4444;">[ERROR]</span>';

    const timeSpan = document.createElement('span');
    timeSpan.className = 'log-time';
    timeSpan.textContent = time;
    logEntry.appendChild(timeSpan);

    const prefixSpan = document.createElement('span');
    prefixSpan.style.marginRight = '6px';
    if (type === 'send') { prefixSpan.textContent = '[POST -> n8n]'; prefixSpan.style.color = '#3b82f6'; }
    else if (type === 'success') { prefixSpan.textContent = '[200 OK]'; prefixSpan.style.color = '#10b981'; }
    else if (type === 'api') { prefixSpan.textContent = '[API CALL]'; prefixSpan.style.color = '#f59e0b'; }
    else if (type === 'warn') { prefixSpan.textContent = '[SKIPPED]'; prefixSpan.style.color = '#f59e0b'; }
    else if (type === 'error') { prefixSpan.textContent = '[ERROR]'; prefixSpan.style.color = '#ef4444'; }
    else { prefixSpan.textContent = '[SYSTEM]'; prefixSpan.style.color = '#3b82f6'; }
    logEntry.appendChild(prefixSpan);

    const msgSpan = document.createElement('span');
    msgSpan.textContent = message;
    logEntry.appendChild(msgSpan);
    const consoleOut = document.getElementById('console-output');
    if(consoleOut) consoleOut.appendChild(logEntry);
    
    const terminal = document.getElementById('terminal');
    if (terminal) terminal.scrollTop = terminal.scrollHeight;
}

function updateIframeVisibility() {
    const visualPlatforms = ['airtable', 'clickup', 'monday', 'sheets', 'discord', 'telegram'];
    let hasVisual = false;
    let hasExternalProof = false;
    let firstVisibleTab = null;

    // 1. Handle Visual Iframe Tabs
    visualPlatforms.forEach(platform => {
        const toggle = document.querySelector(`input[value="${platform}"]`);
        const tabBtn = document.getElementById(`tab-${platform}`);

        if (toggle && toggle.checked) {
            hasVisual = true;
            if (tabBtn) tabBtn.style.display = 'inline-block';
            if (!firstVisibleTab) firstVisibleTab = platform; 
        } else {
            if (tabBtn) tabBtn.style.display = 'none';
        }
    });

    // 2. Handle External Proof Links (Notion)
    document.querySelectorAll('.proof-link').forEach(link => {
        const platform = link.getAttribute('data-platform');
        const inputEl = document.querySelector(`input[value="${platform}"]`);
        
        if (inputEl && inputEl.checked) {
            link.style.display = 'inline-block';
            hasExternalProof = true;
        } else {
            link.style.display = 'none';
        }
    });

    // 3. Show/Hide the entire visual widget card based on BOTH conditions
    const syncCard = document.getElementById('widget-sync');
    if (syncCard) {
        syncCard.style.display = (hasVisual || hasExternalProof) ? 'flex' : 'none'; 
    }

    // 4. Show/Hide the external links container specifically
    const proofsContainer = document.getElementById('external-proofs-container');
    if (proofsContainer) {
        proofsContainer.style.display = hasExternalProof ? 'flex' : 'none';
    }

    // 5. Clean up the empty UI boxes
    const allIframes = document.querySelectorAll('.iframe-container');
    if (hasVisual && firstVisibleTab && typeof window.switchTab === 'function') {
        window.switchTab(firstVisibleTab); 
    } else if (!hasVisual) {
        // Strip the active class so no empty gray box appears above Notion
        allIframes.forEach(iframe => iframe.classList.remove('active')); 
    }
}

window.switchTab = function(platform) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.iframe-container').forEach(iframe => iframe.classList.remove('active'));
    const tab = document.getElementById(`tab-${platform}`);
    const iframe = document.getElementById(`iframe-${platform}`);
    if (tab) tab.classList.add('active');
    if (iframe) iframe.classList.add('active');
};

window.reloadIframe = function(platform) {
    const container = document.getElementById(`iframe-${platform}`);
    if (!container) return;

    const iframe = Array.from(container.querySelectorAll('iframe'))
        .find(el => getComputedStyle(el).display !== 'none') || container.querySelector('iframe');

    if (iframe && iframe.src) {
        const currentSrc = iframe.src;
        iframe.src = '';
        setTimeout(() => { iframe.src = currentSrc; }, 50);
    }
};

let currentPipelineView = 'horizontal'; 

window.switchPipelineView = function(viewType) {
    currentPipelineView = viewType;
    
    document.querySelectorAll('.view-controls .view-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-view-${currentPipelineView}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    renderPipeline();
};

function renderPipeline() {
    const checkboxes = document.querySelectorAll('.dest-toggle');
    const selectedDests = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    const vizEl = document.getElementById('dynamic-pipeline');
    if (!vizEl) return;

    vizEl.className = `dynamic-pipeline-container view-${currentPipelineView}`;
    
    let html = '';

    const baseNodes = [
        { id: 'ingest', icon: '📥', name: 'Ingest' },
        { id: 'extract', icon: '🧠', name: 'AI Extract' },
        { id: 'router', icon: '🔀', name: 'Router' }
    ];

    if (currentPipelineView === 'horizontal' || currentPipelineView === 'vertical') {
        const allNodes = baseNodes.concat(selectedDests.map(dest => {
            const item = platformDetails[dest] || { icon: '⚡', name: dest };
            return { id: dest, icon: item.icon, name: item.name };
        }));

        allNodes.forEach((node, index) => {
            if (index > 0) {
                html += `<div class="node-connector" id="conn-${node.id}"><div class="conn-fill"></div></div>`;
            }
            html += `
                <div class="node-item" id="pipe-${node.id}">
                    <div class="node-dot"></div>
                    <div class="node-label">${node.icon} ${node.name}</div>
                </div>
            `;
        });
    } 
    else if (currentPipelineView === 'hub') {
        html += `<div class="hub-trunk">`;
        baseNodes.forEach((node, index) => {
            if (index > 0) {
                html += `<div class="node-connector" id="conn-${node.id}"><div class="conn-fill"></div></div>`;
            }
            html += `
                <div class="node-item" id="pipe-${node.id}">
                    <div class="node-dot"></div>
                    <div class="node-label">${node.icon} ${node.name}</div>
                </div>
            `;
        });
        html += `</div>`; 

        if (selectedDests.length > 0) {
            html += `<div class="node-connector" id="conn-hub"><div class="conn-fill"></div></div>`;
            html += `<div class="hub-grid">`;
            selectedDests.forEach((dest) => {
                const item = platformDetails[dest] || { icon: '⚡', name: dest };
                html += `
                    <div class="node-item" id="pipe-${dest}">
                        <div class="node-dot"></div>
                        <div class="node-label">${item.icon} ${item.name}</div>
                    </div>
                `;
            });
            html += `</div>`;
        }
    }

    vizEl.innerHTML = html;
    
    setTimeout(() => {
        centerActiveNode('pipe-ingest');
    }, 50);
}

function centerActiveNode(nodeId) {
    if (currentPipelineView === 'hub') return; 

    const el = document.getElementById(nodeId);
    const scrollArea = document.getElementById('pipeline-scroll-area');
    if (el && scrollArea) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

window.resetPipeline = function() {
    document.querySelectorAll('.node-item').forEach(n => n.classList.remove('processing', 'success'));
    document.querySelectorAll('.node-connector').forEach(n => n.classList.remove('active'));
    
    // Scroll back to the start based on the current view
    const scrollArea = document.getElementById('pipeline-scroll-area');
    if (scrollArea) {
        if (currentPipelineView === 'horizontal') {
            scrollArea.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    logToTerminal('Pipeline visualization reset to standby.', 'info');
};

if(checkboxes) {
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            updateIframeVisibility();
            renderPipeline();
        });
    });
}
updateIframeVisibility();
window.switchPipelineView(window.innerWidth <= 900 ? 'vertical' : 'horizontal');

const delay = ms => new Promise(res => setTimeout(res, ms));

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const rawDataInput = document.getElementById('raw-data');
        const rawData = rawDataInput ? rawDataInput.value.trim() : "";
        const cbxs = document.querySelectorAll('.dest-toggle');
        const selectedDests = Array.from(cbxs).filter(cb => cb.checked).map(cb => cb.value);

        if (!rawData || selectedDests.length === 0) {
            alert("Payload rejected: Missing data or destinations.");
            return;
        }

        const webhookData = {
            slack: document.getElementById('webhook-slack')?.value || "",
            discord: document.getElementById('webhook-discord')?.value || "",
            telegram: document.getElementById('webhook-telegram')?.value || "",
            whatsapp: document.getElementById('webhook-whatsapp')?.value || "",
            custom: document.getElementById('webhook-custom')?.value || "",
            gmail: document.getElementById('email-gmail')?.value || "",
            sender: document.getElementById('raw-sender')?.value || "client@example.com",
            subject: document.getElementById('raw-subject')?.value || "General Request"
        };

        window.closeSidebar(); 

        document.querySelectorAll('.node-item').forEach(n => n.classList.remove('processing', 'success'));
        document.querySelectorAll('.node-connector').forEach(n => n.classList.remove('active'));
        
        const termToggleBtn = document.getElementById('terminalToggleBtn');
        if (termToggleBtn) termToggleBtn.classList.add('processing');
        
        const processBtn = document.getElementById('process-btn');
        if (processBtn) { processBtn.disabled = true; processBtn.textContent = 'Executing Pipeline...'; }
        
        try {
            const sequence = [
                { id: 'ingest', name: 'Ingest', type: 'base' },
                { id: 'extract', name: 'AI Extract', type: 'base' },
                { id: 'router', name: 'Router', type: 'base' }
            ].concat(selectedDests.map(dest => {
                const item = platformDetails[dest] || { name: dest };
                return { id: dest, name: item.name, type: 'dest' };
            }));

            centerActiveNode('pipe-ingest');
            const nodeIngest = document.getElementById('pipe-ingest');
            if (nodeIngest) nodeIngest.classList.add('processing');
            logToTerminal(`POST → ${N8N_WEBHOOK_URL}`, 'send');
            logToTerminal(`From: ${webhookData.sender} | Subject: ${webhookData.subject}`, 'send');
            logToTerminal(`Destinations: ${selectedDests.join(', ')}`, 'send');

            const requestStartTime = Date.now();
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input_data: rawData,
                    metadata: webhookData,
                    destinations: selectedDests,
                    timestamp: new Date().toISOString()
                })
            });
            const requestDuration = Date.now() - requestStartTime;
            logToTerminal(`Response: HTTP ${response.status} ${response.statusText} | ${requestDuration}ms`, response.ok ? 'success' : 'error');
            let responseData;
            try {
                const rawText = await response.text();
                logToTerminal(`Payload size: ${rawText.length} bytes | type: ${response.headers.get('content-type') || 'unknown'}`, 'info');
                responseData = rawText ? JSON.parse(rawText) : {};
            } catch (parseErr) {
                logToTerminal(`JSON parse failed: ${parseErr.message}`, 'error');
                responseData = {};
            }
            
            await delay(500);
            if (nodeIngest) nodeIngest.classList.replace('processing', 'success');

            for (let i = 1; i < sequence.length; i++) {
                const step = sequence[i];

                if (currentPipelineView === 'hub' && step.type === 'dest' && i === 3) {
                    const hubConn = document.getElementById('conn-hub');
                    if (hubConn) hubConn.classList.add('active');
                    await delay(300);
                } 
                else if (currentPipelineView !== 'hub' || step.type === 'base') {
                    const connector = document.getElementById(`conn-${step.id}`);
                    if (connector) connector.classList.add('active');
                    await delay(300);
                }

                centerActiveNode(`pipe-${step.id}`);
                const nodeEl = document.getElementById(`pipe-${step.id}`);
                if (nodeEl) nodeEl.classList.add('processing');

                if (step.type === 'base') {
                    if (step.id === 'ingest') {
                        logToTerminal(`Payload received: ${rawData.length} chars from ${webhookData.sender}`, 'success');
                    } else if (step.id === 'extract') {
                        logToTerminal('Gemini extraction in progress...', 'api');
                        await delay(400);
                        const ext = responseData && responseData.ai_extracted_data ? responseData.ai_extracted_data : null;
                        if (ext && Object.keys(ext).length > 0) {
                            const summary = ext.lead_name ? `${ext.lead_name} @ ${ext.company || '?'}` : 'parsed';
                            logToTerminal(`AI Extraction Complete → ${summary} | urgency=${ext.urgency || '?'} | sentiment=${ext.sentiment || '?'}`, 'success');
                        } else {
                            logToTerminal('AI Extraction returned no data (backend may have failed)', 'error');
                        }
                    } else if (step.id === 'router') {
                        const destCount = responseData && Array.isArray(responseData.destinations) ? responseData.destinations.length : 0;
                        logToTerminal(`Routing to ${destCount} destination(s): ${selectedDests.join(', ')}`, 'api');
                        await delay(400);
                        logToTerminal('Routing complete', 'success');
                    } else {
                        await delay(400);
                    }
                } else {
                    // For destination steps, look up the actual result from responseData.destinations
                    const destResult = (responseData && Array.isArray(responseData.destinations))
                        ? responseData.destinations.find(d => (d.name || d.platform) === step.id)
                        : null;
                    if (destResult) {
                        if (destResult.ok === true) {
                            let receiptId = '';
                            if (destResult.recordId && typeof destResult.recordId !== 'object') {
                                let cleanId = String(destResult.recordId).substring(0, 20);
                                if (String(destResult.recordId).length > 20) cleanId += '...';
                                receiptId = ` (ID: ${cleanId})`;
                            }
                            logToTerminal(`${step.name} → ✅ sync confirmed${receiptId}`, 'success');
                        } else if (destResult.status === 'skipped') {
                            logToTerminal(`${step.name} → ⏭ skipped (${destResult.error || 'not configured'})`, 'warn');
                        } else {
                            logToTerminal(`${step.name} → ❌ failed: ${destResult.error || 'unknown error'}`, 'error');
                        }
                    } else {
                        logToTerminal(`${step.name} → ⚠ no report from backend (may not be enabled in n8n)`, 'warn');
                    }
                    await delay(400);
                }

                if (nodeEl) nodeEl.classList.replace('processing', 'success');
            }

            // Show the final summary based on actual backend response
            if (responseData && responseData.status) {
                const statusType = responseData.status === 'success' ? 'success' :
                                  responseData.status === 'partial' ? 'warn' : 'error';
                logToTerminal(`Pipeline complete: ${responseData.status.toUpperCase()}`, statusType);
            } else {
                logToTerminal('Pipeline complete (no status field in response)', 'info');
            }
            await delay(500);
            if (processBtn) { processBtn.disabled = false; processBtn.textContent = 'Execute Routing Pipeline'; }
            if (termToggleBtn) termToggleBtn.classList.remove('processing');
            
            // Refresh all live visual embeds if their destinations succeeded
            const successfulDests = (responseData && Array.isArray(responseData.destinations))
                ? responseData.destinations.filter(d => d.ok).map(d => d.name || d.platform)
                : [];

            successfulDests.forEach(dest => {
                if (typeof window.reloadIframe === 'function') {
                    setTimeout(() => window.reloadIframe(dest), 1000); 
                }
            });

        } catch (error) {
            const nodeIngest = document.getElementById('pipe-ingest');
            if (nodeIngest) nodeIngest.classList.remove('processing');
            logToTerminal(`Execution Error: ${error.message}`, 'error');
            logToTerminal(`Possible causes: webhook URL down, n8n workflow error, CORS, network`, 'warn');
            if (processBtn) { processBtn.disabled = false; processBtn.textContent = 'Execute Routing Pipeline'; }
            if (termToggleBtn) termToggleBtn.classList.remove('processing');
        }
    });
}

window.loadTemplate = function(type) {
    const textarea = document.getElementById('raw-data');
    if (!textarea) return;
    if(type === 'lead') textarea.value = "Hi, I'm looking for a luxury home in Beverly Hills. My name is Michael Scott from Dunder Mifflin, budget is like 2 million? I want to see the pine street property ASAP. Can we do this Friday?";
    if(type === 'complaint') textarea.value = "THIS IS UNACCEPTABLE. I have been waiting for my viewing confirmation for 3 days now. My name is Toby Flenderson. This property management service is a disaster. FIX IT NOW.";
};

// --- CO-PILOT AI WIDGET ---

// =========================================================================
// GMAIL INPUT REAL-TIME VALIDATION
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('gmail-target-email');
    const emailIndicator = document.getElementById('email-indicator');

    if (emailInput && emailIndicator) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validateEmail = () => {
            const email = emailInput.value.trim();
            if (email === '') {
                emailIndicator.textContent = '';
                emailIndicator.className = 'validation-icon';
            } else if (emailRegex.test(email)) {
                emailIndicator.textContent = '✓';
                emailIndicator.className = 'validation-icon valid';
            } else {
                emailIndicator.textContent = '✗';
                emailIndicator.className = 'validation-icon invalid';
            }
        };
        emailInput.addEventListener('input', validateEmail);
        validateEmail();
    }
});



// =========================================================================
// WELCOME / ONBOARDING TOUR (Element-targeted)
// =========================================================================

const TOUR_STEPS = [
    { title: 'Step 1: Input Panel', text: 'Paste a messy email here, or use the \'Messy Lead\' preset to load sample data. Then click \'Execute Pipeline\' to start the AI extraction.', targetSelector: '#widget-input', tooltipPosition: 'right' },
    { title: 'Step 2: Database Sync', text: 'Watch leads appear in real-time in Airtable and ClickUp. Toggle destinations in the left sidebar to control which platforms get updated.', targetSelector: '#widget-sync', tooltipPosition: 'left' },
    { title: 'Step 3: Live Pipeline', text: 'This is the visual representation of the AI extraction and routing process. Watch nodes light up as data flows through Ingest \u2192 Extract \u2192 Router \u2192 destinations.', targetSelector: '#widget-pipeline', tooltipPosition: 'top' },
    { title: 'Step 4: System Terminal', text: 'Every step is logged here. Click \'Raw\' to see the exact JSON payload returned by the backend n8n workflow.', targetSelector: '#widget-terminal', tooltipPosition: 'left' },
    { title: 'Step 5: Theme Toggle', text: 'Click here to switch between Dark mode and the Pastel Light theme. Perfect for showing off the UI in different lighting conditions.', targetSelector: '#theme-toggle', tooltipPosition: 'bottom' },
    { title: 'Step 6: Configuration Sidebar', text: 'Click this pulsing left-edge button to open the configuration stack. Choose which 11 platforms to route to \u2014 the pipeline updates live.', targetSelector: '#openSidebarBtn', tooltipPosition: 'right' },
    { title: 'Step 7: Technical Co-Pilot', text: 'Need help understanding the architecture? Click the chat bubble to ask the Co-Pilot about the tech stack, extraction process, or n8n workflow.', targetSelector: '#chatToggleBtn', tooltipPosition: 'left' }
];

let currentTourStep = 0;

function showWelcomeIfFirstVisit() {
    try {
        const seen = localStorage.getItem('iar_welcome_seen');
        if (seen) return;
    } catch(e) { return; }

    const waitForPreloaderAndShow = function() {
        const preloader = document.getElementById('system-preloader');
        if (!preloader) {
            setTimeout(showWelcome, 500);
        } else {
            setTimeout(waitForPreloaderAndShow, 100);
        }
    };

    if (document.readyState === 'complete') {
        setTimeout(waitForPreloaderAndShow, 300);
    } else {
        window.addEventListener('load', function() { setTimeout(waitForPreloaderAndShow, 500); });
    }
}

function showWelcome() {
    const modal = document.getElementById('welcome-modal');
    if (!modal) return;
    try { showIntroScreen(); } catch(e) {}
    modal.style.display = 'flex';
    document.body.classList.add('welcome-active');
    requestAnimationFrame(function() { modal.classList.add('visible'); });
}

window.showIntroScreen = function() {
    const intro = document.getElementById('welcome-screen-intro');
    const showcase = document.getElementById('welcome-screen-showcase');
    const tour = document.getElementById('welcome-screen-tour');
    if (intro) intro.style.display = 'flex';
    if (showcase) showcase.style.display = 'none';
    if (tour) tour.style.display = 'none';
    resetSpotlight();
};

window.showShowcaseScreen = function() {
    const intro = document.getElementById('welcome-screen-intro');
    const showcase = document.getElementById('welcome-screen-showcase');
    const tour = document.getElementById('welcome-screen-tour');
    if (intro) intro.style.display = 'none';
    if (showcase) showcase.style.display = 'flex';
    if (tour) tour.style.display = 'none';
    resetSpotlight();
};

function resetSpotlight() {
    const spotlight = document.getElementById('welcome-spotlight');
    const arrow = document.getElementById('welcome-arrow');
    const panel = document.getElementById('welcome-panel');
    if (spotlight) {
        spotlight.style.clipPath = 'none';
        spotlight.style.backdropFilter = 'blur(4px)';
        spotlight.style.webkitBackdropFilter = 'blur(4px)';
        spotlight.style.background = 'rgba(0,0,0,0.5)';
    }
    if (arrow) arrow.style.display = 'none';
    if (panel) {
        panel.style.position = 'relative';
        panel.style.left = 'auto';
        panel.style.top = 'auto';
        panel.style.transform = 'none';
        panel.style.maxWidth = '380px';
    }
}

window.closeWelcome = function() {
    const modal = document.getElementById('welcome-modal');
    if (!modal) return;
    modal.classList.remove('visible');
    document.body.classList.remove('welcome-active');
    setTimeout(function() {
        modal.style.display = 'none';
        try { localStorage.setItem('iar_welcome_seen', 'true'); } catch(e) {}
    }, 300);
    const spotlight = document.getElementById('welcome-spotlight');
    const arrow = document.getElementById('welcome-arrow');
    if (spotlight) spotlight.style.cssText = '';
    if (arrow) arrow.style.cssText = '';
};

window.startOnboardingTour = function() {
    const intro = document.getElementById('welcome-screen-intro');
    const showcase = document.getElementById('welcome-screen-showcase');
    const tour = document.getElementById('welcome-screen-tour');
    if (intro) intro.style.display = 'none';
    if (showcase) showcase.style.display = 'none';

    // Skip tour on very small screens
    if (window.innerWidth < 480) {
        if (tour) {
            tour.innerHTML = '<h2 class="welcome-title">Tour Paused</h2>' +
                '<p class="welcome-text">The interactive tour works best on desktop or tablet (480px+ wide). On mobile, you can explore the dashboard freely \u2014 toggle panels using the buttons in the header.</p>' +
                '<div class="welcome-actions"><button class="welcome-btn primary" onclick="closeWelcome()">Got it</button></div>';
            tour.style.display = 'flex';
        }
        return;
    }

    if (tour) tour.style.display = 'flex';
    currentTourStep = 0;
    renderTourProgress();
    renderTourStep();
};

function renderTourProgress() {
    const container = document.getElementById('tour-progress-dots');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < TOUR_STEPS.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'tour-dot' + (i <= currentTourStep ? ' active' : '');
        dot.setAttribute('data-step', i + 1);
        container.appendChild(dot);
    }
}

function renderTourStep() {
    const step = TOUR_STEPS[currentTourStep];
    if (!step) return;

    const titleEl = document.getElementById('tour-title');
    const textEl = document.getElementById('tour-text');
    if (titleEl) titleEl.textContent = step.title;
    if (textEl) textEl.textContent = step.text;

    document.querySelectorAll('.tour-dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i <= currentTourStep);
    });

    const nextBtn = document.getElementById('tour-next-btn');
    if (nextBtn) nextBtn.textContent = currentTourStep === TOUR_STEPS.length - 1 ? 'Finish' : 'Next';

    positionTourForStep(step);
}

function positionTourForStep(step) {
    const target = document.querySelector(step.targetSelector);
    const spotlight = document.getElementById('welcome-spotlight');
    const panel = document.getElementById('welcome-panel');
    const arrow = document.getElementById('welcome-arrow');

    if (!spotlight || !panel) return;

    if (!target) {
        panel.style.position = 'relative';
        panel.style.left = 'auto';
        panel.style.top = 'auto';
        panel.style.transform = 'none';
        panel.style.maxWidth = '380px';
        if (arrow) arrow.style.display = 'none';
        return;
    }

    const rect = target.getBoundingClientRect();
    const pad = 12;
    const x = rect.left - pad;
    const y = rect.top - pad;
    const w = rect.width + pad * 2;
    const h = rect.height + pad * 2;

    spotlight.style.position = 'fixed';
    spotlight.style.top = '0';
    spotlight.style.left = '0';
    spotlight.style.width = '100vw';
    spotlight.style.height = '100vh';
    spotlight.style.background = 'rgba(0,0,0,0.6)';
    spotlight.style.backdropFilter = 'blur(4px)';
    spotlight.style.webkitBackdropFilter = 'blur(4px)';
    spotlight.style.pointerEvents = 'none';
    spotlight.style.transition = 'clip-path 0.3s ease, background 0.3s ease';
    spotlight.style.clipPath = 'polygon(0% 0%, 0% 100%, ' + x + 'px 100%, ' + x + 'px ' + y + 'px, ' + (x + w) + 'px ' + y + 'px, ' + (x + w) + 'px ' + (y + h) + 'px, ' + x + 'px ' + (y + h) + 'px, ' + x + 'px 100%, 100% 100%, 100% 0%)';

    const isMobile = window.innerWidth < 600;
    const panelW = isMobile ? Math.min(window.innerWidth - 40, 360) : 360;
    const panelH = isMobile ? 200 : 240;
    const margin = isMobile ? 16 : 24;
    let panelX, panelY;

    if (isMobile) {
        panelX = 20;
        panelY = window.innerHeight - panelH - 20;
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (step.tooltipPosition === 'right') {
        panelX = rect.right + margin;
        panelY = rect.top + rect.height / 2 - panelH / 2;
    } else if (step.tooltipPosition === 'left') {
        panelX = rect.left - panelW - margin;
        panelY = rect.top + rect.height / 2 - panelH / 2;
    } else if (step.tooltipPosition === 'top') {
        panelX = rect.left + rect.width / 2 - panelW / 2;
        panelY = rect.top - panelH - margin;
    } else {
        panelX = rect.left + rect.width / 2 - panelW / 2;
        panelY = rect.bottom + margin;
    }

    panelX = Math.max(20, Math.min(panelX, window.innerWidth - panelW - 20));
    panelY = Math.max(20, Math.min(panelY, window.innerHeight - panelH - 20));

    panel.style.position = 'fixed';
    panel.style.left = panelX + 'px';
    panel.style.top = panelY + 'px';
    panel.style.transform = 'none';
    panel.style.maxWidth = panelW + 'px';

    if (arrow) {
        const arrowSize = 60;
        let arrowX, arrowY, rotation = 0;

        if (step.tooltipPosition === 'right') {
            arrowX = rect.right + 4;
            arrowY = rect.top + rect.height / 2 - arrowSize / 2;
            rotation = 180;
        } else if (step.tooltipPosition === 'left') {
            arrowX = rect.left - arrowSize - 4;
            arrowY = rect.top + rect.height / 2 - arrowSize / 2;
            rotation = 0;
        } else if (step.tooltipPosition === 'top') {
            arrowX = rect.left + rect.width / 2 - arrowSize / 2;
            arrowY = rect.top - arrowSize - 4;
            rotation = 90;
        } else {
            arrowX = rect.left + rect.width / 2 - arrowSize / 2;
            arrowY = rect.bottom + 4;
            rotation = -90;
        }

        arrow.style.display = 'block';
        arrow.style.left = arrowX + 'px';
        arrow.style.top = arrowY + 'px';
        arrow.style.transform = 'rotate(' + rotation + 'deg)';
        arrow.style.transition = 'all 0.3s ease';
    }
}

window.nextTourStep = function() {
    if (currentTourStep < TOUR_STEPS.length - 1) {
        currentTourStep++;
        renderTourStep();
    } else {
        closeWelcome();
    }
};

window.addEventListener('resize', function() {
    const step = TOUR_STEPS[currentTourStep];
    const tourScreen = document.getElementById('welcome-screen-tour');
    if (step && tourScreen && tourScreen.style.display === 'flex') {
        positionTourForStep(step);
    }
});

showWelcomeIfFirstVisit();

// =========================================================================
// CO-PILOT AI WIDGET (Triage: AI answers, human when needed)
// =========================================================================

const CHAT_PRESETS = [
    { icon: '🧠', text: 'How does AI extraction work?', topic: 'extract' },
    { icon: '⚙️', text: "What's the tech stack?", topic: 'stack' },
    { icon: '🔌', text: 'How do I add a destination?', topic: 'destination' },
    { icon: '🎨', text: 'Can I customize the UI?', topic: 'custom' },
    { icon: '📡', text: 'How do I receive real emails?', topic: 'email' },
    { icon: '🔒', text: 'Is my data secure?', topic: 'secure' }
];

const KNOWLEDGE_BASE = {
    extract: "The AI extraction uses Google Gemini Flash via the n8n LangChain node. It reads unstructured text and outputs a structured JSON schema with lead_name, company, budget, urgency, sentiment, and summary. The schema is enforced by an output parser for consistent fields.",
    stack: "Built with vanilla JavaScript, HTML, and CSS on the frontend — no frameworks, no build step. The backend is an n8n workflow with Google Gemini for AI extraction. It has 18 destination nodes total, 11 currently enabled (airtable, hubspot, notion, clickup, asana, monday, klaviyo, telegram, discord, gmail, custom) and 7 disabled (sheets, trello, shopify, gcal, whatsapp, stripe, slack). Reachable via Cloudflare tunnel.",
    destination: "To add a new destination: (1) add a new toggle in the sidebar HTML, (2) add it to the LIVE_PLATFORMS Set in script.js, (3) add a routing branch in the n8n workflow's Switch node, (4) add an HTTP Request node for the platform's API. The pipeline visualization auto-updates from LIVE_PLATFORMS.",
    custom: "Yes! The UI is fully themeable. Click '🎒 Customize UI' to open the Vault and unlock seasonal themes, hats, and pixel pets. The dark/light toggle is in the header. For deeper changes, edit the CSS variables in style.css (--bg-color, --accent-color, etc.).",
    email: "For real email routing, set up a Cloudflare email worker that forwards inbound emails to the n8n webhook. The current demo uses a simulated inbound. For production, you'll need a permanent webhook URL — see workflow.json for the path.",
    secure: "Your data is processed in real-time and not stored anywhere. The Gemini API call is transient, and each platform's API receives only the extracted fields (no raw email content). The webhook URL should be kept private — never commit it to a public repo."
};

const ESCALATION_KEYWORDS = [
    'urgent', 'help me', 'broken', 'critical', 'production',
    'hire', 'project', 'freelance', 'contract', 'pricing',
    'cost', 'timeline', 'collaboration', 'partnership',
    'enterprise', 'custom build', 'consulting'
];

const TOPIC_KEYWORDS = {
    extract: ['extract', 'ai', 'gemini', 'parse', 'process'],
    stack: ['stack', 'built', 'technology', 'framework', 'language'],
    destination: ['destination', 'integrate', 'platform', 'add', 'connect'],
    custom: ['custom', 'theme', 'color', 'style', 'personalize'],
    email: ['email', 'webhook', 'inbound', 'receive'],
    secure: ['secure', 'security', 'privacy', 'data', 'safe']
};

let isSendingChat = false;
let escalationMode = false;
let askedQuestions = new Set();


// =========================================================================
// UNIFIED CO-PILOT CHAT ENGINE & CONTROLLER
// =========================================================================

/**
 * Toggle visibility of chat widget drawer and background overlay.
 */
window.toggleChat = function() {
    const chat = document.getElementById('chatContainer');
    const toggleBtn = document.getElementById('chatToggleBtn');
    const overlay = document.getElementById('chatOverlay');
    const sidebarBtn = document.getElementById('openSidebarBtn');
    
    if (chat) chat.classList.toggle('open');
    if (toggleBtn) toggleBtn.classList.toggle('hidden');
    if (overlay) overlay.classList.toggle('active');

    // Hide sidebar button to prevent UI bleed on mobile
    if (chat && chat.classList.contains('open')) {
        if (sidebarBtn) sidebarBtn.style.display = 'none';
    } else {
        if (sidebarBtn) sidebarBtn.style.display = 'flex';
    }
};

/**
 * Append a chat bubble message to the chat history.
 */
window.addChatMessage = function(text, type, allowHtml = false) {
    const chatBox = document.getElementById('chat-box');
    const typing = document.getElementById('typing-indicator');
    if (!chatBox) return;

    const msg = document.createElement('div');
    msg.className = 'msg ' + (type === 'user' ? 'user' : 'bot');
    if (allowHtml) {
        msg.innerHTML = text;
    } else {
        msg.textContent = text;
    }

    if (typing && typing.parentNode === chatBox) {
        chatBox.insertBefore(msg, typing);
    } else {
        chatBox.appendChild(msg);
    }
    chatBox.scrollTop = chatBox.scrollHeight;
};

/**
 * Control typing indicator bubble visibility.
 */
window.showTyping = function(show) {
    const typing = document.getElementById('typing-indicator');
    const chatBox = document.getElementById('chat-box');
    if (!typing) return;
    if (show) {
        typing.classList.add('active');
        typing.style.display = 'inline-flex';
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        typing.classList.remove('active');
        typing.style.display = 'none';
    }
};

/**
 * 100% Silent custom message handler.
 * Displays user message and silently relays without fake bot replies.
 */
window.submitEscalation = function() {
    if (window.isSendingChat) return;
    const input = document.getElementById('user-input');
    const text = input ? input.value.trim() : '';
    if (!text) return;

    window.isSendingChat = true;

    // 1. Display the user's message in the chat history
    window.addChatMessage(text, 'user');
    if (input) input.value = '';

    // 2. DO NOT trigger typing indicator or any bot reply.
    // Message is silently accepted.
    setTimeout(() => {
        window.isSendingChat = false;
    }, 300);
};

/**
 * Handle human escalation request.
 * Posts user intent, displays typing indicator, and returns direct developer support card.
 */
window.triggerHumanEscalation = function() {
    if (window.isSendingChat) return;
    window.isSendingChat = true;

    // Natural user phrase
    window.addChatMessage("I'd like to connect with the developer.", 'user');
    window.showTyping(true);

    setTimeout(function() {
        window.showTyping(false);
        const replyHtml = `
            <p style="margin-top: 0; margin-bottom: 8px;">Routing you to live support. 🤖➡️👤</p>
            <p style="margin-bottom: 10px; font-size: 0.80rem; color: var(--text-muted);">Click below to connect directly with the lead engineer:</p>
            <a href="https://t.me/YOUR_TELEGRAM_HANDLE" target="_blank" rel="noopener noreferrer" class="telegram-live-btn">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.97 1.25-5.56 3.67-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.49-.41-1.44-.87.03-.24.35-.48.96-.74 3.78-1.65 6.3-2.73 7.55-3.25 3.6-1.5 4.35-1.76 4.84-1.77.11 0 .36.03.49.14.11.1.15.23.16.36.01.12-.01.26-.03.38z"/></svg>
                Open Live Support ↗
            </a>
        `;
        window.addChatMessage(replyHtml, 'bot', true);

        const inputArea = document.getElementById('chat-input-area');
        if (inputArea) inputArea.classList.remove('hidden');

        window.isSendingChat = false;
    }, 1000);
};

/**
 * Handle preset FAQ question clicks.
 */
window.sendFaq = function(text) {
    if (window.isSendingChat) return;
    window.isSendingChat = true;

    // Visual feedback for clicked chip
    const chips = document.querySelectorAll('.prompt-chip');
    chips.forEach(chip => {
        if (chip.textContent.trim() === text.trim()) {
            chip.style.opacity = '0.5';
            chip.style.pointerEvents = 'none';
        }
    });

    window.addChatMessage(text, 'user');
    window.showTyping(true);

    setTimeout(function() {
        window.showTyping(false);
        let reply = "I can help with that!";
        if (typeof KNOWLEDGE_BASE !== 'undefined') {
            const lower = text.toLowerCase();
            if (lower.includes('extraction') || lower.includes('ai')) {
                reply = KNOWLEDGE_BASE.extract;
            } else if (lower.includes('tech stack') || lower.includes('stack')) {
                reply = KNOWLEDGE_BASE.stack;
            } else if (lower.includes('destination')) {
                reply = KNOWLEDGE_BASE.destination;
            } else if (lower.includes('customize') || lower.includes('ui')) {
                reply = KNOWLEDGE_BASE.custom;
            } else if (lower.includes('real email') || lower.includes('receive')) {
                reply = KNOWLEDGE_BASE.email;
            } else if (lower.includes('secure') || lower.includes('security')) {
                reply = KNOWLEDGE_BASE.secure;
            }
        }
        window.addChatMessage(reply, 'bot');
        window.isSendingChat = false;
    }, 900);
};

/**
 * Backward-compatible alias for preset questions.
 */
window.askPresetQuestion = function(val) {
    if (typeof val === 'number' && typeof CHAT_PRESETS !== 'undefined' && CHAT_PRESETS[val]) {
        window.sendFaq(CHAT_PRESETS[val].text);
    } else if (typeof val === 'string') {
        window.sendFaq(val);
    }
};

/**
 * Reset conversation history to initial clean state.
 */
window.resetChat = function() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    chatBox.innerHTML = `
        <div class="msg bot" id="chat-intro-msg">
            Hi! I'm the AI Co-Pilot. Most questions are answered instantly by the presets below. If you need human help, click the button at the bottom.
        </div>
        <div class="typing-indicator" id="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    const chips = document.querySelectorAll('.prompt-chip');
    chips.forEach(chip => {
        chip.style.opacity = '1';
        chip.style.pointerEvents = 'auto';
    });
};

/**
 * Unified Chat Widget DOM Initializer.
 * Enforces strict DOM hierarchy, dual arrow navigation, and cleans up event listeners.
 */
window.initChatWidget = function() {
    const chatContainer = document.getElementById('chatContainer');
    const chatBox = document.getElementById('chat-box');
    const inputArea = document.getElementById('chat-input-area');

    if (!chatContainer || !chatBox || !inputArea) return;

    // 1. Ensure typing indicator exists inside chat-box
    let typing = document.getElementById('typing-indicator');
    if (!typing) {
        typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.id = 'typing-indicator';
        typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        chatBox.appendChild(typing);
    }

    // 2. Clean up any existing quick-prompts wrappers to avoid duplicates
    document.querySelectorAll('.quick-prompts-wrapper').forEach(w => {
        const bar = w.querySelector('.quick-prompts-bar');
        if (bar && w.parentNode) {
            w.parentNode.replaceChild(bar, w);
        }
    });

    // 3. Clean up the quick prompts bar
    const quickPrompts = document.querySelector('.quick-prompts-bar');
    if (quickPrompts) {
        // Remove old robotic human help chip
        quickPrompts.querySelectorAll('.prompt-chip').forEach(chip => {
            if (chip.textContent.includes('human') || chip.classList.contains('urgent-chip')) {
                chip.remove();
            }
        });

        // Re-wrap quick prompts with smooth dual arrows
        const wrapper = document.createElement('div');
        wrapper.className = 'quick-prompts-wrapper';
        if (quickPrompts.parentNode) {
            quickPrompts.parentNode.insertBefore(wrapper, quickPrompts);
        }

        const leftBtn = document.createElement('button');
        leftBtn.className = 'prompt-scroll-btn';
        leftBtn.setAttribute('type', 'button');
        leftBtn.setAttribute('aria-label', 'Scroll prompts left');
        leftBtn.innerHTML = '&#10094;';
        leftBtn.onclick = () => quickPrompts.scrollBy({ left: -140, behavior: 'smooth' });

        const rightBtn = document.createElement('button');
        rightBtn.className = 'prompt-scroll-btn';
        rightBtn.setAttribute('type', 'button');
        rightBtn.setAttribute('aria-label', 'Scroll prompts right');
        rightBtn.innerHTML = '&#10095;';
        rightBtn.onclick = () => quickPrompts.scrollBy({ left: 140, behavior: 'smooth' });

        wrapper.appendChild(leftBtn);
        wrapper.appendChild(quickPrompts);
        wrapper.appendChild(rightBtn);
    }

    // 4. Ensure Human Support Footer link exists
    let footerContainer = document.querySelector('.human-footer-container');
    if (!footerContainer) {
        footerContainer = document.createElement('div');
        footerContainer.className = 'human-footer-container';
        footerContainer.innerHTML = '<a href="#" class="human-footer-link">Talk to the developer ↗</a>';
        const link = footerContainer.querySelector('.human-footer-link');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.triggerHumanEscalation();
            });
        }
    } else {
        const link = footerContainer.querySelector('.human-footer-link');
        if (link) {
            link.textContent = 'Talk to the developer ↗';
        }
    }

    // 5. Enforce strict DOM stacking order:
    // [chat-header] -> [chat-box] -> [quick-prompts-wrapper] -> [chat-input-area] -> [human-footer-container]
    const header = chatContainer.querySelector('.chat-header');
    if (header) chatContainer.appendChild(header);
    chatContainer.appendChild(chatBox);
    const wrapperEl = document.querySelector('.quick-prompts-wrapper');
    if (wrapperEl) chatContainer.appendChild(wrapperEl);
    chatContainer.appendChild(inputArea);
    if (footerContainer) chatContainer.appendChild(footerContainer);

    // 6. PERMANENT BUG FIX: Replace input and send button with fresh clones to purge stacked listeners
    const rawInput = document.getElementById('user-input');
    const rawSendBtn = document.getElementById('send-btn');

    if (rawInput && rawInput.parentNode) {
        const freshInput = rawInput.cloneNode(true);
        rawInput.parentNode.replaceChild(freshInput, rawInput);
        freshInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                if (window.innerWidth > 900) {
                    if (!e.shiftKey) {
                        e.preventDefault();
                        window.submitEscalation();
                    }
                }
            }
        });
    }

    if (rawSendBtn && rawSendBtn.parentNode) {
        const freshSendBtn = rawSendBtn.cloneNode(true);
        rawSendBtn.parentNode.replaceChild(freshSendBtn, rawSendBtn);
        freshSendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.submitEscalation();
        });
    }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initChatWidget);
} else {
    window.initChatWidget();
}

// --- OVERRIDE: IN-APP LIVE SUPPORT RELAY (NO REDIRECTS) ---

// 1. When they click the subtle "Talk to the developer" link
window.triggerHumanEscalation = function() {
    if (window.isSendingChat) return;
    window.isSendingChat = true;

    addChatMessage("I'd like to connect with the developer.", 'user');
    showTyping(true);

    setTimeout(function() {
        showTyping(false);
        const chatBox = document.getElementById('chat-box');
        const typing = document.getElementById('typing-indicator');
        
        const msg = document.createElement('div');
        msg.className = 'msg bot escalation-message';
        // Clean message setting the expectation that the chat happens RIGHT HERE
        msg.innerHTML = `
            <p style="margin: 0 0 8px 0;"><strong>Live Support Mode Activated</strong> 🟢</p>
            <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Please type your message below. It will be sent directly to my phone, and my reply will appear right here in this chat.</p>
        `;
        
        if (chatBox && typing) {
            chatBox.insertBefore(msg, typing);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        const inputArea = document.getElementById('chat-input-area');
        if (inputArea) inputArea.classList.remove('hidden');

        window.isSendingChat = false;
    }, 1000);
};

// 2. When they actually send a custom message
window.submitEscalation = function(e) {
    if (e) e.preventDefault();
    const input = document.getElementById("user-input");
    const text = input ? input.value.trim() : "";
    if (!text) return;

    // Display user message instantly
    addChatMessage(text, 'user');
    if (input) input.value = "";
    showTyping(true);
    
    // Simulate relaying the message to the backend (NO Telegram Links!)
    setTimeout(() => {
        showTyping(false);
        addChatMessage("✓ Message delivered. Waiting for developer reply...", 'bot');
        window.isSendingChat = false;
        
        // (In the future, this is where we will trigger the polling function 
        // to check n8n for your reply from Telegram)
    }, 1000);
};

// 3. Ensure the Send button and Enter key use the new logic
window.addEventListener('load', () => {
    const oldBtn = document.getElementById('send-btn');
    if (oldBtn) {
        const freshBtn = document.createElement('button');
        freshBtn.className = oldBtn.className;
        freshBtn.id = oldBtn.id;
        freshBtn.textContent = 'Send';
        freshBtn.onclick = window.submitEscalation;
        oldBtn.parentNode.replaceChild(freshBtn, oldBtn);
    }

    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.onkeydown = function(e) {
            if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 900) {
                e.preventDefault();
                window.submitEscalation();
            }
        };
    }
});


// --- MASTER OVERRIDE: SILENT LIVE CHAT HANDLER ---

// 1. Rewrite the submit function to be 100% silent (no bot replies, no typing indicators)
window.submitEscalation = function(e) {
    if (e) e.preventDefault();
    const input = document.getElementById("user-input");
    const text = input ? input.value.trim() : "";
    if (!text) return;

    // Display user message instantly
    addChatMessage(text, 'user');
    
    // Clear input
    if (input) input.value = "";
    
    // STAY SILENT: No fake bot messages. Awaiting true Telegram relay.
    window.isSendingChat = false; 
};

// 2. Re-bind the Send button and Enter key, wiping out hidden ghost listeners
(function enforceSilentSend() {
    window.addEventListener('DOMContentLoaded', () => {
        const sendBtn = document.getElementById('send-btn');
        const userInput = document.getElementById('user-input');

        if (sendBtn && userInput) {
            // Clone to destroy old background click events
            const newSendBtn = sendBtn.cloneNode(true);
            sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);
            newSendBtn.addEventListener('click', window.submitEscalation);

            // Overwrite keydown directly to destroy old background enter events
            userInput.onkeydown = function(e) {
                if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 900) {
                    e.preventDefault();
                    window.submitEscalation();
                }
            };
        }
    });
})();



// --- OVERRIDE: PROCEDURAL PAYLOAD GENERATOR (ZERO TOKEN COST) ---
(function injectRandomGenerator() {
    window.addEventListener('DOMContentLoaded', () => {
        // 1. Locate the container holding the old preset buttons
        const inputView = document.getElementById('view-simulator');
        if (!inputView) return;
        
        const buttonContainer = inputView.querySelector('div'); // The flex div holding the presets
        if (!buttonContainer) return;

        // 2. Replace the old buttons with a single dynamic Randomize button
        buttonContainer.innerHTML = `
            <button type="button" class="preset-btn" id="btn-random-payload" style="background: rgba(139, 92, 246, 0.1); border-color: var(--accent-color); color: var(--text-main); width: 100%; justify-content: center; display: flex; gap: 8px;">
                <span style="font-size: 1.1rem;">🎲</span> Generate Random Inbound Lead
            </button>
        `;

        // 3. The Procedural Data Vault
        const dataVault = {
            firstNames: ['Michael', 'Sarah', 'James', 'Elena', 'David', 'Chloe', 'Marcus', 'Priya', 'Alex', 'Jordan'],
            lastNames: ['Scott', 'Connor', 'Bond', 'Fisher', 'Chen', 'Miller', 'Wright', 'Patel', 'Rodriguez', 'Kim'],
            companies: ['Dunder Mifflin', 'CyberDyne', 'Stark Industries', 'Acme Corp', 'GlobalTech', 'Apex Solutions', 'Nexus Dynamics', 'Zephyr Co'],
            budgets: ['$5,000', '$12,500', '$50k', 'around 100k', 'a tight budget of $2k', 'unlimited budget', '$25,000/mo', '10 grand'],
            urgencyPhrases: ['by next Friday', 'within 2 weeks', 'by the end of the month', 'in about 10 days', 'before the quarter ends', 'sometime next week'],
            
            // Templates use placeholders like {name}, {company}, etc.
            templates: [
                {
                    subject: "Enterprise Pricing Inquiry - {company}",
                    body: "Hi team,\n\nI was browsing your site and we need an enterprise license for {company}. My name is {name} and I'm leading the procurement.\n\nWe have {budget} allocated for this quarter. Can we jump on a call {urgency}? \n\nThanks!"
                },
                {
                    subject: "URGENT: System Down for {company}!!!",
                    body: "THIS IS UNACCEPTABLE! \n\nOur entire production environment at {company} has been down for two hours. I am {name}, the CTO. We are losing money every minute.\n\nI need an engineer on this {urgency}. We pay {budget} a year for this service, I expect better!"
                },
                {
                    subject: "Partnership Opportunity with {company}",
                    body: "Hey there! {name} here from {company}.\n\nLove what you guys are building. We're looking to integrate your API and have a warchest of {budget} to get this done. \n\nLet's connect {urgency} to discuss synergies.\n\nCheers."
                },
                {
                    subject: "Quick question regarding {company} account",
                    body: "Hello,\n\nJust a quick note from {name} over at {company}. We are looking to upgrade our current tier. We have about {budget} to spend.\n\nPlease get back to me {urgency} with some options.\n\nBest,\n{name}"
                },
                {
                    subject: "Angry customer: {name}",
                    body: "To whom it may concern,\n\nI have emailed you three times already. I am {name} from {company}. If this isn't resolved {urgency}, I am taking my {budget} elsewhere. \n\nFix my billing issue now."
                }
            ]
        };

        // 4. Randomization Logic
        const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        document.getElementById('btn-random-payload').addEventListener('click', () => {
            // Pick random elements
            const fn = getRandom(dataVault.firstNames);
            const ln = getRandom(dataVault.lastNames);
            const fullName = `${fn} ${ln}`;
            const company = getRandom(dataVault.companies);
            const budget = getRandom(dataVault.budgets);
            const urgency = getRandom(dataVault.urgencyPhrases);
            const domain = company.toLowerCase().replace(/\s+/g, '') + '.com';
            const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@${domain}`;

            // Pick a random template
            const template = getRandom(dataVault.templates);

            // Replace placeholders
            const processText = (text) => {
                return text
                    .replace(/{name}/g, fullName)
                    .replace(/{company}/g, company)
                    .replace(/{budget}/g, budget)
                    .replace(/{urgency}/g, urgency);
            };

            // Inject into DOM
            const senderEl = document.getElementById('raw-sender');
            const subjectEl = document.getElementById('raw-subject');
            const dataEl = document.getElementById('raw-data');

            if (senderEl) senderEl.value = email;
            if (subjectEl) subjectEl.value = processText(template.subject);
            
            // Add a cool typing effect for the main payload body
            if (dataEl) {
                const finalBody = processText(template.body);
                dataEl.value = "";
                let i = 0;
                
                // Disable button briefly to prevent spamming while typing
                const btn = document.getElementById('btn-random-payload');
                btn.disabled = true;
                btn.style.opacity = '0.5';

                const typeWriter = setInterval(() => {
                    dataEl.value += finalBody.charAt(i);
                    i++;
                    if (i >= finalBody.length) {
                        clearInterval(typeWriter);
                        btn.disabled = false;
                        btn.style.opacity = '1';
                    }
                }, 5); // 5ms per character creates a fast, satisfying "AI generating" feel
            }
        });
    });
})();



// --- MASTER OVERRIDE: 100% SILENT POLLING ENGINE ---
// Using the PRODUCTION URL so the 4-second polling doesn't break n8n testing
const LIVE_CHAT_WEBHOOK = 'https://earlier-link-killing-exception.trycloudflare.com/webhook/chat-relay'; 
// --- FIX: PERSISTENT SESSION ID ---
let chatSessionId = localStorage.getItem('auxavia_chat_session');
if (!chatSessionId || !chatSessionId.startsWith('session_')) {
    chatSessionId = 'session_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('auxavia_chat_session', chatSessionId);
}
let renderedMessageKeys = new Set();
let chatPollingInterval = null;

window.submitEscalation = function(e) {
    if (e) e.preventDefault();
    const input = document.getElementById("user-input");
    const text = input ? input.value.trim() : "";
    if (!text) return;

    // 1. Display user message instantly
    addChatMessage(text, 'user');
    if (input) input.value = "";
    
    // 2. Fire payload to n8n backend
    fetch(LIVE_CHAT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'user_message',
            sessionId: chatSessionId,
            message: text
        })
    }).catch(err => console.log('Chat POST sync issue', err));

    // 3. STAY 100% SILENT. No typing indicators, no bot messages.
    window.isSendingChat = false;
    startChatPolling();
};

function startChatPolling() {
    if (chatPollingInterval) return; 
    
    chatPollingInterval = setInterval(() => {
        fetch(`${LIVE_CHAT_WEBHOOK}?action=poll&sessionId=${chatSessionId}`)
        .then(res => res.json())
        .then(data => {
            if (data && Array.isArray(data.messages) && data.messages.length > 0) {
                data.messages.forEach(msg => {
                    // Create a unique key based on timestamp and message text
                    const msgKey = `${msg.Timestamp}_${msg.Message}`;
                    if (!renderedMessageKeys.has(msgKey)) {
                        renderedMessageKeys.add(msgKey);
                        addChatMessage(msg.Message, 'bot');
                    }
                });
            }
        }).catch(err => {}); 
    }, 10000); 
}

// Ensure clean event listeners
window.addEventListener('load', () => {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    if (sendBtn && userInput) {
        const newBtn = sendBtn.cloneNode(true);
        sendBtn.parentNode.replaceChild(newBtn, sendBtn);
        newBtn.addEventListener('click', window.submitEscalation);
        userInput.onkeydown = function(e) {
            if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 900) {
                e.preventDefault();
                window.submitEscalation();
            }
        };
    }
});

