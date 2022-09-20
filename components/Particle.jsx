import React from "react";
import Particles from "react-tsparticles";
// import  { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { useCallback } from "react";




const Particle = () => {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    return(
        <div>
       <Particles 
       id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        
        options={
            { background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: true,
                },
                modes: {
                    push: {
                        quantity: 40,
                    },
                    repulse: {
                        distance: 60,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    // value: "#1809e9",
                    value:  "rgba(225, 221, 236, 0.993)",
                },
                // links: {
                //     color: "#ffffff",
                //     distance: 15,
                //     enable: true,
                //     opacity: 0.5,
                //     width: 1,
                // },
                collisions: {
                    enable: true,
                },
                move: {
                    directions: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 0.5,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 600,
                    },
                    value: 100,
                },
                opacity: {
                    value: 0.3,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }
    }
    
         />
         </div>
    )
};

export default Particle;