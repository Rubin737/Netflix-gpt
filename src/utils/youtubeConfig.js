export const youtube = {
  playerVars: {
    modestbranding: 1, // Removes YouTube logo
    rel: 0, // Prevents related videos
    showinfo: 0, // Hides video title (legacy)
    controls: 0, // Hides playback controls
    fs: 0, // Disables fullscreen button
    disablekb: 1, // Disables keyboard shortcuts
    autoplay: 1, // Auto-plays video
    iv_load_policy: 3, // Hides annotations
    playsinline: 1, // Ensures inline playback
    start: 3, // Skips first 3 seconds (to remove Share/Watch Later UI)
    cc_load_policy: 0, // Disable subtitles
    hl: "en", // Language preference
  },
};
