import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import incidents from './incidents'
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
const api = {
    incidents: Object.assign(incidents, incidents),
monitoring: Object.assign(monitoring, monitoring),
captcha: Object.assign(captcha, captcha),
}

export default api