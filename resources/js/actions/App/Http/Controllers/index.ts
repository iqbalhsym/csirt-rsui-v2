import DownloadController from './DownloadController'
import BlogController from './BlogController'
import EventController from './EventController'
import IncidentController from './IncidentController'
import Settings from './Settings'
const Controllers = {
    DownloadController: Object.assign(DownloadController, DownloadController),
BlogController: Object.assign(BlogController, BlogController),
EventController: Object.assign(EventController, EventController),
IncidentController: Object.assign(IncidentController, IncidentController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers