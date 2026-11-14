# Cadenza Music Therapy - Standalone Website

## About Cadenza

A music therapy business in Winnipeg, MB, led by Lacey Friesen (Music Therapist, board certification pending).

**The Story Behind Our Name:**
A cadenza is part of a song where a performer has the opportunity to stray away from rhythm, tempo, and tonality and to instead display their creativity and artistry—in essence, to show what they can do!

At Cadenza Music Therapy, our hope is to create a space for clients and students to grow in confidence and self-expression (both musically and non-musically) and to foster that growth beyond limits so they can share who they are and what they are capable of.

## Our Programs

- **Heartbeat Harmonies** (Ages 0-8 months) - Support infant milestones through lullabies, gentle movements, and caregiver cuddles
- **Little Notes, Big Steps** (Ages 8-18 months) - Interactive exploration through singing, instruments, and sensory play

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Hosting:** GitHub Pages
- **Domain:** cademzamusictherapy.ca
- **Email Service:** EmailJS (200 submissions/month)

## Setup & Development

### Local Development
```bash
# Clone the repository
git clone https://github.com/cadenzamusictherapyadmin/StandaloneWebsite.git
cd StandaloneWebsite

# Open index.html in your browser
# No build process required - it's a static site!
```

### EmailJS Configuration
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. In `script.js`, replace:
   - `YOUR_EMAILJS_PUBLIC_KEY` with your Public Key
   - `YOUR_EMAILJS_SERVICE_ID` with your Gmail Service ID
   - `YOUR_EMAILJS_TEMPLATE_ID` with your Template ID

### GitHub Pages Deployment
1. Go to repository Settings → Pages
2. Set Source to `main` branch
3. Site will be live at `https://cadenzamusictherapyadmin.github.io/StandaloneWebsite/`

### Custom Domain Setup
1. Add your domain DNS records pointing to GitHub Pages
2. In repository Settings → Pages, enter your custom domain
3. Enable HTTPS

## File Structure

```
├── index.html          # Main website page
├── style.css           # Responsive styling
├── script.js           # EmailJS integration & smooth scrolling
├── artifacts/          # Course PDFs and images
├── README.md           # This file
└── .gitignore          # Exclude .env files
```

## Contact

**Email:** cadenzamusictherapy@gmail.com  
**Location:** Riverview Community Centre, Winnipeg, MB

---

Built with ❤️ for Cadenza Music Therapy
