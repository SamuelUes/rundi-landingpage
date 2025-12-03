'use client';

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { usePathname, useRouter } from 'next/navigation';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { logo } from '../assets/map_icons';

const toImageSource = (asset: any): any => {
  if (!asset) return asset;
  const maybe = (asset as any).default ?? asset;
  if (typeof maybe === 'string') return { uri: maybe };
  if ((maybe as any).src) return { uri: (maybe as any).src };
  return maybe;
};

const HeaderNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const brandLogoSource: any = toImageSource(logo as any);

  const goTo = (path: string) => {
    if (!path) return;
    router.push(path);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.brandRow}
          activeOpacity={0.8}
          onPress={() => goTo('/')}
        >
          <Image source={brandLogoSource} style={styles.brandLogo as any} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.linksRow}>
          <TouchableOpacity
            style={[styles.linkButton, isActive('/tracking') && styles.linkButtonActive]}
            activeOpacity={0.85}
            onPress={() => goTo('/tracking')}
          >
            <Text style={[styles.linkText, isActive('/tracking') && styles.linkTextActive]}>Tracking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkButton, isActive('/galeria') && styles.linkButtonActive]}
            activeOpacity={0.85}
            onPress={() => goTo('/galeria')}
          >
            <Text style={[styles.linkText, isActive('/galeria') && styles.linkTextActive]}>Galería</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkButton, isActive('/contacto') && styles.linkButtonActive]}
            activeOpacity={0.85}
            onPress={() => goTo('/contacto')}
          >
            <Text style={[styles.linkText, isActive('/contacto') && styles.linkTextActive]}>Contacto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: layout.horizontalPadding,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    maxWidth: layout.contentMaxWidth,
    width: '100%',
    flexWrap: 'wrap',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 110,
    height: 40,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  linkButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginLeft: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  linkButtonActive: {
    borderBottomColor: colors.gold,
  },
  linkText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  linkTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
});

export default HeaderNav;
