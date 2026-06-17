import documents from './documents'
import events from './events'
import posts from './posts'
import publicKeys from './public-keys'
import users from './users'
const resources = {
    documents: Object.assign(documents, documents),
events: Object.assign(events, events),
posts: Object.assign(posts, posts),
publicKeys: Object.assign(publicKeys, publicKeys),
users: Object.assign(users, users),
}

export default resources