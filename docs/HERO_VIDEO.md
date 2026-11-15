# Hero background video: Higgsfield brief

The hero already supports a video background. Until `public/video/hero.mp4` exists it shows a looping montage of
your real work. Drop the file in and it fades in automatically (no code change).

## Why this wasn't generated automatically
The Higgsfield connector in this session is read-only (balance, models, past generations). It can't start a
new generation, so run the prompt below in Higgsfield (app or web) and save the result.
Account at time of writing: Pro plan, ~304 credits.

## Recommended model and settings
| Setting | Value | Why |
|---|---|---|
| Model | **Seedance 2.0** (or Kling 3.0 Turbo, which you've used before) | Seedance supports a start and end frame, which gives a seamless loop |
| Aspect ratio | **16:9** | Full-bleed desktop hero |
| Duration | **8 to 10 s** | Long enough to feel alive, small file |
| Resolution | **1080p** | Sharp on desktop, still compresses well |
| Audio | **Off** | The site plays it muted anyway |
| Start frame = End frame | Use the **same image** for both (an image of the first frame) | Makes the clip loop with no visible jump |

## Prompt (text-to-video)
> A bright, sunny creative-agency studio table seen from above and slightly in front, warm cream background.
> Hands (no faces) arrange colourful objects: a camera, a phone showing a social feed, printed brand
> stationery, paint swatches in orange, sunshine yellow and soft pink, and a round orange-yellow badge with
> a white letter C. Slow, smooth camera push-in with a gentle parallax. Playful, tidy, sticker-like energy,
> soft natural window light, shallow depth of field, very little clutter on the left third of the frame
> (empty space for text). Colour palette: cream, orange, sunshine yellow, soft pink, espresso brown.
> No text, no logos other than the round C badge, no people's faces, no motion blur, clean loopable motion.

### Negative / avoid
Faces, readable text or captions, other brands' logos, flicker, fast cuts, camera shake, dark moody grading.

### Alternative idea (from your doc: "But make it Coco")
A looping shot of the round C badge sitting on a cream tabletop while small agency objects (camera, phone,
brush, paint swatches, megaphone) orbit and settle around it, then lift away again. Same palette and settings.

## Preparing the file
1. Download the mp4 from Higgsfield.
2. Make it small: **under 3 MB** (H.264, 1080p or 720p, around 2 Mbps, no audio). Handbrake or ffmpeg both work:
   `ffmpeg -i in.mp4 -an -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart hero.mp4`
3. Save as `website-revamp/public/video/hero.mp4`.
4. Optional: a poster image is taken from the first work image automatically.

## How the site uses it
- `components/lab/HeroBackdrop.tsx`: video fades in over the montage once it can play; muted, looping,
  `playsInline`; paused for users who prefer reduced motion.
- A cream gradient on the left keeps the headline readable over any footage.
- The 3D "C" badge now has a transparent background, so it floats over the video.
