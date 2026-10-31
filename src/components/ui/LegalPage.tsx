'use client';

import Link from 'next/link';
import PageShell from './PageShell';
import { Reveal } from './Reveal';
import { useThemeLanguage, type LanguageCode } from '../../theme/ThemeContext';

export type LegalDoc = 'privacy' | 'terms';

type Section = { n: string; title: string; body: string; bullets?: string[] };

type LegalCopy = {
  folio: string;
  titleA: string;
  titleB: string;
  lede: string;
  intro: string[];
  sections: Section[];
  note: string;
  other: string;
};

const copy: Record<LegalDoc, Record<LanguageCode, LegalCopy>> = {
  privacy: {
    es: {
      folio: 'Legal — 01',
      titleA: 'Política',
      titleB: 'de privacidad',
      lede: 'Cómo protegemos tus datos en Rundi. Leélo con calma antes de continuar utilizando la plataforma.',
      intro: [
        'Rundi recopila únicamente la información necesaria para operar el servicio de transporte: datos de contacto, ubicaciones aproximadas para calcular rutas y registros de viajes. Nunca vendemos tu información personal a terceros.',
        'Utilizamos proveedores de infraestructura y pagos que cumplen estándares de seguridad, y solo compartimos datos cuando es indispensable para procesar tus viajes, cumplimiento legal o prevención de fraude.',
      ],
      sections: [
        {
          n: '01', title: 'Datos que recopilamos',
          body: 'Solo lo indispensable para operar el servicio:',
          bullets: [
            'Información de registro (nombre, teléfono, correo electrónico).',
            'Información de viaje (puntos de origen y destino, horarios aproximados).',
            'Datos técnicos del dispositivo (modelo, sistema operativo, identificadores de app) para mejorar la experiencia y la seguridad.',
          ],
        },
        {
          n: '02', title: 'Uso de la información',
          body: 'La información se utiliza para mostrarte opciones de viaje, conectar pasajeros con conductores, calcular tarifas, procesar pagos y mejorar la calidad del servicio. También podemos enviarte avisos sobre cambios en la app o comunicaciones relevantes para tu seguridad.',
        },
        {
          n: '03', title: 'Tus derechos',
          body: 'Podés solicitar acceso, actualización o eliminación de tus datos personales en cualquier momento, sujeto a los requisitos legales de conservación de información. También podés desactivar ciertas comunicaciones promocionales desde la configuración de la app.',
        },
      ],
      note: 'Este documento es un resumen. La versión completa rige dentro de la app Rundi.',
      other: 'Términos de uso',
    },
    en: {
      folio: 'Legal — 01',
      titleA: 'Privacy ',
      titleB: 'policy',
      lede: 'How we protect your data at Rundi. Please read it carefully before continuing to use the platform.',
      intro: [
        'Rundi collects only the information needed to operate the transportation service: contact details, approximate locations to calculate routes and trip records. We never sell your personal information to third parties.',
        'We use infrastructure and payment providers that follow security standards, and we only share data when it is strictly necessary to process your trips, comply with the law or prevent fraud.',
      ],
      sections: [
        {
          n: '01', title: 'Data we collect',
          body: 'Only what is strictly necessary to operate the service:',
          bullets: [
            'Registration information (name, phone number, email).',
            'Trip information (pickup and dropoff points, approximate times).',
            'Device technical data (model, OS, app identifiers) to improve experience and security.',
          ],
        },
        {
          n: '02', title: 'How we use your information',
          body: 'We use this information to show trip options, connect riders and drivers, calculate fares, process payments and improve service quality. We may also send notices about app changes or important safety communications.',
        },
        {
          n: '03', title: 'Your rights',
          body: 'You can request access, update or deletion of your personal data at any time, subject to legal retention requirements. You can also disable some promotional notifications in the app settings.',
        },
      ],
      note: 'This document is a summary. The full version applies inside the Rundi app.',
      other: 'Terms of use',
    },
    zh: {
      folio: '法律 — 01',
      titleA: '隐私',
      titleB: '政策',
      lede: '本节说明我们如何保护你的数据。请在继续使用平台之前仔细阅读。',
      intro: [
        'Rundi 只收集提供出行服务所需的信息：联系方式、用于计算路线的大致位置以及行程记录。我们不会将你的个人信息出售给第三方。',
        '我们使用符合安全标准的基础设施和支付服务提供商，只在处理行程、符合法律要求或防止欺诈时，才会共享必要的数据。',
      ],
      sections: [
        {
          n: '01', title: '我们收集的数据',
          body: '仅为运营服务所必需的信息：',
          bullets: [
            '注册信息（姓名、电话号码、电子邮箱）。',
            '行程信息（出发点、目的地及大致时间）。',
            '设备技术信息（型号、操作系统、应用标识符），用于提升体验和安全性。',
          ],
        },
        {
          n: '02', title: '我们如何使用这些信息',
          body: '这些信息用于为你展示行程选项、连接乘客与司机、计算费用、处理支付并提升服务质量。我们也可能向你发送与安全或重要更新相关的通知。',
        },
        {
          n: '03', title: '你的权利',
          body: '在符合法律规定的前提下，你可以随时申请访问、更新或删除你的个人数据。你也可以在应用设置中关闭部分营销通知。',
        },
      ],
      note: '本文档为摘要版本，完整版本以 Rundi 应用内为准。',
      other: '使用条款',
    },
  },
  terms: {
    es: {
      folio: 'Legal — 02',
      titleA: 'Términos ',
      titleB: 'de uso',
      lede: 'Las reglas básicas para usar Rundi. Al usar la plataforma aceptás estas condiciones.',
      intro: [
        'Al usar Rundi aceptás estas condiciones de uso. La plataforma conecta usuarios con conductores independientes y se reserva el derecho de actualizar los presentes términos cuando sea necesario.',
      ],
      sections: [
        {
          n: '01', title: 'Uso de la plataforma',
          body: 'Debés proporcionar información real y mantener la seguridad de tu cuenta. No se permite utilizar la app para fines ilícitos, peligrosos o que pongan en riesgo a otros usuarios o conductores.',
        },
        {
          n: '02', title: 'Conductores y usuarios',
          body: 'Conductores y usuarios se comprometen a respetar las normas de tránsito y comportamiento. Rundi puede suspender cuentas ante reportes reiterados de comportamiento inapropiado o incumplimiento de estos términos.',
        },
        {
          n: '03', title: 'Pagos y tarifas',
          body: 'Las tarifas, comisiones y métodos de pago se mostrarán siempre antes de confirmar un viaje. Rundi se reserva el derecho de actualizar las tarifas y comunicar los cambios por los canales oficiales.',
        },
        {
          n: '04', title: 'Limitación de responsabilidad',
          body: 'La plataforma se ofrece tal cual, sin garantías implícitas. Rundi no será responsable por daños indirectos o consecuentes derivados del uso del servicio, salvo en los casos en que la ley aplicable lo exija.',
        },
      ],
      note: 'Este documento es un resumen. La versión completa rige dentro de la app Rundi.',
      other: 'Política de privacidad',
    },
    en: {
      folio: 'Legal — 02',
      titleA: 'Terms of ',
      titleB: 'use',
      lede: 'The basic rules for using Rundi. By using the platform you accept these terms.',
      intro: [
        'By using Rundi you accept these terms of use. The platform connects riders with independent drivers and may update these terms whenever necessary.',
      ],
      sections: [
        {
          n: '01', title: 'Use of the platform',
          body: 'You must provide accurate information and keep your account secure. You may not use the app for illegal, dangerous or harmful activities.',
        },
        {
          n: '02', title: 'Drivers and users',
          body: 'Drivers and users agree to follow traffic rules and respectful behavior. Rundi may suspend accounts after repeated reports of inappropriate conduct or breaches of these terms.',
        },
        {
          n: '03', title: 'Payments and fares',
          body: 'Fares, commissions and payment methods will always be shown before you confirm a trip. Rundi may update fares and will communicate changes through official channels.',
        },
        {
          n: '04', title: 'Limitation of liability',
          body: 'The platform is provided as-is, without implied warranties. Rundi will not be liable for indirect or consequential damages arising from the use of the service, except where required by applicable law.',
        },
      ],
      note: 'This document is a summary. The full version applies inside the Rundi app.',
      other: 'Privacy policy',
    },
    zh: {
      folio: '法律 — 02',
      titleA: '使用',
      titleB: '条款',
      lede: '使用 Rundi 时需要遵守的基本规则。使用平台即表示你同意这些条款。',
      intro: [
        '使用 Rundi 即表示你同意这些使用条款。平台用于连接乘客与独立司机，并可能在必要时更新本条款。',
      ],
      sections: [
        {
          n: '01', title: '平台使用',
          body: '你需要提供真实信息并妥善保管账号安全。不得将应用用于违法、危险或可能危及他人的用途。',
        },
        {
          n: '02', title: '司机与用户',
          body: '司机和用户都应遵守交通规则并保持礼貌。若多次收到违规或不当行为的举报，Rundi 可暂停相关账号。',
        },
        {
          n: '03', title: '费用与支付',
          body: '在你确认行程之前，系统会显示费用、佣金及支付方式。Rundi 有权调整费用并通过官方渠道通知变更。',
        },
        {
          n: '04', title: '责任限制',
          body: '平台按“现状”提供，不作任何默示担保。除法律另有规定外，Rundi 不对因使用本服务而产生的间接或后果性损失承担责任。',
        },
      ],
      note: '本文档为摘要版本，完整版本以 Rundi 应用内为准。',
      other: '隐私政策',
    },
  },
};

