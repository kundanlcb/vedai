/**
 * Learn Module - Content Viewer Screen
 * Displays content chunks with pagination
 */

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetContent } from '../../hooks/useChapters';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Loading } from '../../components/ui/Loading';
import { getColors } from '../../theme/colors';
import { Spacing } from '../../theme/typography';

type Props = any;

export const ContentViewerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { subjectName, chapterName, chapterId } = route.params as {
    subjectName: string;
    chapterName: string;
    chapterId: string;
  };

  const colorMode = (useColorScheme() || 'light') as 'light' | 'dark';
  const colors = getColors(colorMode);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: contentData, isLoading } = useGetContent(chapterId, currentPage);

  const handleNextPage = () => {
    if (contentData && currentPage < (contentData.total || 0) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { flex: 1, padding: Spacing.lg },
    header: { marginBottom: Spacing.lg },
    subjectName: { marginBottom: Spacing.xs },
    chapterName: { marginBottom: Spacing.sm },
    contentCard: { flex: 1, marginBottom: Spacing.lg },
    contentText: { lineHeight: 24, marginBottom: Spacing.md },
    pagination: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
    pageInfo: { textAlign: 'center', flex: 1 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.md },
    button: { flex: 1 },
  });

  if (isLoading) {
    return <Loading visible={true} message="Loading content..." />;
  }

  const currentContent = contentData?.data?.[0];
  const totalPages = contentData?.total || 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="body_xs" color="secondary" style={styles.subjectName}>
            {subjectName}
          </Text>
          <Text variant="h4" color="primary" weight="semibold" style={styles.chapterName}>
            {chapterName}
          </Text>
        </View>

        <Card style={styles.contentCard}>
          {currentContent ? (
            <Text variant="body_base" color="primary" style={styles.contentText}>
              {currentContent.text}
            </Text>
          ) : (
            <Text variant="body_sm" color="secondary">
              No content available
            </Text>
          )}
        </Card>

        <View style={styles.pagination}>
          <Text variant="body_sm" color="secondary" style={styles.pageInfo}>
            Page {currentPage + 1} of {totalPages}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="← Previous"
            onPress={handlePreviousPage}
            disabled={currentPage === 0}
            variant={currentPage === 0 ? 'outline' : 'primary'}
            style={styles.button}
          />
          <Button
            label="Next →"
            onPress={handleNextPage}
            disabled={currentPage >= totalPages - 1}
            variant={currentPage >= totalPages - 1 ? 'outline' : 'primary'}
            style={styles.button}
          />
        </View>

        {currentPage === totalPages - 1 && (
          <Button
            label="✓ Mark Complete"
            onPress={() => {
              navigation.goBack();
            }}
            variant="primary"
            style={{ marginTop: Spacing.lg }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

