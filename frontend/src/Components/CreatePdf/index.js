import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from "./PdfFile";


const PDFView = () => (
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
);

export default PDFView

ReactDOM.render(<PDFView />, document.getElementById('root'));