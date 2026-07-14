export const translations = {
  es: {
    nav: {
      home: 'inicio',
      work: 'proyectos',
      nucleo: 'núcleo',
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
    links: {
      bio: 'Diseñador · Web · Software · Automatización',
      location: 'Mar del Plata, Argentina',
      madeBy: 'Hecho por Vincent Conace',
      comingSoon: 'Próximamente',
      soon: 'Pronto',
      items: {
        cliente: { title: 'Trabajá conmigo', subtitle: 'Portal + onboarding' },
        comunidad: { title: 'Núcleo de la IA', subtitle: 'Mi comunidad' },
        web: { title: 'Mi web', subtitle: 'Portfolio y servicios' },
        stockguardian: { title: 'StockGuardian', subtitle: 'Mi producto' },
      },
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
    nucleo: {
      home: {
        title1: 'El núcleo de la',
        titleAccent: 'IA en español',
        subtitle:
          'Guías, plugins, prompts y templates curados para construir con inteligencia artificial. En tu idioma, con contexto real.',
        ctaExplore: 'Explorar la bóveda',
        ctaWhat: '¿Qué es esto?',
        statResources: 'Recursos',
        statCategories: 'Categorías',
        statSpanish: 'Español',
        statFree: 'Gratis',
        statAlways: 'Siempre',
        featuredEyebrow: 'Destacados',
        featuredTitle: 'Los más importantes ahora',
        featuredDesc:
          'Recursos seleccionados por el equipo de Núcleo IA que no te puedes perder.',
        viewAll: 'Ver todos los recursos',
        catsEyebrow: 'Categorías',
        catsTitle: 'Organizado por tipo',
        catsDesc: 'Encuentra lo que necesitas por tipo de recurso.',
        catsCount: 'recursos',
        aboutEyebrow: 'Sobre Núcleo IA',
        aboutTitle: 'La base de operaciones para builders de IA',
        aboutP1:
          'Núcleo IA es una bóveda de conocimiento abierta, construida por y para la comunidad hispanohablante que trabaja con inteligencia artificial.',
        aboutP2:
          'Cada recurso está curado, probado y escrito en español — sin traducciones automáticas, con contexto real de uso en LATAM y España.',
        aboutCta: 'Empezar a explorar',
        featCuratedTitle: 'Curado, no generado',
        featCuratedDesc:
          'Cada recurso pasa por un proceso de revisión. Nada de contenido de relleno.',
        featContextTitle: 'Contexto latinoamericano',
        featContextDesc:
          'Ejemplos con Mercado Pago, pasarelas locales, herramientas populares en LATAM.',
        featUpdatedTitle: 'Siempre actualizado',
        featUpdatedDesc:
          'El mundo de la IA cambia rápido. Los recursos se actualizan con cada versión relevante.',
        featFreeTitle: 'Completamente gratis',
        featFreeDesc:
          'Sin paywalls, sin registro. El conocimiento sobre IA debe ser accesible para todos.',
        levelsEyebrow: 'Próximamente · Sistema de niveles',
        levelsTitle: 'Subí de nivel construyendo con la comunidad',
        levelsDesc:
          'Cada contribución, recurso compartido y guía publicada te acerca al siguiente tier. Los niveles son visibles en tu perfil y desbloquean acceso anticipado a recursos.',
        ctaBannerTitle: 'Empieza a construir con IA hoy',
        ctaBannerDesc:
          'Explora la bóveda completa de recursos, guías y herramientas. Sin cuenta, sin tarjeta, sin límites.',
        ctaBannerBtn: 'Entrar a la bóveda',
      },
      boveda: {
        eyebrow: 'Bóveda de recursos',
        title: 'Todo el conocimiento de IA',
        desc: 'Guías, plugins, templates, prompts y skills — curados en español para builders de IA.',
        featuredEyebrow: 'Bóveda · Destacados',
        featuredTitle: 'Recursos destacados',
        featuredDesc: 'Lo mejor de la bóveda — seleccionado por la comunidad.',
        search: 'Buscar recursos, herramientas…',
        featured: 'Destacados',
        clear: 'Limpiar',
        showing: 'Mostrando',
        of: 'de',
        resources: 'recursos',
        filtersActive: '(filtros activos)',
        loadMore: 'Cargar más',
        emptyTitle: 'Nada en la órbita',
        emptyDesc:
          'No encontramos recursos con esos filtros. Probá con otros términos o quitá algunos filtros.',
        loading: 'Cargando la bóveda…',
        optAll: 'Todo',
        optAllDiff: 'Todos',
      },
      recurso: {
        home: 'Inicio',
        boveda: 'Bóveda',
        related: 'Recursos relacionados',
        relatedDesc: 'Continúa tu aprendizaje con estos recursos',
        download: 'Descargar',
        reading: 'de lectura',
        copy: 'Copiar',
        copied: 'Copiado',
        view: 'Ver recurso',
      },
      cat: {
        guías: 'Guías',
        skills: 'Skills',
        plugins: 'Plugins',
        templates: 'Templates',
        prompts: 'Prompts',
        agentes: 'Agentes',
        mcp: 'MCPs',
      },
      catSingular: {
        guías: 'Guía',
        skills: 'Skill',
        plugins: 'Plugin',
        templates: 'Template',
        prompts: 'Prompt',
        agentes: 'Agente',
        mcp: 'MCP',
      },
      catMeta: {
        guíasTitle: 'Guías paso a paso',
        guíasDesc:
          'Tutoriales en español para llevarte de cero a producción con las últimas herramientas de IA.',
        skillsTitle: 'Skills para Claude',
        skillsDesc:
          'Capacidades reutilizables que extienden a Claude con conocimiento, instrucciones y archivos.',
        pluginsTitle: 'Plugins',
        pluginsDesc: 'Integraciones y extensiones listas para acoplar a tu flujo con IA.',
        templatesTitle: 'Templates',
        templatesDesc: 'Plantillas listas para clonar y adaptar a tu próximo proyecto.',
        promptsTitle: 'Prompts curados',
        promptsDesc:
          'Prompts probados para tareas concretas: redacción, análisis, diseño, código y más.',
        agentesTitle: 'Agentes especializados',
        agentesDesc:
          'Sub-agentes con rol, herramientas y contexto definidos para tareas específicas.',
        mcpTitle: 'Servidores MCP',
        mcpDesc:
          'Servidores Model Context Protocol para conectar Claude a servicios externos.',
      },
      difficulty: {
        'fácil': 'Fácil',
        intermedio: 'Intermedio',
        avanzado: 'Avanzado',
      },
      badge: {
        nuevo: 'nuevo',
        actualizado: 'actualizado',
        popular: 'popular',
        destacado: 'Destacado',
      },
      footer: {
        tagline:
          'La bóveda de conocimiento de IA más completa en español. Guías, plugins, prompts y templates para construir con inteligencia artificial.',
        madeWith: 'Hecho por Vincent con IA 🤖',
        explore: 'Explorar',
        rights: 'Núcleo IA. Contenido bajo licencia MIT.',
      },
      widgets: {
        onThisPage: 'En esta página',
        toc: 'Tabla de contenidos',
        prereqTitle: 'Requisitos previos',
        prereqCompleted: 'completados',
        prereqReady: '¡Listo! Puedes continuar con la instalación.',
        psTitle: 'Elige tu proveedor de pagos',
        psReady: 'Recomendación lista',
        psAnswered: 'respondidas',
        psRecommend: 'Recomendamos para tu caso',
        psCommand: 'Comando a usar',
        psReset: 'Volver a empezar',
        copy: 'Copiar prompt',
        copied: '¡Copiado!',
        promptLabel: 'Prompt',
        npwTitle: '¿Qué proyecto te conviene armar?',
        npwStep1: 'Paso 1 de 2',
        npwStep2: 'Paso 2 de 2',
        npwQ1: '¿Qué es lo más importante para vos ahora?',
        npwQ2: '¿Tu servicio funciona con turnos o citas?',
        npwYes: 'Sí, doy turnos / citas',
        npwNo: 'No, contacto directo',
        npwRecommend: 'Te recomendamos',
        npwForWho: 'Para quién',
        npwMainBtn: 'Botón principal',
        npwIntegration: 'Integración',
        npwPromptReady: 'Prompt listo para pegarle a Núcleo Web',
        npwTypes: 'Tipos de proyecto',
        plpAria: 'Prompts de planificación',
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
      nucleo: 'núcleo',
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
    links: {
      bio: 'Design · Web · Software · Automation',
      location: 'Mar del Plata, Argentina',
      madeBy: 'Made by Vincent Conace',
      comingSoon: 'Coming soon',
      soon: 'Soon',
      items: {
        cliente: { title: 'Work with me', subtitle: 'Portal + onboarding' },
        comunidad: { title: 'Núcleo de la IA', subtitle: 'My community' },
        web: { title: 'My website', subtitle: 'Portfolio & services' },
        stockguardian: { title: 'StockGuardian', subtitle: 'My product' },
      },
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
    nucleo: {
      home: {
        title1: 'The core of',
        titleAccent: 'AI in Spanish',
        subtitle:
          'Curated guides, plugins, prompts and templates to build with artificial intelligence. In your language, with real context.',
        ctaExplore: 'Explore the vault',
        ctaWhat: 'What is this?',
        statResources: 'Resources',
        statCategories: 'Categories',
        statSpanish: 'Spanish',
        statFree: 'Free',
        statAlways: 'Always',
        featuredEyebrow: 'Featured',
        featuredTitle: 'The most important right now',
        featuredDesc:
          "Resources hand-picked by the Núcleo IA team that you can't miss.",
        viewAll: 'View all resources',
        catsEyebrow: 'Categories',
        catsTitle: 'Organized by type',
        catsDesc: 'Find what you need by resource type.',
        catsCount: 'resources',
        aboutEyebrow: 'About Núcleo IA',
        aboutTitle: 'The home base for AI builders',
        aboutP1:
          'Núcleo IA is an open knowledge vault, built by and for the Spanish-speaking community that works with artificial intelligence.',
        aboutP2:
          'Every resource is curated, tested and written in Spanish — no machine translations, with real usage context from LATAM and Spain.',
        aboutCta: 'Start exploring',
        featCuratedTitle: 'Curated, not generated',
        featCuratedDesc:
          'Every resource goes through a review process. No filler content.',
        featContextTitle: 'Latin American context',
        featContextDesc:
          'Examples with Mercado Pago, local payment gateways, tools popular across LATAM.',
        featUpdatedTitle: 'Always up to date',
        featUpdatedDesc:
          'The AI world moves fast. Resources are updated with every relevant release.',
        featFreeTitle: 'Completely free',
        featFreeDesc:
          'No paywalls, no sign-up. Knowledge about AI should be accessible to everyone.',
        levelsEyebrow: 'Coming soon · Levels system',
        levelsTitle: 'Level up by building with the community',
        levelsDesc:
          'Every contribution, shared resource and published guide moves you toward the next tier. Levels are visible on your profile and unlock early access to resources.',
        ctaBannerTitle: 'Start building with AI today',
        ctaBannerDesc:
          'Explore the full vault of resources, guides and tools. No account, no card, no limits.',
        ctaBannerBtn: 'Enter the vault',
      },
      boveda: {
        eyebrow: 'Resource vault',
        title: 'All the AI knowledge',
        desc: 'Guides, plugins, templates, prompts and skills — curated in Spanish for AI builders.',
        featuredEyebrow: 'Vault · Featured',
        featuredTitle: 'Featured resources',
        featuredDesc: 'The best of the vault — selected by the community.',
        search: 'Search resources, tools…',
        featured: 'Featured',
        clear: 'Clear',
        showing: 'Showing',
        of: 'of',
        resources: 'resources',
        filtersActive: '(active filters)',
        loadMore: 'Load more',
        emptyTitle: 'Nothing in orbit',
        emptyDesc:
          'We found no resources with those filters. Try other terms or remove some filters.',
        loading: 'Loading the vault…',
        optAll: 'All',
        optAllDiff: 'All',
      },
      recurso: {
        home: 'Home',
        boveda: 'Vault',
        related: 'Related resources',
        relatedDesc: 'Keep learning with these resources',
        download: 'Download',
        reading: 'read',
        copy: 'Copy',
        copied: 'Copied',
        view: 'View resource',
      },
      cat: {
        guías: 'Guides',
        skills: 'Skills',
        plugins: 'Plugins',
        templates: 'Templates',
        prompts: 'Prompts',
        agentes: 'Agents',
        mcp: 'MCPs',
      },
      catSingular: {
        guías: 'Guide',
        skills: 'Skill',
        plugins: 'Plugin',
        templates: 'Template',
        prompts: 'Prompt',
        agentes: 'Agent',
        mcp: 'MCP',
      },
      catMeta: {
        guíasTitle: 'Step-by-step guides',
        guíasDesc:
          'Spanish tutorials to take you from zero to production with the latest AI tools.',
        skillsTitle: 'Skills for Claude',
        skillsDesc:
          'Reusable capabilities that extend Claude with knowledge, instructions and files.',
        pluginsTitle: 'Plugins',
        pluginsDesc: 'Integrations and extensions ready to plug into your AI workflow.',
        templatesTitle: 'Templates',
        templatesDesc: 'Templates ready to clone and adapt to your next project.',
        promptsTitle: 'Curated prompts',
        promptsDesc:
          'Battle-tested prompts for specific tasks: writing, analysis, design, code and more.',
        agentesTitle: 'Specialized agents',
        agentesDesc:
          'Sub-agents with defined role, tools and context for specific tasks.',
        mcpTitle: 'MCP servers',
        mcpDesc: 'Model Context Protocol servers to connect Claude to external services.',
      },
      difficulty: {
        'fácil': 'Easy',
        intermedio: 'Intermediate',
        avanzado: 'Advanced',
      },
      badge: {
        nuevo: 'new',
        actualizado: 'updated',
        popular: 'popular',
        destacado: 'Featured',
      },
      footer: {
        tagline:
          'The most complete AI knowledge vault in Spanish. Guides, plugins, prompts and templates to build with artificial intelligence.',
        madeWith: 'Made by Vincent with AI 🤖',
        explore: 'Explore',
        rights: 'Núcleo IA. Content under MIT license.',
      },
      widgets: {
        onThisPage: 'On this page',
        toc: 'Table of contents',
        prereqTitle: 'Prerequisites',
        prereqCompleted: 'completed',
        prereqReady: "You're all set! You can continue with the installation.",
        psTitle: 'Pick your payment provider',
        psReady: 'Recommendation ready',
        psAnswered: 'answered',
        psRecommend: 'We recommend for your case',
        psCommand: 'Command to use',
        psReset: 'Start over',
        copy: 'Copy prompt',
        copied: 'Copied!',
        promptLabel: 'Prompt',
        npwTitle: 'Which project should you build?',
        npwStep1: 'Step 1 of 2',
        npwStep2: 'Step 2 of 2',
        npwQ1: 'What matters most to you right now?',
        npwQ2: 'Does your service work with appointments or bookings?',
        npwYes: 'Yes, I offer appointments / bookings',
        npwNo: 'No, direct contact',
        npwRecommend: 'We recommend',
        npwForWho: "Who it's for",
        npwMainBtn: 'Main button',
        npwIntegration: 'Integration',
        npwPromptReady: 'Prompt ready to paste into Núcleo Web',
        npwTypes: 'Project types',
        plpAria: 'Planning prompts',
      },
    },
    toggle: {
      lang: 'ES',
      a11y: 'Switch language to Spanish',
    },
  },
};
