import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift, Sparkles, Star, Cake, Music2, Camera, Clock3, PauseCircle, Volume2 } from "lucide-react";

const quotes = [
  "You make ordinary moments feel magical.",
  "Every day with you feels like my favorite part of life.",
  "Your smile turns simple moments into beautiful memories.",
  "You are the calm, color, and happiness in my world.",
  "Happy Birthday to the sweetest soul and the prettiest smile."
];

const memories = [
  { title: "The Day We Met", text: "The day we met felt like the beginning of something quietly beautiful, something my heart would never forget." },
  { title: "Our Favorite Moment", text: "Every laugh, every little conversation, and every shared moment with you has become a memory I hold close." },
  { title: "Today", text: "Today is for celebrating your smile, your heart, your softness, and all the beauty you bring into my life." }
];

const reasons = [
  "Your smile makes even ordinary days feel bright.",
  "You carry kindness so naturally.",
  "You make every memory feel warmer.",
  "Your presence makes my heart peaceful.",
  "You are effortlessly cute in every way.",
  "You add color to my life without even trying.",
  "You inspire softness, hope, and happiness.",
  "You are my favorite person, always."
];

const photos = [
  { src: "/images/photo1.jpg", label: "Our Sweet Beginning", note: "The kind of memory that makes my heart smile instantly." },
  { src: "/images/photo2.jpg", label: "Your Beautiful Smile", note: "One smile from you can brighten my whole day." },
  { src: "/images/photo3.jpg", label: "A Moment I Love", note: "A soft little memory I would relive a thousand times." },
  { src: "/images/photo4.jpg", label: "Pure Happiness", note: "This moment feels warm, lovely, and unforgettable." },
  { src: "/images/photo5.jpg", label: "My Favorite View", note: "You, exactly as you are, will always be precious to me." },
  { src: "/images/photo6.jpg", label: "Forever Cute", note: "A tiny snapshot of the beauty you carry everywhere." }
];

const birthdayDate = new Date("2026-03-20T00:00:00+05:30");

const initialCandles = [true, true, true];
const romanticSong = "/music/romantic-song.mp3";

function pad(value) {
  return String(value).padStart(2, "0");
}

function getCountdown() {
  const now = new Date();
  const diff = birthdayDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { expired: true, days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    expired: false,
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds)
  };
}

function FloatingHearts() {
  const hearts = useMemo(
    () => Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 12 + Math.random() * 28,
      duration: 7 + Math.random() * 8,
      delay: Math.random() * 6
    })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-10%] text-pink-300/70"
          style={{ left: heart.left, fontSize: heart.size }}
          animate={{ y: [-10, -900], x: [0, 30, -20, 15], opacity: [0, 0.8, 0.7, 0] }}
          transition={{ duration: heart.duration, repeat: Infinity, delay: heart.delay, ease: "easeInOut" }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
}

