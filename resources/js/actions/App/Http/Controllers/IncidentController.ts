import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
/**
* @see \App\Http\Controllers\IncidentController::monitoring
 * @see app/Http/Controllers/IncidentController.php:142
 * @route '/api/monitoring'
 */
export const monitoring = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoring.url(options),
    method: 'get',
})

monitoring.definition = {
    methods: ["get","head"],
    url: '/api/monitoring',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncidentController::monitoring
 * @see app/Http/Controllers/IncidentController.php:142
 * @route '/api/monitoring'
 */
monitoring.url = (options?: RouteQueryOptions) => {
    return monitoring.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncidentController::monitoring
 * @see app/Http/Controllers/IncidentController.php:142
 * @route '/api/monitoring'
 */
monitoring.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoring.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncidentController::monitoring
 * @see app/Http/Controllers/IncidentController.php:142
 * @route '/api/monitoring'
 */
monitoring.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monitoring.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IncidentController::monitoring
 * @see app/Http/Controllers/IncidentController.php:142
 * @route '/api/monitoring'
 */
    const monitoringForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: monitoring.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IncidentController::monitoring
 * @see app/Http/Controllers/IncidentController.php:142
 * @route '/api/monitoring'
 */
        monitoringForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: monitoring.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IncidentController::monitoring
 * @see app/Http/Controllers/IncidentController.php:142
 * @route '/api/monitoring'
 */
        monitoringForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: monitoring.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    monitoring.form = monitoringForm
/**
* @see \App\Http\Controllers\IncidentController::captcha
 * @see app/Http/Controllers/IncidentController.php:18
 * @route '/api/captcha'
 */
export const captcha = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: captcha.url(options),
    method: 'get',
})

captcha.definition = {
    methods: ["get","head"],
    url: '/api/captcha',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncidentController::captcha
 * @see app/Http/Controllers/IncidentController.php:18
 * @route '/api/captcha'
 */
captcha.url = (options?: RouteQueryOptions) => {
    return captcha.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncidentController::captcha
 * @see app/Http/Controllers/IncidentController.php:18
 * @route '/api/captcha'
 */
captcha.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: captcha.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncidentController::captcha
 * @see app/Http/Controllers/IncidentController.php:18
 * @route '/api/captcha'
 */
captcha.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: captcha.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IncidentController::captcha
 * @see app/Http/Controllers/IncidentController.php:18
 * @route '/api/captcha'
 */
    const captchaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: captcha.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IncidentController::captcha
 * @see app/Http/Controllers/IncidentController.php:18
 * @route '/api/captcha'
 */
        captchaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: captcha.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IncidentController::captcha
 * @see app/Http/Controllers/IncidentController.php:18
 * @route '/api/captcha'
 */
        captchaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: captcha.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    captcha.form = captchaForm
const IncidentController = { store, track, monitoring, captcha }

export default IncidentController