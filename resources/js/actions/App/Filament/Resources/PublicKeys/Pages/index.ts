import ListPublicKeys from './ListPublicKeys'
import CreatePublicKey from './CreatePublicKey'
import EditPublicKey from './EditPublicKey'
const Pages = {
    ListPublicKeys: Object.assign(ListPublicKeys, ListPublicKeys),
CreatePublicKey: Object.assign(CreatePublicKey, CreatePublicKey),
EditPublicKey: Object.assign(EditPublicKey, EditPublicKey),
}

export default Pages