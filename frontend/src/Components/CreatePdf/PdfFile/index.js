import React from 'react';
import {
  Page, Text, View, Document, StyleSheet
 } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>How To Create PDF File In React JS - Techsolutionstuff</Text>
      </View>
    </Page>
  </Document>
);

ReactDOM.render(<MyDocument />, document.getElementById('root'));
