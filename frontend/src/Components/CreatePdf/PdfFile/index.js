import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import React from "react";

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
const MyDocument = ({qrcode}) => {

        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Image style={{height:"100", width:"100", border:"1px black solid"}} src={qrcode}/>
                    <Image style={{height:"100", width:"100", border:"1px black solid"}} src={qrcode}/>
                    <Image style={{height:"100", width:"100", border:"1px black solid"}} src={qrcode}/>
                    <Image style={{height:"100", width:"100", border:"1px black solid"}} src={qrcode}/>
                    <Image style={{height:"100", width:"100", border:"1px black solid"}} src={qrcode}/>
                    <Image style={{height:"100", width:"100", border:"1px black solid"}} src={qrcode}/>
                </Page>
            </Document>
        )
    }
;

export default MyDocument