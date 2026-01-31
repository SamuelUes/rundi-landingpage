import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import HeaderNav from './HeaderNav';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

type FAQItem = {
  question: string;
  answer: string;
};
type ContactCopy = {
  headerTitle: string;
  headerSubtitle: string;
  quickContactTitle: string;
  callLabel: string;
  whatsappLabel: string;
  emailLabel: string;
  emailsSectionTitle: string;
  supportTitle: string;
  supportEmail: string;
  supportDescription: string;
  businessTitle: string;
  businessEmail: string;
  businessDescription: string;
  driversTitle: string;
  driversEmail: string;
  driversDescription: string;
  faqSectionTitle: string;
  whatsappMessage: string;
  emailSubject: string;
};

const faqsByLanguage: Record<LanguageCode, FAQItem[]> = {
  es: [
    {
      question: '¿Cómo solicito un viaje?',
      answer:
        'Ingresa tu destino en la pantalla principal, confirma la ubicación en el mapa y selecciona "Confirmar Viaje". Un conductor cercano recibirá tu solicitud.',
    },
    {
      question: '¿Qué es conductor designado?',
      answer:
        'Un conductor designado maneja tu vehículo. Ideal si has tomado alcohol u otras ocasiones donde no puedes usar tu vehículo. El conductor llega en moto y maneja tu auto de regreso a casa.',
    },
    {
      question: '¿Cómo cancelo un viaje?',
      answer:
        'Puedes cancelar desde la pantalla de confirmación antes de que el conductor llegue. Después de 5 minutos puede aplicar un cargo de cancelación.',
    },
    {
      question: '¿Cómo califico mi viaje?',
      answer:
        'Al finalizar el viaje, recibirás una notificación para calificar. También puedes hacerlo desde el historial de viajes.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer:
        'Aceptamos tarjetas de crédito/débito y efectivo. Puedes gestionar tus métodos de pago en tu perfil dentro de la app.',
    },
    {
      question: '¿Cómo me convierto en conductor?',
      answer:
        'Regístrate como conductor, sube tus documentos (licencia, circulación, seguro) y espera la aprobación. Recibirás un email cuando estés activo.',
    },
    {
      question: '¿Puedo compartir mi viaje?',
      answer:
        'Sí, durante el viaje puedes compartir un enlace de tracking en tiempo real con familiares o amigos para que vean tu ubicación.',
    },
  ],
  en: [
    {
      question: 'How do I request a trip?',
      answer:
        'Enter your destination on the main screen, confirm the map location and tap "Confirm Trip". A nearby driver will receive your request.',
    },
    {
      question: 'What is a designated driver?',
      answer:
        'A designated driver drives your own vehicle. Ideal if you have been drinking or cannot drive. The driver arrives on a motorcycle and then drives your car back home.',
    },
    {
      question: 'How do I cancel a trip?',
      answer:
        'You can cancel from the confirmation screen before the driver arrives. After 5 minutes a cancellation fee may apply.',
    },
    {
      question: 'How do I rate my trip?',
      answer:
        'When the trip ends you will receive a notification to rate it. You can also rate from the trips history.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept credit/debit cards and cash. You can manage your payment methods from your profile in the app.',
    },
    {
      question: 'How can I become a driver?',
      answer:
        'Sign up as a driver, upload your documents (license, registration, insurance) and wait for approval. You will receive an email when your account is active.',
    },
    {
      question: 'Can I share my trip?',
      answer:
        'Yes. During the trip you can share a real-time tracking link with family or friends so they can see your location.',
    },
  ],
  zh: [
    {
      question: '如何发起行程？',
      answer:
        '在主界面输入目的地，确认地图上的位置，然后点击“确认行程”。附近的司机会收到你的请求。',
    },
    {
      question: '什么是指定司机？',
      answer:
        '指定司机会驾驶你的车辆。适合你喝酒或其他不方便开车的情况。司机会骑摩托车到达，然后开你的车送你回家。',
    },
    {
      question: '如何取消行程？',
      answer:
        '在司机到达之前，你可以在确认页面取消行程。超过 5 分钟后，可能会收取取消费用。',
    },
    {
      question: '如何给行程评分？',
      answer:
        '行程结束后，你会收到评分提醒。你也可以在行程历史中为行程评分。',
    },
    {
      question: '支持哪些支付方式？',
      answer:
        '目前支持信用卡 / 借记卡和现金。你可以在应用的个人资料中管理支付方式。',
    },
    {
      question: '如何成为司机？',
      answer:
        '注册为司机，上传证件（驾照、行驶证、保险等），等待审核。审核通过后你会收到邮件通知。',
    },
    {
      question: '可以分享我的行程吗？',
      answer:
        '可以。在行程中你可以分享一个实时追踪链接给家人或朋友，让他们看到你的实时位置。',
    },
  ],
};

