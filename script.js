document.addEventListener('DOMContentLoaded', () => {

    // Referencat e elementeve DOM
    const appContainer = document.getElementById('app-container');
    const appHeader = document.getElementById('app-header');
    const settingsBtn = document.getElementById('settings-btn');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const mainContent = document.getElementById('main-content');
    const surahListView = document.getElementById('surah-list-view');
    const surahListUl = document.getElementById('surah-list');
    const playerView = document.getElementById('player-view');
    const backToListBtn = document.getElementById('back-to-list-btn');
    const currentSurahTitle = document.getElementById('current-surah-title');
    const playerControls = document.getElementById('player-controls');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const rewindBtn = document.getElementById('rewind-btn');
    const forwardBtn = document.getElementById('forward-btn');
    const replayNextBtn = document.getElementById('replay-next-btn');
    const showMiniListBtn = document.getElementById('show-mini-list-btn');
    const progressSlider = document.getElementById('progress-slider');
    const currentTimeSpan = document.getElementById('current-time');
    const totalTimeSpan = document.getElementById('total-time');

    const miniListModal = document.getElementById('mini-list-modal');
    const miniSurahListUl = document.getElementById('mini-surah-list');
    const closeMiniListBtn = document.getElementById('close-mini-list');
    const miniPlayer = document.getElementById('mini-player');
    const miniPlayerTitle = document.getElementById('mini-player-title');
    const miniPlayPauseBtn = document.getElementById('mini-play-pause-btn');
    const audioPlayer = document.getElementById('audio-player');

    // Kontrollo nese elementet thelbesore gjenden (opsionale, por mire per debug fillestar)
    if (!surahListUl) {
        console.error("ERROR: surahListUl (#surah-list) not found!");
    }
     if (!playerView) {
         console.error("ERROR: playerView (#player-view) not found!");
     }
     if (!surahListView) {
         console.error("ERROR: surahListView (#surah-list-view) not found!");
     }
     if (!audioPlayer) {
         console.error("ERROR: audioPlayer (#audio-player) not found!");
     }
     if (!currentTimeSpan) {
         console.warn("WARNING: currentTimeSpan (#current-time) not found!");
     }
      if (!totalTimeSpan) {
         console.warn("WARNING: totalTimeSpan (#total-time) not found!");
     }


    // Të dhënat e Sureve (Të gjitha 114 suret me URL-të e dhëna)
    const surahs = [
        { id: 1, name: "El-Fatiha", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/001-Sureja-Fatiha-Hapja.mp3" },
        { id: 2, name: "El-Bekare", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/002-Sureja-El-Bekare-Lopa.mp3" },
        { id: 3, name: "Ali Imran", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/003-Sureja-Ali-Imran-Familja-e-Imrahit.mp3" },
        { id: 4, name: "En-Nisa", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/004-Sureja-En-Nisa-Grate.mp3" },
        { id: 5, name: "El-Maide", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/005-Sureja-El-Maide-Sofra.mp3" },
        { id: 6, name: "El-En'am", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/006-Sureja-Al-Anam-Bagetia.mp3" },
        { id: 7, name: "El-A'raf", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/007-Sureja-Al-Araf-Lartesite.mp3" },
        { id: 8, name: "El-Enfal", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/008-Sureja-Al-Anfal-Placka-e-Luftes.mp3" },
        { id: 9, name: "Et-Teube", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/009-Sureja-At-Tawba-Pendimi.mp3" },
        { id: 10, name: "Junus", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/010-Sureja-Yunus-Junuzi.mp3" },
        { id: 11, name: "Hud", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/011-Sureja-Hud.mp3" },
        { id: 12, name: "Jusuf", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/012-Sureja-Yusuf.mp3" },
        { id: 13, name: "Err-Rra'd", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/013-Sureja-Ar-Rad.mp3" },
        { id: 14, name: "Ibrahim", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/014-Sureja-Ibrahim.mp3" },
        { id: 15, name: "El-Hixhr", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/015-Sureja-Al-Hijr.mp3" },
        { id: 16, name: "En-Nahl", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/016-Sureja-An-Nahl.mp3" },
        { id: 17, name: "El-Isra", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/017-Sureja-Al-Isra.mp3" },
        { id: 18, name: "El-Kehf", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/018-Sureja-Al-Kahf.mp3" },
        { id: 19, name: "Merjem", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/019-Sureja-Maryam.mp3" },
        { id: 20, name: "Ta-Ha", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/020-Sureja-Ta-Ha.mp3" },
        { id: 21, name: "El-Enbija", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/021-Sureja-Al-Anbiya.mp3" },
        { id: 22, name: "El-Haxhxh", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/022-Sureja-Al-Hajj.mp3" },
        { id: 23, name: "El-Mu'minun", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/023-Sureja-Al-Muminun.mp3" },
        { id: 24, name: "En-Nur", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/024-Sureja-An-Nur.mp3" },
        { id: 25, name: "El-Furkan", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/025-Sureja-Al-Furqan.mp3" },
        { id: 26, name: "Esh-Shu'ara", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/026-Sureja-Ash-Shuara.mp3" },
        { id: 27, name: "En-Neml", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/027-Sureja-An-Naml.mp3" },
        { id: 28, name: "El-Kasas", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/028-Sureja-Al-Qasas.mp3" },
        { id: 29, name: "El-'Ankebut", audioUrl: "https://kurani.tv/wp-content/uploads/2021/04/029-Sureja-Al-Ankabut.mp3" },
        { id: 30, name: "Err-Rrum", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/030-Sureja-Ar-Rum-1.mp3" },
        { id: 31, name: "Lukman", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/031-Sureja-Luqman.mp3" },
        { id: 32, name: "Es-Sexhde", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/032-Sureja-As-Sajda.mp3" },
        { id: 33, name: "El-Ahzab", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/033-Sureja-Al-Ahzab.mp3" },
        { id: 34, name: "Seba", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/034-Sureja-Saba.mp3" },
        { id: 35, name: "Fatir", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/035-Sureja-Fatir.mp3" },
        { id: 36, name: "Ja-Sin", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/036-Sureja-Ya-Sin.mp3" },
        { id: 37, name: "Es-Saffat", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/037-Sureja-Es-Saffat.mp3" },
        { id: 38, name: "Sad", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/038-Sureja-Sad.mp3" },
        { id: 39, name: "Ez-Zumer", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/039-Sureja-Az-Zumar.mp3" },
        { id: 40, name: "Gafir", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/040-Sureja-Al-Ghafir.mp3" },
        { id: 41, name: "Fussilet", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/041-Sureja-Fussilat.mp3" },
        { id: 42, name: "Esh-Shura", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/042-Sureja-Ash-Shura.mp3" },
        { id: 43, name: "Ez-Zuhruf", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/043-Sureja-Az-Zukhruf.mp3" },
        { id: 44, name: "Ed-Duhan", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/044-Sureja-Ad-Dukhan.mp3" },
        { id: 45, name: "El-Xhathije", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/045-Sureja-Al-Jathiya.mp3" },
        { id: 46, name: "El-Ahkaf", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/046-Sureja-Al-Ahqaf.mp3" },
        { id: 47, name: "Muhamed", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/047-Sureja-Muhammad.mp3" },
        { id: 48, name: "El-Fet'h", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/048-Sureja-Al-Fath.mp3" },
        { id: 49, name: "El-Huxhurat", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/049-Sureja-Al-Hujurat.mp3" },
        { id: 50, name: "Kaf", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/050-Sureja-Qaf.mp3" },
        { id: 51, name: "Edh-Dharijat", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/051-Sureja-Adh-Dhariyat.mp3" },
        { id: 52, name: "Et-Tur", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/052-Sureja-At-Tur.mp3" },
        { id: 53, name: "En-Nexhm", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/053-Sureja-An-Najm.mp3" },
        { id: 54, name: "El-Kamer", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/054-Sureja-Al-Qamar.mp3" },
        { id: 55, name: "Err-Rrahman", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/055-Sureja-Al-Rahman.mp3" },
        { id: 56, name: "El-Vakia", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/056-Sureja-Al-Waqiah.mp3" },
        { id: 57, name: "El-Hadid", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/057-Sureja-Al-Hadid.mp3" },
        { id: 58, name: "El-Muxhadele", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/058-Sureja-Al-Mujadala.mp3" },
        { id: 59, name: "El-Hashr", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/059-Sureja-Al-Hashr.mp3" },
        { id: 60, name: "El-Mumtehane", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/060-Sureja-Al-Mumtahana.mp3" },
        { id: 61, name: "Es-Saff", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/061-Sureja-As-Saff.mp3" },
        { id: 62, name: "El-Xhumu'a", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/062-Sureja-Al-Jumua.mp3" },
        { id: 63, name: "El-Munafikun", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/063-Sureja-Al-Munafiqun.mp3" },
        { id: 64, name: "Et-Tegabun", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/064-Sureja-At-Taghabun.mp3" },
        { id: 65, name: "Et-Talak", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/065-Sureja-At-Talaq.mp3" },
        { id: 66, name: "Et-Tahrim", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/066-Sureja-At-Tahrim.mp3" },
        { id: 67, name: "El-Mulk", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/067-Sureja-Al-Mulk.mp3" },
        { id: 68, name: "El-Kalem", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/068-Sureja-Al-Qalam.mp3" },
        { id: 69, name: "El-Hakkah", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/069-Sureja-Al-Haaqqa.mp3" },
        { id: 70, name: "El-Me'arixh", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/070-Sureja-Al-Maarij.mp3" },
        { id: 71, name: "Nuh", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/071-Sureja-Nooh.mp3" },
        { id: 72, name: "El-Xhinn", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/072-Sureja-Al-Jinn.mp3" },
        { id: 73, name: "El-Muzzemmil", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/073-Sureja-Al-Muzzammil.mp3" },
        { id: 74, name: "El-Muddeththir", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/074-Sureja-Al-Muddathir.mp3" },
        { id: 75, name: "El-Kijameh", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/075-Sureja-Al-Kijameh.mp3" },
        { id: 76, name: "El-Insan", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/076-Sureja-Al-Insan.mp3" },
        { id: 77, name: "El-Murselat", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/077-Sureja-Al-Mursalat.mp3" },
        { id: 78, name: "En-Nebe", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/078-Sureja-An-Naba.mp3" },
        { id: 79, name: "En-Nazi'at", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/079-Sureja-An-Naziat.mp3" },
        { id: 80, name: "'Abese", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/080-Sureja-Abasa.mp3" },
        { id: 81, name: "Et-Tekvir", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/081-Sureja-At-Takwir.mp3" },
        { id: 82, name: "El-Infitar", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/082-Sureja-Al-Infitar.mp3" },
        { id: 83, name: "El-Mutaffifin", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/083-Sureja-Al-Mutaffifin.mp3" },
        { id: 84, name: "El-Inshikak", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/084-Sureja-Al-Inshqaq.mp3" },
        { id: 85, name: "El-Buruxh", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/085-Sureja-Al-Burooj.mp3" },
        { id: 86, name: "Et-Tariq", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/086-Sureja-At-Tariq.mp3" },
        { id: 87, name: "El-A'la", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/087-Sureja-Al-Ala.mp3" },
        { id: 88, name: "El-Gashije", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/088-Sureja-Al-Ghashiya.mp3" },
        { id: 89, name: "El-Fexhr", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/089-Sureja-Al-Fajr.mp3" },
        { id: 90, name: "El-Beled", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/090-Sureja-Al-Balad.mp3" },
        { id: 91, name: "Esh-Shems", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/091-Sureja-Ash-Shams.mp3" },
        { id: 92, name: "El-Lejl", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/092-Sureja-Al-Lail.mp3" },
        { id: 93, name: "Ed-Duha", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/093-Sureja-Ad-Dhuha.mp3" },
        { id: 94, name: "Esh-Sherh", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/094-Sureja-Al-Inshirah.mp3" },
        { id: 95, name: "Et-Tin", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/095-Sureja-At-Tin.mp3" },
        { id: 96, name: "El-'Alek", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/096-Sureja-Al-Alaq.mp3" },
        { id: 97, name: "El-Kadr", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/097-Sureja-Al-Qadr.mp3" },
        { id: 98, name: "El-Bejjineh", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/098-Sureja-Al-Bayyina.mp3" },
        { id: 99, name: "Ez-Zelzele", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/099-Sureja-Al-Zalzala.mp3" },
        { id: 100, name: "El-'Adijat", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/100-Sureja-Al-Adiyat.mp3" },
        { id: 101, name: "El-Kari'ah", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/101-Sureja-Al-Qaria.mp3" },
        { id: 102, name: "Et-Tekathur", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/102-Sureja-At-Takathur.mp3" },
        { id: 103, name: "El-'Asr", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/103-Sureja-Al-Asr.mp3" },
        { id: 104, name: "El-Humezeh", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/104-Sureja-Al-Humaza.mp3" },
        { id: 105, name: "El-Fil", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/105-Sureja-Al-Fil.mp3" },
        { id: 106, name: "Kurejsh", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/106-Sureja-Quraish.mp3" },
        { id: 107, name: "El-Ma'un", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/107-Sureja-Al-Maun.mp3" },
        { id: 108, name: "El-Keuther", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/108-Sureja-Al-Kauther.mp3" },
        { id: 109, name: "El-Kafirun", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/109-Sureja-Al-Kafiroon.mp3" },
        { id: 110, name: "En-Nasr", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/110-Sureja-An-Nasr.mp3" },
        { id: 111, name: "El-Mesed", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/111-Sureja-Al-Masadd.mp3" },
        { id: 112, name: "El-Ihlas", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/112-Sureja-Al-Ikhlas.mp3" },
        { id: 113, name: "El-FeIk", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/113-Sureja-Al-Falaq.mp3" },
        { id: 114, name: "En-Nas", audioUrl: "https://kurani.tv/wp-content/uploads/2021/03/114-Sureja-An-Nas.mp3" }
    ];


    // Variablat e Gjendjes (State)
    let currentSurahIndex = -1;
    let isPlaying = false;
    let isMiniListModalOpen = false;
    let currentView = 'list';

    // Funksion për formatimin e kohës nga sekondat në HH:MM:SS ose MM:SS
    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) {
            return "0:00";
        }
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        const formattedS = s < 10 ? '0' + s : s;
        const formattedM = m < 10 ? '0' + m : m;

        if (h > 0) {
            const formattedH = h < 10 ? '0' + h : h;
            return `${formattedH}:${formattedM}:${formattedS}`;
        } else {
            return `${formattedM}:${formattedS}`;
        }
    }


    // Funksion për shfaqjen e listës së sureve
    function renderSurahList(listToRender = surahs, targetUl = surahListUl) {
        if (!targetUl) {
            console.error("renderSurahList: Target UL element not found!");
            return;
        }
        targetUl.innerHTML = '';
        listToRender.forEach((surah, index) => {
            const originalIndex = surahs.findIndex(s => s.id === surah.id);

            const li = document.createElement('li');
            li.dataset.index = originalIndex !== -1 ? originalIndex : index;
            li.innerHTML = `<span class="surah-number-icon">${surah.id}</span> ${surah.name}`;

            li.addEventListener('click', () => {
                playSurah(parseInt(li.dataset.index));
                if (targetUl === miniSurahListUl) {
                    closeMiniListModal();
                }
            });
            targetUl.appendChild(li);
        });
    }

    // Funksionet showPlayerView, showListView, playSurah, updatePlayPauseIcons etj.
    // Funksion për kalimin te Player View
    function showPlayerView() {
        if (surahListView) {
            surahListView.classList.add('hidden');
        } else {
             console.warn("showPlayerView: surahListView not found.");
        }

        if (playerView) {
            playerView.classList.remove('hidden');
        } else {
             console.warn("showPlayerView: playerView not found.");
        }

        // Mini-playeri fshihet kur jemi në faqen e playerit
        if (miniPlayer) {
            miniPlayer.classList.add('hidden');
        } else {
            console.warn("showPlayerView: miniPlayer not found.");
        }

        currentView = 'player';

        // Sigurohu që headeri të jetë gjithmonë i dukshëm
        if (appHeader) {
            appHeader.style.display = 'flex';
        } else {
            console.warn("showPlayerView: appHeader not found.");
        }
    }

    // Funksion për kalimin te Lista View
    function showListView() {
        if (playerView) {
            playerView.classList.add('hidden');
        } else {
            console.warn("showListView: playerView not found.");
        }

        if (surahListView) {
            surahListView.classList.remove('hidden');
        } else {
            console.warn("showListView: surahListView not found.");
        }

        // Shfaq mini-playerin vetëm në listë view NËSE audio po luan DHE elementi i mini-playerit ekziston
        if (isPlaying && audioPlayer && !audioPlayer.paused && !audioPlayer.ended && miniPlayer) {
             miniPlayer.classList.remove('hidden');
             if (currentSurahIndex !== -1 && surahs[currentSurahIndex] && miniPlayerTitle) {
                  miniPlayerTitle.textContent = surahs[currentSurahIndex].name;
             }
        } else {
            if (miniPlayer) {
                 miniPlayer.classList.add('hidden');
            } else {
                 console.warn("showListView: miniPlayer not found.");
            }
        }
        currentView = 'list';

        if (appHeader) {
             appHeader.style.display = 'flex';
        } else {
             console.warn("showListView: appHeader not found.");
        }
    }


    // Funksion për të ndryshuar ikonat e Play/Pause (Tani përdor emrat e Material Icons)
    function updatePlayPauseIcons() {
        // Emrat e ikonave Material Icons
        const playIconName = 'play_arrow';
        const pauseIconName = 'pause';

        if (playPauseBtn) {
            const iconSpan = playPauseBtn.querySelector('.material-icons'); // Sigurohu qe ke .material-icons
            if (iconSpan) {
                iconSpan.textContent = isPlaying ? pauseIconName : playIconName; // Ndryshon bazuar ne gjendje
            } else {
                 console.warn("Play/Pause button icon span with class 'material-icons' not found.");
            }
        } else { console.warn("Play/Pause button (playPauseBtn) not found."); }

        if (miniPlayPauseBtn) {
            const iconSpan = miniPlayPauseBtn.querySelector('.material-icons'); // Sigurohu qe ke .material-icons
             if (iconSpan) {
                iconSpan.textContent = isPlaying ? pauseIconName : playIconName; // Ndryshon bazuar ne gjendje
             } else {
                  console.warn("Mini Play/Pause button icon span with class 'material-icons' not found.");
             }
        } else { console.warn("Mini Play/Pause button (miniPlayPauseBtn) not found."); }
    }


    // Funksion për të filluar dëgjimin e një sure
    function playSurah(index) {
        if (index < 0 || index >= surahs.length) {
             console.error("Indeks i pavlefshëm i sures:", index);
            return;
        }
        if (!audioPlayer) {
             console.error("playSurah: Elementi audio player nuk u gjet!");
             return;
        }

        currentSurahIndex = index;
        const surah = surahs[currentSurahIndex];

        if (currentSurahTitle) currentSurahTitle.textContent = surah.name;
        if (miniPlayerTitle) miniPlayerTitle.textContent = surah.name;

        audioPlayer.src = surah.audioUrl;
        audioPlayer.load();

        // Vendos playerin ne gjendje PAUZE fillimisht, para se te shfaqet view
        audioPlayer.pause();
        isPlaying = false;
        updatePlayPauseIcons(); // Perditso ikonat per te treguar butonin PLAY

        showPlayerView();

         // Initial icon for Replay/Next should be "skip_next" when a new surah is loaded
         if (replayNextBtn) {
             const iconSpan = replayNextBtn.querySelector('.material-icons');
             if (iconSpan) {
                  iconSpan.textContent = 'skip_next'; // Ikona Next kur ngarkohet nje sure e re
             } else {
                  console.warn("Replay/Next button icon span with class 'material-icons' not found.");
             }
         } else { console.warn("Replay/Next button (replayNextBtn) not found."); }


         if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
         if (totalTimeSpan) totalTimeSpan.textContent = '--:--';
    }


    // --- Dëgjuesit Globalë të Ngjarjeve të Audio Playerit ---

    if (audioPlayer) {
        audioPlayer.addEventListener('play', () => {
            isPlaying = true;
            updatePlayPauseIcons(); // Therrit per te vendosur ikonen Pause
            if (currentView === 'list' && miniPlayer) {
                miniPlayer.classList.remove('hidden');
                 if (currentSurahIndex !== -1 && surahs[currentSurahIndex] && miniPlayerTitle) {
                     miniPlayerTitle.textContent = surahs[currentSurahIndex].name;
                 }
            }
        });

        audioPlayer.addEventListener('pause', () => {
            isPlaying = false;
            updatePlayPauseIcons(); // Therrit per te vendosur ikonen Play
        });

        audioPlayer.addEventListener('ended', () => {
            isPlaying = false;
            updatePlayPauseIcons(); // Therrit per te siguruar qe ikona behet Play

            // Kur audioja mbaron, ndrysho ikonen e Replay/Next ne Replay
            if (replayNextBtn) {
                const iconSpan = replayNextBtn.querySelector('.material-icons');
                 if (iconSpan) {
                     iconSpan.textContent = 'replay_circle_filled'; // Ikona Replay
                 } else {
                      console.warn("Replay/Next button icon span with class 'material-icons' not found during 'ended' event.");
                 }
            } else { console.warn("Replay/Next button (replayNextBtn) not found during 'ended' event."); }

             if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
             if (totalTimeSpan) totalTimeSpan.textContent = '--:--';
        });

        // Update progress slider AND current time as audio plays
        audioPlayer.addEventListener('timeupdate', () => {
             if (audioPlayer.duration && isFinite(audioPlayer.duration)) {
                const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                if (progressSlider && !isNaN(progress) && isFinite(progress)) {
                     progressSlider.value = progress;
                }
                 if (currentTimeSpan) {
                     currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
                 }
             }
        });

         // Reset progress slider and update total time when audio source changes or audio ends
        audioPlayer.addEventListener('loadedmetadata', () => {
            if (progressSlider) {
                progressSlider.value = 0;
                if (!isNaN(audioPlayer.duration) && isFinite(audioPlayer.duration)) {
                     progressSlider.max = 100;
                } else {
                     progressSlider.max = 0;
                }
            }
             if (totalTimeSpan && !isNaN(audioPlayer.duration) && isFinite(audioPlayer.duration)) {
                 totalTimeSpan.textContent = formatTime(audioPlayer.duration);
             } else if (totalTimeSpan) {
                 totalTimeSpan.textContent = '--:--';
             }
             if (currentTimeSpan) {
                 currentTimeSpan.textContent = '0:00';
             }
        });

    } else {
         console.error("Audio Player: Element <audio> me ID 'audio-player' nuk u gjet!");
         if (mainContent) {
             mainContent.innerHTML = "<p style='color: red; text-align: center;'>Gabim fatal: Elementi audio player nuk u gjet në HTML.</p>";
         }
    }


    // --- Dëgjuesit e Ngjarjeve të Butonave dhe Elementeve të Tjerë ---

    if (playPauseBtn && audioPlayer) {
        playPauseBtn.addEventListener('click', () => {
            if (audioPlayer.paused || audioPlayer.ended) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        });
    } else if (playPauseBtn || audioPlayer) { console.warn("playPauseBtn or audioPlayer not found."); }


    if (miniPlayPauseBtn && audioPlayer && miniPlayer) {
         miniPlayPauseBtn.addEventListener('click', (event) => {
             event.stopPropagation();
             if (audioPlayer.paused || audioPlayer.ended) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        });
    } else if (miniPlayPauseBtn || audioPlayer || miniPlayer) { console.warn("miniPlayPauseBtn or related elements not found."); }


    if (rewindBtn && audioPlayer) {
        rewindBtn.addEventListener('click', () => {
            audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
            if (currentTimeSpan) {
                 currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
            }
        });
    } else if (rewindBtn || audioPlayer) { console.warn("rewindBtn or audioPlayer not found."); }


    if (forwardBtn && audioPlayer) {
         forwardBtn.addEventListener('click', () => {
             if (!isNaN(audioPlayer.duration) && isFinite(audioPlayer.duration)) {
                audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
                 if (currentTimeSpan) {
                     currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
                 }
            } else {
                console.warn("Duration not available for forwarding.");
            }
        });
    } else if (forwardBtn || audioPlayer) { console.warn("forwardBtn or audioPlayer not found."); }


    // LOGJIKA E BUTONIT REPLAY/NEXT
    if (replayNextBtn && audioPlayer && surahs.length > 0) {
        replayNextBtn.addEventListener('click', () => {
            if (audioPlayer.ended) {
                // Funksioni Replay
                audioPlayer.currentTime = 0;
                audioPlayer.play();
                // Ikona tashme eshte ndryshuar ne replay_circle_filled nga 'ended' event,
                // dhe do te kthehet ne pause_arrow nga 'play' event i audioPlayer
            } else {
                // Funksioni Next Surah
                const nextIndex = currentSurahIndex + 1;
                if (nextIndex < surahs.length) {
                    playSurah(nextIndex); // playSurah vendos ikonen next si default
                } else {
                    // Fundi i Kuranit, kthehet te surja e pare
                    playSurah(0); // playSurah vendos ikonen next si default
                }
            }
        });
    } else if (replayNextBtn || audioPlayer || surahs.length === 0) { console.warn("replayNextBtn or related elements/data not found or surahs data is empty."); }


     if (backToListBtn) {
         backToListBtn.addEventListener('click', () => {
             showListView();
         });
     } else {
        console.warn("Butoni 'Mbrapa te Lista' nuk u gjet.");
     }


    if (showMiniListBtn && miniListModal && closeMiniListBtn && miniSurahListUl) {
        showMiniListBtn.addEventListener('click', () => {
            if (!isMiniListModalOpen) {
                 renderSurahList(surahs, miniSurahListUl);
                miniListModal.classList.remove('hidden');
                isMiniListModalOpen = true;
            }
        });

        function closeMiniListModal() {
            miniListModal.classList.add('hidden');
            isMiniListModalOpen = false;
        }

        closeMiniListBtn.addEventListener('click', closeMiniListModal);

        miniListModal.addEventListener('click', (event) => {
            if (event.target === miniListModal) {
                closeMiniListModal();
            }
        });
    } else if (showMiniListBtn || miniListModal || closeMiniListBtn || miniSurahListUl) { console.warn("Mini list modal or related elements not found."); }


    if (searchBtn && searchInput && surahListUl) {
        searchBtn.addEventListener('click', () => {
            if (searchInput.classList.contains('hidden')) {
                 searchInput.classList.remove('hidden');
                 searchInput.classList.add('active');
                 searchInput.focus();
            } else {
                 searchInput.classList.remove('active');
                 setTimeout(() => {
                     searchInput.classList.add('hidden');
                     searchInput.value = '';
                     renderSurahList();
                 }, 300);
            }
        });

         searchInput.addEventListener('input', () => {
             const searchTerm = searchInput.value.toLowerCase();
             const filteredSurahs = surahs.filter(surah =>
                 surah.name.toLowerCase().includes(searchTerm) || surah.id.toString().includes(searchTerm)
             );
             renderSurahList(filteredSurahs, surahListUl);
         });
    } else if (searchBtn || searchInput || surahListUl) { console.warn("Search related elements not found."); }


    if (miniPlayer) {
        miniPlayer.addEventListener('click', () => {
            showPlayerView();
        });
    } else { console.warn("miniPlayer element not found."); }


    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            alert("Cilësimet (Settings) - Funksionalitet në zhvillim.");
        });
    } else { console.warn("settingsBtn not found."); }


     if (appHeader) {
         const headerTitle = appHeader.querySelector('h1');
         if (headerTitle) {
              headerTitle.addEventListener('click', () => {
                  if (currentView === 'player') {
                      showListView();
                  }
              });
              headerTitle.style.cursor = 'pointer';
         } else { console.warn("Header h1 not found."); }
     } else { console.warn("appHeader not found."); }


     if (progressSlider && audioPlayer) {
         if (currentTimeSpan) {
              progressSlider.addEventListener('input', () => {
                   if (!isNaN(audioPlayer.duration) && isFinite(audioPlayer.duration)) {
                      const time = (progressSlider.value / 100) * audioPlayer.duration;
                      currentTimeSpan.textContent = formatTime(time);
                   }
              });
         } else {
              console.warn("Elementi i kohës aktuale (currentTimeSpan) nuk u gjet. Shfaqja e kohës gjatë lëvizjes së sliderit nuk do të funksionojë.");
         }

         progressSlider.addEventListener('change', () => {
             if (!isNaN(audioPlayer.duration) && isFinite(audioPlayer.duration)) {
                const time = (progressSlider.value / 100) * audioPlayer.duration;
                audioPlayer.currentTime = time;
             } else {
                 console.warn("Duration not available. Cannot set audio currentTime from slider.");
             }
         });

     } else if (progressSlider || audioPlayer) {
          console.warn("Progress slider ose audio player nuk u gjet. Funksionaliteti i sliderit mund të mos jetë i plotë.");
     }


    // Inicializimi: Render listën fillestare të sureve dhe sigurohu që shfaqet faqja e listës
    if (surahListUl) {
        renderSurahList();
        showListView();
    } else {
        console.error("Aplikacioni nuk mund të inicializohet sepse elementi i listës së sureve (ul#surah-list) nuk u gjet në HTML!");
        if (mainContent) {
             mainContent.innerHTML = "<p style='color: red; text-align: center;'>Gabim fatal: Elementet thelbësore të aplikacionit nuk u gjetën në HTML.</p>";
        }
    }


}); // End DOMContentLoaded
