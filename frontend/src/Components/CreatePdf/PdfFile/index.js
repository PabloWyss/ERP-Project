import {Document, Page, Text, View, StyleSheet, Image, Svg} from '@react-pdf/renderer';
import React, {useState} from "react";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

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
const MyDocument = ({origin, item, number}) => {

        console.log(origin)

        // QRCODE GENERATOR
        const [qrcode, setQrcode] = useState("")
        const handleCreateQRCode = () => {
            const data = {
                id: item.id,
                amazon_asin: item.amazon_asin,
                amazon_fnsku: item.amazon_fnsku,
                ean: item.ean,
                sku: item.sku,
                upc: item.upc,
            }
            const datJson = JSON.stringify(data)
            const generateQR = async text => {
                try {
                    setQrcode(await QRCode.toDataURL(datJson))
                } catch (err) {
                    console.error(err)
                }
            }
            generateQR()
        }

        handleCreateQRCode()

        let array = [1]
        for (let i = 1; i < number; i++) {
            array.push(i)
        }

        let image = ""

        //Barcode Generator
        // JsBarcode(".barcode", "1234", {
        //     format: "pharmacode",
        //     lineColor: "#0aa",
        //     width: 4,
        //     height: 40,
        //     displayValue: false
        // });

        //Barcode Generator

        let canvas;
        canvas = document.createElement('canvas');
        JsBarcode(canvas, item.ean);
        const barcode = canvas.toDataURL();


        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    { origin == "Barcode" ?
                        array.map(() => {
                            return <Image style={{height: 90, width: 90, border: "1px black solid"}} src={barcode}/>
                        }):
                        array.map(() => {
                            return <Image style={{height: 90, width: 90, border: "1px black solid"}} src={qrcode}/>
                        })
                    }
                </Page>
            </Document>
        )
    }
;

export default MyDocument