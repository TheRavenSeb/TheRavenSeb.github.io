// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'TheRavenSeb', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: ["TheRavenSeb/Att-DiscordBot_base","TheRavenSeb/Att-DiscordBot_base"], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
      ],
    },
  },
  seo: {
    title: "Caleb Thomas's portfolio ",
    description: '',
    imageURL: '',
  },
  social: {
    linkedin: 'caleb-thomas-2a1a13248',
    x: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: 'TheRavenSeb', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    skype: '',
    telegram: 'TheRavenSeb',
    website: 'https://theravenseb.site',
    phone: '',
    email: 'CThomas985@outlook.com',
  },
  resume: {
    fileUrl:
      '', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'HTML',
    'JavaScript',
    'Express.js',
    'att-client',
    'websockets',
    'Node.js',
    'Git',
    'mongoose',
    "python",
    'CSS',
    
  ],
  experiences: [
    {
      company: 'market basket ',
      position: 'frozen clerk',
      from: 'September 2017',
      to: 'Present',
      companyLink: 'https://example.com',
    },
    {
      company: 'self-employed',
      position: 'freelance web/applacation developer ',
      from: 'september 2020',
      to: 'Present ',
      companyLink: 'https://theravenseb.site',
    },
  ],
  certifications: [
    {
      name: 'intro to IT',
      body: 'learned how to properly assess amd troubleshoot in a IT environment.',
      year: 'july 2024',
      link: 'https://www.linkedin.com/learning/certificates/5bbf7b8ee4cea7f0b22829f080c8137be6077fe9c8d08224a3accd1aae2a0dc5',
    },
  ],
  educations: [
    {
      institution: 'manchester community collage',
      degree: 'AS in Computer science: Extended Reality(XR)',
      from: '2024',
      to: 'Present',
    },
    
  ],
  publications: [
    
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: 'TheRavenSeb', // to hide blog section, keep it empty
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'lofi',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'procyon',
    ],

    // Custom theme, applied to `procyon` theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  

  enablePWA: true,
};

export default CONFIG;
