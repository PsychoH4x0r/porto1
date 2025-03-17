// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Burger Menu (Toggle) ---
    const burger = document.querySelector('.burger');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link'); // Dapatkan semua nav-link
  
    burger.addEventListener('click', () => {
      navbar.classList.toggle('active'); // Toggle class 'active' pada navbar
    });
  
  
    // --- 2. Smooth Scrolling (Vanilla JS) ---
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
  
        if (targetElement) {
          smoothScroll(targetElement, 1200); // Durasi 1200ms (1.2 detik)
  
          // Tutup navbar di mobile setelah klik link (jika navbar aktif)
          if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
          }
        }
      });
    });
  // --- 4. Smooth Scrolling (Custom) ---

const smoothScrollTo = (target, duration = 500, offset = 0) => {
    const start = window.pageYOffset;  // Posisi scroll awal
    const to = target.getBoundingClientRect().top + start + offset;
    const change = to - start;
    let startTime = null;
  
  
      const animateScroll = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = easeInOutQuad(timeElapsed, start, change, duration); // Fungsi easing
          window.scrollTo(0, run);
  
           if (timeElapsed < duration) {
              requestAnimationFrame(animateScroll);  // Ulangi sampai durasi selesai
           }
      };
  
      // Fungsi easing (contoh: easeInOutQuad)
       const easeInOutQuad = (t, b, c, d) => {
           t /= d / 2;
           if (t < 1) return c / 2 * t * t + b;
           t--;
           return -c / 2 * (t * (t - 2) - 1) + b;
       };
  
      requestAnimationFrame(animateScroll); // Mulai animasi
  };
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function(e) {
       e.preventDefault();
       const targetId = this.getAttribute('href');
       const targetElement = document.querySelector(targetId);
       if(targetElement){
         const offset = 0; // Sesuaikan offset jika perlu.
         smoothScrollTo(targetElement, 800, offset); // Durasi 800ms
       }
  
   });
  });
    // Fungsi smoothScroll (dengan easing)
    function smoothScroll(target, duration) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;
  
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }
  
      // Fungsi Easing (easeInOutCubic)
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      }
  
      requestAnimationFrame(animation);
    }
  // script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Kode lainnya (Navbar, Project Details, dll.) ---
    // ... (semua kode yang sudah ada sebelumnya) ...

// --- 4. Smooth Scrolling (Custom) ---

