import {PDFViewer} from '@react-pdf/renderer';
import MyDocument from "./PdfFile";

const PDFCreate = (qrcode) => {

        return (
            <PDFViewer className="w-full h-screen">
                <MyDocument qrcode={qrcode}/>
            </PDFViewer>

        )
    }
;

export default PDFCreate