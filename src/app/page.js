"use client";

import s from "./page.module.css";
import data from "./data.js";
import Japan from "./japan.js";
import Wakayama from "./wakayama.js";
import WakayamaEmblem from "./wakayamaEmblem.js";
import Arrow from "./arrow.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import { useRef, useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { cancelFrame, frame, useInView, useAnimate } from "framer-motion";
// import Image from "next/image";
import ExportedImage from "next-image-export-optimizer";
import Snap from "lenis/snap";

export default function Home() {
  const containerRef = useRef();
  const lenisRef = useRef(null);
  const [city, setCity] = useState({ ...data.locations[10], videos: [2, 6, 3, 9, 12, 18] });
  const [videosLoaded, setVideosLoaded] = useState(true);
  const [scopeWakayamaInfo, animateWakayamaInfo] = useAnimate();
  const isInViewWakayamaInfo = useInView(scopeWakayamaInfo, { margin: "0px 0px -40% 0px" });

  // Framer / lenis setup
  useEffect(() => {
    function update(data) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => {
      cancelFrame(update);
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      const lenis = lenisRef.current?.lenis;

      if (!lenis) return;

      const snap = new Snap(lenis, {
        type: "proximity",
        debounce: 0.3,
        duration: 1,
        easing: (t) => t * (2 - t),
        velocityThreshold: 0.1,
      });

      const aligns = ["center", "center", "center", "start", "end"];

      [...containerRef.current?.children].forEach((el, i) => {
        snap.addElement(el, { align: aligns[i] });
      });
      // [...containerRef.current?.children].forEach((s) => {
      //   snap.addElement(s.offsetTop);
      // });

      return () => {
        snap.remove();
      };
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // 2nd panel
  useEffect(() => {
    const lightBg = `.${s.wakayamaInfoLightBg}`;

    const rect1 = ".wakayamaInfoRect1";
    const rect3 = ".wakayamaInfoRect3";

    const path1 = ".wakayamaInfoPath1";
    const path2 = ".wakayamaInfoPath2";
    const path3 = ".wakayamaInfoPath3";

    const kanji = `.${s.wakayamaInfoSubTitle}`;
    const title = `.${s.wakayamaInfoTitle}`;

    const desc = `.${s.wakayamaInfoText}`;
    const learnmore = `.${s.wakayamaInfoLink}`;
    const arrow = ".wakayamaInfoArrow";

    const picture = `.${s.wakayamaInfoPicture}`;
    const japan = `.${s.wakayamaInfoJapanSvg}`;

    if (isInViewWakayamaInfo) {
      (async () => {
        await animateWakayamaInfo(lightBg, { opacity: 1, width: "85%" }, { ease: "easeOut", duration: 1 });

        animateWakayamaInfo(rect1, { x: 300 }, { name: "easeOut", duration: 1, ease: "easeOut", delay: 0.1 });
        animateWakayamaInfo(rect3, { y: 0 }, { duration: 2, ease: "easeInOut", delay: 0.1 });

        animateWakayamaInfo(path1, { opacity: 1, clipPath: "url('#clipPath')" });
        animateWakayamaInfo(path2, { opacity: 1, clipPath: "url('#clipPath3')" });
        animateWakayamaInfo(path3, { opacity: 1, clipPath: "url('#clipPath3')" });

        animateWakayamaInfo(
          kanji,
          { opacity: 1, clipPath: "inset(0 0% 0 0)", mixBlendMode: "none" },
          { duration: 4, delay: 1 }
        );

        animateWakayamaInfo(title, { opacity: 1 }, { duration: 2, delay: 1 });

        animateWakayamaInfo(desc, { opacity: 1 }, { duration: 4, delay: 1 });

        // await animateWakayamaInfo(learnmore, {})
        // await animateWakayamaInfo(arrow, {})

        animateWakayamaInfo(
          picture,
          { opacity: 0.9, scale: 1, filter: "url(#turb)" },
          {
            duration: 6,
            ease: "easeInOut",
            opacity: { duration: 4.5, ease: "easeOut" },
            scale: { duration: 6, ease: [0.25, 0.3, 0.5, 1] },
            delay: 3,
            filter: { duration: 10, ease: [0.25, 0.3, 0.5, 1] },
          }
        );

        animateWakayamaInfo(
          japan,
          { opacity: 1, clipPath: "inset(0 0% 0 0)", mixBlendMode: "none" },
          { duration: 1.5, delay: 2 }
        );
      })();
    } else {
      // (async () => {
      // animateWakayamaInfo(lightBg, { opacity: 0, width: "0" }, { ease: "easeOut", duration: 1 });
      // animateWakayamaInfo(rect1, { x: 300 }, { duration: 1, ease: "easeOut" });
      // animateWakayamaInfo(rect2, { x: 0 }, { name: "easeOut", duration: 1, ease: "easeOut" });
      // animateWakayamaInfo(rect3, { y: 300 }, { duration: 1, ease: "easeInOut" });
      // animateWakayamaInfo(path1, { opacity: 0, clipPath: "none" });
      // animateWakayamaInfo(path2, { opacity: 0, clipPath: "none" });
      // animateWakayamaInfo(path3, { opacity: 0, clipPath: "none" });
      // animateWakayamaInfo(
      //   kanji,
      //   { opacity: 0, clipPath: "inset(0 100% 0 0)", mixBlendMode: "overlay" },
      //   { duration: 1 }
      // );
      // animateWakayamaInfo(title, { opacity: 0 }, { duration: 1 });
      // animateWakayamaInfo(desc, { opacity: 0 }, { duration: 1 });
      // // await animateWakayamaInfo(learnmore, {})
      // // await animateWakayamaInfo(arrow, {})
      // animateWakayamaInfo(
      //   picture,
      //   { opacity: 0, scale: 1.2, padding: 0 },
      //   {
      //     duration: 1,
      //     ease: "easeInOut",
      //     opacity: { duration: 1, ease: "easeOut" },
      //     scale: { duration: 1, ease: [0.25, 0.3, 0.5, 1] },
      //   }
      // );
      // animateWakayamaInfo(
      //   japan,
      //   { opacity: 0, clipPath: "inset(0 100% 0 0)", mixBlendMode: "overlay" },
      //   { duration: 0.5 }
      // );
      // })();
    }
  }, [isInViewWakayamaInfo]);

  const updateCity = (newCity) => {
    setVideosLoaded(false);
    setCity(newCity);
    setTimeout(() => setVideosLoaded(true), 2000);
  };

  return (
    <ReactLenis root options={{ autoRaf: false, smoothWheel: true }} ref={lenisRef}>
      <svg
        viewBox="0 0 600 200"
        style={{
          pointerEvents: "none",
          display: "flex",
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 5,
          left: 0,
          top: 0,
        }}
      >
        <defs>
          <filter id="turb" x="0" y="0" width="100%" height="100%">
            <motion.feTurbulence
              type="turbulence"
              initial={{
                baseFrequency: 0.025,
              }}
              animate={{
                baseFrequency: 0.02,
              }}
              numOctaves="1"
              result="turbulence_3"
              transition={{
                type: "spring",
                stiffness: 24,
                damping: 2,
                mass: 5,
                duration: 6,
              }}
            ></motion.feTurbulence>
            <feComponentTransfer in="turbulence_3" result="normalized">
              <motion.feFuncG
                type="linear"
                initial={{ slope: 0.4 }}
                animate={{ slope: 0 }}
                transition={{ type: "spring", duration: 6 }}
                intercept="0.5"
              />
              <motion.feFuncR
                type="linear"
                initial={{ slope: 0.4 }}
                animate={{ slope: 0 }}
                transition={{ type: "spring", duration: 6 }}
                intercept="0.5"
              />
            </feComponentTransfer>
            <motion.feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              in="SourceGraphic"
              in2="turbulence"
              initial={{
                attrScale: 0,
              }}
              animate={{ attrScale: [900, 0] }}
              transition={{
                duration: 6,
              }}
            ></motion.feDisplacementMap>
          </filter>
        </defs>
      </svg>
      {/* end */}

      <div className={s.container} ref={containerRef}>
        <motion.div className={s.topVideoContainer}>
          <motion.video
            initial={{ opacity: 0, scale: 1.2, padding: 0 }}
            animate={{ opacity: 1, scale: 1, filter: "url(#turb)", padding: "30px" }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              opacity: { duration: 4.5, ease: "easeOut" },
              scale: { duration: 5, ease: [0.25, 0.3, 0.5, 1] },
            }}
            className={s.topVideo}
            autoPlay
            loop
            muted
          >
            <source src="/topVideo.mp4" type="video/mp4" />
          </motion.video>

          <div className={s.topVideoTextContainer}>
            <motion.div
              className={s.topVideoText}
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)", mixBlendMode: "overlay" }}
              animate={{ opacity: 1, filter: "url(#turb)", clipPath: "inset(0 0% 0 0)", mixBlendMode: "none" }}
              transition={{ duration: 2, delay: 4 }}
            >
              Wakayama awaits
            </motion.div>
            {/* <div className={s.topVideoText}> Tanabe awaits</div> */}
            <motion.div
              className={s.topVideoSubText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 7 }}
            >
              16/8°C afternoon clouds
            </motion.div>
            {/* <div className={s.topVideoSubText}>16/8°C afternoon clouds</div> */}
          </div>
        </motion.div>
        {/* end */}

        {/* wakayama info */}
        <div ref={scopeWakayamaInfo} className={s.wakayamaInfo}>
          <motion.div
            // initial={{ opacity: 0, width: "0" }}
            // whileInView={{ opacity: 1, width: "85%" }}
            // viewport={{ once: true }}
            // transition={{ ease: "easeOut", duration: 1 }}
            className={s.wakayamaInfoLightBg}
          >
            <div className={s.wakayamaInfoEmblemContainer}>
              <svg
                className={s.wakayamaInfoEmblem}
                viewBox="0 0 238 172"
                xmlns="http://www.w3.org/2000/svg"
                fill="rgba(120, 12, 11, 0.03)"
              >
                <defs>
                  <clipPath id="clipPath">
                    <motion.rect
                      className="wakayamaInfoRect1"
                      height="500"
                      width="500"
                      initial={{ x: 300 }}
                      // whileInView={{ x: 0 }}
                      whileInView={{ x: 0 }}
                      transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                      // transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                    />
                  </clipPath>
                  {/* <clipPath id="clipPath2">
                    <motion.rect
                      className="wakayamaInfoRect2"
                      height="500"
                      width="500"
                      initial={{ x: 0 }}
                      whileInView={{ x: 300 }}
                      // transition={{ ease: "easeOut", duration: 1, ease: "easeOut", delay: 1 }}
                    />
                  </clipPath> */}
                  <clipPath id="clipPath3">
                    <motion.rect
                      className="wakayamaInfoRect3"
                      height="500"
                      width="500"
                      initial={{ y: 300 }}
                      whileInView={{ y: 0 }}
                      transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                    />
                  </clipPath>
                </defs>

                <motion.path
                  d="M60.3741 68.2752C30.2738 68.2752 5.88278 92.6663 5.88275 122.767V125.077C5.88275 137.665 26.6755 137.99 26.6755 125.077V122.767C26.6755 104.109 41.7169 88.9883 60.3741 88.9883C75.5331 88.9883 88.3625 98.978 92.6387 112.729L93.5947 115.915C100.735 148.727 129.945 172 164.896 172C205.195 172 237.949 140.6 237.949 100.301V85.244C237.949 73.4112 219.068 73.9753 219.068 85.244L219.467 97.9905C219.467 128.091 194.996 152.562 164.896 152.562C140.987 152.562 120.694 137.112 113.352 115.676L111.281 109.383C105.765 85.7498 85.8607 68.2752 60.3741 68.2752Z"
                  className="wakayamaInfoPath1"
                  clipPath="url(#clipPath)"
                  initial={{ opacity: 0, clipPath: "none" }}
                  // whileInView={{ opacity: 1, clipPath: "url('#clipPath')" }}
                />
                <motion.path
                  d="M128.488 0.399994C122.793 0.399994 118.211 5.49814 118.211 11.8719V93.0512C118.204 93.6089 118.211 94.1665 118.211 94.7242C118.211 120.675 137.627 138.964 161.55 138.964C185.472 138.964 204.888 121.126 204.888 94.7242C204.901 94.1399 204.888 93.5558 204.888 92.9716V11.8719C204.888 5.49814 200.307 0.400019 194.611 0.399994H192.221C186.525 0.399994 181.944 5.49814 181.944 11.8719V41.1889H141.713V11.8719C141.713 5.49814 137.132 0.400019 131.436 0.399994H128.488ZM141.713 64.1326H181.944V92.9716C181.944 106.131 176.687 117.588 161.55 117.588C145.611 117.435 141.713 106.418 141.713 93.0512V64.1326Z"
                  className="wakayamaInfoPath2"
                  clipPath="url(#clipPath3)"
                  initial={{ opacity: 0, clipPath: "none" }}
                  // whileInView={{ opacity: 1, clipPath: "url('#clipPath3')" }}
                />
                <motion.path
                  d="M17.514 5.4986C11.1402 5.4986 6.04209 10.0797 6.04209 15.7755V18.1654C6.04209 23.8612 11.1402 28.4423 17.514 28.4423H46.8309V38.6395H12.4153C6.06654 38.6395 0.943481 43.2207 0.943481 48.9164V51.3064C0.943481 57.0021 6.06654 61.5833 12.4153 61.5833H46.8309V154.633C46.8309 160.988 51.9474 166.105 58.3028 166.105C64.6582 166.105 69.7747 160.988 69.7747 154.633V61.5833H88.8945C95.2433 61.5833 100.366 57.0021 100.366 51.3064V48.9164C100.366 43.2207 95.2433 38.6395 88.8945 38.6395H69.7747V28.4423H76.1479C82.5217 28.4423 87.6198 23.8612 87.6198 18.1654V15.7755C87.6198 10.0798 82.5217 5.4986 76.1479 5.4986H17.514Z"
                  className="wakayamaInfoPath3"
                  clipPath="url(#clipPath3)"
                  initial={{ opacity: 0, clipPath: "none" }}
                  // whileInView={{ opacity: 1, clipPath: "url('#clipPath3')" }}
                />
              </svg>
            </div>

            <div className={s.wakayamaInfoTextContainer}>
              <motion.div
                className={s.wakayamaInfoSubTitle}
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)", mixBlendMode: "overlay" }}
                // whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)", mixBlendMode: "none" }}
                // transition={{ duration: 4, delay: 2 }}
              >
                和歌山県
              </motion.div>
              {/* <div className={s.wakayamaInfoSubTitle}>和歌山県</div> */}
              <motion.div
                initial={{ opacity: 0 }}
                // whileInView={{ opacity: 1 }}
                // viewport={{ once: true }}
                // transition={{ duration: 2, delay: 2 }}
                className={s.wakayamaInfoTitle}
              >
                Wakayama
              </motion.div>
              {/* <div className={s.wakayamaInfoTitle}>Wakayama</div> */}
              <motion.div
                initial={{ opacity: 0 }}
                // whileInView={{ opacity: 1 }}
                // viewport={{ once: true }}
                // transition={{ duration: 4, delay: 2 }}
                className={s.wakayamaInfoText}
              >
                {data.mainDescription}
                <a className={s.wakayamaInfoLink}>
                  Learn more
                  <Arrow className="wakayamaInfoArrow" />
                </a>

                <ExportedImage
                  initial={{ opacity: 0, scale: 1.2, padding: 0 }}
                  // whileInView={{ opacity: 1, scale: 1, filter: "url(#turb)" }}
                  // viewport={{ once: true }}
                  // transition={{
                  //   duration: 6,
                  //   ease: "easeInOut",
                  //   opacity: { duration: 4.5, ease: "easeOut" },
                  //   scale: { duration: 6, ease: [0.25, 0.3, 0.5, 1] },
                  //   delay: 3,
                  // }}
                  src="images/castle.png"
                  height={500}
                  width={300}
                  alt="castle"
                  className={s.wakayamaInfoPicture}
                />
              </motion.div>

              {/* <Japan /> */}
              <motion.svg
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)", mixBlendMode: "overlay" }}
                // whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)", mixBlendMode: "none" }}
                // viewport={{ once: true }}
                // transition={{ duration: 1.5, delay: 2 }}
                className={s.wakayamaInfoJapanSvg}
                viewBox="0 0 421 440"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Japan />
              </motion.svg>

              {/* <img src="./japan.svg" className={s.wakayamaInfoJapanSvg} /> */}
            </div>
          </motion.div>
        </div>
        {/* end */}

        {/* citys / villages / towns info */}
        <div className={s.citysInfo}>
          <div className={s.citysInfoInner}>
            <div className={s.citysImgContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  exit={{ opacity: 0, filter: "blur(30px)" }}
                  initial={{ opacity: 0, filter: "blur(30px)" }}
                  animate={{ opacity: 1, filter: "blur(0)" }}
                  whileInView={{ opacity: 1, filter: "blur(0)" }}
                  key={`${city.name}-picture-container`}
                  className={s.citysImgContainerInner}
                  transition={{ duration: 0.5 }}
                >
                  <div className={s.citysImgBackdrops}>
                    <div className={s.citysImgBackdropBlack} />
                    <div className={s.citysImgBackdropWhite} />
                  </div>

                  {/* <motion.div
                    animate={{
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  > */}
                  <ExportedImage
                    key={`picture-${city.name}`}
                    height={565}
                    width={1000}
                    alt={`${city.name}`}
                    src={`images/prefecture/${city.name}/0.jpg`}
                    className={s.citysImg}
                    placeholder="blur"
                    priority={true}
                  />
                  {/* </motion.div> */}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={`${city.name}-info-container`} className={s.citysInfoLeft}>
                <div className={s.citysInfoTextContainer}>
                  <motion.div
                    key={`${city.name}-kanji`}
                    initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                    animate={{ opacity: 0.46, clipPath: "inset(0 0% 0 0)", transition: { duration: 1, delay: 1 } }}
                    exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                    className={s.citysInfoSubTitle}
                    style={{ width: "fit-content" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    {city.kanji}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                    animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: 1.2, delay: 0 } }}
                    exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                    key={`${city.name}-title`}
                    className={s.citysInfoTitle}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className={s.citysInfoEmblem}>
                      {/* <ExportedImage
                      height={500}
                      width={500}
                      alt={`${city.name} emblem`}
                      src={`./prefecture/${city.name}/emblem.svg`}
                      className={s.citysInfoEmblemImg}
                      placeholder="blur"
                    /> */}
                    </div>
                    {city.name}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 2, delay: 0.5 } }}
                    exit={{ opacity: 0 }}
                    key={`${city.name}-desc`}
                    className={s.citysInfoText}
                    transition={{ ease: "easeOut" }}
                  >
                    {/* {data.locations[1].description} */}
                    {city.description}
                    <a className={s.citysInfoLink}>
                      Learn more
                      <Arrow />
                    </a>
                  </motion.div>

                  <motion.div
                    // initial={{ opacity: 0 }}
                    // animate={{ opacity: 1, transition: { delay: 3 } }}
                    // exit={{ opacity: 0 }}
                    // key={`${city.name}-phones`}
                    className={s.phones}
                  >
                    <Swiper
                      slidesPerView={5}
                      spaceBetween={"1vw"}
                      loop={true}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={false}
                      modules={[]}
                      className="mySwiper"
                    >
                      {/* {Array.from({ length: 10 }, (_, i) => ( */}
                      {city.videos.map((idx, i) => (
                        <SwiperSlide key={`${idx}-${i}`}>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 2 + i * 0.1 } }}
                            exit={{ opacity: 0, transition: { delay: 0.05 * (city.videos.length - i) } }}
                            transition={{ duration: 1 }}
                            key={`${city.name}-phone-${i}`}
                            className={s.phoneContainer}
                          >
                            <div className={s.phone}>
                              <motion.video
                                data-clicked=""
                                onMouseEnter={(e) => {
                                  if (!e.target.dataset.clicked) {
                                    e.target.play();
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!e.target.dataset.clicked) {
                                    e.target.pause();
                                  }
                                }}
                                onClick={(e) => {
                                  if (!e.target.dataset.clicked) {
                                    e.target.dataset.clicked = "1";
                                    e.target.play();
                                  } else {
                                    e.target.dataset.clicked = "";
                                    e.target.pause();
                                  }
                                }}
                                className={s.phoneVideo}
                                loop
                                muted
                              >
                                <source src={`/phone videos/Compound Clip ${idx}.mp4`} type="video/mp4" />
                              </motion.video>
                            </div>

                            <div className={s.phoneText}>各施設の舞台となる土地や、周辺の街の</div>
                          </motion.div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className={s.citysInfoRight}>
              <Wakayama {...{ city, updateCity }} />
              {/* <img src="./tmp-second-panel.jpg" className={s.tmp} /> */}
            </div>
          </div>
        </div>
        {/* end */}

        {/* discover */}
        <div className={s.discover}>
          <div className={s.discoverInnerContainer}>
            <div className={s.discoverInner}>
              <div className={s.discoverLeft}>
                {Array.from({ length: 3 }).map((x, i) => (
                  <ExportedImage
                    key={`left-img-${i}`}
                    height={565}
                    width={1000}
                    alt={`Discover wakayama picture`}
                    src={`images/discover/left/${i}.jpg`}
                    className={s.discoverPicture}
                  />
                ))}
              </div>

              <div className={s.discoverCenter}>
                <div className={s.discoverTextContainer}>
                  <div className={s.discoverTitle}>Discover</div>
                  <div className={s.discoverSubTitle}>私たちが尊重する3つのこと</div>
                </div>

                {Array.from({ length: 3 }).map((x, i) => (
                  <ExportedImage
                    key={`center-img-${i}`}
                    height={395}
                    width={700}
                    alt={`Discover wakayama picture`}
                    src={`images/discover/center/${i}.jpg`}
                    className={s.discoverPicture}
                  />
                ))}
              </div>

              <div className={s.discoverRight}>
                {Array.from({ length: 3 }).map((x, i) => (
                  <ExportedImage
                    key={`right-img-${i}`}
                    height={565}
                    width={500}
                    alt={`Discover wakayama picture`}
                    src={`images/discover/right/${i}.jpg`}
                    className={s.discoverPicture}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* end */}

        {/* footer */}
        <div className={s.footer}>
          <img src="./dither.png" className={s.dither} />
          <img style={{ mixBlendMode: "overlay", zIndex: 1, top: "5%" }} src="./dither.png" className={s.dither} />
          <img
            style={{ mixBlendMode: "overlay", zIndex: 1, top: "9%", width: "104%" }}
            src="./dither.png"
            className={s.dither}
          />
          <video className={s.footerVideo} autoPlay loop muted>
            <source src="/footer.mp4" type="video/mp4" />
          </video>

          <div className={s.footerButtons}>
            <div className={s.footerButton}>
              <div className={s.footerButtonTextContainer}>
                <div className={s.footerButtonSubText}>お問い合わせ</div>
                <div className={s.footerButtonText}>Contact us</div>
              </div>

              <div className={s.footerButtonArrowContainer}>
                <Arrow />
              </div>
            </div>

            <div className={s.footerButton}>
              <div className={s.footerButtonTextContainer}>
                <div className={s.footerButtonSubText}>お問い合わせ</div>
                <div className={s.footerButtonText}>FAQ</div>
              </div>

              <div className={s.footerButtonArrowContainer}>
                <Arrow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}