function CursorHearts() {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    let idCounter = 0;
    const handleMove = (e) => {
      const newHeart = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
        size: 10 + Math.random() * 14,
        drift: -25 + Math.random() * 50
      };
      setTrail((prev) => [...prev.slice(-18), newHeart]);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 140);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0.9, scale: 1, x: item.x, y: item.y }}
            animate={{ opacity: 0, scale: 0.4, x: item.x + item.drift, y: item.y - 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-pink-400"
            style={{ fontSize: item.size }}
          >
            ❤
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Fireworks({ active }) {
  const bursts = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 8 + Math.random() * 84,
      top: 8 + Math.random() * 55,
      delay: Math.random() * 1.8
    })),
    []
  );

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        >
          {bursts.map((burst) => (
            <div
              key={burst.id}
              className="absolute"
              style={{ left: `${burst.left}%`, top: `${burst.top}%` }}
            >
              {Array.from({ length: 14 }).map((_, index) => (
                <motion.span
                  key={index}
                  className="absolute block h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((index / 14) * Math.PI * 2) * (40 + (index % 4) * 12),
                    y: Math.sin((index / 14) * Math.PI * 2) * (40 + (index % 4) * 12),
                    opacity: 0,
                    scale: 0.3
                  }}
                  transition={{ duration: 1.2, delay: burst.delay, repeat: Infinity, repeatDelay: 0.5 }}
                />
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Confetti({ active }) {
  const pieces = useMemo(
    () => Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 2.5 + Math.random() * 2.2,
      delay: Math.random() * 1.5,
      rotate: Math.random() * 360
    })),
    []
  );

  return (
    <AnimatePresence>
      {active && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute top-[-5%] h-4 w-2 rounded-full bg-gradient-to-b from-pink-200 via-fuchsia-300 to-yellow-200"
              style={{ left: piece.left, rotate: piece.rotate }}
              animate={{ y: [0, window.innerHeight || 900], x: [0, 20, -20, 15], opacity: [1, 1, 0.2] }}
              transition={{ duration: piece.duration, delay: piece.delay, repeat: Infinity, ease: "easeIn" }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuoteCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-white/20 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl">
      <Sparkles className="mx-auto mb-4 h-8 w-8 text-yellow-200" />
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="text-lg font-medium text-white md:text-2xl"
        >
          “{quotes[index]}”
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function PhotoCard({ src, label, note, index, onOpen }) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, rotate: index % 2 === 0 ? -1.5 : 1.5, scale: 1.03 }}
      transition={{ duration: 0.45 }}
      onClick={() => !hasError && onOpen?.({ src, label, note })}
      className="group cursor-pointer rounded-[2rem] border border-white/25 bg-gradient-to-br from-white/18 via-rose-200/10 to-cyan-200/10 p-3 shadow-xl backdrop-blur-xl"
    >
      {!hasError ? (
        <img
          src={src}
          alt={label}
          onError={() => setHasError(true)}
          className="aspect-[4/5] w-full rounded-[1.4rem] object-cover"
        />
      ) : (
        <div className="flex aspect-[4/5] items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-pink-300/30 via-fuchsia-200/20 to-violet-300/20 text-center">
          <div className="space-y-3 px-4">
            <Camera className="mx-auto h-10 w-10 text-white/80" />
            <p className="text-lg font-semibold text-white">{label}</p>
            <p className="text-sm text-white/80">Add {src.replace("/images/", "")} into public/images</p>
          </div>
        </div>
      )}
      <div className="px-2 pb-1 pt-4 text-center">
        <p className="font-semibold text-white">{note}</p>
      </div>
    </motion.div>
  );
}

function ReasonCard({ text, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="[perspective:1000px]" onClick={() => setFlipped((prev) => !prev)}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7 }}
        className="relative h-44 cursor-pointer rounded-[2rem] [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-[2rem] border border-white/25 bg-gradient-to-br from-amber-200/10 via-rose-200/10 to-cyan-200/10 p-6 text-center shadow-xl backdrop-blur-xl [backface-visibility:hidden]">
          <div>
            <Heart className="mx-auto mb-3 h-8 w-8 text-pink-200" />
            <p className="font-semibold text-white">Reason #{index + 1}</p>
            <p className="mt-2 text-sm text-white/80">Tap to reveal</p>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-[2rem] border border-cyan-200/30 bg-gradient-to-br from-rose-500/25 via-violet-500/20 to-cyan-400/20 p-6 text-center shadow-xl backdrop-blur-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-base font-medium text-white">{text}</p>
        </div>
      </motion.div>
    </div>
  );
}

function RosePetals() {
  const petals = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 7 + Math.random() * 7,
      delay: Math.random() * 6,
      rotate: Math.random() * 360,
      size: 16 + Math.random() * 16
    })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[30] overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-10%]"
          style={{ left: petal.left, fontSize: petal.size, rotate: petal.rotate }}
          animate={{ y: [0, window.innerHeight || 1000], x: [0, 25, -15, 20], rotate: [petal.rotate, petal.rotate + 180], opacity: [0, 0.95, 0.7, 0] }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
        >
          🌹
        </motion.div>
      ))}
    </div>
  );
}

