"use client";

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import HeaderNav from './HeaderNav';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

type LegalCopy = {
  headerTitle: string;
  headerSubtitle: string;
  privacyTitle: string;
  privacyIntro1: string;
  privacyIntro2: string;
  privacyDataTitle: string;
  privacyDataParagraph: string;
  privacyUseTitle: string;
  privacyUseParagraph: string;
  privacyRightsTitle: string;
  privacyRightsParagraph: string;
  termsTitle: string;
  termsIntro: string;
  termsUseTitle: string;
  termsUseParagraph: string;
  termsDriversTitle: string;
  termsDriversParagraph: string;
  termsPaymentsTitle: string;
  termsPaymentsParagraph: string;
  termsLiabilityTitle: string;
  termsLiabilityParagraph: string;
};

const legalCopy: Record<LanguageCode, LegalCopy> = {
  es: {
    headerTitle: 'Políticas de privacidad y Términos de uso',
    headerSubtitle:
      'Esta sección resume cómo protegemos tus datos y las reglas básicas para usar Rundi. Léelo con calma antes de continuar utilizando la plataforma.',
    privacyTitle: 'Política de privacidad',
    privacyIntro1:
      'Rundi recopila únicamente la información necesaria para operar el servicio de transporte: datos de contacto, ubicaciones aproximadas para calcular rutas y registros de viajes. Nunca vendemos tu información personal a terceros.',
    privacyIntro2:
      'Utilizamos proveedores de infraestructura y pagos que cumplen estándares de seguridad, y solo compartimos datos cuando es indispensable para procesar tus viajes, cumplimiento legal o prevención de fraude.',
    privacyDataTitle: '1. Datos que recopilamos',
    privacyDataParagraph:
      '- Información de registro (nombre, teléfono, correo electrónico).\n- Información de viaje (puntos de origen y destino, horarios aproximados).\n- Datos técnicos del dispositivo (modelo, sistema operativo, identificadores de app) para mejorar la experiencia y la seguridad.',
    privacyUseTitle: '2. Uso de la información',
    privacyUseParagraph:
      'La información se utiliza para mostrarte opciones de viaje, conectar pasajeros con conductores, calcular tarifas, procesar pagos y mejorar la calidad del servicio. También podemos enviarte avisos sobre cambios en la app o comunicaciones relevantes para tu seguridad.',
    privacyRightsTitle: '3. Tus derechos',
    privacyRightsParagraph:
      'Puedes solicitar acceso, actualización o eliminación de tus datos personales en cualquier momento, sujeto a los requisitos legales de conservación de información. También puedes desactivar ciertas comunicaciones promocionales desde la configuración de la app.',
    termsTitle: 'Términos y condiciones',
    termsIntro:
      'Al usar Rundi aceptas estas condiciones de uso. La plataforma conecta usuarios con conductores independientes y se reserva el derecho de actualizar los presentes términos cuando sea necesario.',
    termsUseTitle: '1. Uso de la plataforma',
    termsUseParagraph:
      'Debes proporcionar información real y mantener la seguridad de tu cuenta. No se permite utilizar la app para fines ilícitos, peligrosos o que pongan en riesgo a otros usuarios o conductores.',
    termsDriversTitle: '2. Conductores y usuarios',
    termsDriversParagraph:
      'Conductores y usuarios se comprometen a respetar las normas de tránsito y comportamiento. Rundi puede suspender cuentas ante reportes reiterados de comportamiento inapropiado o incumplimiento de estos términos.',
    termsPaymentsTitle: '3. Pagos y tarifas',
    termsPaymentsParagraph:
      'Las tarifas, comisiones y métodos de pago se mostrarán siempre antes de confirmar un viaje. Rundi se reserva el derecho de actualizar las tarifas y comunicar los cambios por los canales oficiales.',
    termsLiabilityTitle: '4. Limitación de responsabilidad',
    termsLiabilityParagraph:
      'La plataforma se ofrece tal cual, sin garantías implícitas. Rundi no será responsable por daños indirectos o consecuentes derivados del uso del servicio, salvo en los casos en que la ley aplicable lo exija.',
  },
  en: {
    headerTitle: 'Privacy Policy and Terms of Use',
    headerSubtitle:
      'This section summarizes how we protect your data and the basic rules for using Rundi. Please read it carefully before continuing to use the platform.',
    privacyTitle: 'Privacy policy',
    privacyIntro1:
      'Rundi collects only the information needed to operate the transportation service: contact details, approximate locations to calculate routes and trip records. We never sell your personal information to third parties.',
    privacyIntro2:
      'We use infrastructure and payment providers that follow security standards, and we only share data when it is strictly necessary to process your trips, comply with the law or prevent fraud.',
    privacyDataTitle: '1. Data we collect',
    privacyDataParagraph:
      '- Registration information (name, phone number, email).\n- Trip information (pickup and dropoff points, approximate times).\n- Device technical data (model, OS, app identifiers) to improve experience and security.',
    privacyUseTitle: '2. How we use your information',
    privacyUseParagraph:
      'We use this information to show trip options, connect riders and drivers, calculate fares, process payments and improve service quality. We may also send notices about app changes or important safety communications.',
    privacyRightsTitle: '3. Your rights',
    privacyRightsParagraph:
      'You can request access, update or deletion of your personal data at any time, subject to legal retention requirements. You can also disable some promotional notifications in the app settings.',
    termsTitle: 'Terms and conditions',
    termsIntro:
      'By using Rundi you accept these terms of use. The platform connects riders with independent drivers and may update these terms whenever necessary.',
    termsUseTitle: '1. Use of the platform',
    termsUseParagraph:
      'You must provide accurate information and keep your account secure. You may not use the app for illegal, dangerous or harmful activities.',
    termsDriversTitle: '2. Drivers and users',
    termsDriversParagraph:
      'Drivers and users agree to follow traffic rules and respectful behavior. Rundi may suspend accounts after repeated reports of inappropriate conduct or breaches of these terms.',
    termsPaymentsTitle: '3. Payments and fares',
    termsPaymentsParagraph:
      'Fares, commissions and payment methods will always be shown before you confirm a trip. Rundi may update fares and will communicate changes through official channels.',
    termsLiabilityTitle: '4. Limitation of liability',
    termsLiabilityParagraph:
      'The platform is provided as-is, without implied warranties. Rundi will not be liable for indirect or consequential damages arising from the use of the service, except where required by applicable law.',
  },
  zh: {
    headerTitle: '隐私政策与使用条款',
    headerSubtitle:
      '本节简要说明我们如何保护你的数据，以及使用 Rundi 时需要遵守的基本规则。请在继续使用平台之前仔细阅读。',
    privacyTitle: '隐私政策',
    privacyIntro1:
      'Rundi 只收集提供出行服务所需的信息：联系方式、用于计算路线的大致位置以及行程记录。我们不会将你的个人信息出售给第三方。',
    privacyIntro2:
      '我们使用符合安全标准的基础设施和支付服务提供商，只在处理行程、符合法律要求或防止欺诈时，才会共享必要的数据。',
    privacyDataTitle: '1. 我们收集的数据',
    privacyDataParagraph:
      '- 注册信息（姓名、电话号码、电子邮箱）。\n- 行程信息（出发点、目的地及大致时间）。\n- 设备技术信息（型号、操作系统、应用标识符），用于提升体验和安全性。',
    privacyUseTitle: '2. 我们如何使用这些信息',
    privacyUseParagraph:
      '这些信息用于为你展示行程选项、连接乘客与司机、计算费用、处理支付并提升服务质量。我们也可能向你发送与安全或重要更新相关的通知。',
    privacyRightsTitle: '3. 你的权利',
    privacyRightsParagraph:
      '在符合法律规定的前提下，你可以随时申请访问、更新或删除你的个人数据。你也可以在应用设置中关闭部分营销通知。',
    termsTitle: '条款与条件',
    termsIntro:
      '使用 Rundi 即表示你同意这些使用条款。平台用于连接乘客与独立司机，并可能在必要时更新本条款。',
    termsUseTitle: '1. 平台使用',
    termsUseParagraph:
      '你需要提供真实信息并妥善保管账号安全。不得将应用用于违法、危险或可能危及他人的用途。',
    termsDriversTitle: '2. 司机与用户',
    termsDriversParagraph:
      '司机和用户都应遵守交通规则并保持礼貌。若多次收到违规或不当行为的举报，Rundi 可暂停相关账号。',
    termsPaymentsTitle: '3. 费用与支付',
    termsPaymentsParagraph:
      '在你确认行程之前，系统会显示费用、佣金及支付方式。Rundi 有权调整费用并通过官方渠道通知变更。',
    termsLiabilityTitle: '4. 责任限制',
    termsLiabilityParagraph:
      '平台按“现状”提供，不作任何默示担保。除法律另有规定外，Rundi 不对因使用本服务而产生的间接或后果性损失承担责任。',
  },
};