const contactCopy: Record<LanguageCode, ContactCopy> = {
  es: {
    headerTitle: 'Centro de ayuda y contacto',
    headerSubtitle:
      '¿Tienes preguntas sobre Rundi, cobertura o integración? Aquí puedes escribirnos o revisar las respuestas más comunes.',
    quickContactTitle: 'Contacto rápido',
    callLabel: 'Llamar',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'Email',
    emailsSectionTitle: 'Correos específicos',
    supportTitle: 'Soporte general',
    supportEmail: 'soporte@rundi.app',
    supportDescription: 'Consultas sobre el servicio, cobertura y app móvil.',
    businessTitle: 'Alianzas y empresas',
    businessEmail: 'empresas@rundi.app',
    businessDescription: 'Rundi para empresas, eventos y convenios especiales.',
    driversTitle: 'Conductores',
    driversEmail: 'conductores@rundi.app',
    driversDescription: 'Si quieres manejar con Rundi o tienes dudas sobre tu cuenta.',
    faqSectionTitle: 'Preguntas frecuentes',
    whatsappMessage: 'Hola, necesito ayuda con Rundi',
    emailSubject: 'Ayuda Rundi',
  },
  en: {
    headerTitle: 'Help center and contact',
    headerSubtitle:
      'Do you have questions about Rundi, coverage or integrations? Here you can contact us or review the most common answers.',
    quickContactTitle: 'Quick contact',
    callLabel: 'Call',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'Email',
    emailsSectionTitle: 'Specific email addresses',
    supportTitle: 'General support',
    supportEmail: 'soporte@rundi.app',
    supportDescription: 'Questions about the service, coverage and mobile app.',
    businessTitle: 'Partnerships and companies',
    businessEmail: 'empresas@rundi.app',
    businessDescription: 'Rundi for companies, events and special agreements.',
    driversTitle: 'Drivers',
    driversEmail: 'conductores@rundi.app',
    driversDescription: 'If you want to drive with Rundi or have questions about your account.',
    faqSectionTitle: 'Frequently asked questions',
    whatsappMessage: 'Hi, I need help with Rundi',
    emailSubject: 'Rundi support',
  },
  zh: {
    headerTitle: '帮助与联系中心',
    headerSubtitle:
      '如果你对 Rundi、服务范围或集成有任何疑问，可以在这里联系我们或查看常见问题的回答。',
    quickContactTitle: '快速联系',
    callLabel: '拨打电话',
    whatsappLabel: 'WhatsApp',
    emailLabel: '电子邮件',
    emailsSectionTitle: '联系邮箱',
    supportTitle: '通用支持',
    supportEmail: 'soporte@rundi.app',
    supportDescription: '关于服务、覆盖范围和移动应用的咨询。',
    businessTitle: '企业与合作',
    businessEmail: 'empresas@rundi.app',
    businessDescription: '适用于企业、活动和特殊合作。',
    driversTitle: '司机支持',
    driversEmail: 'conductores@rundi.app',
    driversDescription: '如果你想成为 Rundi 司机或对账号有疑问。',
    faqSectionTitle: '常见问题',
    whatsappMessage: '你好，我需要 Rundi 的帮助',
    emailSubject: 'Rundi 帮助',
  },
};

const ContactScreen: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const { colors: themeColors, language } = useThemeLanguage();
  const copy = contactCopy[language];
  const faqs = faqsByLanguage[language];

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleCall = () => {
    Linking.openURL('tel:+50512345678');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(copy.whatsappMessage);
    Linking.openURL(`whatsapp://send?phone=50512345678&text=${message}`);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(copy.emailSubject);
    Linking.openURL(`mailto:soporte@rundiapp.com?subject=${subject}`);
  };

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
            <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
              {copy.headerSubtitle}
            </Text>
          </View>

          <View style={styles.contactSection}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              {copy.quickContactTitle}
            </Text>
            <View style={styles.contactButtons}>
              <TouchableOpacity style={styles.contactButton} activeOpacity={0.85} onPress={handleCall}>
                <Text style={styles.contactIcon}>📞</Text>
                <Text style={styles.contactText}>{copy.callLabel}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton} activeOpacity={0.85} onPress={handleWhatsApp}>
                <Text style={styles.contactIcon}>💬</Text>
                <Text style={styles.contactText}>{copy.whatsappLabel}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton} activeOpacity={0.85} onPress={handleEmail}>
                <Text style={styles.contactIcon}>📧</Text>
                <Text style={styles.contactText}>{copy.emailLabel}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              {copy.emailsSectionTitle}
            </Text>

            <View style={styles.infoCard}>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>{copy.supportTitle}</Text>
                <Text style={styles.infoValue}>{copy.supportEmail}</Text>
                <Text style={styles.cardText}>{copy.supportDescription}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>{copy.businessTitle}</Text>
                <Text style={styles.infoValue}>{copy.businessEmail}</Text>
                <Text style={styles.cardText}>{copy.businessDescription}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>{copy.driversTitle}</Text>
                <Text style={styles.infoValue}>{copy.driversEmail}</Text>
                <Text style={styles.cardText}>{copy.driversDescription}</Text>
              </View>
            </View>
          </View>

          <View style={styles.faqSection}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              {copy.faqSectionTitle}
            </Text>
            {faqs.map((faq, index) => (
              <View key={faq.question} style={styles.faqCard}>
                <TouchableOpacity style={styles.faqHeader} onPress={() => toggleFAQ(index)}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Text style={styles.faqArrow}>{expandedIndex === index ? '▼' : '▶'}</Text>
                </TouchableOpacity>
                {expandedIndex === index && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
              </View>
            ))}
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
    marginBottom: 20,
  },
  cardText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  contactSection: {
    marginBottom: 32,
  },
  contactButtons: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  contactButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 12,
  },
  contactIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  contactText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  faqSection: {
    marginTop: 16,
    marginBottom: 32,
  },
  faqCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  faqArrow: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  faqAnswer: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
});

export default ContactScreen;
