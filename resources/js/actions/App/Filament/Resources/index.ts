import Documents from './Documents'
import Events from './Events'
import Posts from './Posts'
import PublicKeys from './PublicKeys'
import Users from './Users'
const Resources = {
    Documents: Object.assign(Documents, Documents),
Events: Object.assign(Events, Events),
Posts: Object.assign(Posts, Posts),
PublicKeys: Object.assign(PublicKeys, PublicKeys),
Users: Object.assign(Users, Users),
}

export default Resources