const smoothScrollTo = (target, duration = 500, offset = 0) => {
  const start = window.pageYOffset;
  const to = target.getBoundingClientRect().top + start + offset;
  const change = to - start;
  let startTime = null;


    const animateScroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, start, change, duration); // Fungsi easing
        window.scrollTo(0, run);

            if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);  // Ulangi sampai durasi selesai
            }
    };

    // Fungsi easing (contoh: easeInOutQuad)
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

    requestAnimationFrame(animateScroll); // Mulai animasi
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if(targetElement){
            const offset = 0; // Sesuaikan offset jika perlu.
            smoothScrollTo(targetElement, 800, offset); // Durasi 800ms
        }

    });
});

    // --- Kode lainnya (tsParticles, Custom Cursor, dll.) ---
     // ... (kode setelah smooth scrolling) ...

}); // Akhir DOMContentLoaded
  
      // --- 3. Animate Skill Bars ---
      const skillProgressBars = document.querySelectorAll('.skill-progress');
      const skillSection = document.getElementById('skills');
  
      const animateSkillBars = () => {
          skillProgressBars.forEach(bar => {
              const percent = bar.dataset.percent;
              bar.style.width = `${percent}%`;
          });
      };
  
      // Intersection Observer untuk skill bars
      const skillObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  animateSkillBars();
                  skillObserver.unobserve(entry.target); // Hentikan setelah animasi pertama
              }
          });
      }, { threshold: 0.2 });
      if (skillSection) { // Periksa apakah elemen #skills ada
        skillObserver.observe(skillSection);
    }


    // --- 4. Project Details Modal ---
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetails = document.querySelectorAll('.project-details');
    const projectCloseBtns = document.querySelectorAll('.project-close-btn');

    projectCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // Cek apakah yang diklik ada di dalam .project-overlay
            if (e.target.closest('.project-overlay')) {
                e.preventDefault();
                projectDetails[index].classList.add('active');
                document.body.style.overflow = 'hidden'; // Cegah scrolling
            }
        });
    });

    projectCloseBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            projectDetails[index].classList.remove('active');
            document.body.style.overflow = ''; // Aktifkan kembali scrolling
        });
    });

    // Tutup modal jika klik di luar modal
    document.addEventListener('click', (e) => {
        projectDetails.forEach(detail => {
            if (e.target === detail) {
                detail.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });


    // --- 5. Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    if (cursor) { // Cek apakah elemen kursor ada
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }

    // --- 6. 'active' Class untuk Nav Link ---
    const sections = document.querySelectorAll('section'); //Dapatkan Semua Section

    const updateActiveNavLink = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // -150 untuk membuat transisi link active lebih awal
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Panggil saat pertama kali load


    // --- 7. Efek 3D Navbar (Parallax) ---
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    const enableNavbar3D = true; // Kontrol efek 3D (true/false)

    if (enableNavbar3D) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX - window.innerWidth / 2;
            const y = e.clientY - window.innerHeight / 2;

            // Kurangi sensitivitas rotasi (ubah angka 80 untuk menyesuaikan)
            const rotateY = x / 80;  // Rotasi horizontal
            const rotateX = y / 80;  // Rotasi vertikal

            navbarWrapper.style.transition = 'transform 0.1s ease-out'; // Transisi cepat
            navbarWrapper.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;

             // Efek 3D pada tautan navigasi dan burger (translateZ)
            navLinks.forEach(link => {
                link.style.transition = 'transform 0.1s ease-out'; // Transisi
                link.style.transform = `translateZ(30px)`; // Menonjolkan
            });

            if (burger) {
                burger.style.transition = 'transform 0.1s ease-out';
                burger.style.transform = `translateZ(30px)`;
            }
        });

        // Reset efek 3D saat kursor keluar dari navbar
        navbarWrapper.addEventListener('mouseleave', () => {
            navbarWrapper.style.transition = 'transform 0.3s ease'; // Transisi reset
            navbarWrapper.style.transform = 'none'; // Kembali ke posisi normal

            navLinks.forEach(link => {
                link.style.transition = 'transform 0.3s ease';
                link.style.transform = 'none'; // Reset transform
            });
            if(burger){
                burger.style.transition = 'transform 0.3s ease';
                burger.style.transform = 'none';
            }

        });
    }
     // --- 8. Animasi dengan Delay (data attributes di HTML) ---
     const animatedElements = document.querySelectorAll('[data-animation]');

    animatedElements.forEach(el => {
        const animationName = el.dataset.animation;
        const delay = el.dataset.animationDelay || '0s'; // Default ke 0s jika tidak dispesifikasikan

        el.style.animationName = animationName;
        el.style.animationDelay = delay;
        el.style.animationDuration = '0.8s';  // Durasi animasi
        el.style.animationFillMode = 'both'; // Pertahankan state akhir animasi
        el.classList.add('animated'); // Tambahkan class 'animated' (untuk animasi CSS)
    });

       // --- 9. Inisialisasi tsParticles (Background) ---

       // Konfigurasi tsParticles
    const tsParticlesConfig = {
        fullScreen: {
            enable: false // Penting! Jangan fullscreen
        },
        background: {
            color: {
                value: "#000" // Warna background (hitam)
            },
        },
        fpsLimit: 120, // Batasi FPS
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push", // Tambahkan partikel saat klik
                },
                onHover: {
                    enable: true,
                    mode: "repulse", // Partikel menjauh saat hover
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4, // Jumlah partikel yang ditambahkan saat klik
                },
                repulse: {
                    distance: 150, // Jarak tolak
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#0cc", // Warna partikel (cyan)
                animation: {
                    enable: true, // Aktifkan animasi warna
                    speed: 10,   // Kecepatan animasi warna
                    sync: true   // Sinkronkan animasi warna
                }
            },
            links: {
                enable: false, // Nonaktifkan garis antar partikel
            },
            collisions: {
                enable: false, // Nonaktifkan collision
            },
            move: {
                direction: "none",  // Arah acak
                enable: true,      // Aktifkan pergerakan
                outModes: {
                    default: "destroy", // Hancurkan partikel saat keluar batas
                },
                random: false,
                speed: 6,      // Kecepatan partikel (sesuaikan!)
                straight: false, // Gerakan tidak lurus
            },
            number: {
                density: {
                    enable: true,
                    area: 800, // Area penyebaran partikel
                },
                value: 80, // Jumlah partikel (sesuaikan!)
            },
            opacity: {
                value: { min: 0.3, max: 0.7 }, // Opacity acak
                animation: {
                  enable: true,
                  speed: 0.5,
                  minimumValue: 0.1,
                  sync: false
                }
            },
            shape: {
                type: "circle", // Bentuk partikel (lingkaran)
            },
           size: {
                value: { min: 1, max: 4 }, // Ukuran partikel (variasi)
                animation: {
                enable: true,
                speed: 2,  // Kecepatan animasi ukuran (lebih lambat)
                minimumValue: 1,
                sync: false,
                }
            },
        },
        detectRetina: true, // Deteksi layar retina
    };

    tsParticles.load("tsparticles", tsParticlesConfig)
    .then((container) => {
      console.log("tsParticles loaded!");
     });

    // Animasi untuk skill progress bars
    const skillsModern = document.querySelector('.skills-modern');
    const progressBarsModern = document.querySelectorAll('.skill-progress-modern');

    function animateSkillsModern() {
        progressBarsModern.forEach(progress => {
            const percent = progress.getAttribute('data-percent');
            progress.style.width = percent + '%';
        });
    }

    const skillsObserverModern = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillsModern();
            }
        });
    }, { threshold: 0.5 });

    if (skillsModern) {
        skillsObserverModern.observe(skillsModern);
    }

    // Magnetic effect untuk judul section
    document.querySelectorAll('.section-title').forEach(title => {
        title.addEventListener('mousemove', (e) => {
            const bounds = title.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;
            const deltaX = (mouseX - centerX) * 0.1;
            const deltaY = (mouseY - centerY) * 0.1;

            title.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
        });

        title.addEventListener('mouseleave', () => {
            title.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Hover effect untuk project cards
    document.querySelectorAll('.project-card-modern').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Animasi untuk progress bar skills baru
    function animateNewSkills() {
        const progressBars = document.querySelectorAll('.skill-progress-bar');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    // Observer untuk skill cards baru
    const skillsObserverNew = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNewSkills();
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('.skills-grid');
    if (skillsSection) {
        skillsObserverNew.observe(skillsSection);
    }

    // Perbaikan untuk tombol Get in Touch
    document.querySelector('.neon-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.querySelector('#contact-new');
        if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Smooth Scroll dengan animasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Hapus kelas active dari semua link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Tambah kelas active ke link yang diklik
            this.classList.add('active');

            // Dapatkan target section
            const target = document.querySelector(this.getAttribute('href'));
            
            // Animasi scroll
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Tambah efek highlight sementara ke section
            target.style.transition = 'all 0.5s ease';
            target.style.boxShadow = '0 0 50px rgba(0, 255, 255, 0.3) inset';
            
            // Reset efek setelah scroll selesai
            setTimeout(() => {
                target.style.boxShadow = 'none';
            }, 1000);

            // Tambah efek ripple pada link yang diklik
            const ripple = document.createElement('div');
            ripple.className = 'nav-ripple';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Update active menu saat scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Music Player Control with Error Handling
    let currentlyPlaying = null;

    function togglePlay(musicId) {
        const audio = document.getElementById(musicId);
        const musicItem = audio.parentElement;
        const btn = audio.nextElementSibling;
        
        // Tambahkan crossOrigin untuk menangani CORS
        audio.crossOrigin = "anonymous";
        
        // Error handling untuk audio dengan detail error
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

        // Loading state dengan timeout
        let loadingTimeout = setTimeout(() => {
            if (audio.readyState < 3) { // Jika masih loading setelah 5 detik
                console.log('Audio loading timeout:', audio.src);
                btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span class="btn-text">Loading Timeout</span>';
            }
        }, 5000);

        // Clear timeout when loaded
        audio.oncanplaythrough = function() {
            clearTimeout(loadingTimeout);
        };

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="btn-text">Loading...</span>';

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
                    
                    // Start visualizer animation
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
            
            // Stop visualizer animation
            stopVisualizer(musicItem);
        }
    }

    function startVisualizer(musicItem) {
        const bars = musicItem.querySelectorAll('.music-visualizer .bar');
        bars.forEach((bar, index) => {
            bar.style.animationDelay = `${index * 0.2}s`;
        });
    }

    function stopVisualizer(musicItem) {
        const bars = musicItem.querySelectorAll('.music-visualizer .bar');
        bars.forEach(bar => {
            bar.style.animation = 'none';
        });
    }

    // Add event listeners for all audio elements
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

    // DNA Particles Configuration
    tsParticles.load("tsparticles", {
        particles: {
            number: {
                value: 4,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: ["#00ffff", "#ff00ff", "#00ff88", "#ff3366"],
                animation: {
                    enable: true,
                    speed: 20,
                    sync: false
                }
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.6,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.5,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00ffff",
                opacity: 0.4,
                width: 1,
                triangles: {
                    enable: true,
                    opacity: 0.1,
                    color: "#00ffff"
                }
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "bounce",
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true,
        background: {
            color: "transparent",
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover"
        }
    });

    // Mobile Menu Handler
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Navigation
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });

});

// Inisialisasi Progress Bar Skills
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-progress');
                progressBar.style.width = percentage + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));

    // Efek Tilting untuk Skill Cards
    const cards = document.querySelectorAll('.skill-card-new');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Efek neon untuk skill cards
    document.querySelectorAll('.skill-card-new').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 15px rgba(0, 255, 255, 0.3)';
            card.style.transform = 'translateY(-5px)';
            card.style.borderColor = '#00ffff';
            
            // Tambah efek neon ke title
            const title = card.querySelector('.skill-title-new');
            if (title) {
                title.style.textShadow = '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff';
            }
            
            // Tambah efek neon ke progress bar
            const progressBar = card.querySelector('.skill-progress-bar');
            if (progressBar) {
                progressBar.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.8)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.3)';
            card.style.transform = 'translateY(0)';
            card.style.borderColor = '#00ffff';
            
            // Reset efek neon di title
            const title = card.querySelector('.skill-title-new');
            if (title) {
                title.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
            }
            
            // Reset efek neon di progress bar
            const progressBar = card.querySelector('.skill-progress-bar');
            if (progressBar) {
                progressBar.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.5)';
            }
        });
    });

    // Efek cursor neon
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Cek apakah cursor di atas skill card
            const hoveredCard = document.elementFromPoint(e.clientX, e.clientY);
            if (hoveredCard && hoveredCard.closest('.skill-card-new')) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.6)';
                cursor.style.border = '2px solid #00ffff';
            } else {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
                cursor.style.border = '2px solid rgba(0, 255, 255, 0.8)';
            }
        });
    }
});

