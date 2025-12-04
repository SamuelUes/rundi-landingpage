"use client";

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import HeaderNav from './HeaderNav';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { useThemeLanguage } from '../theme/ThemeContext';

const LegalScreen: React.FC = () => {
  const { colors: themeColors } = useThemeLanguage();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}> 
      <HeaderNav />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { backgroundColor: themeColors.background }]}
        bounces={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: themeColors.text }]}>Políticas de privacidad y Términos de uso</Text>
            <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
              Esta sección resume cómo protegemos tus datos y las reglas básicas para usar Rundi. Léelo con calma antes de
              continuar utilizando la plataforma.
            </Text>
          </View>

          {/* Política de privacidad primero */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Política de privacidad</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>
              Rundi recopila únicamente la información necesaria para operar el servicio de transporte: datos de contacto,
              ubicaciones aproximadas para calcular rutas y registros de viajes. Nunca vendemos tu información personal a
              terceros.
            </Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>
              Utilizamos proveedores de infraestructura y pagos que cumplen estándares de seguridad, y solo compartimos
              datos cuando es indispensable para procesar tus viajes, cumplimiento legal o prevención de fraude.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>1. Datos que recopilamos</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>
              - Información de registro (nombre, teléfono, correo electrónico).
              {'\n'}- Información de viaje (puntos de origen y destino, horarios aproximados).
              {'\n'}- Datos técnicos del dispositivo (modelo, sistema operativo, identificadores de app) para mejorar la
              experiencia y la seguridad.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>2. Uso de la información</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>
              La información se utiliza para mostrarte opciones de viaje, conectar pasajeros con conductores, calcular
              tarifas, procesar pagos y mejorar la calidad del servicio. También podemos enviarte avisos sobre cambios en
              la app o comunicaciones relevantes para tu seguridad.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>3. Tus derechos</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>
              Puedes solicitar acceso, actualización o eliminación de tus datos personales en cualquier momento, sujeto a
              los requisitos legales de conservación de información. También puedes desactivar ciertas comunicaciones
              promocionales desde la configuración de la app.
            </Text>
          </View>

          {/* Términos y condiciones después de la privacidad */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Términos y condiciones</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>
              Al usar Rundi aceptas estas condiciones de uso. La plataforma conecta usuarios con conductores independientes
              y se reserva el derecho de actualizar los presentes términos cuando sea necesario.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>1. Uso de la plataforma</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>
              Debes proporcionar información real y mantener la seguridad de tu cuenta. No se permite utilizar la app para
              fines ilícitos, peligrosos o que pongan en riesgo a otros usuarios o conductores.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>2. Conductores y usuarios</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>
              Conductores y usuarios se comprometen a respetar las normas de tránsito y comportamiento. Rundi puede
              suspender cuentas ante reportes reiterados de comportamiento inapropiado o incumplimiento de estos términos.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>3. Pagos y tarifas</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>
              Las tarifas, comisiones y métodos de pago se mostrarán siempre antes de confirmar un viaje. Rundi se reserva
              el derecho de actualizar las tarifas y comunicar los cambios por los canales oficiales.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { color: themeColors.text }]}>4. Limitación de responsabilidad</Text>
            <Text style={[styles.paragraph, { color: themeColors.textSecondary }]}>
              La plataforma se ofrece tal cual, sin garantías implícitas. Rundi no será responsable por daños indirectos o
              consecuentes derivados del uso del servicio, salvo en los casos en que la ley aplicable lo exija.
            </Text>
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