const LegalScreen: React.FC = () => {
  const { colors: themeColors, language } = useThemeLanguage();
  const copy = legalCopy[language];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}> 
      <HeaderNav />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { backgroundColor: themeColors.background }]}
        bounces={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: themeColors.text }]}>{copy.headerTitle}</Text>
            <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>{copy.headerSubtitle}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{copy.privacyTitle}</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>{copy.privacyIntro1}</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>{copy.privacyIntro2}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>{copy.privacyDataTitle}</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>{copy.privacyDataParagraph}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>{copy.privacyUseTitle}</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>{copy.privacyUseParagraph}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>{copy.privacyRightsTitle}</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>{copy.privacyRightsParagraph}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{copy.termsTitle}</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>{copy.termsIntro}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>{copy.termsUseTitle}</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>{copy.termsUseParagraph}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>{copy.termsDriversTitle}</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>{copy.termsDriversParagraph}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>{copy.termsPaymentsTitle}</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>{copy.termsPaymentsParagraph}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>{copy.termsLiabilityTitle}</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>{copy.termsLiabilityParagraph}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingVertical: layout.sectionVerticalPadding,
  },
  container: {
    alignSelf: 'center',
    maxWidth: layout.contentMaxWidth,
    paddingHorizontal: layout.horizontalPadding,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: typography.heroTitle,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.heroSubtitle,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default LegalScreen;

