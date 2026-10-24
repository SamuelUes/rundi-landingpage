'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Mail, MessageCircle, Phone } from 'lucide-react';
import PageShell from '../_components/PageShell';
import { Reveal } from '../_components/Reveal';
import { useThemeLanguage, type LanguageCode } from '../../theme/ThemeContext';

type ContactCopy = {
  folio: string;
  titleB: string;
  lede: string;
  rows: { label: string; sub: string; value: string; href: string; icon: 'phone' | 'wa' | 'mail'; violet: boolean }[];
  deptH: string;
  depts: { title: string; email: string; desc: string }[];
  faqH: string;
  strip: { b: string; s: string; a: string };
  whatsappMessage: string;
};

const copy: Record<LanguageCode, ContactCopy> = {
  es: {
    folio: 'Contacto',
    titleB: 'Hablemos.',
    lede: '¿Preguntas sobre Rundi, cobertura o integración? Elegí tu canal — respondemos rápido, en tu idioma.',
    rows: [
      { label: 'Llámanos', sub: 'Lun–Dom · 6am–11pm', value: '+505 1234 5678', href: 'tel:+50512345678', icon: 'phone', violet: false },
      { label: 'WhatsApp', sub: 'Respuesta inmediata', value: '+505 1234 5678', href: 'wa', icon: 'wa', violet: true },
      { label: 'Email', sub: 'Respondemos en 24h', value: 'soporte@rundiapp.com', href: 'mail', icon: 'mail', violet: false },
    ],
    deptH: 'Escritorios',
    depts: [
      { title: 'Soporte general', email: 'soporte@rundi.app', desc: 'Consultas sobre el servicio, cobertura y app móvil.' },
      { title: 'Alianzas y empresas', email: 'empresas@rundi.app', desc: 'Rundi para empresas, eventos y convenios especiales.' },
      { title: 'Conductores', email: 'conductores@rundi.app', desc: 'Si querés manejar con Rundi o tenés dudas sobre tu cuenta.' },
    ],
    faqH: 'Preguntas frecuentes',
    strip: { b: '¿Tenés una flota o un evento?', s: 'Armamos convenios a medida para empresas y venue partners.', a: 'Escribinos' },
    whatsappMessage: 'Hola, necesito ayuda con Rundi',
  },
  en: {
    folio: 'Contact',
    titleB: "Let's talk.",
    lede: 'Questions about Rundi, coverage or integrations? Pick your channel — we answer fast, in your language.',
    rows: [
      { label: 'Call us', sub: 'Mon–Sun · 6am–11pm', value: '+505 1234 5678', href: 'tel:+50512345678', icon: 'phone', violet: false },
      { label: 'WhatsApp', sub: 'Instant response', value: '+505 1234 5678', href: 'wa', icon: 'wa', violet: true },
      { label: 'Email', sub: 'We reply within 24h', value: 'soporte@rundiapp.com', href: 'mail', icon: 'mail', violet: false },
    ],
    deptH: 'Desks',
    depts: [
      { title: 'General support', email: 'soporte@rundi.app', desc: 'Questions about the service, coverage and mobile app.' },
      { title: 'Partnerships & companies', email: 'empresas@rundi.app', desc: 'Rundi for companies, events and special agreements.' },
      { title: 'Drivers', email: 'conductores@rundi.app', desc: 'If you want to drive with Rundi or have questions about your account.' },
    ],
    faqH: 'Frequently asked questions',
    strip: { b: 'Have a fleet or an event?', s: 'We build custom agreements for companies and venue partners.', a: 'Write to us' },
    whatsappMessage: 'Hi, I need help with Rundi',
  },
  zh: {
    folio: '联系',
    titleB: '联系我们。',
    lede: '对 Rundi、服务范围或合作有疑问？选择你方便的渠道 — 我们会用你的语言快速回复。',
    rows: [
      { label: '拨打电话', sub: '周一至周日 · 6am–11pm', value: '+505 1234 5678', href: 'tel:+50512345678', icon: 'phone', violet: false },
      { label: 'WhatsApp', sub: '即时回复', value: '+505 1234 5678', href: 'wa', icon: 'wa', violet: true },
      { label: '电子邮件', sub: '24 小时内回复', value: 'soporte@rundiapp.com', href: 'mail', icon: 'mail', violet: false },
    ],
    deptH: '部门',
    depts: [
      { title: '通用支持', email: 'soporte@rundi.app', desc: '关于服务、覆盖范围和移动应用的咨询。' },
      { title: '企业与合作', email: 'empresas@rundi.app', desc: '适用于企业、活动和特殊合作。' },
      { title: '司机支持', email: 'conductores@rundi.app', desc: '如果你想成为 Rundi 司机或对账号有疑问。' },
    ],
    faqH: '常见问题',
    strip: { b: '有车队或活动需求？', s: '我们为企业和场地合作伙伴定制合作方案。', a: '联系我们' },
    whatsappMessage: '你好，我需要 Rundi 的帮助',
  },
};

