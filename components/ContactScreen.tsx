import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import HeaderNav from './HeaderNav';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: '¿Cómo solicito un viaje?',
    answer:
      'Ingresa tu destino en la pantalla principal, confirma la ubicación en el mapa y selecciona "Confirmar Viaje". Un conductor cercano recibirá tu solicitud.',
  },
  {
    question: '¿Cómo funciona el precio?',
    answer:
      'El precio base es C$50 + C$35 por kilómetro. Se aplican recargos en horas pico (6-9am, 5-8pm) y para conductor designado (+50%).',
  },
  {
    question: '¿Qué es conductor designado?',
    answer:
      'Un conductor designado maneja tu vehículo. Ideal si has tomado alcohol. El conductor llega en moto y maneja tu auto de regreso a casa.',
  },
  {
    question: '¿Cómo cancelo un viaje?',
    answer:
      'Puedes cancelar desde la pantalla de confirmación antes de que el conductor llegue. Después de 5 minutos puede aplicar cargo de cancelación.',
  },
  {
    question: '¿Cómo califico mi viaje?',
    answer:
      'Al finalizar el viaje, recibirás una notificación para calificar. También puedes hacerlo desde el historial de viajes.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos tarjetas de crédito/débito a través de Stripe y efectivo. Puedes gestionar tus métodos de pago en tu perfil.',
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
];

const ContactScreen: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleCall = () => {
    Linking.openURL('tel:+50512345678');
  };

  const handleWhatsApp = () => {
    Linking.openURL('whatsapp://send?phone=50512345678&text=Hola, necesito ayuda con Rundi');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:soporte@rundiapp.com?subject=Ayuda Rundi');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderNav />
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Centro de ayuda y contacto</Text>
            <Text style={styles.subtitle}>
              ¿Tienes preguntas sobre Rundi, cobertura o integración? Aquí puedes escribirnos o revisar las
              respuestas más comunes.
            </Text>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contacto rápido</Text>
            <View style={styles.contactButtons}>
              <TouchableOpacity style={styles.contactButton} activeOpacity={0.85} onPress={handleCall}>
                <Text style={styles.contactIcon}>📞</Text>
                <Text style={styles.contactText}>Llamar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton} activeOpacity={0.85} onPress={handleWhatsApp}>
                <Text style={styles.contactIcon}>💬</Text>
                <Text style={styles.contactText}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton} activeOpacity={0.85} onPress={handleEmail}>
                <Text style={styles.contactIcon}>📧</Text>
                <Text style={styles.contactText}>Email</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Correos específicos</Text>

            <View style={styles.infoCard}>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Soporte general</Text>
                <Text style={styles.infoValue}>soporte@rundi.app</Text>
                <Text style={styles.cardText}>Consultas sobre el servicio, cobertura y app móvil.</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Alianzas y empresas</Text>
                <Text style={styles.infoValue}>empresas@rundi.app</Text>
                <Text style={styles.cardText}>Rundi para empresas, eventos y convenios especiales.</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Conductores</Text>
                <Text style={styles.infoValue}>conductores@rundi.app</Text>
                <Text style={styles.cardText}>Si quieres manejar con Rundi o tienes dudas sobre tu cuenta.</Text>
              </View>
            </View>
          </View>

          <View style={styles.faqSection}>
            <Text style={styles.sectionTitle}>Preguntas frecuentes</Text>
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
