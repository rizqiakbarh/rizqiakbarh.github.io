/*
==========================================================
RIZQI AKBAR HERNAWAN PORTFOLIO
SCRIPT V2
PART 1A
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      ELEMENT
    =========================================*/

    const body = document.body;

    const header = document.querySelector("header");

    const menuToggle = document.querySelector(".menu-toggle");

    const mobileNav = document.querySelector(".mobile-nav");

    const overlay = document.querySelector(".overlay");

    const loader = document.getElementById("loader");

    const navLinks = document.querySelectorAll(

        ".nav-links a, .mobile-nav a"

    );

    /*=========================================
      LOADER
    =========================================*/

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

            setTimeout(() => {

                loader.remove();

            }, 600);

        }, 800);

    });

    /*=========================================
      MOBILE MENU
    =========================================*/

    function openMenu() {

        menuToggle.classList.add("active");

        mobileNav.classList.add("active");

        overlay.classList.add("active");

        body.style.overflow = "hidden";

    }

    function closeMenu() {

        menuToggle.classList.remove("active");

        mobileNav.classList.remove("active");

        overlay.classList.remove("active");

        body.style.overflow = "";

    }

    menuToggle.addEventListener("click", () => {

        if (mobileNav.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    });

    overlay.addEventListener("click", closeMenu);

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });

    /*=========================================
      ESC CLOSE
    =========================================*/

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            closeMenu();

        }

    });

    /*=========================================
      HEADER SCROLL
    =========================================*/

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

        const current = window.pageYOffset;

        if (current > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

        if (

            current > lastScroll &&

            current > 120

        ) {

            header.style.transform =

                "translateY(-120%)";

        }

        else {

            header.style.transform =

                "translateY(0)";

        }

        lastScroll = current;

    });

    /*=========================================
      SMOOTH SCROLL
    =========================================*/

    document.querySelectorAll(

        'a[href^="#"]'

    ).forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target =

                document.querySelector(

                    this.getAttribute("href")

                );

            if (!target) return;

            window.scrollTo({

                top:

                    target.offsetTop - 90,

                behavior:

                    "smooth"

            });

        });

    });

    /*=========================================
      ACTIVE MENU
    =========================================*/

    const sections =

        document.querySelectorAll("section");

    function activeMenu() {

        let current = "";

        sections.forEach(section => {

            const top =

                window.scrollY;

            const offset =

                section.offsetTop - 200;

            const height =

                section.offsetHeight;

            if (

                top >= offset &&

                top < offset + height

            ) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (

                link.getAttribute("href")

                === "#" + current

            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(

        "scroll",

        activeMenu

    );
    /*=========================================
      TYPING EFFECT V2
    =========================================*/

    const typing = document.getElementById("typing");

    const words = [

        "Computer Engineering Student",

        "Full Stack Web Developer",

        "Flutter Mobile Developer",

        "IoT Enthusiast",

        "Problem Solver",

        "Software Engineer"

    ];

    let wordIndex = 0;

    let charIndex = 0;

    let deleting = false;

    function typingEffect() {

        if (!typing) return;

        const current = words[wordIndex];

        if (!deleting) {

            typing.textContent =

                current.substring(0, charIndex);

            charIndex++;

            if (charIndex > current.length) {

                deleting = true;

                setTimeout(typingEffect, 1800);

                return;

            }

        }

        else {

            typing.textContent =

                current.substring(0, charIndex);

            charIndex--;

            if (charIndex < 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {

                    wordIndex = 0;

                }

            }

        }

        setTimeout(

            typingEffect,

            deleting ? 45 : 85

        );

    }

    typingEffect();

    /*=========================================
      CUSTOM CURSOR
    =========================================*/

    const cursor =

        document.querySelector(".cursor");

    const isTouch =

        window.matchMedia("(pointer:coarse)").matches;

    if (cursor && !isTouch) {

        document.addEventListener(

            "mousemove",

            e => {

                cursor.style.left =

                    e.clientX + "px";

                cursor.style.top =

                    e.clientY + "px";

            }

        );

        document.querySelectorAll(

            "a,button,.btn,.project-card,.skill-card,.project-feature"

        ).forEach(item => {

            item.addEventListener(

                "mouseenter",

                () => {

                    cursor.style.transform =

                        "translate(-50%,-50%) scale(2.2)";

                    cursor.style.borderColor =

                        "#4f8cff";

                }

            );

            item.addEventListener(

                "mouseleave",

                () => {

                    cursor.style.transform =

                        "translate(-50%,-50%) scale(1)";

                    cursor.style.borderColor =

                        "#ffffff";

                }

            );

        });

    }

    else {

        if (cursor) {

            cursor.remove();

        }

    }

    /*=========================================
      SCROLL PROGRESS
    =========================================*/

    const progressBar =

        document.createElement("div");

    progressBar.className =

        "scroll-progress";

    document.body.appendChild(progressBar);

    function updateProgress() {

        const scrollTop =

            document.documentElement.scrollTop;

        const height =

            document.documentElement.scrollHeight -

            document.documentElement.clientHeight;

        const percent =

            (scrollTop / height) * 100;

        progressBar.style.width =

            percent + "%";

    }

    window.addEventListener(

        "scroll",

        updateProgress

    );

    /*=========================================
      FOOTER YEAR
    =========================================*/

    const year =

        document.getElementById("year");

    if (year) {

        year.textContent =

            new Date().getFullYear();

    }

    /*=========================================
      HERO PARALLAX
    =========================================*/

    const heroImage =

        document.querySelector(".hero-image");

    if (heroImage && !isTouch) {

        document.addEventListener(

            "mousemove",

            e => {

                const x =

                    (e.clientX / window.innerWidth - .5) * 18;

                const y =

                    (e.clientY / window.innerHeight - .5) * 18;

                heroImage.style.transform =

                    `translate(${x}px,${y}px)`;

            }

        );

    }

    /*=========================================
      BUTTON RIPPLE
    =========================================*/

    document.querySelectorAll(

        ".btn"

    ).forEach(button => {

        button.addEventListener(

            "click",

            function (e) {

                const ripple =

                    document.createElement("span");

                ripple.className =

                    "ripple";

                const rect =

                    this.getBoundingClientRect();

                ripple.style.left =

                    e.clientX - rect.left + "px";

                ripple.style.top =

                    e.clientY - rect.top + "px";

                this.appendChild(ripple);

                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }

        );

    });

    /*=========================================
      CONSOLE MESSAGE
    =========================================*/

    console.clear();

    console.log(

        "%cRizqi Akbar Hernawan",

        "color:#4f8cff;font-size:20px;font-weight:bold;"

    );

    console.log(

        "%cPortfolio Website 2026",

        "color:#42d8ff;font-size:14px;"

    );

    console.log(

        "%cThanks for visiting 👋",

        "color:#ffffff;font-size:13px;"

    );
        /*=========================================
      SCROLL REVEAL
    =========================================*/

    const revealItems = document.querySelectorAll(

        ".fade-up,.fade-left,.fade-right"

    );

    const revealObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold: .15,

            rootMargin: "0px 0px -80px 0px"

        }

    );

    revealItems.forEach(item => {

        revealObserver.observe(item);

    });

    /*=========================================
      COUNTER
    =========================================*/

    const counters = document.querySelectorAll(

        ".stat-card h3"

    );

    const counterObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const text = counter.textContent;

                const value = parseInt(text);

                if (isNaN(value)) return;

                let current = 0;

                const step = Math.ceil(value / 40);

                const interval = setInterval(() => {

                    current += step;

                    if (current >= value) {

                        counter.textContent =

                            text;

                        clearInterval(interval);

                    }

                    else {

                        counter.textContent =

                            current +

                            (text.includes("+") ? "+" : "");

                    }

                }, 25);

                counterObserver.unobserve(counter);

            });

        },

        {

            threshold: .5

        }

    );

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /*=========================================
      PROJECT CARD HOVER
    =========================================*/

    const projectCards = document.querySelectorAll(

        ".project-card,.project-feature"

    );

    if (!isTouch) {

        projectCards.forEach(card => {

            card.addEventListener(

                "mousemove",

                e => {

                    const rect =

                        card.getBoundingClientRect();

                    const x =

                        e.clientX - rect.left;

                    const y =

                        e.clientY - rect.top;

                    const rotateX =

                        ((y / rect.height) - .5) * -10;

                    const rotateY =

                        ((x / rect.width) - .5) * 10;

                    card.style.transform =

                        `perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)`;

                }

            );

            card.addEventListener(

                "mouseleave",

                () => {

                    card.style.transform =

                        "";

                }

            );

        });

    }

    /*=========================================
      SKILL CARD FLOAT
    =========================================*/

    const skillCards =

        document.querySelectorAll(

            ".skill-card"

        );

    if (!isTouch) {

        skillCards.forEach(card => {

            card.addEventListener(

                "mouseenter",

                () => {

                    card.animate([

                        {

                            transform:

                                "translateY(0)"

                        },

                        {

                            transform:

                                "translateY(-8px)"

                        }

                    ], {

                        duration:250,

                        fill:"forwards"

                    });

                }

            );

            card.addEventListener(

                "mouseleave",

                () => {

                    card.animate([

                        {

                            transform:

                                "translateY(-8px)"

                        },

                        {

                            transform:

                                "translateY(0)"

                        }

                    ], {

                        duration:250,

                        fill:"forwards"

                    });

                }

            );

        });

    }

    /*=========================================
      IMAGE LAZY EFFECT
    =========================================*/

    const images =

        document.querySelectorAll("img");

    images.forEach(img => {

        img.loading = "lazy";

        img.decoding = "async";

    });

    /*=========================================
      STAGGER ANIMATION
    =========================================*/

    document.querySelectorAll(

        ".skills-grid,.project-grid"

    ).forEach(grid => {

        [...grid.children].forEach(

            (item,index)=>{

                item.style.transitionDelay =

                    `${index*80}ms`;

            }

        );

    });

    /*=========================================
      SECTION TITLE ANIMATION
    =========================================*/

    document.querySelectorAll(

        ".section-title"

    ).forEach(title=>{

        revealObserver.observe(title);

    });
        /*=========================================
      ACTIVE SECTION OBSERVER
    =========================================*/

    const sectionObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const id = entry.target.id;

                document.querySelectorAll(

                    ".nav-links a,.mobile-nav a"

                ).forEach(link => {

                    link.classList.remove("active");

                    if (

                        link.getAttribute("href") === "#" + id

                    ) {

                        link.classList.add("active");

                    }

                });

            });

        },

        {

            threshold: .55

        }

    );

    sections.forEach(section => {

        sectionObserver.observe(section);

    });

    /*=========================================
      SCROLL TO TOP
    =========================================*/

    const scrollTopBtn = document.createElement("button");

    scrollTopBtn.className = "scroll-top";

    scrollTopBtn.setAttribute(

        "aria-label",

        "Back To Top"

    );

    scrollTopBtn.innerHTML = "↑";

    document.body.appendChild(scrollTopBtn);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 700) {

            scrollTopBtn.classList.add("show");

        } else {

            scrollTopBtn.classList.remove("show");

        }

    });

    scrollTopBtn.addEventListener(

        "click",

        () => {

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

    );

    /*=========================================
      COPY EMAIL
    =========================================*/

    const emailLinks = document.querySelectorAll(

        'a[href^="mailto:"]'

    );

    emailLinks.forEach(link=>{

        link.addEventListener(

            "contextmenu",

            e=>{

                e.preventDefault();

                const email =

                    link.href.replace(

                        "mailto:",

                        ""

                    );

                navigator.clipboard.writeText(

                    email

                ).then(()=>{

                    console.log(

                        "Email copied."

                    );

                });

            }

        );

    });

    /*=========================================
      CLICK SCALE
    =========================================*/

    document.querySelectorAll(

        ".btn,.skill-card,.project-card,.project-feature"

    ).forEach(item=>{

        item.addEventListener(

            "mousedown",

            ()=>{

                item.style.transform +=

                    " scale(.98)";

            }

        );

        item.addEventListener(

            "mouseup",

            ()=>{

                item.style.transform =

                    item.style.transform.replace(

                        " scale(.98)",

                        ""

                    );

            }

        );

    });

    /*=========================================
      KEYBOARD ACCESSIBILITY
    =========================================*/

    document.addEventListener(

        "keydown",

        e=>{

            if(e.key==="Home"){

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }

            if(e.key==="End"){

                window.scrollTo({

                    top:

                    document.body.scrollHeight,

                    behavior:"smooth"

                });

            }

        }

    );

    /*=========================================
      PERFORMANCE
    =========================================*/

    let ticking = false;

    function optimizedScroll(){

        if(!ticking){

            requestAnimationFrame(()=>{

                updateProgress();

                activeMenu();

                ticking = false;

            });

            ticking = true;

        }

    }

    window.removeEventListener(

        "scroll",

        updateProgress

    );

    window.removeEventListener(

        "scroll",

        activeMenu

    );

    window.addEventListener(

        "scroll",

        optimizedScroll,

        {

            passive:true

        }

    );

    /*=========================================
      PAGE VISIBILITY
    =========================================*/

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(document.hidden){

                console.log(

                    "Portfolio Paused"

                );

            }else{

                console.log(

                    "Portfolio Active"

                );

            }

        }

    );

    /*=========================================
      RESIZE
    =========================================*/

    window.addEventListener(

        "resize",

        ()=>{

            if(window.innerWidth>992){

                closeMenu();

            }

        }

    );

    /*=========================================
      READY
    =========================================*/

    console.log(

        "%cPortfolio Ready 🚀",

        "color:#4f8cff;font-size:16px;font-weight:bold"

    );

});