// Efek 3D untuk skill cards
document.querySelectorAll('.skill-card-new').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((centerX - x) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        
        // Efek parallax untuk elemen dalam card
        const icon = card.querySelector('.skill-icon-new');
        const title = card.querySelector('.skill-title-new');
        const progress = card.querySelector('.skill-progress-new');
        const percentage = card.querySelector('.skill-percentage');
        
        if (icon) icon.style.transform = `translateZ(50px) translateX(${rotateY}px) translateY(${-rotateX}px)`;
        if (title) title.style.transform = `translateZ(30px) translateX(${rotateY * 0.8}px) translateY(${-rotateX * 0.8}px)`;
        if (progress) progress.style.transform = `translateZ(20px) translateX(${rotateY * 0.6}px) translateY(${-rotateX * 0.6}px)`;
        if (percentage) percentage.style.transform = `translateZ(25px) translateX(${rotateY * 0.7}px) translateY(${-rotateX * 0.7}px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        
        // Reset transformasi elemen dalam card
        const elements = card.querySelectorAll('.skill-icon-new, .skill-title-new, .skill-progress-new, .skill-percentage');
        elements.forEach(el => {
            el.style.transform = 'translateZ(0) translateX(0) translateY(0)';
        });
    });
    
    // Tambah efek hover neon
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.2), 0 0 60px rgba(0, 255, 255, 0.1)';
        
        const progressBar = card.querySelector('.skill-progress-bar');
        if (progressBar) {
            progressBar.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.4)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
        
        const progressBar = card.querySelector('.skill-progress-bar');
        if (progressBar) {
            progressBar.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)';
        }
    });
});

// Smooth Scroll and Page Transitions
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Page transition effect
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="javascript:"]):not([href^="mailto:"]):not([href^="tel:"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Tambahkan efek fade out
            document.body.style.opacity = '0';
            document.body.style.filter = 'blur(20px)';
            document.body.style.transform = 'translateY(20px)';
            
            // Tunggu animasi selesai sebelum pindah halaman
            setTimeout(() => {
                window.location.href = href;
            }, 800); // Durasi 800ms (40% lebih lambat)
        });
    });

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Add scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    });

    // Debounce window resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Add resize-based adjustments here
        }, 250);
    });
});