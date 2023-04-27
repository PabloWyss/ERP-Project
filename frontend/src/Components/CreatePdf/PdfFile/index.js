import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import React from "react";
import {Section} from "tailwind-react-ui";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        flexWrap: 'wrap'


    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

// Create Document Component
const MyDocument = ({qrcode, number}) => {

        let array = []
        for (let i = 0; i <= number; i++) {
            array.push(i)
        }


        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        {
                            array.map(() => {
                                return <Image style={{height: 90, width: 90, border: "1px black solid"}} src={qrcode}/>
                            })
                        }
                    </View>
                </Page>
            </Document>
        )
    }
;

export default MyDocument