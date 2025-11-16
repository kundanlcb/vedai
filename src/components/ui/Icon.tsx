/**
 * Icon Component with Vector Icon Libraries
 * Uses Feather icons with emoji fallback
 * Based on shubh-milan-fe pattern
 */

import React from 'react';
import { Text as RNText, StyleProp, ViewStyle, useColorScheme } from 'react-native';
import { Feather as FeatherIcon } from '@react-native-vector-icons/feather';
import { MaterialIcons as MaterialIcon } from '@react-native-vector-icons/material-icons';
import { MaterialCommunityIcons as MaterialCommunityIcon } from '@react-native-vector-icons/material-community-icons';
import { Ionicons as IonIcon } from '@react-native-vector-icons/ionicons';
import { getColors } from '../../theme/colors';

export type IconLibrary = 'feather' | 'material' | 'material-community' | 'ionicons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  library?: IconLibrary;
  style?: StyleProp<ViewStyle>;
}

const getIconFallback = (iconName: string): string => {
  const fallbackMap: { [key: string]: string } = {
    'home': '🏠',
    'book-open': '📚',
    'pencil': '✏️',
    'clipboard-check': '📝',
    'message-circle': '💬',
    'user': '👤',
  };
  return fallbackMap[iconName] || '•';
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  library = 'feather',
  style,
}) => {
  const colorMode = useColorScheme() || 'light';
  const defaultColor = color || getColors(colorMode as 'light' | 'dark').text_primary;

  const iconProps = {
    name,
    size,
    color: defaultColor,
    style,
  };

  try {
    switch (library) {
      case 'material':
        // @ts-ignore
        return <MaterialIcon {...iconProps} />;
      case 'material-community':
        // @ts-ignore
        return <MaterialCommunityIcon {...iconProps} />;
      case 'ionicons':
        // @ts-ignore
        return <IonIcon {...iconProps} />;
      case 'feather':
      default:
        // @ts-ignore
        return <FeatherIcon {...iconProps} />;
    }
  } catch {
    // Fallback to emoji only if vector icon fails
    return (
      <RNText style={[{ fontSize: size, color: defaultColor }, style]}>
        {getIconFallback(name)}
      </RNText>
    );
  }
};

// Pre-configured icon definitions
export const AppIcons = {
  home: { name: 'home', library: 'feather' as IconLibrary },
  learn: { name: 'book-open', library: 'feather' as IconLibrary },
  practice: { name: 'pencil', library: 'feather' as IconLibrary },
  tests: { name: 'clipboard-check', library: 'feather' as IconLibrary },
  chat: { name: 'message-circle', library: 'feather' as IconLibrary },
  profile: { name: 'user', library: 'feather' as IconLibrary },
  edit: { name: 'edit-2', library: 'feather' as IconLibrary },
  settings: { name: 'settings', library: 'feather' as IconLibrary },
  logout: { name: 'log-out', library: 'feather' as IconLibrary },
  back: { name: 'arrow-left', library: 'feather' as IconLibrary },
  filter: { name: 'filter', library: 'feather' as IconLibrary },
  like: { name: 'heart', library: 'feather' as IconLibrary },
  share: { name: 'share-2', library: 'feather' as IconLibrary },
  more: { name: 'more-horizontal', library: 'feather' as IconLibrary },
};
