import ReactPDF from '@react-pdf/renderer';
import PdfFile from "./PdfFile";
const CreatePdf = ()=> {

    ReactPDF.render(<PdfFile />, `${__dirname}/example.pdf`);

}

export default CreatePdf