import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Circle, Path, Rect, Svg } from 'react-native-svg';

interface OnboardingImageProps {
  type: 'welcome' | 'analytics' | 'security';
  size?: number;
}

const { width, height } = Dimensions.get('window');

const OnboardingImage: React.FC<OnboardingImageProps> = ({ type, size = width * 0.7 }) => {
  // Render different SVG illustrations based on the type
  const renderIllustration = () => {
    switch (type) {
      case 'welcome':
        return (
          <Svg width={size} height={size} viewBox="0 0 200 200">
            <Circle cx="100" cy="100" r="70" fill="#4A80F0" />
            <Circle cx="100" cy="100" r="50" fill="#6E9AF5" />
            <Circle cx="100" cy="80" r="20" fill="#FFFFFF" />
            <Circle cx="80" cy="100" r="15" fill="#FFFFFF" />
            <Circle cx="120" cy="100" r="15" fill="#FFFFFF" />
            <Circle cx="100" cy="120" r="15" fill="#FFFFFF" />
          </Svg>
        );

      case 'analytics':
        return (
          <Svg width={size} height={size} viewBox="0 0 200 200">
            <Rect x="30" y="120" width="30" height="50" fill="#4A80F0" />
            <Rect x="70" y="90" width="30" height="80" fill="#6E9AF5" />
            <Rect x="110" y="70" width="30" height="100" fill="#4A80F0" />
            <Rect x="150" y="40" width="30" height="130" fill="#6E9AF5" />
            <Path d="M30,70 L180,30" stroke="#FFFFFF" strokeWidth="4" />
            <Circle cx="30" cy="70" r="6" fill="#FFFFFF" />
            <Circle cx="70" cy="60" r="6" fill="#FFFFFF" />
            <Circle cx="110" cy="45" r="6" fill="#FFFFFF" />
            <Circle cx="150" cy="35" r="6" fill="#FFFFFF" />
            <Circle cx="180" cy="30" r="6" fill="#FFFFFF" />
          </Svg>
        );

      case 'security':
        return (
          <Svg width={size} height={size} viewBox="0 0 200 200">
            <Path 
              d="M100,30 L160,60 V110 C160,150 130,180 100,190 C70,180 40,150 40,110 V60 L100,30z" 
              fill="#4A80F0" 
            />
            <Path 
              d="M100,50 L140,70 V110 C140,140 120,160 100,170 C80,160 60,140 60,110 V70 L100,50z" 
              fill="#6E9AF5" 
            />
            <Path 
              d="M85,100 L110,125 L130,80" 
              stroke="#FFFFFF" 
              strokeWidth="10" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
          </Svg>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderIllustration()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingImage; 