const faqs: Record<LanguageCode, { q: string; a: string }[]> = {
  es: [
    { q: '¿Cómo solicito un viaje?', a: 'Ingresá tu destino en la pantalla principal, confirmá la ubicación en el mapa y seleccioná "Confirmar Viaje". Un conductor cercano recibirá tu solicitud.' },
    { q: '¿Qué es conductor designado?', a: 'Un conductor designado maneja tu vehículo. Ideal si tomaste alcohol o no podés usar tu carro. El conductor llega en moto y maneja tu auto de regreso a casa.' },
    { q: '¿Cómo cancelo un viaje?', a: 'Podés cancelar desde la pantalla de confirmación antes de que el conductor llegue. Después de 5 minutos puede aplicar un cargo de cancelación.' },
    { q: '¿Cómo califico mi viaje?', a: 'Al finalizar el viaje recibirás una notificación para calificar. También podés hacerlo desde el historial de viajes.' },
    { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos tarjetas de crédito/débito y efectivo. Podés gestionar tus métodos de pago en tu perfil dentro de la app.' },
    { q: '¿Cómo me convierto en conductor?', a: 'Registrate como conductor, subí tus documentos (licencia, circulación, seguro) y esperá la aprobación. Recibirás un email cuando estés activo.' },
    { q: '¿Puedo compartir mi viaje?', a: 'Sí, durante el viaje podés compartir un enlace de tracking en tiempo real con familiares o amigos para que vean tu ubicación.' },
  ],
  en: [
    { q: 'How do I request a trip?', a: 'Enter your destination on the main screen, confirm the map location and tap "Confirm Trip". A nearby driver will receive your request.' },
    { q: 'What is a designated driver?', a: 'A designated driver drives your own vehicle. Ideal if you have been drinking or cannot drive. The driver arrives on a motorcycle and then drives your car back home.' },
    { q: 'How do I cancel a trip?', a: 'You can cancel from the confirmation screen before the driver arrives. After 5 minutes a cancellation fee may apply.' },
    { q: 'How do I rate my trip?', a: 'When the trip ends you will receive a notification to rate it. You can also rate from the trips history.' },
    { q: 'What payment methods do you accept?', a: 'We accept credit/debit cards and cash. You can manage your payment methods from your profile in the app.' },
    { q: 'How can I become a driver?', a: 'Sign up as a driver, upload your documents (license, registration, insurance) and wait for approval. You will receive an email when your account is active.' },
    { q: 'Can I share my trip?', a: 'Yes. During the trip you can share a real-time tracking link with family or friends so they can see your location.' },
  ],
  zh: [
    { q: '如何发起行程？', a: '在主界面输入目的地，确认地图上的位置，然后点击“确认行程”。附近的司机会收到你的请求。' },
    { q: '什么是指定司机？', a: '指定司机会驾驶你的车辆。适合你喝酒或其他不方便开车的情况。司机会骑摩托车到达，然后开你的车送你回家。' },
    { q: '如何取消行程？', a: '在司机到达之前，你可以在确认页面取消行程。超过 5 分钟后，可能会收取取消费用。' },
    { q: '如何给行程评分？', a: '行程结束后，你会收到评分提醒。你也可以在行程历史中为行程评分。' },
    { q: '支持哪些支付方式？', a: '目前支持信用卡 / 借记卡和现金。你可以在应用的个人资料中管理支付方式。' },
    { q: '如何成为司机？', a: '注册为司机，上传证件（驾照、行驶证、保险等），等待审核。审核通过后你会收到邮件通知。' },
    { q: '可以分享我的行程吗？', a: '可以。在行程中你可以分享一个实时追踪链接给家人或朋友，让他们看到你的实时位置。' },
  ],
};

const ICONS = { phone: Phone, wa: MessageCircle, mail: Mail };

export default function ContactPage() {
  const { language } = useThemeLanguage();
  const c = copy[language];
  const list = faqs[language];
  const [open, setOpen] = useState<number | null>(null);

  const href = (r: (typeof c.rows)[number]) =>
    r.icon === 'wa'
      ? `https://wa.me/50512345678?text=${encodeURIComponent(c.whatsappMessage)}`
      : r.icon === 'mail'
        ? `mailto:soporte@rundiapp.com?subject=${encodeURIComponent('Ayuda Rundi')}`
        : r.href;

  return (
    <PageShell
      folio={c.folio}
      title={
        <>
          <em className="hl hl-gold">{c.titleB}</em>
        </>
      }
      lede={c.lede}
    >
      <div className="c-rows">
        {c.rows.map((r, i) => {
          const Icon = ICONS[r.icon];
          return (
            <Reveal key={r.label} delay={i}>
              <a
                className={`c-row${r.violet ? ' v' : ''}`}
                href={href(r)}
                {...(/^https?:/.test(href(r))
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span className="qi">
                  <Icon />
                </span>
                <span className="cl">
                  <span className="b">{r.label}</span>
                  <i>{r.sub}</i>
                </span>
                <span className="cv">{r.value}</span>
                <span className="go">
                  <ArrowUpRight />
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="folio">
        <span className="num">02</span> {c.deptH}
      </Reveal>
      <div className="d-rows" style={{ marginTop: 28 }}>
        {c.depts.map((d, i) => (
          <Reveal key={d.email} delay={i}>
            <div className="d-row">
              <span className="dn">{String(i + 1).padStart(2, '0')}</span>
              <span className="dt">{d.title}</span>
              <p>{d.desc}</p>
              <a href={`mailto:${d.email}`}>{d.email}</a>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="folio">
        <span className="num">03</span> {c.faqH}
      </Reveal>
      <div className="faq" style={{ marginTop: 28 }}>
        {list.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`faq-item${isOpen ? ' open' : ''}`}>
              <button
                className="faq-q"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                {f.q}
                <span className="fc">
                  <ChevronDown />
                </span>
              </button>
              <div className="faq-a" style={{ maxHeight: isOpen ? 300 : 0 }}>
                <p>{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Reveal>
        <div className="cta-strip">
          <div>
            <span className="b">{c.strip.b}</span>
            <span>{c.strip.s}</span>
          </div>
          <a href="mailto:empresas@rundi.app">
            {c.strip.a} <ArrowUpRight size={15} />
          </a>
        </div>
      </Reveal>
    </PageShell>
  );
}
