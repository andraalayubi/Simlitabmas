// components/LoadingPage.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Center, 
  Flex, 
  Text, 
  Title,
  Transition
} from '@mantine/core';

// Definisi tipe untuk props
interface LoadingPageProps {
  loadingText?: string;
  showPercentage?: boolean;
  onComplete?: () => void;
}

// Komponen LoadingPage
const LoadingPage: React.FC<LoadingPageProps> = ({
  loadingText = "Memuat...",
  showPercentage = true,
  onComplete
}) => {
  const [progress, setProgress] = useState(0);

  // Efek untuk simulasi loading
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + Math.random() * 3;
        if (newProgress >= 100) {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 500);
          }
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Box className="bg-white overflow-hidden py-64 md:py-80 xl:py-[24rem]">
      <Center className="h-full">
        <Flex 
          direction="column" 
          align="center" 
          justify="center" 
          className="z-10"
        >
          <Title 
            order={1} 
            className="text-gray-800 font-extrabold text-4xl mb-8"
          >
            {loadingText}
          </Title>

          {/* Progress bar */}
          <Box className="w-72 h-2 bg-gray-200 rounded-full overflow-hidden relative">
            <Transition mounted={progress > 0} transition="slide-right" duration={400}>
              {(styles) => (
                <Box 
                  style={{
                    ...styles,
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, #3b82f6, #06b6d4)`
                  }}
                  className="h-full rounded-full transition-all duration-300 ease-out"
                />
              )}
            </Transition>
          </Box>

          {/* Persentase loading */}
          {showPercentage && (
            <Text 
              className="text-gray-800 mt-4 font-medium text-lg"
            >
              {Math.round(progress)}%
            </Text>
          )}
        </Flex>
      </Center>
    </Box>
  );
};

export default LoadingPage;