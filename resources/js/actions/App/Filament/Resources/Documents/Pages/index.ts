import ListDocuments from './ListDocuments'
import CreateDocument from './CreateDocument'
import EditDocument from './EditDocument'
const Pages = {
    ListDocuments: Object.assign(ListDocuments, ListDocuments),
CreateDocument: Object.assign(CreateDocument, CreateDocument),
EditDocument: Object.assign(EditDocument, EditDocument),
}

export default Pages