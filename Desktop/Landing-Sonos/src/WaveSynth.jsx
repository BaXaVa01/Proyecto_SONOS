import React, { useEffect, useRef } from 'react';

// WaveSynth: decorative waveform + subtle WebAudio pad on hover/focus of CTA
// - draws a slowly animated waveform to a canvas
// - on hover/focus of the nearest .cta-button it plays a very quiet synth tone
// - respects prefers-reduced-motion and suspends audio when not hovered

export default function WaveSynth() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gainRef = useRef(null);
  const oscillatorRef = useRef(null);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.clientWidth * devicePixelRatio;
    let height = canvas.clientHeight * devicePixelRatio;
    canvas.width = width;
    canvas.height = height;

    let t = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      width = canvas.clientWidth * devicePixelRatio;
      height = canvas.clientHeight * devicePixelRatio;
      canvas.width = width;
      canvas.height = height;
    }

    function draw() {
      if (reduced) {
        // static subtle gradient when reduced motion is enabled
        ctx.clearRect(0, 0, width, height);
        const g = ctx.createLinearGradient(0, 0, width, 0);
        g.addColorStop(0, 'rgba(130,160,255,0.06)');
        g.addColorStop(1, 'rgba(160,200,255,0.04)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
        return;
      }

      t += 0.012;
      ctx.clearRect(0, 0, width, height);

      // background soft fill
      const bg = ctx.createLinearGradient(0, 0, width, 0);
      bg.addColorStop(0, 'rgba(140,160,255,0.03)');
      bg.addColorStop(1, 'rgba(180,210,255,0.02)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // waveform path
      ctx.lineWidth = Math.max(1, Math.round(devicePixelRatio));
      ctx.strokeStyle = 'rgba(40,80,200,0.9)';
      ctx.globalCompositeOperation = 'lighter';

      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        const amp = (height * 0.12) * (1 - layer * 0.22);
        const freq = 0.9 + layer * 0.22;
        for (let x = 0; x <= width; x += 6 * devicePixelRatio) {
          const pct = x / width;
          const y = height / 2 + Math.sin(pct * Math.PI * 2 * freq + t + layer) * amp * Math.sin(t * 0.3 + layer);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(38,70,200,${0.28 - layer * 0.08})`;
        ctx.stroke();
      }

      ctx.globalCompositeOperation = 'source-over';
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    // Find cta button and attach hover/focus listeners
    const cta = document.querySelector('.cta-button');
    if (!cta) return;

    const play = async () => {
      try {
        if (!audioCtxRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtxRef.current = new AudioContext();
          gainRef.current = audioCtxRef.current.createGain();
          gainRef.current.gain.value = 0.0005; // extremely quiet default
          gainRef.current.connect(audioCtxRef.current.destination);

          oscillatorRef.current = audioCtxRef.current.createOscillator();
          oscillatorRef.current.type = 'sine';
          oscillatorRef.current.frequency.value = 220; // warm low tone
          oscillatorRef.current.connect(gainRef.current);
          oscillatorRef.current.start();
        }

        // ensure user gesture-resume when needed
        if (audioCtxRef.current.state === 'suspended') {
          await audioCtxRef.current.resume();
        }

        // ramp up slightly
        gainRef.current.cancelScheduledValues(audioCtxRef.current.currentTime);
        gainRef.current.gain.setTargetAtTime(0.008, audioCtxRef.current.currentTime, 0.03);
        runningRef.current = true;
      } catch (e) {
        // audio may be blocked by browser; silently ignore
        // console.warn('WaveSynth audio blocked', e);
      }
    };

    const stop = () => {
      if (!audioCtxRef.current || !gainRef.current) return;
      gainRef.current.cancelScheduledValues(audioCtxRef.current.currentTime);
      gainRef.current.gain.setTargetAtTime(0.0005, audioCtxRef.current.currentTime, 0.18);
      runningRef.current = false;
    };

    cta.addEventListener('mouseenter', play);
    cta.addEventListener('focus', play);
    cta.addEventListener('mouseleave', stop);
    cta.addEventListener('blur', stop);

    return () => {
      cta.removeEventListener('mouseenter', play);
      cta.removeEventListener('focus', play);
      cta.removeEventListener('mouseleave', stop);
      cta.removeEventListener('blur', stop);
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch(e) {}
        oscillatorRef.current.disconnect();
      }
      if (gainRef.current) gainRef.current.disconnect();
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
