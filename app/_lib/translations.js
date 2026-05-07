export const translations = {
  es: {
    nav: {
      home: 'inicio',
      work: 'proyectos',
      about: 'sobre mí',
      contact: 'contacto',
      label: 'Navegación',
    },
    brand: {
      prefix: 'Hecho por',
      name: 'Vincent',
      lastName: 'Conace'
    },
    header: {
      tagline1: 'Especialista en',
      tagline2: 'diseño web, desarrollo de software y automatizaciones con IA',
      location: 'Ubicado en\nMar del Plata',
    },
    description: {
      phrase:
        'Especialista en diseño web, desarrollo de software y creación de automatizaciones con IA. Ayudo a negocios y emprendedores a hacer realidad sus ideas y resolver los problemas reales de su empresa.',
      sub: 'Desde Mar del Plata, Argentina, construyo páginas web, sistemas a medida y flujos automatizados con IA que generan resultados.',
      cta: 'Sobre mí',
    },
    thumbnail: {
      title: 'Trabajos recientes',
      view: 'Ver',
      more: 'Más trabajos',
      comingSoon: 'Próximamente',
    },
    contact: {
      lets: 'Trabajemos',
      together: 'juntos',
      cta: 'Contáctame',
      version: 'Versión',
      edition: '2026 © Edición',
      localTime: 'Hora local',
      socials: 'Redes',
    },
    notFound: 'No encontrado',
    inProgress: {
      about: 'Página Sobre mí',
      work: 'Página Proyectos',
      contact: 'Página Contacto',
    },
    aboutPage: {
      intro: {
        heading: 'Siempre explorando, siempre construyendo.',
        paragraph:
          'Soy Vincent Conace, emprendedor y desarrollador desde Mar del Plata, Argentina. Ayudo a negocios y emprendedores a convertir sus ideas en productos reales: páginas web, sistemas a medida y automatizaciones con IA. Mi misión es que la tecnología sea un motor de crecimiento real para tu negocio, no solo una promesa.',
      },
      services: {
        title: 'Lo que hago',
        items: [
          {
            number: '01',
            title: 'Diseño Web',
            description:
              'Páginas web y landings que no solo se ven bien, también convierten. Foco en performance, claridad del mensaje y experiencia de usuario.',
          },
          {
            number: '02',
            title: 'Desarrollo de Software',
            description:
              'Sistemas a medida que resuelven los procesos reales de tu negocio. Desde dashboards internos hasta plataformas completas integradas con tus herramientas.',
          },
          {
            number: '03',
            title: 'Automatizaciones con IA',
            description:
              'Automatizo tareas repetitivas con flujos inteligentes potenciados por IA, para que tu equipo recupere tiempo y se concentre en lo que mueve la aguja.',
          },
        ],
      },
      credentials: {
        heading: 'En camino de fundar mi propia agencia.',
        paragraph:
          'Trabajo de cerca con emprendedores y negocios que quieren llevar sus ideas al siguiente nivel. Mi enfoque combina diseño, código real y procesos automatizados, sin atajos. Cada proyecto es una oportunidad para hacer algo mejor que lo último que entregué.',
      },
      cta: {
        heading: '¿Empezamos algo juntos?',
        emailLabel: 'Email',
        whatsappLabel: 'WhatsApp',
        locationLabel: 'Mar del Plata, Argentina',
      },
    },
    workPage: {
      title: 'Mis proyectos',
      intro:
        'Una selección de los proyectos en los que estoy trabajando. Soluciones reales para negocios reales.',
    },
    projectDetail: {
      year: 'Año',
      type: 'Tipo',
      stack: 'Stack',
      about: 'Sobre el proyecto',
      viewSiteFallback: 'Próximamente',
      backToWork: 'Volver a proyectos',
    },
    projects: {
      stockguardian: {
        title: 'StockGuardian',
        type: 'SaaS · Retail',
        shortDescription:
          'Plataforma todo-en-uno para gestionar stock, ventas y punto de venta. Pensada para retail en Latinoamérica.',
        longDescription:
          'StockGuardian es una plataforma SaaS todo-en-uno para gestionar stock, ventas, punto de venta (POS) y reportes de negocios retail en Latinoamérica. Está pensada para indumentaria, tecnología, distribuidoras y kioscos, e integra control de inventario, módulos de venta, automatizaciones con IA y dashboards de análisis. El frontend está construido en React; el backend en Golang corriendo sobre Kubernetes en DigitalOcean; y la capa de IA usa OpenAI y Gemini para procesar lenguaje natural y generar insights operativos. Cuenta con prueba gratis de 14 días, sin tarjeta de crédito.',
        viewSite: 'Ver sitio',
      },
      'gas-guardian': {
        title: 'Gas Guardian',
        type: 'SaaS · Distribución',
        shortDescription:
          'Plataforma SaaS para gestionar el stock de bodegas y distribuidoras que venden garrafas de gas.',
        longDescription:
          'Gas Guardian es una plataforma SaaS pensada para bodegas y distribuidoras que comercializan garrafas de gas envasado. Centraliza el inventario en circulación (garrafas llenas, vacías y en reparto), gestiona pedidos y rutas de entrega, controla el flujo entre depósito y vehículos, y emite reportes operativos para entender rotación y puntos de venta. Construida con un frontend en React, backend en Golang corriendo sobre Kubernetes en DigitalOcean y PostgreSQL como base de datos.',
        viewSite: 'Ver sitio',
      },
      'yesica-gutierrez': {
        title: 'Yesica Gutierrez',
        type: 'Landing · Marketing',
        shortDescription:
          'Landing page con sistema de planes, FAQ y captación de leads para una Community Manager y creadora UGC.',
        longDescription:
          'Landing page diseñada y desarrollada para Yesica Gutierrez, Community Manager y creadora de contenido UGC enfocada en marcas que quieren posicionar su voz en redes. La página incluye secciones de servicios (gestión de redes y producción de videos UGC), planes con precios, un proceso de trabajo en 3 pasos, sección "sobre mí", FAQ y un módulo de contacto. Construida con Next.js y Tailwind CSS, con foco en performance, SEO y conversión.',
        viewSite: 'Ver sitio',
      },
    },
    contactPage: {
      title1: 'Empecemos un',
      title2: 'proyecto juntos',
      send: 'Enviar',
      sideContact: 'Contacto',
      sideBusiness: 'Ubicación',
      location: 'Mar del Plata, Argentina',
      sideSocials: 'Redes',
      whatsappLabel: 'WhatsApp',
      fields: {
        name: { label: '¿Cómo te llamás?', placeholder: 'Juan Pérez' },
        email: { label: '¿Cuál es tu email?', placeholder: 'juan@email.com' },
        organization: {
          label: '¿Cuál es el nombre de tu negocio?',
          placeholder: 'Mi Empresa ®',
        },
        services: {
          label: '¿Qué servicio te interesa?',
          placeholder: 'Página web, landing, sistema, automatización con IA…',
        },
        message: {
          label: 'Tu mensaje',
          placeholder: 'Hola Vincent, necesito ayuda con…',
        },
      },
      errors: {
        name: 'Por favor ingresá un nombre válido',
        email: 'Por favor ingresá un email válido',
        message: 'Por favor escribí un mensaje (entre 3 y 3000 caracteres)',
      },
      whatsapp: {
        greeting: '¡Hola Vincent! 👋',
        nameLabel: 'Nombre',
        emailLabel: 'Email',
        organizationLabel: 'Negocio',
        servicesLabel: 'Servicio que me interesa',
        messageLabel: 'Mensaje',
      },
    },
    toggle: {
      lang: 'EN',
      a11y: 'Cambiar idioma a Inglés',
    },
  },
  en: {
    nav: {
      home: 'home',
      work: 'work',
      about: 'about',
      contact: 'contact',
      label: 'Navigation',
    },
    brand: {
      prefix: 'Code by',
      name: 'Vincent',
      lastName: 'Conace',
    },
    header: {
      tagline1: 'Specialized in',
      tagline2: 'web design, software development and AI automations',
      location: 'Located in\nMar del Plata',
    },
    description: {
      phrase:
        'Specialized in web design, software development and AI automations. I help businesses and entrepreneurs turn their ideas into reality and solve real business problems.',
      sub: 'Based in Mar del Plata, Argentina, I build websites, custom systems and AI-powered automations that drive real results.',
      cta: 'About me',
    },
    thumbnail: {
      title: 'Recent work',
      view: 'View',
      more: 'More work',
      comingSoon: 'Coming soon',
    },
    contact: {
      lets: 'Let’s work',
      together: 'together',
      cta: 'Get in touch',
      version: 'Version',
      edition: '2026 © Edition',
      localTime: 'Local time',
      socials: 'Socials',
    },
    notFound: 'Not Found',
    inProgress: {
      about: 'About Page',
      work: 'Work Page',
      contact: 'Contact Page',
    },
    aboutPage: {
      intro: {
        heading: 'Always exploring, always building.',
        paragraph:
          'I’m Vincent Conace, an entrepreneur and developer based in Mar del Plata, Argentina. I help businesses and entrepreneurs turn their ideas into real products: websites, custom software systems and AI automations. My mission is to make technology a real driver of growth for your business — not just a promise.',
      },
      services: {
        title: 'What I do',
        items: [
          {
            number: '01',
            title: 'Web Design',
            description:
              'Websites and landing pages that don’t just look good — they convert. Focus on performance, message clarity and user experience.',
          },
          {
            number: '02',
            title: 'Software Development',
            description:
              'Custom systems that solve the real processes of your business. From internal dashboards to full platforms integrated with your tools.',
          },
          {
            number: '03',
            title: 'AI Automations',
            description:
              'I automate repetitive tasks with intelligent flows powered by AI, so your team gets time back and focuses on what really moves the needle.',
          },
        ],
      },
      credentials: {
        heading: 'On the way to founding my own agency.',
        paragraph:
          'I work closely with entrepreneurs and businesses who want to take their ideas to the next level. My approach blends design, real code and automated processes — no shortcuts. Every project is a chance to ship something better than the last one.',
      },
      cta: {
        heading: 'Shall we start something together?',
        emailLabel: 'Email',
        whatsappLabel: 'WhatsApp',
        locationLabel: 'Mar del Plata, Argentina',
      },
    },
    workPage: {
      title: 'My projects',
      intro:
        'A selection of projects I’m working on. Real solutions for real businesses.',
    },
    projectDetail: {
      year: 'Year',
      type: 'Type',
      stack: 'Stack',
      about: 'About the project',
      viewSiteFallback: 'Coming soon',
      backToWork: 'Back to projects',
    },
    projects: {
      stockguardian: {
        title: 'StockGuardian',
        type: 'SaaS · Retail',
        shortDescription:
          'All-in-one platform for managing stock, sales and point of sale. Built for retail businesses across Latin America.',
        longDescription:
          'StockGuardian is an all-in-one SaaS platform for managing stock, sales, point of sale (POS), and reports for retail businesses across Latin America. Built for clothing stores, electronics, distributors, and small shops, it combines inventory control, sales modules, AI-powered automations, and analytics dashboards. The frontend runs on React; the Golang backend ships on Kubernetes deployed on DigitalOcean; and the AI layer uses OpenAI and Gemini to process natural language and surface operational insights. Comes with a 14-day free trial — no credit card required.',
        viewSite: 'View live site',
      },
      'gas-guardian': {
        title: 'Gas Guardian',
        type: 'SaaS · Distribution',
        shortDescription:
          'SaaS platform to manage inventory for warehouses and distributors that sell gas cylinders.',
        longDescription:
          'Gas Guardian is a SaaS platform built for warehouses and distributors that sell bottled gas cylinders. It centralizes inventory in circulation (full, empty, and out-for-delivery cylinders), manages orders and delivery routes, tracks the flow between depot and trucks, and produces operational reports to understand rotation and points of sale. Built with a React frontend, a Golang backend running on Kubernetes on DigitalOcean, and PostgreSQL as the database.',
        viewSite: 'View live site',
      },
      'yesica-gutierrez': {
        title: 'Yesica Gutierrez',
        type: 'Landing · Marketing',
        shortDescription:
          'Landing page with pricing plans, FAQ, and lead capture for a Community Manager and UGC creator.',
        longDescription:
          'Landing page designed and built for Yesica Gutierrez, a Community Manager and UGC content creator focused on brands that want to position their voice on social media. The page includes service sections (social media management and UGC video production), pricing plans, a 3-step working process, "about me" section, FAQ, and a contact module. Built with Next.js and Tailwind CSS, with a focus on performance, SEO, and conversion.',
        viewSite: 'View live site',
      },
    },
    contactPage: {
      title1: 'Let’s start a',
      title2: 'project together',
      send: 'Send it!',
      sideContact: 'Contact',
      sideBusiness: 'Location',
      location: 'Mar del Plata, Argentina',
      sideSocials: 'Socials',
      whatsappLabel: 'WhatsApp',
      fields: {
        name: { label: 'What’s your name?', placeholder: 'John Doe' },
        email: { label: 'What’s your email?', placeholder: 'john@doe.com' },
        organization: {
          label: 'What’s the name of your business?',
          placeholder: 'My Company ®',
        },
        services: {
          label: 'What service are you looking for?',
          placeholder: 'Website, landing, custom system, AI automation…',
        },
        message: {
          label: 'Your message',
          placeholder: 'Hi Vincent, I need help with…',
        },
      },
      errors: {
        name: 'Please enter a valid name',
        email: 'Please enter a valid email',
        message: 'Please enter a message (3 to 3000 characters)',
      },
      whatsapp: {
        greeting: 'Hi Vincent! 👋',
        nameLabel: 'Name',
        emailLabel: 'Email',
        organizationLabel: 'Business',
        servicesLabel: 'Service I’m interested in',
        messageLabel: 'Message',
      },
    },
    toggle: {
      lang: 'ES',
      a11y: 'Switch language to Spanish',
    },
  },
};