function StarGlowBackground() {
  const stars = useMemo(
    () => Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 3,
      duration: 1.8 + Math.random() * 2.5
    })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={{ opacity: [0.15, 0.9, 0.2], scale: [0.7, 1.15, 0.8] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function TypewriterText({ text, className = "" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, [text]);

  return <p className={className}>{displayed}<span className="animate-pulse">|</span></p>;
}

function PhotoLightbox({ photo, onClose }) {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-4xl rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl"
            >
              Close
            </button>
            <img src={photo.src} alt={photo.label} className="max-h-[70vh] w-full rounded-[1.5rem] object-contain" />
            <div className="px-3 pb-2 pt-4 text-center">
              <h3 className="text-2xl font-bold text-white">{photo.label}</h3>
              <p className="mt-2 text-white/80">{photo.note}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IntroLoader({ onEnter }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[radial-gradient(circle_at_top,#ffb86b_0%,#ff7eb6_20%,#8b5cf6_45%,#2563eb_72%,#0f172a_100%)] px-6"
    >
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="mx-auto mb-6 text-7xl"
        >
          💖
        </motion.div>
        <h1 className="bg-gradient-to-r from-amber-200 via-rose-100 to-cyan-200 bg-clip-text text-4xl font-black text-transparent md:text-6xl">A Birthday Surprise for Theekshana Navodi</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/85 md:text-lg">A tiny dreamy world made with love, color, music, petals, memories, and a little bit of magic — only for you.</p>
        <button
          onClick={onEnter}
          className="mt-8 rounded-full bg-white px-8 py-4 font-bold text-fuchsia-700 shadow-2xl transition hover:scale-105"
        >
          Enter the Surprise ✨
        </button>
      </div>
    </motion.div>
  );
}

export default function BirthdaySurpriseWebsite() {
  const [showIntro, setShowIntro] = useState(true);
  const [showSecret, setShowSecret] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [opened, setOpened] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown());
  const [candlesLit, setCandlesLit] = useState(initialCandles);
  const [blowing, setBlowing] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const [cinematicMode, setCinematicMode] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const finalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => setMusicReady(true);
    const handleEnded = () => setMusicPlaying(false);

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleOpen = async () => {
    setOpened(true);
    setCelebrate(true);
    setCinematicMode(true);
    setShowSpotlight(true);
    setTimeout(() => setCelebrate(false), 5000);
    setTimeout(() => setShowSpotlight(false), 3500);
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight * 0.92, behavior: "smooth" });
    }, 500);

    const audio = audioRef.current;
    if (audio && !musicPlaying) {
      try {
        audio.volume = 0.55;
        await audio.play();
        setMusicPlaying(true);
      } catch (error) {
        console.log("Music autoplay blocked until user interacts again.", error);
      }
    }
  };

  const handleFinale = () => {
    setFireworks(true);
    setCelebrate(true);
    setCinematicMode(true);
    setShowSpotlight(true);
    setTimeout(() => setCelebrate(false), 6500);
    setTimeout(() => setFireworks(false), 9000);
    setTimeout(() => setShowSpotlight(false), 5000);
    finalRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
      return;
    }

    try {
      audio.volume = 0.55;
      await audio.play();
      setMusicPlaying(true);
    } catch (error) {
      console.log("Unable to play audio.", error);
    }
  };

  const handleBlowCandles = () => {
    if (blowing) return;
    setBlowing(true);
    setCinematicMode(true);
    setShowSpotlight(true);

    setTimeout(() => setCandlesLit([false, true, true]), 350);
    setTimeout(() => setCandlesLit([false, false, true]), 700);
    setTimeout(() => setCandlesLit([false, false, false]), 1050);

    setTimeout(() => {
      setCelebrate(true);
      setFireworks(true);
    }, 1300);

    setTimeout(() => {
      finalRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 1900);

    setTimeout(() => setCelebrate(false), 7000);
    setTimeout(() => setFireworks(false), 8800);
    setTimeout(() => setShowSpotlight(false), 5000);
    setTimeout(() => setBlowing(false), 9000);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#ffd166_0%,#ff8fab_18%,#c084fc_36%,#60a5fa_58%,#14b8a6_78%,#0f172a_100%)] text-white">
      <AnimatePresence>{showIntro && <IntroLoader onEnter={() => setShowIntro(false)} />}</AnimatePresence>
      <PhotoLightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
      <audio ref={audioRef} src={romanticSong} loop preload="auto" />
      <StarGlowBackground />
      <RosePetals />
      {cinematicMode && <div className="pointer-events-none fixed inset-0 z-[45] bg-black/10" />}
      {showSpotlight && <div className="pointer-events-none fixed inset-0 z-[46] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_35%,rgba(0,0,0,0.35)_72%)]" />}
      <CursorHearts />
      <Confetti active={celebrate} />
      <Fireworks active={fireworks} />

      <div className="relative">
        <FloatingHearts />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.10),transparent_20%,rgba(253,224,71,0.08),transparent_45%,rgba(96,165,250,0.08),transparent_72%)]" />

        <section className="relative flex min-h-screen items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="space-y-7 text-center lg:text-left">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-amber-200/15 via-white/10 to-cyan-200/15 px-4 py-2 shadow-lg backdrop-blur-xl"
              >
                <Star className="h-4 w-4 text-yellow-200" />
                <span className="text-sm font-medium">A little magical birthday surprise</span>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-5xl font-black leading-tight md:text-7xl">
                  Happy Birthday
                  <span className="block bg-gradient-to-r from-amber-200 via-rose-100 to-cyan-200 bg-clip-text text-transparent">
                    Theekshana Navodi ✨
                  </span>
                </h1>
                <TypewriterText
                  text="A tiny world made with love, color, music, memories, and all the softness my heart wants to give you today."
                  className="mx-auto max-w-2xl text-lg text-white/85 md:text-xl lg:mx-0"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <button
                  onClick={toggleMusic}
                  className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-base font-semibold text-white shadow-xl backdrop-blur-xl transition hover:scale-105"
                >
                  {musicPlaying ? <PauseCircle className="h-5 w-5" /> : <Music2 className="h-5 w-5" />}
                  {musicPlaying ? "Pause Music" : "Play Romantic Music"}
                </button>
                <button
                  onClick={handleOpen}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-base font-bold text-fuchsia-700 shadow-2xl transition hover:scale-105"
                >
                  <Gift className="h-5 w-5 transition group-hover:rotate-12" />
                  Open Your Surprise
                </button>
                <button
                  onClick={handleFinale}
                  className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-base font-semibold text-white shadow-xl backdrop-blur-xl transition hover:scale-105"
                >
                  <Sparkles className="h-5 w-5" />
                  Start Celebration
                </button>
              </div>

              {opened && (
                <div className="space-y-2">
                  <p className="text-pink-100 text-lg font-medium">
                    Your surprise is open now 💖 Scroll down for more magic.
                  </p>
                  <p className="inline-flex items-center gap-2 text-sm text-white/80">
                    <Volume2 className="h-4 w-4" />
                    {musicReady ? "Song file detected. Use public/music/romantic-song.mp3" : "Add your song to public/music/romantic-song.mp3"}
                  </p>
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-amber-200/10 via-white/10 to-cyan-200/10 p-5 shadow-2xl backdrop-blur-2xl"
            >
              <div className="rounded-[2rem] bg-gradient-to-br from-white/20 to-white/5 p-6">
                <div className="mb-4 flex items-center gap-2 text-pink-100">
                  <Clock3 className="h-5 w-5" />
                  <p className="font-semibold">Countdown to the birthday moment</p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { label: "Days", value: countdown.days },
                    { label: "Hours", value: countdown.hours },
                    { label: "Minutes", value: countdown.minutes },
                    { label: "Seconds", value: countdown.seconds }
                  ].map((item) => (
                    <div key={item.label} className="rounded-[1.5rem] border border-white/20 bg-black/10 p-5 text-center shadow-lg">
                      <p className="text-3xl font-black md:text-4xl">{item.value}</p>
                      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/70">{item.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-center text-sm text-white/75">
                  {countdown.expired ? "It is birthday time — let the celebration begin!" : "Every second is getting closer to your special moment."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="relative px-6 py-14 md:py-20">
          <div className="mx-auto max-w-6xl space-y-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-black md:text-5xl"
            >
              Cute Quotes for My Cuteeee 💖
            </motion.h2>
            <QuoteCarousel />
          </div>
        </section>

        <section className="relative px-6 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black md:text-5xl">A Gallery Full of Sweet Memories</h2>
              <p className="mt-3 text-white/80">Replace these cards with your real photos before sharing the surprise.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo, index) => (
                <PhotoCard
                  key={photo.label}
                  src={photo.src}
                  label={photo.label}
                  note={photo.note}
                  index={index}
                  onOpen={setLightboxPhoto}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-black md:text-6xl">The Main Birthday Moment 🎂</h2>
              <p className="mt-3 text-lg text-white/80">Make a wish, blow the candles, and watch the magic begin.</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-4xl rounded-[2.6rem] border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl md:p-12"
            >
              <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-pink-100">
                Special Birthday Wish Section
              </div>
              <h3 className="text-3xl font-black md:text-5xl">Blow the Candles for Theekshana Navodi ✨</h3>
              <p className="mx-auto mt-4 max-w-2xl text-white/80 md:text-lg">
                This is the sweetest part of the surprise. Tap the button below and the candles will go out one by one before the grand birthday reveal.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.2, repeat: Infinity }} className="text-[8rem] leading-none md:text-[10rem]">
                  🎂
                </motion.div>

                <div className="mt-2 flex items-end gap-4 text-4xl md:text-5xl">
                  {candlesLit.map((lit, index) => (
                    <motion.span
                      key={index}
                      animate={lit ? { opacity: [0.6, 1, 0.6], y: [0, -5, 0] } : { opacity: 0.35, y: 0, scale: 0.92 }}
                      transition={{ duration: 1.2, repeat: lit ? Infinity : 0, delay: index * 0.12 }}
                    >
                      {lit ? "🕯️" : "💨"}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleBlowCandles}
                    className="rounded-full bg-white px-8 py-4 font-bold text-fuchsia-700 shadow-xl transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={blowing}
                  >
                    {blowing ? "Making the wish magical..." : "Blow the Candles"}
                  </button>

                  <button
                    onClick={() => {
                      setCandlesLit(initialCandles);
                      setBlowing(false);
                    }}
                    className="rounded-full border border-white/25 bg-white/10 px-8 py-4 font-semibold text-white shadow-xl backdrop-blur-xl transition hover:scale-105"
                  >
                    Relight Candles
                  </button>
                </div>

                <p className="mt-5 text-sm text-pink-100/90 md:text-base">
                  After the candles go out, the page will automatically move to the happy birthday reveal section.
                </p>
                <div className="mt-6 rounded-[1.5rem] border border-white/15 bg-black/10 p-4 text-left text-sm text-white/75 md:text-base">
                  <p className="font-semibold text-white">Romantic music setup</p>
                  <p className="mt-2">Put your song here: <span className="font-mono text-pink-100">public/music/romantic-song.mp3</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative px-6 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.2rem] border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
            >
              <div className="mb-5 inline-flex rounded-full bg-white/10 p-3">
                <Heart className="h-6 w-6 text-pink-200" />
              </div>
              <h2 className="text-3xl font-black">A Little Birthday Letter</h2>
              <p className="mt-5 leading-8 text-white/85">
                Happy Birthday, my love. Today is all about you — your beautiful smile, your soft heart, your sweetness, and the quiet magic you bring into my life without even trying. Knowing you has made my world brighter, calmer, and more beautiful in ways I never want to lose.
              </p>
              <p className="mt-5 leading-8 text-white/85">
                I hope this year gives you more happiness than you expect, more peace than you ask for, and more beautiful moments than you can count. You deserve to feel loved, celebrated, appreciated, and treasured — not only today, but every single day. Thank you for being you, and thank you for being one of the most special parts of my life.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative px-6 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black md:text-5xl">Reasons Why You Are So Special</h2>
              <p className="mt-3 text-white/80">Tap each card for a cute little reveal.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {reasons.map((reason, index) => (
                <ReasonCard key={index} text={reason} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-6 py-10 md:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.4rem] border border-white/20 bg-gradient-to-br from-amber-200/10 via-white/10 to-cyan-200/10 p-8 shadow-2xl backdrop-blur-xl"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">Hidden Surprise</p>
              <h3 className="mt-3 text-3xl font-black md:text-4xl">A little secret just for you 💌</h3>
              <button
                onClick={() => setShowSecret((prev) => !prev)}
                className="mt-6 rounded-full bg-white px-7 py-3 font-bold text-fuchsia-700 shadow-xl transition hover:scale-105"
              >
                {showSecret ? "Hide Secret Message" : "Open Secret Message"}
              </button>
              <AnimatePresence>
                {showSecret && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    className="mx-auto mt-6 max-w-2xl rounded-[1.8rem] border border-white/15 bg-black/10 p-6 text-left text-white/85"
                  >
                    If I could gift you one thing beyond flowers, music, and memories, it would be the ability to see yourself the way my heart sees you — lovely, precious, radiant, and deeply unforgettable.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="relative px-6 py-14 md:py-20">
          <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black md:text-5xl">Our Little Love Timeline</h2>
              <p className="mt-3 text-white/80">A soft, sweet story section you can personalize later.</p>
            </div>
            <div className="space-y-6">
              {memories.map((memory, index) => (
                <motion.div
                  key={memory.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="grid gap-4 rounded-[1.8rem] border border-white/15 bg-black/10 p-5 md:grid-cols-[80px_1fr] md:p-6"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-300/60 to-fuchsia-500/50 text-xl font-black shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{memory.title}</h3>
                    <p className="mt-2 leading-7 text-white/80">{memory.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={finalRef} className="relative px-6 pb-24 pt-14 md:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[2.7rem] border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-2xl"
            >
              <div className="mb-5 flex justify-center gap-3 text-pink-200">
                <Heart className="h-7 w-7 fill-pink-200 text-pink-200" />
                <Sparkles className="h-7 w-7 text-yellow-200" />
                <Heart className="h-7 w-7 fill-pink-200 text-pink-200" />
              </div>
              <h2 className="text-4xl font-black md:text-6xl">Happy Birthday, Theekshana Navodi 💗</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
                May your heart stay light, your smile stay bright, and your life stay filled with beautiful surprises. You
                deserve all the love, joy, peace, and magic today and always.
              </p>
              <button
                onClick={handleFinale}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-fuchsia-700 shadow-2xl transition hover:scale-105"
              >
                <Sparkles className="h-5 w-5" />
                One More Fireworks Finale
              </button>
              <div className="mt-8 text-6xl">💖 🌸 ✨ 🎉 🎂 ✨ 🌸 💖</div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
