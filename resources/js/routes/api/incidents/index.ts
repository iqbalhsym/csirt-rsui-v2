import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\IncidentController::store
 * @see app/Http/Controllers/IncidentController.php:34
 * @route '/api/incidents'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/incidents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IncidentController::store
 * @see app/Http/Controllers/IncidentController.php:34
 * @route '/api/incidents'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncidentController::store
 * @see app/Http/Controllers/IncidentController.php:34
 * @route '/api/incidents'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\IncidentController::store
 * @see app/Http/Controllers/IncidentController.php:34
 * @route '/api/incidents'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IncidentController::store
 * @see app/Http/Controllers/IncidentController.php:34
 * @route '/api/incidents'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\IncidentController::track
 * @see app/Http/Controllers/IncidentController.php:113
 * @route '/api/incidents/track'
 */
export const track = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: track.url(options),
    method: 'get',
})

track.definition = {
    methods: ["get","head"],
    url: '/api/incidents/track',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncidentController::track
 * @see app/Http/Controllers/IncidentController.php:113
 * @route '/api/incidents/track'
 */
track.url = (options?: RouteQueryOptions) => {
    return track.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncidentController::track
 * @see app/Http/Controllers/IncidentController.php:113
 * @route '/api/incidents/track'
 */
track.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: track.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncidentController::track
 * @see app/Http/Controllers/IncidentController.php:113
 * @route '/api/incidents/track'
 */
track.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: track.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IncidentController::track
 * @see app/Http/Controllers/IncidentController.php:113
 * @route '/api/incidents/track'
 */
    const trackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: track.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IncidentController::track
 * @see app/Http/Controllers/IncidentController.php:113
 * @route '/api/incidents/track'
 */
        trackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: track.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IncidentController::track
 * @see app/Http/Controllers/IncidentController.php:113
 * @route '/api/incidents/track'
 */
        trackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: track.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    track.form = trackForm
const incidents = {
    store: Object.assign(store, store),
track: Object.assign(track, track),
}

export default incidents