const ui: Record<LanguageCode, { toc: string; updated: string; version: string; top: string; tabs: [string, string] }> = {
  es: { toc: 'Índice', updated: 'Última actualización', version: 'v2.1', top: '↑ Volver arriba', tabs: ['Privacidad', 'Términos'] },
  en: { toc: 'Index', updated: 'Last updated', version: 'v2.1', top: '↑ Back to top', tabs: ['Privacy', 'Terms'] },
  zh: { toc: '目录', updated: '最后更新', version: 'v2.1', top: '↑ 回到顶部', tabs: ['隐私', '条款'] },
};

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const { language } = useThemeLanguage();
  const c = copy[doc][language];
  const u = ui[language];
  const otherHref = doc === 'privacy' ? '/terminos' : '/privacidad';

  return (
    <PageShell
      folio={c.folio}
      title={
        <>
          <em className="hl">{c.titleA}</em>
          {c.titleB}
        </>
      }
      lede={c.lede}
    >
      <div className="page-tabs">
        <Link href="/privacidad" className={doc === 'privacy' ? 'on' : ''}>
          {u.tabs[0]}
        </Link>
        <Link href="/terminos" className={doc === 'terms' ? 'on' : ''}>
          {u.tabs[1]}
        </Link>
      </div>

      <div className="doc">
        <aside className="toc">
          <span className="tl-h">{u.toc}</span>
          {c.sections.map((s: Section) => (
            <a key={s.n} href={`#sec-${s.n}`}>
              <span className="n">{s.n}</span>
              {s.title}
            </a>
          ))}
          <div className="toc-foot">
            <a href="#top">{u.top}</a>
          </div>
        </aside>

        <article>
          <div className="meta-strip">
            <span className="b">RND—LEGAL</span>
            <span className="sep" />
            <span>{u.version}</span>
            <span className="sep" />
            <span>
              {u.updated} · 02/2026
            </span>
          </div>

          {c.intro.map((p: string, i: number) => (
            <Reveal key={i}>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 16, maxWidth: 640 }}>
                {p}
              </p>
            </Reveal>
          ))}

          <div style={{ marginTop: 40 }}>
            {c.sections.map((s: Section) => (
              <Reveal key={s.n}>
                <section className={`doc-sec${doc === 'terms' ? ' v' : ''}`} id={`sec-${s.n}`}>
                  <h2>
                    <span className="n">{s.n}</span>
                    {s.title}
                  </h2>
                  <p>{s.body}</p>
                  {s.bullets && (
                    <ul>
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="doc-note">
              <span className="b">Rundi</span> — {c.note}{' '}
              <Link href={otherHref}>{c.other} →</Link>
            </div>
          </Reveal>
        </article>
      </div>
    </PageShell>
  );
}
