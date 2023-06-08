import {Document, Page, Text, View, StyleSheet, Image, Svg} from '@react-pdf/renderer';
import React, {useState} from "react";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import {v4 as uuidv4} from 'uuid';


// Create Document Component
const MyDocument = ({origin, item, inputInfo, selection, isStandard}) => {
    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
            flexWrap: 'wrap',
            paddingTop: `${inputInfo.topMargin}mm`,
            paddingBottom: `${inputInfo.topMargin}mm`,
            paddingLeft: `${inputInfo.sideMargin}mm`,
            paddingRight: `${inputInfo.sideMargin}mm`,
        }, text: {
            backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center"
        }, viewStyle: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
        }, textStyle: {
            objectFit: "contain", fontSize: "10"
        }, QRcodeImage: {
            width: `${inputInfo.width}mm`,
            border: "1px black solid",
            aspectRatio: 1 / 1
        }, BarcodeImage: {
            height: `${inputInfo.height}mm`,
            width: `${inputInfo.width}mm`,
            border: "1px black solid"
        }


    });


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
    if (isStandard && origin == "Barcode") {
        inputInfo.quantity = 40
        for (let i = 1; i < inputInfo.quantity; i++) {
            array.push(i)
        }
    } else if (isStandard && origin == "QRCode") {
        inputInfo.quantity = 30
        for (let i = 1; i < inputInfo.quantity; i++) {
            array.push(i)
        }
    } else {
        for (let i = 1; i < inputInfo.quantity; i++) {
            array.push(i)
        }
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


    return (<Document>
        <Page size="A4" style={styles.page}>
            {origin == "Barcode" ? array.map((value, index) => {

                return (<View style={styles.viewStyle} key={uuidv4()}>
                    <Image style={styles.BarcodeImage} key={index}
                           src={barcode}/>
                    {
                        inputInfo.showName ? <Text style={styles.textStyle}>{inputInfo.personalizedText}</Text> : null
                    }
                </View>)
            }) : array.map((value, index) => {
                return (<View style={styles.viewStyle} key={uuidv4()}>
                    <Image style={styles.QRcodeImage} key={index} src={qrcode}/>
                    {
                        inputInfo.showName ? <Text style={styles.textStyle}>{inputInfo.personalizedText}</Text> : null
                    }
                </View>)
            })}
        </Page>
    </Document>)
};

export default MyDocument