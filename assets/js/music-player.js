// music-player.js

let currentlyPlaying = null;

function initMusicPlayer() {
    const music = document.getElementById('background-music');
    const playPauseButton = document.getElementById('play-pause');
    const playIcon = playPauseButton.querySelector('.fas');
}

function togglePlay(musicId) {
    const audio = document.getElementById(musicId);
    const musicItem = audio.parentElement;
    const btn = audio.nextElementSibling;
    
    // Tambahkan crossOrigin untuk menangani CORS
    audio.crossOrigin = "anonymous";
    
    // Error handling untuk audio
    audio.onerror = function(e) {
        console.error('Error loading audio:', {
            error: e,
            src: audio.src,
            errorCode: audio.error ? audio.error.code : null,
            errorMessage: audio.error ? audio.error.message : null
        });
        musicItem.classList.remove('playing');
        btn.classList.add('error');
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span class="btn-text">Error Loading</span>';
        setTimeout(() => {
            btn.classList.remove('error');
            btn.innerHTML = `<i class="fas fa-play"></i> <span class="btn-text">${btn.textContent.split(' ').slice(1).join(' ')}</span>`;
        }, 3000);
    };

    if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        const oldMusicItem = currentlyPlaying.parentElement;
        const oldBtn = currentlyPlaying.nextElementSibling;
        oldMusicItem.classList.remove('playing');
        oldBtn.classList.remove('playing');
        oldBtn.innerHTML = `<i class="fas fa-play"></i> <span class="btn-text">${oldBtn.textContent.split(' ').slice(1).join(' ')}</span>`;
    }

    if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                musicItem.classList.add('playing');
                btn.classList.add('playing');
                btn.innerHTML = `<i class="fas fa-pause"></i> <span class="btn-text">${btn.textContent.split(' ').slice(1).join(' ')}</span>`;
                currentlyPlaying = audio;
                startVisualizer(musicItem);
            })
            .catch(error => {
                console.error('Error playing audio:', error);
                musicItem.classList.remove('playing');
                btn.classList.add('error');
                btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span class="btn-text">Playback Error</span>';
                setTimeout(() => {
                    btn.classList.remove('error');
                    btn.innerHTML = `<i class="fas fa-play"></i> <span class="btn-text">${btn.textContent.split(' ').slice(1).join(' ')}</span>`;
                }, 3000);
            });
        }
        } else {
        audio.pause();
        audio.currentTime = 0;
        musicItem.classList.remove('playing');
        btn.classList.remove('playing');
        btn.innerHTML = `<i class="fas fa-play"></i> <span class="btn-text">${btn.textContent.split(' ').slice(1).join(' ')}</span>`;
        currentlyPlaying = null;
        stopVisualizer(musicItem);
    }
}

function startVisualizer(musicItem) {
    const bars = musicItem.querySelectorAll('.music-visualizer .bar');
    bars.forEach((bar, index) => {
        bar.style.animation = 'visualizer 0.8s infinite';
        bar.style.animationDelay = `${index * 0.2}s`;
    });
}

function stopVisualizer(musicItem) {
    const bars = musicItem.querySelectorAll('.music-visualizer .bar');
    bars.forEach(bar => {
        bar.style.animation = 'none';
    });
}

// Add event listeners for all audio elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('audio').forEach(audio => {
        const musicItem = audio.parentElement;
        
        // Preload metadata
        audio.preload = 'metadata';
        
        // Canplaythrough event
        audio.addEventListener('canplaythrough', () => {
            const btn = audio.nextElementSibling;
            if (!musicItem.classList.contains('playing')) {
                btn.innerHTML = `<i class="fas fa-play"></i> <span class="btn-text">${btn.textContent.split(' ').slice(1).join(' ')}</span>`;
            }
        });

        // Ended event
        audio.addEventListener('ended', () => {
            musicItem.classList.remove('playing');
            const btn = audio.nextElementSibling;
            btn.classList.remove('playing');
            btn.innerHTML = `<i class="fas fa-play"></i> <span class="btn-text">${btn.textContent.split(' ').slice(1).join(' ')}</span>`;
            currentlyPlaying = null;
            stopVisualizer(musicItem);
        });
    });
});

// Membuat fungsi togglePlay tersedia secara global
window.togglePlay = togglePlay;