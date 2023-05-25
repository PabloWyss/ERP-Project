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
    viewQrcode: {
        width: "20%",
        aspectRatio: 1 / 1,
        border: "1px black solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    text: {
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});

// Create Document Component
const MyDocument = ({origin, item, number, selection}) => {


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

        //Barcode Generator

        let canvas;
        canvas = document.createElement('canvas');
        if (selection == "EAN") {
            JsBarcode(canvas, item.ean, {
                format: "EAN13",
            });
        } else {
            JsBarcode(canvas, item.sku);
        }

        const barcode = canvas.toDataURL();


        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    {origin == "Barcode" ?
                        array.map((value, index) => {
                            return <Image style={{height: 100, width: 100, border: "1px black solid"}} key={index}
                                          src={barcode}/>
                        }) :
                        array.map((value, index) => {
                            return (
                                <View style={styles.viewQrcode}>
                                    <Image key={index} src={qrcode}/>
                                    <Text style={styles.text}>{item.ean}</Text>
                                </View>
                            )
                        })
                    }
                </Page>
            </Document>
        )
    }
;

export default MyDocument