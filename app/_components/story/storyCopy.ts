import type { LanguageCode } from '../../../theme/ThemeContext';

/**
 * Copy trilingüe del App Story (tour narrativo con scroll, estilo OnePlus).
 * Módulo autocontenido: también puede montarse como reemplazo de /galeria.
 */
export const storyCopy: Record<LanguageCode, any> = {
  es: {
    carousel: {
      pill: 'Rundi App',
      alts: [
        'Bienvenida — Viajá fácilmente',
        'Pedir viaje — vehículos y precios',
        'Conductor — mapa en vivo',
        'Conductor — viajes disponibles',
        'Conductor — solicitud entrante',
        'Conductor — negociar precio',
      ],
    },
    tabs: {
      kicker: 'Lado conductor',
      items: [
        {
          label: 'Disponible',
          title: 'Encendé tu modo conductor',
          desc: 'Activá tu disponibilidad cuando querás trabajar. El mapa te muestra la demanda de Managua en tiempo real.',
        },
        {
          label: 'Solicitudes',
          title: 'Los viajes llegan a vos',
          desc: 'Cada solicitud muestra origen, destino y precio sugerido. Revisá el detalle antes de decidir.',
        },
        {
          label: 'Tu precio',
          title: 'Negociá y aceptá',
          desc: 'Proponé tu tarifa o tomá una sugerida. El precio final queda fijado antes de arrancar — sin sorpresas.',
        },
      ],
    },
    feature: {
      kicker: 'Lado pasajero',
      headA: 'Pedir un Rundi',
      headB: 'toma segundos.',
      steps: [
        {
          k: '01',
          title: 'Solicitá el viaje',
          desc: 'Abrí la app y tocá «Solicitar viaje». Tu ubicación se fija con GPS — o mové el pin para salir desde otro punto.',
        },
        {
          k: '02',
          title: 'Origen, destino y paradas',
          desc: 'Buscá tu destino por nombre o fijalo en el mapa. ¿Una parada extra? Agregala con el botón +.',
        },
        {
          k: '03',
          title: 'Elegí tu servicio',
          desc: 'Moto, viaje normal o conductor designado — cada uno con precio estimado y tiempo de llegada.',
        },
        {
          k: '04',
          title: 'Confirmá o agendá',
          desc: 'Revisá ruta y precio final. Pedilo ahora con «Confirmar» o reservalo para después con «Agendar viaje».',
        },
      ],
    },
    promo: {
      title: 'Hecha para Managua, pensada para vos',
      desc: 'Una app liviana y con soporte local — diseñada alrededor de cómo se mueve la ciudad.',
      cta: 'Descargar la app',
    },
    statement: {
      big: 'Imparablemente fluida.',
      sub: 'Cada pantalla, cada mapa, cada viaje — optimizado para que nada se interponga entre vos y tu destino.',
    },
    parallax: {
      kicker: 'Conducí inteligente',
      title: 'Todo a un vistazo',
      desc: 'Ganancias del día, solicitudes entrantes y tu próxima ruta — sin perder de vista la calle.',
    },
    outro: {
      capA: 'Rundi en la calle',
      capB: 'Managua, Nicaragua',
      alt: 'Conductor Rundi junto a su vehículo en Managua',
    },
  },
  en: {
    carousel: {
      pill: 'Rundi App',
      alts: [
        'Welcome — Ride easily',
        'Book a ride — vehicles and prices',
        'Driver — live map',
        'Driver — available rides',
        'Driver — incoming request',
        'Driver — negotiate price',
      ],
    },
    tabs: {
      kicker: 'Driver side',
      items: [
        {
          label: 'Available',
          title: 'Switch on driver mode',
          desc: 'Turn on availability whenever you want to work. The map shows live demand across Managua.',
        },
        {
          label: 'Requests',
          title: 'Rides come to you',
          desc: 'Every request shows origin, destination and suggested price. Check the details before deciding.',
        },
        {
          label: 'Your price',
          title: 'Negotiate and accept',
          desc: 'Offer your own fare or take a suggested one. The final price is locked before you start — no surprises.',
        },
      ],
    },
    feature: {
      kicker: 'Rider side',
      headA: 'Booking a Rundi',
      headB: 'takes seconds.',
      steps: [
        {
          k: '01',
          title: 'Request the ride',
          desc: 'Open the app and tap "Request ride". GPS pins your pickup — or move the pin to start elsewhere.',
        },
        {
          k: '02',
          title: 'Origin, destination & stops',
          desc: 'Search your destination by name or pin it on the map. Need an extra stop? Add it with the + button.',
        },
        {
          k: '03',
          title: 'Choose your service',
          desc: 'Moto, standard ride or designated driver — each with an estimated price and arrival time.',
        },
        {
          k: '04',
          title: 'Confirm or schedule',
          desc: 'Check the route and final price. Tap "Confirm" to ride now or "Schedule" to book ahead.',
        },
      ],
    },
    promo: {
      title: 'Built for Managua, made for you',
      desc: 'A lightweight app with local support — designed around how the city actually moves.',
      cta: 'Download the app',
    },
    statement: {
      big: 'Unstoppably smooth.',
      sub: 'Every screen, every map, every ride — tuned so nothing stands between you and your destination.',
    },
    parallax: {
      kicker: 'Drive smart',
      title: 'Everything at a glance',
      desc: "Today's earnings, incoming requests and your next route — without losing sight of the street.",
    },
    outro: {
      capA: 'Rundi on the street',
      capB: 'Managua, Nicaragua',
      alt: 'Rundi driver next to his vehicle in Managua',
    },
  },
  zh: {
    carousel: {
      pill: 'Rundi 应用',
      alts: [
        '欢迎页 — 轻松出行',
        '叫车 — 车型与价格',
        '司机端 — 实时地图',
        '司机端 — 可接订单',
        '司机端 — 新订单',
        '司机端 — 议价',
      ],
    },
    tabs: {
      kicker: '司机端',
      items: [
        {
          label: '在线',
          title: '开启司机模式',
          desc: '随时开启接单状态，地图实时显示马那瓜的用车需求。',
        },
        {
          label: '订单',
          title: '订单主动找上门',
          desc: '每个订单都显示起点、终点和建议价格，先看清详情再决定。',
        },
        {
          label: '定价',
          title: '议价并接单',
          desc: '可自报价或选择建议价，出发前锁定最终价格——绝无意外。',
        },
      ],
    },
    feature: {
      kicker: '乘客端',
      headA: '叫一辆 Rundi',
      headB: '只需几秒。',
      steps: [
        {
          k: '01',
          title: '发起行程',
          desc: '打开应用并点击「叫车」，GPS 自动定位起点，也可拖动图钉选择其他出发点。',
        },
        {
          k: '02',
          title: '起点、终点与中途停靠',
          desc: '可按名称搜索目的地，或在地图上选点；需要中途停靠？点击 + 添加。',
        },
        {
          k: '03',
          title: '选择服务类型',
          desc: '摩托、标准行程或代驾司机，均显示预估价格与到达时间。',
        },
        {
          k: '04',
          title: '确认或预约',
          desc: '核对路线与最终价格，点击「确认」立即出发，或「预约行程」提前预订。',
        },
      ],
    },
    promo: {
      title: '为马那瓜打造，为您设计',
      desc: '轻量、本地支持的应用——围绕这座城市真实的出行方式而设计。',
      cta: '下载应用',
    },
    statement: {
      big: '流畅，不止于快。',
      sub: '每一屏、每张地图、每段行程——只为不让任何事挡在您与目的地之间。',
    },
    parallax: {
      kicker: '智慧驾驶',
      title: '一切尽在眼前',
      desc: '当日收入、新进订单与下一条路线——视线无需离开街道。',
    },
    outro: {
      capA: '街头 Rundi',
      capB: '尼加拉瓜 · 马那瓜',
      alt: 'Rundi 司机与车辆在马那瓜街头',
    },
  },
};
